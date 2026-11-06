# TABLE_GRAIN.md

# DeTLeng Analytics Dataset

Dataset

cs003_olist_analytics

---

# Dimension Tables

## dim_customers

Grain

One row = One Customer

Primary Business Key

customer_key

Natural Key

customer_id

---

## dim_products

Grain

One row = One Product

Primary Business Key

product_key

Natural Key

product_id

---

## dim_sellers

Grain

One row = One Seller

Primary Business Key

seller_key

Natural Key

seller_id

---

## dim_dates

Grain

One row = One Calendar Date

Primary Business Key

date_key

---

## dim_geography

Grain

One row = One Geographic Location

Primary Business Key

geography_key

---

# Fact Tables

## fact_orders

Grain

One row = One Order

Business Key

order_id

Contains

- customer
- purchase date
- order status
- delivery information

---

## fact_sales

Grain

One row = One Order Item

Business Key

(order_id, order_item_id)

Contains

- product
- seller
- item price
- freight
- sale value

Important

A single order may contain multiple rows.

Never count orders directly from this table.

Use COUNT(DISTINCT order_id) when calculating orders.

---

## fact_payments

Grain

One row = One Payment Transaction

Business Key

(order_id, payment_sequential)

Important

One order can have multiple payments.

Never count customers from this table.

---

## fact_reviews

Grain

One row = One Review

Business Key

review_id

Important

Join using order_id.

---

## fact_delivery

Grain

One row = One Order Delivery

Business Key

order_id

Contains

- delivery days
- delivery variance
- delivery status

---

# SQL Rules

Revenue

Always calculate from

fact_sales.total_sale_value

---

Orders

Always calculate from

fact_orders

Never from fact_sales.

---

Customers

Always calculate from

dim_customers

or

COUNT(DISTINCT customer_key)

Never count rows from fact_sales.

---

Products

Always calculate from

dim_products

---

Sellers

Always calculate from

dim_sellers

---

Payments

Always calculate from

fact_payments

---

Reviews

Always calculate from

fact_reviews

---

Delivery

Always calculate from

fact_delivery