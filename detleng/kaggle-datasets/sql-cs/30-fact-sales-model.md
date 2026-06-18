# 🏆 DeTLeng Analytics Layer Implementation

# fact_sales

## Building the Central Sales Fact Table for Revenue Analytics, Product Intelligence, Seller Performance, and Executive Reporting

---

# Executive Purpose

The Sales Fact Table represents the commercial engine of the marketplace ecosystem.

Every revenue-generating activity eventually flows through product sales.

Customers purchase products.

Sellers fulfill products.

Revenue is generated from products.

Freight costs are incurred through products.

Categories derive value from product sales.

The purpose of `fact_sales` is to consolidate all sales-related business events into a single analytical structure that supports executive reporting, revenue monitoring, seller intelligence, product analytics, and strategic decision-making.

This table becomes the most commercially valuable object in the Analytics Layer.

---

# Business Problem

Operational sales transactions are distributed across multiple tables.

Examples:

```text
Orders
Order Items
Products
Sellers
```

Without a centralized Sales Fact Table:

* Revenue reporting becomes complex.
* Product analytics become fragmented.
* Seller performance becomes difficult to measure.
* Dashboard logic gets duplicated.
* Executive reporting becomes inconsistent.

A dedicated Sales Fact Table solves these challenges by creating a single source of truth for revenue-generating activities.

---

# Source Tables

```text
cs003_olist_stg.stg_order_items

cs003_olist_analytics.dim_products

cs003_olist_analytics.dim_sellers
```

---

# Target Table

```text
cs003_olist_analytics.fact_sales
```

---

# Analytics Layer Objectives

The Sales Fact Table performs several critical analytical functions.

### Revenue Intelligence

Supports:

```text
Revenue Analysis
Revenue Trends
Revenue by Product
Revenue by Seller
```

---

### Product Intelligence

Supports:

```text
Product Performance
Category Performance
Top Products
Product Portfolio Analysis
```

---

### Seller Intelligence

Supports:

```text
Seller Revenue
Seller Rankings
Marketplace Contribution
```

---

### Freight Intelligence

Supports:

```text
Freight Analysis
Freight Cost Monitoring
Revenue-to-Freight Analysis
```

---

### Executive KPI Reporting

Supports:

```text
Revenue KPIs
Sales KPIs
Commercial Performance
```

---

# Transformation SQL

```sql
CREATE OR REPLACE TABLE
`detleng-case-studies.cs003_olist_analytics.fact_sales`
AS

SELECT

    oi.order_id,

    oi.order_item_id,

    p.product_key,

    s.seller_key,

    oi.price,

    oi.freight_value,

    (oi.price + oi.freight_value)
        AS total_sale_value,

    oi.shipping_limit_date,

    oi.etl_load_timestamp

FROM
`detleng-case-studies.cs003_olist_stg.stg_order_items` oi

LEFT JOIN
`detleng-case-studies.cs003_olist_analytics.dim_products` p
ON oi.product_id = p.product_id

LEFT JOIN
`detleng-case-studies.cs003_olist_analytics.dim_sellers` s
ON oi.seller_id = s.seller_id;
```

---

# SQL Transformation Breakdown

## Product Integration

Links transactions to:

```text
dim_products
```

through:

```text
product_key
```

Supporting:

* Product Analytics
* Category Analytics
* Product Portfolio Reporting

---

## Seller Integration

Links transactions to:

```text
dim_sellers
```

through:

```text
seller_key
```

Supporting:

* Seller Analytics
* Marketplace Intelligence
* Revenue Contribution Analysis

---

## Revenue Measures

Directly includes:

```text
price
```

which represents product revenue.

---

## Freight Measures

Directly includes:

```text
freight_value
```

which represents logistics cost.

---

## Total Commercial Value

Creates:

```sql
(price + freight_value)
```

as:

```text
total_sale_value
```

This represents the full transaction value.

---

## Shipping Intelligence

Preserves:

```text
shipping_limit_date
```

which supports future logistics and fulfillment analysis.

---

## ETL Auditability

Retains:

```text
etl_load_timestamp
```

for lineage, governance, and operational monitoring.

---

# Validation Query

After creating the table:

```sql
SELECT *
FROM `detleng-case-studies.cs003_olist_analytics.fact_sales`
LIMIT 20;
```

---

# Expected Output Structure

| Column              | Purpose                |
| ------------------- | ---------------------- |
| order_id            | Order Identifier       |
| order_item_id       | Line Item Identifier   |
| product_key         | Product Dimension Key  |
| seller_key          | Seller Dimension Key   |
| price               | Product Revenue        |
| freight_value       | Freight Cost           |
| total_sale_value    | Total Commercial Value |
| shipping_limit_date | Shipping Deadline      |
| etl_load_timestamp  | ETL Audit Timestamp    |

---

# Star Schema Relationship

```text
                 dim_products
                       |
                  product_key
                       |
                       |
                  fact_sales
                       |
                  seller_key
                       |
                 dim_sellers
```

This structure connects products, sellers, and revenue into a single analytical model.

---

# Business Value

The Sales Fact Table enables organizations to answer strategic questions such as:

### Revenue Performance

```text
How much revenue is being generated?
```

---

### Product Performance

```text
Which products sell the most?
```

---

### Category Performance

```text
Which categories generate the highest revenue?
```

---

### Seller Performance

```text
Which sellers contribute most to marketplace revenue?
```

---

### Freight Analysis

```text
How much revenue is consumed by logistics costs?
```

---

# Future Analytics Usage

The Sales Fact Table will directly support:

## Product Analytics

```text
CS-006 Product Analytics
```

---

## Seller Analytics

```text
CS-007 Seller Analytics
```

---

## Revenue Analytics

```text
Executive Revenue Reporting
```

---

## Geographic Intelligence

```text
Revenue by Region
Revenue by Seller Geography
```

---

## Executive Dashboards

```text
Sales Dashboard
Revenue Dashboard
Marketplace Performance Dashboard
```

---

# DeTLeng Engineering Observation

Many organizations calculate revenue metrics directly from operational transaction tables.

This often creates:

* Slow dashboards
* Complex joins
* Inconsistent KPIs
* Duplicate calculations

A dedicated Sales Fact Table centralizes commercial logic and creates a scalable foundation for enterprise analytics.

---

# DeTLeng Executive Takeaway

The `fact_sales` table serves as the revenue engine of the Analytics Layer.

By integrating products, sellers, revenue, freight costs, and commercial transactions into a single analytical structure, the organization gains a scalable foundation for sales intelligence, revenue optimization, product analytics, seller performance monitoring, and executive reporting.

This table becomes one of the most valuable assets within the entire CS-003 Data Warehouse architecture.

---

### By Muhammad Naveed

Founder of DeTLeng — Data Engineering, ETL & Analytics Solutions

[www.detleng.com](http://www.detleng.com)

https://insights.detleng.com/

https://casestudy.detleng.com/

---

# 🏆 Analytics Layer Status

```text
✅ dim_customers
✅ dim_products
✅ dim_sellers
✅ dim_dates
✅ dim_geography

✅ fact_orders
✅ fact_sales

⏳ fact_payments
⏳ fact_reviews
⏳ fact_delivery
```

🎯 Revenue Engine Activated

Next Object:

🏆 fact_payments

which will become the Financial Intelligence Layer powering Payment Analytics, Installment Analytics, Revenue Realization Analysis, Cash Flow Monitoring, and Executive Financial Reporting.
