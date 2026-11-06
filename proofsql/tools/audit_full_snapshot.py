#!/usr/bin/env python3
"""Check hashes, join integrity and original five KPI values BEFORE public release.

This is an integrity audit, NOT legal/privacy approval to redistribute the data.
"""
import argparse
import csv
from decimal import Decimal, ROUND_HALF_UP
import hashlib
import json
from pathlib import Path

EXPECTED = {
    "total_revenue": Decimal("15843553.24"),
    "total_orders": 99441,
    "total_products": 32951,
    "average_order_value": Decimal("160.58"),
    "on_time_delivery_percent": Decimal("89.15"),
}

def audit(folder: Path):
    manifest = json.loads((folder/"manifest.json").read_text(encoding="utf-8"))
    if manifest.get("version")!="full-v2" or len(manifest.get("files",[]))!=9:
        raise ValueError("Wrong/incomplete full-v2 manifest")
    lookup={}
    for entry in manifest["files"]:
        file=folder/entry["name"]
        digest=hashlib.sha256()
        with file.open("rb") as src:
            for chunk in iter(lambda:src.read(1024*1024),b""):
                digest.update(chunk)
        if file.stat().st_size!=entry["size_bytes"] or digest.hexdigest().upper()!=entry["sha256"]:
            raise ValueError(f"Checksum failure: {file.name}")
        with file.open(encoding="utf-8",newline="") as src:
            reader=csv.DictReader(src)
            if reader.fieldnames!=entry["columns"]:
                raise ValueError(f"Header mismatch: {file.name}")
            rows=list(reader)
        if len(rows)!=entry["row_count"]:
            raise ValueError(f"Row count mismatch: {file.name}")
        lookup[file.stem]=rows
        print(f"OK {file.name}: {len(rows):,} rows · SHA-256")
    orders={r["order_id"] for r in lookup["fact_orders"]}
    customers={r["customer_key"] for r in lookup["dim_customers"]}
    products={r["product_key"] for r in lookup["dim_products"]}
    sellers={r["seller_key"] for r in lookup["dim_sellers"]}
    for table in ("fact_sales","fact_delivery","fact_payments","fact_reviews"):
        missing={r["order_id"] for r in lookup[table] if r["order_id"] not in orders}
        if missing:raise ValueError(f"{table}: {len(missing)} missing order FK(s)")
    for table in ("fact_orders","fact_delivery"):
        missing={r["customer_key"] for r in lookup[table] if r["customer_key"] and r["customer_key"] not in customers}
        if missing:raise ValueError(f"{table}: {len(missing)} missing customer FK(s)")
    for column,values in (("product_key",products),("seller_key",sellers)):
        missing={r[column] for r in lookup["fact_sales"] if r[column] and r[column] not in values}
        if missing:raise ValueError(f"fact_sales: {len(missing)} missing {column}(s)")
    round2=lambda x:x.quantize(Decimal("0.01"),rounding=ROUND_HALF_UP)
    revenue=sum((Decimal(r["total_sale_value"]) for r in lookup["fact_sales"]),Decimal(0))
    sale_orders={r["order_id"] for r in lookup["fact_sales"]}
    deliveries=lookup["fact_delivery"]
    delivered_orders={r["order_id"] for r in deliveries}
    result={
      "total_revenue":round2(revenue),
      "total_orders":len(lookup["fact_orders"]),
      "total_products":len(lookup["dim_products"]),
      "average_order_value":round2(revenue/Decimal(len(sale_orders))),
      "on_time_delivery_percent":round2(Decimal(sum(int(r["on_time_delivery_flag"]) for r in deliveries))*100/Decimal(len(delivered_orders))),
    }
    for name,value in result.items():
        print(f"{name}: {value}")
        if value!=EXPECTED[name]:raise ValueError(f"KPI mismatch for {name}: expected {EXPECTED[name]}")
    print("NINE-TABLE CHECKSUMS, JOIN KEYS AND FIVE KPI BASELINES PASS")
    print("IMPORTANT: This does not constitute a privacy/legal/public-release approval.")

if __name__=="__main__":
    p=argparse.ArgumentParser()
    p.add_argument("--folder",type=Path,default=Path(r"D:\DeTLeng-ProofSQL-Full-Staging"))
    audit(p.parse_args().folder)
