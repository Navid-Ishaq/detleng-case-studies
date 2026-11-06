#!/usr/bin/env python3
"""Create an OFF-REPOSITORY, pseudonymized 9-table ProofSQL snapshot.

Reads the owner's already-downloaded Olist processed CSV exports. No cloud or
OpenAI calls. Does not copy any data into a public website/repository.
The owner must inspect/approve the public release separately.
"""
import argparse
import csv
import hashlib
import hmac
import json
import os
from datetime import datetime, timezone
from pathlib import Path
import secrets

TABLES = {
    "dim_customers": "customer_key customer_id customer_unique_id customer_city customer_state",
    "dim_dates": "date_key calendar_date calendar_year calendar_quarter calendar_month month_name calendar_week day_of_month weekday_name day_type",
    "dim_products": "product_key product_id product_category_name product_name_length product_description_length product_photos_qty product_weight_g product_length_cm product_height_cm product_width_cm",
    "dim_sellers": "seller_key seller_id seller_city seller_state",
    "fact_delivery": "order_id customer_key date_key order_status purchase_date delivery_days delivery_variance_days delivery_status late_delivery_flag on_time_delivery_flag",
    "fact_orders": "order_id customer_key date_key order_status purchase_date purchase_year purchase_month purchase_quarter purchase_weekday purchase_hour delivery_days delivery_variance_days delivery_status",
    "fact_payments": "order_id date_key payment_sequential payment_type payment_installments payment_value installment_category",
    "fact_reviews": "review_id order_id date_key review_score sentiment_category comment_status comment_length review_creation_date review_answer_timestamp",
    "fact_sales": "order_id order_item_id product_key seller_key price freight_value total_sale_value shipping_limit_date",
}
ID_KINDS = {
    "customer_key": "customer_key", "customer_id": "customer_id",
    "customer_unique_id": "customer_unique_id", "order_id": "order_id",
    "product_key": "product_key", "product_id": "product_id",
    "seller_key": "seller_key", "seller_id": "seller_id", "review_id": "review_id",
}
EXPECTED_ROWS = {
    "dim_customers": 99441, "dim_dates": 3653, "dim_products": 32951,
    "dim_sellers": 3095, "fact_delivery": 99441, "fact_orders": 99441,
    "fact_payments": 103886, "fact_sales": 112650,
}


def create(source: Path, target: Path, private_key: Path):
    if target.resolve().is_relative_to(source.resolve()):
        raise ValueError("Target must not be inside the source directory")
    if (target / "manifest.json").exists():
        raise FileExistsError("Existing full snapshot found. Choose a NEW output folder.")
    target.mkdir(parents=True, exist_ok=True)
    private_key.parent.mkdir(parents=True, exist_ok=True)
    if private_key.exists():
        secret = private_key.read_bytes()
        if len(secret) != 32:
            raise ValueError("Existing private HMAC key is invalid")
    else:
        secret = secrets.token_bytes(32)
        # Exclusive creation, so accidental overwriting never silently changes join keys.
        fd = os.open(private_key, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
        with os.fdopen(fd, "wb") as f:
            f.write(secret)
    def pseudo(kind, value):
        if not value:
            return ""
        msg = (kind + ":" + value).encode("utf-8")
        return hmac.new(secret, msg, hashlib.sha256).hexdigest()[:32]

    entries = []
    for name, selection in TABLES.items():
        columns = selection.split()
        inp = source / (name + ".csv")
        if not inp.is_file():
            raise FileNotFoundError(f"Missing private export: {inp}")
        dest = target / (name + ".csv")
        temp = target / (name + ".csv.partial")
        if temp.exists() or dest.exists():
            raise FileExistsError(f"Existing snapshot file: {name}")
        count = 0
        with inp.open("r", encoding="utf-8-sig", newline="") as src, temp.open(
            "w", encoding="utf-8", newline=""
        ) as out:
            reader = csv.DictReader(src)
            missing = set(columns) - set(reader.fieldnames or [])
            if missing:
                raise ValueError(f"{name} is missing columns: {sorted(missing)}")
            writer = csv.DictWriter(out, fieldnames=columns, lineterminator="\n")
            writer.writeheader()
            for row in reader:
                clean = {col: pseudo(ID_KINDS[col], row[col]) if col in ID_KINDS else row[col] for col in columns}
                writer.writerow(clean)
                count += 1
        if name in EXPECTED_ROWS and count != EXPECTED_ROWS[name]:
            raise ValueError(f"{name}: unexpected rows {count}; expected {EXPECTED_ROWS[name]}")
        temp.replace(dest)
        digest = hashlib.sha256(dest.read_bytes()).hexdigest().upper()
        entries.append({"name": dest.name, "size_bytes": dest.stat().st_size,
                        "sha256": digest, "row_count": count, "columns": columns})
        print(f"{name}: {count:,} rows, {dest.stat().st_size / 1048576:.2f} MiB")
    manifest = {
        "project": "DeTLeng ProofSQL", "version": "full-v2",
        "created_at_utc": datetime.now(timezone.utc).isoformat(),
        "source_dataset": "detleng-case-studies.cs003_olist_analytics",
        "source_license": "CC BY-NC-SA 4.0", "status": "static_non_live_snapshot",
        "data_policy": "pseudonymized_row_level__NOT_ANONYMOUS__owner_public_release_review_required",
        "files": entries,
    }
    (target / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    attribution = """# DeTLeng ProofSQL — Nine-table Full Snapshot (full-v2)

Source: Brazilian E-Commerce Public Dataset by Olist.
https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce

Original dataset license: Creative Commons Attribution-NonCommercial-ShareAlike 4.0
(CC BY-NC-SA 4.0): https://creativecommons.org/licenses/by-nc-sa/4.0/

Adaptation: Nine processed BigQuery analytics tables exported from the DeTLeng
CS-003 case study. Unused columns are omitted. Customer, order, seller, product
and review identifiers are HMAC-pseudonymized consistently across tables.
The private HMAC key is NOT included in this snapshot or the repository.

This is a STATIC snapshot, not live BigQuery data. It may be outdated.
HMAC-pseudonymized records are NOT guaranteed to be anonymous. Publication
requires the owner's privacy/licensing review and suitability confirmation.
Attribution/ShareAlike requirements apply to public redistribution of adapted
Olist material. Do not relicense this dataset under the repository's MIT code
license. The CSV and manifest checksums are for data integrity only.

See manifest.json for every published file's SHA-256 hash and row count.
"""
    (target / "README.md").write_text(attribution, encoding="utf-8")
    print("FULL SNAPSHOT CREATED LOCALLY — PUBLIC RELEASE NOT APPROVED OR AUTOMATIC")
    print("Files:", len(entries), "Total MiB:", round(sum(e['size_bytes'] for e in entries)/1048576, 2))


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", type=Path, default=Path(r"D:\DeTLeng-Private-Exports"))
    parser.add_argument("--target", type=Path, default=Path(r"D:\DeTLeng-ProofSQL-Full-Staging"))
    parser.add_argument("--private-key", type=Path, default=Path(r"D:\DeTLeng-Private-Exports\proofsql-private-hmac.key"))
    args = parser.parse_args()
    create(args.source, args.target, args.private_key)
