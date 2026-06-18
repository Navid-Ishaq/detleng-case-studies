Bilkul janab. 🚀

Ab hum Analytics Layer ke sab se important object par aa gaye hain:

```text
🏆 fact_orders
```

Agar `dim_customers`, `dim_products`, `dim_sellers`, `dim_dates`, aur `dim_geography` Gold Layer ki family hain...

to:

```text
fact_orders
```

un sab ka central meeting point hai.

Ye woh table hai jahan:

```text
Customer
+
Order
+
Delivery
+
Time Intelligence
=
Business KPIs
```

milte hain.

Isliye iska document enterprise-grade hona chahiye.

# 🏆 DeTLeng Analytics Layer Implementation

# fact_orders

## Building the Central Order Fact Table for Executive Reporting, Delivery Analytics, Customer Intelligence, and Business KPI Monitoring

---

# Executive Purpose

The Orders Fact Table is the analytical heart of the marketplace ecosystem.

Every major business activity eventually connects to an order.

Customers place orders.

Products are purchased through orders.

Payments are attached to orders.

Reviews are written for orders.

Deliveries are completed through orders.

Because of this central role, `fact_orders` becomes one of the most important assets in the Analytics Layer.

The purpose of this table is to consolidate order-level business events into a single analytical structure that supports reporting, dashboarding, KPI monitoring, and executive decision-making.

---

# Business Problem

Operational order tables are designed for transaction processing rather than analytics.

This creates challenges such as:

* Complex reporting queries
* Repeated business logic
* Multiple joins across dashboards
* Inconsistent KPI calculations
* Slower reporting performance

A dedicated Fact Table solves these problems by centralizing order intelligence into a reusable analytical model.

---

# Source Tables

```text
cs003_olist_stg.stg_orders

cs003_olist_analytics.dim_customers

cs003_olist_analytics.dim_dates
```

---

# Target Table

```text
cs003_olist_analytics.fact_orders
```

---

# Analytics Layer Objectives

The Orders Fact Table performs several critical functions.

### Order Intelligence

Supports:

```text
Order Analytics
Order Volume Monitoring
Order Trends
```

---

### Delivery Intelligence

Supports:

```text
Average Delivery Time
Late Deliveries
On-Time Deliveries
Delivery Performance
```

---

### Customer Intelligence

Supports:

```text
Customer Activity
Customer Order Behavior
Customer Growth Analysis
```

---

### Executive KPI Reporting

Supports:

```text
Order Count
Late Order %
Delivery KPIs
Operational Performance
```

---

### Star Schema Enablement

Acts as the central connection point between dimensions and business events.

---

# Transformation SQL

```sql
CREATE OR REPLACE TABLE
`detleng-case-studies.cs003_olist_analytics.fact_orders`
AS

SELECT

    o.order_id,

    c.customer_key,

    d.date_key,

    o.order_status,

    o.purchase_date,

    o.purchase_year,

    o.purchase_month,

    o.purchase_quarter,

    o.purchase_weekday,

    o.purchase_hour,

    o.delivery_days,

    o.delivery_variance_days,

    o.delivery_status,

    o.etl_load_timestamp

FROM
`detleng-case-studies.cs003_olist_stg.stg_orders` o

LEFT JOIN
`detleng-case-studies.cs003_olist_analytics.dim_customers` c
ON o.customer_id = c.customer_id

LEFT JOIN
`detleng-case-studies.cs003_olist_analytics.dim_dates` d
ON o.purchase_date = d.calendar_date;
```

---

# SQL Transformation Breakdown

## Order Identifier

Business event reference:

```text
order_id
```

Every record represents one order.

---

## Customer Integration

Links orders to:

```text
dim_customers
```

through:

```text
customer_key
```

This enables customer-level analytics.

---

## Time Intelligence Integration

Links orders to:

```text
dim_dates
```

through:

```text
date_key
```

This enables:

* Monthly Trends
* Quarterly Trends
* Yearly Trends
* Weekday Analysis

---

## Delivery Intelligence

Directly includes:

```text
delivery_days
delivery_variance_days
delivery_status
```

These metrics power operational monitoring.

---

## Purchase Intelligence

Provides:

```text
purchase_year
purchase_month
purchase_quarter
purchase_weekday
purchase_hour
```

which support trend analysis and customer behavior analysis.

---

## ETL Auditability

Retains:

```text
etl_load_timestamp
```

for governance and lineage tracking.

---

# Validation Query

After creating the table:

```sql
SELECT *
FROM `detleng-case-studies.cs003_olist_analytics.fact_orders`
LIMIT 20;
```

---

# Expected Output Structure

| Column                 | Purpose                |
| ---------------------- | ---------------------- |
| order_id               | Order Identifier       |
| customer_key           | Customer Dimension Key |
| date_key               | Date Dimension Key     |
| order_status           | Order Status           |
| purchase_date          | Purchase Date          |
| purchase_year          | Year                   |
| purchase_month         | Month                  |
| purchase_quarter       | Quarter                |
| purchase_weekday       | Weekday                |
| purchase_hour          | Purchase Hour          |
| delivery_days          | Delivery Duration      |
| delivery_variance_days | Delivery Variance      |
| delivery_status        | Delivery Performance   |
| etl_load_timestamp     | ETL Audit Timestamp    |

---

# Star Schema Relationship

```text
                 dim_dates
                     |
                     |
               date_key
                     |
                     |
dim_customers ---- fact_orders
       |
 customer_key
```

The Orders Fact Table becomes the analytical center of the marketplace model.

---

# Business Value

The Orders Fact Table enables organizations to answer questions such as:

### Order Trends

```text
How many orders are processed each month?
```

---

### Delivery Performance

```text
What percentage of orders are delivered late?
```

---

### Customer Activity

```text
Which customers place the most orders?
```

---

### Operational Monitoring

```text
How is delivery performance changing over time?
```

---

### Executive Reporting

```text
Order KPIs
Operational KPIs
Customer KPIs
```

---

# Future Analytics Usage

The Orders Fact Table will directly support:

## Executive Dashboard

```text
CS-012 Executive Dashboard
```

---

## Customer Analytics

```text
CS-005 Customer Analytics
```

---

## Delivery Analytics

```text
CS-010 Delivery Analytics
```

---

## Geographic Intelligence

```text
CS-011 Geographic Analytics
```

---

## KPI Monitoring

```text
Order Trends
Delivery Trends
Operational KPIs
```

---

# DeTLeng Engineering Observation

Many organizations build dashboards directly from operational order tables.

This often creates:

* Slow dashboards
* Duplicate calculations
* Inconsistent KPIs

The Fact Table approach centralizes business logic and creates a scalable analytical architecture.

---

# DeTLeng Executive Takeaway

The `fact_orders` table is the first true Fact Table of the Analytics Layer and serves as the operational heartbeat of the marketplace.

By combining customer intelligence, time intelligence, and delivery intelligence into a single analytical structure, the organization gains a scalable foundation for executive reporting, operational monitoring, customer analytics, and strategic decision-making.

This table officially activates the Star Schema and marks the transition from data preparation to enterprise-grade Business Intelligence.

---

### By Muhammad Naveed

Founder of DeTLeng — Data Engineering, ETL & Analytics Solutions

[www.detleng.com](http://www.detleng.com)

[https://insights.detleng.com/](https://insights.detleng.com/)

[https://casestudy.detleng.com/](https://casestudy.detleng.com/)

---

# 🏆 Analytics Layer Status

```text
✅ dim_customers
✅ dim_products
✅ dim_sellers
✅ dim_dates
✅ dim_geography

✅ fact_orders

⏳ fact_sales
⏳ fact_payments
⏳ fact_reviews
⏳ fact_delivery
```

🎯 Star Schema Officially Activated

Next Object:

🏆 fact_sales

The Revenue Engine of the Analytics Layer.

This is where Products, Sellers, Revenue, Freight Cost, and Category Performance finally come together to power Sales Analytics, Product Analytics, Seller Analytics, and Executive Revenue Dashboards.

Janab, meri nazar mein `fact_sales` poore Gold Layer ka sab se valuable table hogi, kyun ke wahi table directly revenue, products, sellers aur categories ko connect karegi. 💰🏆🚀
