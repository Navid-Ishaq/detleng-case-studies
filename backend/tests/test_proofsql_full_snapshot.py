"""Optional validation: when owner approves and publishes all nine CSVs, hashes must match."""
import csv
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
TARGET = ROOT / "proofsql/data/public/full-v2"
TABLES = {
    "dim_customers", "dim_dates", "dim_products", "dim_sellers",
    "fact_delivery", "fact_orders", "fact_payments", "fact_reviews", "fact_sales",
}


def test_full_snapshot_only_if_present():
    manifest = TARGET / "manifest.json"
    if not manifest.exists():
        # No fake "full dataset verified" claim before the owner publishes data.
        assert not list(TARGET.glob("*.csv"))
        return
    document = json.loads(manifest.read_text(encoding="utf-8"))
    assert document["version"] == "full-v2"
    assert document["status"] == "static_non_live_snapshot"
    entries = document["files"]
    assert {entry["name"] for entry in entries} == {table + ".csv" for table in TABLES}
    for entry in entries:
        file = TARGET / entry["name"]
        assert file.stat().st_size == entry["size_bytes"]
        h = hashlib.sha256()
        with file.open("rb") as stream:
            for chunk in iter(lambda: stream.read(1024 * 1024), b""):
                h.update(chunk)
        assert h.hexdigest().upper() == entry["sha256"].upper()
        with file.open(encoding="utf-8", newline="") as src:
            reader = csv.reader(src)
            assert next(reader) == entry["columns"]
            assert sum(1 for _ in reader) == entry["row_count"]
