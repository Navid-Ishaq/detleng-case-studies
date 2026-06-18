Janab 😄

Seatbelt bandhiye.

**Raw Layer complete ✅**
**Staging Layer complete ✅**
**Analytics Dataset create ho gaya ✅**

Ab hum officially:

```text
🏆 PHASE 5
Analytics Layer (Gold Layer)
```

mein enter kar gaye hain.

Aur Gold Layer ka pehla niwala (first bite 😄) hoga:

```text
dim_customers
```

---

# Analytics Layer Build Order

Ye exact sequence follow karte hain:

```text
cs003_olist_analytics

1. dim_customers
2. dim_products
3. dim_sellers
4. dim_dates
5. dim_geography

6. fact_orders

7. fact_sales

8. fact_payments

9. fact_reviews

10. fact_delivery
```

---

# STEP 1

# dim_customers

Business Goal:

```text
Customer Analytics
Customer Segmentation
Geographic Analytics
Review Analytics
Revenue Analytics
```

---

# Query

Run this:

```sql
CREATE OR REPLACE TABLE
`detleng-case-studies.cs003_olist_analytics.dim_customers`
AS

SELECT

    ROW_NUMBER() OVER(
        ORDER BY customer_id
    ) AS customer_key,

    customer_id,

    customer_unique_id,

    customer_city,

    customer_state,

    etl_load_timestamp

FROM
`detleng-case-studies.cs003_olist_stg.stg_customers`;
```

---

# Validation

```sql
SELECT *
FROM `detleng-case-studies.cs003_olist_analytics.dim_customers`
LIMIT 20;
```

---

# Expected Output

```text
customer_key
customer_id
customer_unique_id
customer_city
customer_state
etl_load_timestamp
```

---

# Why Customer Key?

Raw world:

```text
customer_id
```

Analytics world:

```text
customer_key
```

Reason:

```text
Star Schema

Fact Tables
↓

customer_key

instead of

customer_id
```

Ye BI industry standard hai.

---

# Business Value

Ab har future table:

```text
fact_orders
fact_reviews
fact_payments
```

customer dimension se connect hogi.

---

# After Success

Dataset:

```text
cs003_olist_analytics

✅ dim_customers
```

Phir turant:

```text
🏆 dim_products
```

banayenge.

---

# Gold Layer Progress

```text
Analytics Layer

✅ Dataset Created

⏳ dim_customers
⏳ dim_products
⏳ dim_sellers
⏳ dim_dates
⏳ dim_geography

⏳ fact_orders
⏳ fact_sales
⏳ fact_payments
⏳ fact_reviews
⏳ fact_delivery
```

Run kar dein.

Screenshot bhej dein.

Phir hum **dim_products** banayenge aur Gold Layer ki pehli family ko janam denge. 🚀🏆
