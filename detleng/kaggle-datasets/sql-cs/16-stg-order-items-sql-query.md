Janab, bohat khoob. Ab aap ke paas **core business tables ka aadha staging layer** tayar ho chuka hai:

```text
✅ stg_customers
✅ stg_orders
✅ stg_payments
```

Ab baqi tables ko logical order mein complete karte hain.

# Priority Order

```text
1. stg_order_items      ⭐⭐⭐⭐⭐
2. stg_products         ⭐⭐⭐⭐
3. stg_sellers          ⭐⭐⭐⭐
4. stg_reviews          ⭐⭐⭐⭐
5. stg_geolocation      ⭐⭐⭐
6. stg_category_translation ⭐⭐
```

---

# 1. stg_order_items

## Business Purpose

Ye poore marketplace ka transaction engine hai.

Yahan se milta hai:

```text
Revenue
Freight Cost
Products Sold
Seller Performance
Category Analytics
```

## Query

```sql
CREATE OR REPLACE TABLE
`detleng-case-studies.cs003_olist_stg.stg_order_items`
AS

SELECT

    order_id,

    order_item_id,

    product_id,

    seller_id,

    DATE(shipping_limit_date)
        AS shipping_limit_date,

    ROUND(IFNULL(price,0),2)
        AS price,

    ROUND(IFNULL(freight_value,0),2)
        AS freight_value,

    CURRENT_TIMESTAMP()
        AS etl_load_timestamp

FROM
`detleng-case-studies.cs003_olist_raw.cs003_olist_raw_order_items`;
```

### What It Does

✅ Standardizes dates

✅ Revenue cleanup

✅ Freight cleanup

✅ Adds ETL tracking

---

# 2. stg_products

## Business Purpose

Product catalog cleaning.

Yahan se milta hai:

```text
Category Analysis
Product Portfolio Analysis
SKU Intelligence
```

## Query

```sql
CREATE OR REPLACE TABLE
`detleng-case-studies.cs003_olist_stg.stg_products`
AS

SELECT

    product_id,

    UPPER(TRIM(product_category_name))
        AS product_category_name,

    IFNULL(product_name_lenght,0)
        AS product_name_length,

    IFNULL(product_description_lenght,0)
        AS product_description_length,

    IFNULL(product_photos_qty,0)
        AS product_photos_qty,

    IFNULL(product_weight_g,0)
        AS product_weight_g,

    IFNULL(product_length_cm,0)
        AS product_length_cm,

    IFNULL(product_height_cm,0)
        AS product_height_cm,

    IFNULL(product_width_cm,0)
        AS product_width_cm,

    CURRENT_TIMESTAMP()
        AS etl_load_timestamp

FROM
`detleng-case-studies.cs003_olist_raw.cs003_olist_raw_products`;
```

### What It Does

✅ Cleans category names

✅ Removes null product attributes

✅ Standardizes catalog structure

---

# 3. stg_sellers

## Business Purpose

Supply-side intelligence.

Used in:

```text
Seller Analytics
Geographic Intelligence
Delivery Analytics
Revenue Analysis
```

## Query

```sql
CREATE OR REPLACE TABLE
`detleng-case-studies.cs003_olist_stg.stg_sellers`
AS

SELECT

    seller_id,

    seller_zip_code_prefix,

    UPPER(TRIM(seller_city))
        AS seller_city,

    UPPER(TRIM(seller_state))
        AS seller_state,

    CURRENT_TIMESTAMP()
        AS etl_load_timestamp

FROM
`detleng-case-studies.cs003_olist_raw.cs003_olist_raw_sellers`;
```

### What It Does

✅ Standardizes seller cities

✅ Standardizes seller states

✅ Adds ETL auditing

---

# 4. stg_reviews

## Business Purpose

Customer Voice Layer.

Used in:

```text
Customer Satisfaction
NPS-like Analysis
Service Quality
Delivery Impact Studies
```

## Query

```sql
CREATE OR REPLACE TABLE
`detleng-case-studies.cs003_olist_stg.stg_reviews`
AS

SELECT

    review_id,

    order_id,

    review_score,

    TRIM(review_comment_title)
        AS review_comment_title,

    TRIM(review_comment_message)
        AS review_comment_message,

    DATE(review_creation_date)
        AS review_creation_date,

    TIMESTAMP(review_answer_timestamp)
        AS review_answer_timestamp,

    CURRENT_TIMESTAMP()
        AS etl_load_timestamp

FROM
`detleng-case-studies.cs003_olist_raw.cs003_olist_raw_reviews`;
```

### What It Does

✅ Cleans comments

✅ Standardizes review dates

✅ Preserves review history

---

# 5. stg_geolocation

## Business Purpose

Location intelligence foundation.

Used in:

```text
Maps
Geo Analytics
Regional Expansion
Distance Analysis
```

## Query

```sql
CREATE OR REPLACE TABLE
`detleng-case-studies.cs003_olist_stg.stg_geolocation`
AS

SELECT

    geolocation_zip_code_prefix,

    UPPER(TRIM(geolocation_city))
        AS geolocation_city,

    UPPER(TRIM(geolocation_state))
        AS geolocation_state,

    ROUND(geolocation_lat,6)
        AS geolocation_lat,

    ROUND(geolocation_lng,6)
        AS geolocation_lng,

    CURRENT_TIMESTAMP()
        AS etl_load_timestamp

FROM
`detleng-case-studies.cs003_olist_raw.cs003_olist_raw_geolocation`;
```

### What It Does

✅ Standardizes cities

✅ Standardizes states

✅ Normalizes coordinates

---

# 6. stg_category_translation

## Business Purpose

Brazilian → English category mapping.

Used in:

```text
Dashboard Labels
Business Reporting
Executive Presentations
```

## Query

```sql
CREATE OR REPLACE TABLE
`detleng-case-studies.cs003_olist_stg.stg_category_translation`
AS

SELECT

    UPPER(TRIM(product_category_name))
        AS product_category_name,

    INITCAP(TRIM(product_category_name_english))
        AS product_category_name_english,

    CURRENT_TIMESTAMP()
        AS etl_load_timestamp

FROM
`detleng-case-studies.cs003_olist_raw.cs003_olist_raw_category_translation`;
```

### What It Does

✅ Standardizes Portuguese categories

✅ Cleans English translations

✅ Makes dashboards business-friendly

---

# Expected Result

After running these six queries:

```text
cs003_olist_stg

✅ stg_customers
✅ stg_orders
✅ stg_payments
✅ stg_order_items
✅ stg_products
✅ stg_sellers
✅ stg_reviews
✅ stg_geolocation
✅ stg_category_translation
```

Aur phir janab...

```text
🎯 Raw Layer Complete
🎯 Staging Layer Complete
```

Aur hum officially enter karenge:

```text
🏆 Analytics Layer (Gold Layer)

fact_orders
fact_sales
dim_customers
dim_products
dim_sellers
dim_dates
```

Ye woh stage hai jahan Data Engineering se Business Intelligence ka asli sona nikalna shuru hota hai. 🚀
