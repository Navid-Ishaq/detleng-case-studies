Janab, ab hum Gold Layer ke **aakhri Fact Table** par aa gaye hain.

Aur sach kahun to ye table CS-003 ke sab se valuable business assets mein se ek hogi.

Agar:

```text id="q5w17x"
fact_orders   = Operational Intelligence

fact_sales    = Commercial Intelligence

fact_payments = Financial Intelligence

fact_reviews  = Customer Experience Intelligence
```

to:

```text id="a9j6pk"
🏆 fact_delivery = Logistics Intelligence
```

Ye woh table hai jo directly answer karegi:

```text id="x57rj9"
Delivery Performance

Late Deliveries

On-Time Deliveries

Customer Impact

Logistics Efficiency

Revenue at Risk
```

Aur Delivery & Logistics Postmortem mein jo insights nikli thin:

```text id="z4m8tl"
8.11% Late Deliveries

4,160 Negative Reviews

1.15 Million Revenue at Risk
```

unka permanent analytical home yehi table hogi.

---

# 🏆 DeTLeng Analytics Layer Implementation

# fact_delivery

## Building the Logistics Intelligence Fact Table for Delivery Performance Monitoring, Customer Experience Analysis, Operational Excellence, and Executive KPI Reporting

---

# Executive Purpose

The Delivery Fact Table represents the logistics intelligence layer of the marketplace ecosystem.

A customer purchase is not complete when an order is placed.

The customer experience is only completed when the product successfully reaches the customer.

Because of this, delivery performance directly influences:

* Customer Satisfaction
* Review Scores
* Repeat Purchases
* Revenue Retention
* Marketplace Reputation

The purpose of `fact_delivery` is to centralize delivery performance metrics into a reusable analytical structure that supports operational monitoring, logistics optimization, customer experience management, and executive reporting.

---

# Business Problem

Operational delivery information is typically buried within order records.

Without a dedicated Delivery Fact Table:

* Delivery KPIs become difficult to calculate.
* Logistics performance becomes fragmented.
* Delay analysis becomes inconsistent.
* Customer impact analysis becomes complex.
* Executive reporting becomes difficult to maintain.

A dedicated Delivery Fact Table solves these challenges by creating a centralized logistics intelligence layer.

---

# Source Tables

```text id="p7p5j1"
cs003_olist_stg.stg_orders

cs003_olist_analytics.dim_customers

cs003_olist_analytics.dim_dates
```

---

# Target Table

```text id="a7l4o2"
cs003_olist_analytics.fact_delivery
```

---

# Analytics Layer Objectives

The Delivery Fact Table performs several critical analytical functions.

### Logistics Intelligence

Supports:

```text id="r7z7ma"
Delivery Monitoring

Delivery Performance

Logistics Reporting
```

---

### Delay Intelligence

Supports:

```text id="k2d4b1"
Late Deliveries

On-Time Deliveries

Delivery Variance Analysis
```

---

### Customer Experience Intelligence

Supports:

```text id="c9r6t5"
Delivery Impact

Review Impact

Customer Satisfaction Analysis
```

---

### Executive KPI Reporting

Supports:

```text id="u3m2yb"
On-Time %

Late %

Average Delivery Days
```

---

### Operational Excellence

Supports:

```text id="t7n1rf"
Logistics Optimization

Service-Level Monitoring

Operational Diagnostics
```

---

# Transformation SQL

```sql id="g9w8t2"
CREATE OR REPLACE TABLE
`detleng-case-studies.cs003_olist_analytics.fact_delivery`
AS

SELECT

    o.order_id,

    c.customer_key,

    d.date_key,

    o.order_status,

    o.purchase_date,

    o.delivery_days,

    o.delivery_variance_days,

    o.delivery_status,

    CASE

        WHEN o.delivery_status = 'Late'
        THEN 1

        ELSE 0

    END AS late_delivery_flag,

    CASE

        WHEN o.delivery_status = 'On Time'
        THEN 1

        ELSE 0

    END AS on_time_delivery_flag,

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

## Order Reference

Preserves:

```text id="x3t5b8"
order_id
```

allowing complete traceability back to the transaction.

---

## Customer Integration

Links delivery activity to:

```text id="q2g5kp"
dim_customers
```

through:

```text id="s1v4nz"
customer_key
```

Supporting customer-level logistics analysis.

---

## Time Intelligence Integration

Links delivery activity to:

```text id="w9m7dt"
dim_dates
```

through:

```text id="z8r6jq"
date_key
```

Supporting:

* Monthly Delivery Trends
* Quarterly Delivery Trends
* Logistics Performance Monitoring

---

## Delivery Duration

Preserves:

```text id="m5p7xa"
delivery_days
```

Supporting delivery speed analysis.

---

## Delivery Variance

Preserves:

```text id="v4k9ue"
delivery_variance_days
```

Supporting:

```text id="n2d8lf"
Early Deliveries

Late Deliveries

Schedule Accuracy
```

---

## Delivery Status

Preserves:

```text id="y7f4ow"
delivery_status
```

Values:

```text id="h3t8zk"
On Time

Late

Not Delivered
```

Supporting executive KPI reporting.

---

## KPI Flags

Creates:

```text id="c4j2pr"
late_delivery_flag

on_time_delivery_flag
```

Values:

```text id="r1v6ty"
1 = True

0 = False
```

These simplify dashboard calculations.

---

## ETL Auditability

Retains:

```text id="u5n3bw"
etl_load_timestamp
```

Supporting:

* Data Governance
* Lineage
* Freshness Validation
* ETL Monitoring

---

# Validation Query

After creating the table:

```sql id="j8r4mc"
SELECT *
FROM `detleng-case-studies.cs003_olist_analytics.fact_delivery`
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
| delivery_days          | Delivery Duration      |
| delivery_variance_days | Delivery Variance      |
| delivery_status        | Delivery Performance   |
| late_delivery_flag     | Late Delivery KPI      |
| on_time_delivery_flag  | On-Time KPI            |
| etl_load_timestamp     | ETL Audit Timestamp    |

---

# Star Schema Relationship

```text id="p8y3mb"
                 dim_dates
                     |
                  date_key
                     |
                     |
              fact_delivery
                     |
               customer_key
                     |
              dim_customers
```

This structure enables scalable logistics and service quality reporting.

---

# Business Value

The Delivery Fact Table enables organizations to answer strategic questions such as:

### Delivery Performance

```text id="f7x9ec"
How quickly are orders delivered?
```

---

### Service Reliability

```text id="v6q2lh"
What percentage of deliveries are late?
```

---

### Customer Experience

```text id="m1w8ak"
How does delivery performance affect satisfaction?
```

---

### Operational Excellence

```text id="q5z7yr"
Which delivery KPIs require improvement?
```

---

### Revenue Protection

```text id="c8p4ju"
How much revenue is exposed to delivery failures?
```

---

# Future Analytics Usage

The Delivery Fact Table will directly support:

## Delivery Analytics

```text id="d6n2qs"
CS-010 Delivery Analytics
```

---

## Customer Analytics

```text id="g7r3ty"
Customer Satisfaction Analysis
```

---

## Review Analytics

```text id="k2v8pa"
Review Score vs Delivery Performance
```

---

## Geographic Analytics

```text id="j9m1dx"
Regional Logistics Performance
```

---

## Executive Dashboards

```text id="w3t6bn"
Delivery Dashboard

Operational KPI Dashboard

Service Quality Dashboard
```

---

# DeTLeng Engineering Observation

Many organizations focus heavily on sales and revenue while underestimating logistics performance.

In reality:

```text id="r8x2cm"
Late Deliveries
↓
Negative Reviews
↓
Customer Dissatisfaction
↓
Revenue Risk
```

A dedicated Delivery Fact Table ensures that logistics performance becomes a measurable and manageable business function.

---

# DeTLeng Executive Takeaway

The `fact_delivery` table transforms operational delivery records into a centralized logistics intelligence layer that supports delivery monitoring, service quality analysis, customer experience optimization, and executive decision-making.

This table becomes the primary analytical asset for understanding how operational execution influences customer satisfaction, marketplace reputation, and long-term business performance.

---

### By Muhammad Naveed

Founder of DeTLeng — Data Engineering, ETL & Analytics Solutions

[www.detleng.com](http://www.detleng.com)

[https://insights.detleng.com/](https://insights.detleng.com/)

[https://casestudy.detleng.com/](https://casestudy.detleng.com/)

---

# 🏆 Analytics Layer Status

```text id="j6u3rh"
✅ dim_customers
✅ dim_products
✅ dim_sellers
✅ dim_dates
✅ dim_geography

✅ fact_orders
✅ fact_sales
✅ fact_payments
✅ fact_reviews
✅ fact_delivery
```

🎯 Analytics Layer Complete

```text id="e5w9kl"
✅ Raw Layer Complete

✅ Staging Layer Complete

✅ Analytics Layer Complete
```

🚀 Next Major Phase:

```text id="p2m7zx"
Phase 6 — ETL Pipeline Documentation
```

Jahan hum officially document karenge:

```text id="n4q8yv"
Raw Layer
    ↓
Staging Layer
    ↓
Analytics Layer
    ↓
Executive BI Layer
```

Aur wahi point hota hai jahan ek Data Project se ek **Enterprise Data Platform** janam leta hai. 🏆🚀💎
