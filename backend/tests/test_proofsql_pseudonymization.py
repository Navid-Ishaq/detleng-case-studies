"""Small synthetic test that confirms all nine-table HMAC joins are consistent."""
import csv
import importlib.util
import json
from pathlib import Path

ROOT=Path(__file__).resolve().parents[2]
FILE=ROOT/"proofsql/tools/prepare_full_snapshot.py"
spec=importlib.util.spec_from_file_location("prepare_full_snapshot",FILE)
module=importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


def test_all_nine_tables_share_private_hmac_join_ids(tmp_path,monkeypatch):
    source=tmp_path/"private";source.mkdir()
    target=tmp_path/"public_staging"
    for name,cols in module.TABLES.items():
        fields=cols.split()
        with (source/f"{name}.csv").open("w",encoding="utf-8",newline="") as f:
            writer=csv.DictWriter(f,fieldnames=fields)
            writer.writeheader()
            row={col:("raw-order" if col=="order_id" else
                      "raw-product" if col=="product_key" else
                      "raw-customer" if col=="customer_key" else
                      "raw-seller" if col=="seller_key" else
                      "raw-sensitive" if col in module.ID_KINDS else
                      "1") for col in fields}
            writer.writerow(row)
    monkeypatch.setattr(module,"EXPECTED_ROWS",{name:1 for name in module.TABLES})
    key=tmp_path/"hidden"/"secret.key"
    module.create(source,target,key)
    assert len(key.read_bytes())==32
    manifest=json.loads((target/"manifest.json").read_text())
    assert manifest["version"]=="full-v2" and len(manifest["files"])==9
    def first(name):
        with (target/f"{name}.csv").open(newline="",encoding="utf-8") as f:
            return next(csv.DictReader(f))
    order=first("fact_orders")
    sales=first("fact_sales")
    delivery=first("fact_delivery")
    assert order["order_id"]==sales["order_id"]==delivery["order_id"]
    assert order["customer_key"]==first("dim_customers")["customer_key"]
    assert sales["product_key"]==first("dim_products")["product_key"]
    assert sales["seller_key"]==first("dim_sellers")["seller_key"]
    assert sales["order_id"]!="raw-order"
    assert "raw-order" not in (target/"fact_sales.csv").read_text()
