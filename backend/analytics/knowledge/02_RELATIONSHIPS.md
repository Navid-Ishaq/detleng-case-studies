# RELATIONSHIPS.md

# DeTLeng Analytics Data Model

Dataset

cs003_olist_analytics

Version

1.0

This document defines the ONLY valid relationships inside the analytics layer.

These relationships are mandatory.

Never invent relationships.

Never invent columns.

Never generate SQL using guessed joins.

------------------------------------------------------------

# Analytics Architecture

The analytics layer follows a Star Schema.

Dimension tables provide descriptive business attributes.

Fact tables store measurable business events.

Every SQL query must use these documented relationships only.

------------------------------------------------------------

# Primary Keys

## dim_customers

Primary Key

customer_key

Business Identifier

customer_id

------------------------------------------------------------

## dim_products

Primary Key

product_key

Business Identifier

product_id

------------------------------------------------------------

## dim_sellers

Primary Key

seller_key

Business Identifier

seller_id

------------------------------------------------------------

## dim_dates

Primary Key

date_key

------------------------------------------------------------

## dim_geography

Primary Key

geography_key

------------------------------------------------------------

# Fact Table Relationships

============================================================

fact_orders

JOIN

customer_key

→ dim_customers.customer_key

JOIN

date_key

→ dim_dates.date_key

Business Key

order_id

============================================================

fact_delivery

JOIN

customer_key

→ dim_customers.customer_key

JOIN

date_key

→ dim_dates.date_key

Business Key

order_id

============================================================

fact_sales

JOIN

product_key

→ dim_products.product_key

JOIN

seller_key

→ dim_sellers.seller_key

Business Key

order_id

============================================================

fact_payments

JOIN

date_key

→ dim_dates.date_key

Business Key

order_id

============================================================

fact_reviews

JOIN

date_key

→ dim_dates.date_key

Business Key

order_id

============================================================

# Geography

Current analytics layer does NOT contain geography_key inside fact tables.

Geography is descriptive only.

Do NOT join geography directly with facts unless an explicit mapping exists.

------------------------------------------------------------

# Approved Join Keys

customer_key

product_key

seller_key

date_key

order_id

Only these keys may be used.

------------------------------------------------------------

# Forbidden Keys

Never generate SQL using

customer_id

product_id

seller_id

order_key

customer_fk

product_fk

seller_fk

date_id

customer_sk

product_sk

seller_sk

unless they actually exist in the schema.

------------------------------------------------------------

# Business Rules

Revenue

fact_sales.total_sale_value

Orders

fact_orders

Payments

fact_payments.payment_value

Reviews

fact_reviews.review_score

Delivery

fact_delivery.delivery_days

Customers

dim_customers

Products

dim_products

Sellers

dim_sellers

Dates

dim_dates

Geography

dim_geography

------------------------------------------------------------

# SQL Validation Rules

Before generating SQL the AI MUST verify

✓ table exists

✓ column exists

✓ join key exists

✓ aggregation is valid

✓ GROUP BY is valid

✓ requested KPI belongs to the correct fact table

✓ no invented columns

✓ no invented joins

------------------------------------------------------------

# Golden Rule

Schema is the source of truth.

Relationships are the source of truth.

The AI must NEVER guess joins.

The AI must NEVER invent keys.

Accuracy is always more important than creativity.