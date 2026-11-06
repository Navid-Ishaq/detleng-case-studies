"""Offline tests for ProofSQL's structured response and public snapshot integrity."""
import csv
import hashlib
import json
from decimal import Decimal, ROUND_HALF_UP
from pathlib import Path

from fastapi.testclient import TestClient
import main
from proofsql_metadata import PILOT_METRICS, pilot_verification

client = TestClient(main.app)
ROOT = Path(__file__).resolve().parents[2]
SNAP = ROOT / "proofsql/data/public/pilot"


def test_snapshot_checksums_and_required_columns():
    manifest = json.loads((SNAP / "manifest.json").read_text())
    assert manifest["version"] == "pilot-1"
    assert len(manifest["files"]) == 4
    expected = {
        "fact_sales.csv": ["order_id", "total_sale_value"],
        "fact_orders.csv": ["order_id"],
        "dim_products.csv": ["product_key"],
        "fact_delivery.csv": ["order_id", "on_time_delivery_flag"],
    }
    for entry in manifest["files"]:
        path = SNAP / entry["name"]
        assert path.stat().st_size == entry["size_bytes"]
        assert hashlib.sha256(path.read_bytes()).hexdigest().upper() == entry["sha256"]
        with path.open(encoding="utf-8", newline="") as f:
            assert next(csv.reader(f)) == expected[entry["name"]]


def test_recalculate_pilot_kpis_from_snapshot():
    def read(name):
        with (SNAP / f"{name}.csv").open(encoding="utf-8",newline="") as f:
            return list(csv.DictReader(f))
    sales, orders, products, deliveries = map(read,
         ("fact_sales","fact_orders","dim_products","fact_delivery"))
    assert (len(sales),len(orders),len(products),len(deliveries)) == (112650,99441,32951,99441)
    revenue = sum((Decimal(row["total_sale_value"]) for row in sales),Decimal("0"))
    sales_order_ids = {row["order_id"] for row in sales}
    order_ids = {row["order_id"] for row in orders}
    delivery_ids = {row["order_id"] for row in deliveries}
    assert sales_order_ids.issubset(order_ids) and delivery_ids.issubset(order_ids)
    round2 = lambda d: d.quantize(Decimal("0.01"),rounding=ROUND_HALF_UP)
    assert round2(revenue) == Decimal("15843553.24")
    assert len(orders) == 99441 and len(products) == 32951
    assert len(sales_order_ids) == 98666 # Different definition from fact_orders!
    assert round2(revenue/Decimal(len(sales_order_ids))) == Decimal("160.58")
    ontime = sum(int(row["on_time_delivery_flag"]) for row in deliveries)
    assert round2(Decimal(ontime)*100/Decimal(len(delivery_ids))) == Decimal("89.15")


def test_backend_preserves_answer_and_adds_only_allowed_metrics(monkeypatch):
    monkeypatch.setattr(main,"config_status",lambda:[])
    monkeypatch.setattr(main,"llm",lambda _:"Original AI answer remains intact.")
    monkeypatch.setattr(main,"execute_tool",lambda _tool,_args:{"total_revenue":15843553.24,"unrelated_field":"hidden"})
    res=client.post("/chat",json={"message":"Revenue","tool":"total_revenue"})
    assert res.status_code == 200
    body=res.json()
    assert body["status"]=="success" and body["answer"]=="Original AI answer remains intact."
    assert body["verification"]["tool"] == "total_revenue"
    assert body["verification"]["metrics"] == {"total_revenue":15843553.24}
    assert "unrelated_field" not in str(body)
    assert "live_queried_at" in body["verification"]


def test_proofsql_metadata_allowlist_and_errors():
    assert pilot_verification("not_an_actual_pilot", {"total_revenue":3}) is None
    assert pilot_verification("total_revenue", {"total_revenue":"not number"}) is None
    assert pilot_verification("total_revenue", {"total_revenue":True}) is None
    for tool, keys in PILOT_METRICS.items():
        payload = pilot_verification(tool, {key:1 for key in keys})
        assert set(payload["metrics"]) == set(keys)
