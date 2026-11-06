"""Guard that the 100 static DuckDB queries keep matching 100 trusted backend SQL sources.

No BigQuery/OpenAI/Render calls: the query executor is replaced before invocation.
"""
import importlib
import json
from pathlib import Path
import re
from unittest.mock import patch

from analytics.registry import TOOL_REGISTRY

ROOT = Path(__file__).resolve().parents[2]
REGISTRY = json.loads((ROOT / "proofsql/engine/full-query-registry.json").read_text())


def translate_safe_divide(sql):
    marker = "SAFE_DIVIDE("
    while marker in sql.upper():
        start = sql.upper().index(marker)
        op = start + len(marker)
        depth = 1
        pos = op
        while pos < len(sql) and depth:
            if sql[pos] == "(":
                depth += 1
            elif sql[pos] == ")":
                depth -= 1
            pos += 1
        assert depth == 0
        raw = sql[op:pos - 1]
        args = []
        depth = 0
        start_arg = 0
        for i, char in enumerate(raw):
            if char == "(":
                depth += 1
            elif char == ")":
                depth -= 1
            elif char == "," and depth == 0:
                args.append(raw[start_arg:i].strip())
                start_arg = i + 1
        args.append(raw[start_arg:].strip())
        assert len(args) == 2
        left, right = args
        replacement = f"(CAST(({left}) AS DOUBLE) / NULLIF(CAST(({right}) AS DOUBLE), 0))"
        sql = sql[:start] + replacement + sql[pos:]
    return sql


def test_all_100_sql_files_still_match_trusted_backend():
    assert set(REGISTRY) == set(TOOL_REGISTRY)
    tools = [importlib.import_module(f"analytics.tools.{stem}_tools") for stem in (
        "customer", "delivery", "executive", "geography", "order", "payment",
        "product", "revenue", "review", "sales", "seller", "time",
    )]
    original = {module: module.execute_query for module in tools}
    try:
        for name, fn in TOOL_REGISTRY.items():
            capture = []
            def intercept(sql):
                capture.append(sql)
                return []
            for module in tools:
                module.execute_query = intercept
            fn()
            assert len(capture) == 1, name
            original_sql = capture[0]
            tables = sorted(set(re.findall(
                r"`detleng-case-studies\.cs003_olist_analytics\.([a-z_]+)`", original_sql
            )))
            assert tables == REGISTRY[name]["tables"]
            sql = re.sub(
                r"`detleng-case-studies\.cs003_olist_analytics\.([a-z_]+)`",
                lambda m: "proofsql_full." + m.group(1),original_sql,
            )
            sql = translate_safe_divide(sql).strip().rstrip(";") + ";\n"
            static = (ROOT / f"proofsql/queries/full-v2/{name}.sql").read_text()
            content = static.split("\n", 1)[1]
            assert sql == content, f"SQL drift for {name}"
    finally:
        for module, executor in original.items():
            module.execute_query = executor
