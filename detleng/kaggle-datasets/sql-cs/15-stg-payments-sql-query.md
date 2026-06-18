Bilkul janab. **stg_payments** staging layer ka bohat important table hai, kyun ke yahan se Revenue, Payment Behavior, Installments, Cash Flow aur Customer Payment Preferences nikalti hain.

---

# stg_payments

## Business Purpose

Raw table:

```text
cs003_olist_raw_payments
```

Problems jo staging mein solve karni hain:

✅ Payment type standardize karna

✅ Null values handle karna

✅ Revenue columns clean karna

✅ Installment fields validate karna

✅ ETL audit column add karna

---

# Master Query

```sql
CREATE OR REPLACE TABLE
`detleng-case-studies.cs003_olist_stg.stg_payments`
AS

SELECT

    order_id,

    payment_sequential,

    UPPER(TRIM(payment_type))
        AS payment_type,

    IFNULL(payment_installments,0)
        AS payment_installments,

    ROUND(IFNULL(payment_value,0),2)
        AS payment_value,

    CURRENT_TIMESTAMP()
        AS etl_load_timestamp

FROM
`detleng-case-studies.cs003_olist_raw.cs003_olist_raw_payments`;
```

---

# What This Query Does

## 1. Standardize Payment Types

Raw data may contain:

```text
credit_card
Credit_Card
 credit_card
```

After staging:

```text
CREDIT_CARD
```

using:

```sql
UPPER(TRIM(payment_type))
```

---

## 2. Handle Null Installments

Raw:

```text
NULL
```

Becomes:

```text
0
```

using:

```sql
IFNULL(payment_installments,0)
```

---

## 3. Clean Revenue Values

Raw:

```text
154.100000
154.1
154.099999
```

Becomes:

```text
154.10
```

using:

```sql
ROUND(payment_value,2)
```

---

## 4. Add ETL Tracking

Every staging table should contain:

```sql
etl_load_timestamp
```

This tells:

```text
When was this staging table generated?
```

Very useful in:

* Production ETL
* Data freshness monitoring
* Incremental loads
* Troubleshooting

---

# Validation Query

Run after creation:

```sql
SELECT *
FROM `detleng-case-studies.cs003_olist_stg.stg_payments`
LIMIT 20;
```

---

# Expected Output Structure

| Column               | Purpose                     |
| -------------------- | --------------------------- |
| order_id             | Order Reference             |
| payment_sequential   | Payment Sequence            |
| payment_type         | Standardized Payment Method |
| payment_installments | Installment Count           |
| payment_value        | Revenue Amount              |
| etl_load_timestamp   | ETL Audit Column            |

---

# Business Value

This single table powers:

### Revenue Analytics

```text
Total Revenue
Revenue by Method
Revenue Trends
```

### Customer Payment Analytics

```text
Credit Card Usage
Boleto Usage
Voucher Usage
```

### Financing Analytics

```text
Installment Behaviour
Average Installments
High Installment Orders
```

### Executive Dashboards

```text
Revenue KPIs
Payment Mix
Cash Flow Monitoring
```

---

# DeTLeng Staging Layer Status

Completed:

```text
✅ stg_customers
✅ stg_payments
```

Remaining:

```text
stg_orders          ⭐ Highest Priority
stg_order_items
stg_products
stg_sellers
stg_reviews
stg_geolocation
stg_category_translation
```

Meri recommendation: ab **stg_orders** banao. Ye poore analytics model ka heart hai aur baad mein fact_orders aur delivery analytics isi se niklenge. 🚀
