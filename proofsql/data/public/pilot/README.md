# DeTLeng ProofSQL — Pilot Dataset

Source: Brazilian E-Commerce Public Dataset by Olist
https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce

Original dataset license: CC BY-NC-SA 4.0
https://creativecommons.org/licenses/by-nc-sa/4.0/

This is a transformed, reduced snapshot from the DeTLeng
BigQuery analytics layer, prepared for non-commercial
educational SQL verification.

Changes:
- Removed columns not required by the five pilot KPIs.
- Pseudonymized order_id and product_key using HMAC-SHA256
  with a private, one-time random key.
- Preserved row multiplicity and numeric KPI fields.
- Removed original descriptive product and customer fields.

Pseudonymization is not a guarantee of anonymity.
The snapshot is static and is not automatically synchronized
with the live BigQuery dataset.

Data attribution: Olist.
Derivative dataset: DeTLeng.
Distribution of the adapted dataset follows CC BY-NC-SA 4.0.

See manifest.json for file checksums.
