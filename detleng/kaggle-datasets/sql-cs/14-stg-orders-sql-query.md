# DeTLeng Staging Layer Implementation

# stg_orders

## Transforming Raw Order Transactions into Enterprise-Ready Order Intelligence

---

# Executive Overview

The Orders table is the operational backbone of the Olist marketplace ecosystem.

Every major business activity eventually connects to an order:

* Customers place orders
* Sellers fulfill orders
* Payments monetize orders
* Reviews evaluate orders
* Logistics delivers orders

Because of this central role, the Orders table becomes one of the most important datasets within the entire analytical architecture.

The purpose of the staging layer is not simply to copy raw order records.

Instead, the objective is to transform operational order events into analytics-ready business intelligence assets capable of supporting executive reporting, operational monitoring, customer analytics, delivery intelligence, and enterprise dashboards.

---

# Business Problem Statement

Raw order datasets are optimized for operational systems.

They are not optimized for analytics.

Common challenges include:

* Complex timestamps
* Missing business-friendly dates
* No delivery KPIs
* No delay indicators
* No time intelligence
* No delivery performance classification

Without transformation, business users cannot easily answer questions such as:

* Which month generated the highest order volume?
* Which weekday drives the most sales?
* What percentage of orders are delivered on time?
* How many orders were delivered late?
* What is the average delivery duration?

The staging layer solves these challenges by converting operational events into business-ready intelligence.

---

# Why Orders Matter

Within every marketplace:

```text
Customers
    ↓
Orders
    ↓
Payments
    ↓
Revenue
```

And:

```text
Orders
    ↓
Logistics
    ↓
Delivery Performance
    ↓
Customer Reviews
```

Orders sit at the center of the commercial ecosystem.

Every major KPI ultimately traces back to the Orders table.

---

# Source Table

```text
cs003_olist_raw_orders
```

---

# Target Table

```text
cs003_olist_stg.stg_orders
```

---

# Data Engineering Objectives

The staging process performs several critical transformations.

---

## 1. Time Intelligence Generation

Create business-friendly calendar attributes.

### Generated Fields

```text
purchase_date
purchase_year
purchase_month
purchase_quarter
purchase_weekday
purchase_hour
```

### Business Value

Supports:

* Monthly reporting
* Quarterly reporting
* Seasonal trend analysis
* Weekday analysis
* Executive dashboards

---

## 2. Delivery Intelligence

Generate actual delivery duration.

### Generated Field

```text
delivery_days
```

### Business Value

Supports:

* Logistics reporting
* Delivery KPIs
* Service performance monitoring

---

## 3. Delay Analysis

Calculate delivery variance.

### Generated Field

```text
delivery_variance_days
```

Formula:

```text
Actual Delivery Date
-
Estimated Delivery Date
```

### Business Value

Supports:

* Delay tracking
* SLA monitoring
* Logistics optimization

---

## 4. Delivery Status Classification

Convert raw timestamps into business-friendly delivery categories.

### Generated Values

```text
On Time
Late
Not Delivered
```

### Business Value

Allows executives to instantly understand delivery performance without analyzing timestamps.

---

## 5. ETL Auditability

Generate ETL timestamp.

### Business Value

Provides:

* Data lineage
* Data freshness visibility
* ETL troubleshooting capability
* Governance support

---

# Transformation SQL

```sql
CREATE OR REPLACE TABLE
`detleng-case-studies.cs003_olist_stg.stg_orders`
AS

SELECT

    order_id,

    customer_id,

    order_status,

    order_purchase_timestamp,

    DATE(order_purchase_timestamp)
        AS purchase_date,

    EXTRACT(YEAR FROM order_purchase_timestamp)
        AS purchase_year,

    EXTRACT(MONTH FROM order_purchase_timestamp)
        AS purchase_month,

    EXTRACT(QUARTER FROM order_purchase_timestamp)
        AS purchase_quarter,

    FORMAT_DATE(
        '%A',
        DATE(order_purchase_timestamp)
    ) AS purchase_weekday,

    EXTRACT(HOUR FROM order_purchase_timestamp)
        AS purchase_hour,

    order_approved_at,

    order_delivered_carrier_date,

    order_delivered_customer_date,

    order_estimated_delivery_date,

    TIMESTAMP_DIFF(
        order_delivered_customer_date,
        order_purchase_timestamp,
        DAY
    ) AS delivery_days,

    TIMESTAMP_DIFF(
        order_delivered_customer_date,
        order_estimated_delivery_date,
        DAY
    ) AS delivery_variance_days,

    CASE

        WHEN order_delivered_customer_date IS NULL
        THEN 'Not Delivered'

        WHEN order_delivered_customer_date
             <= order_estimated_delivery_date
        THEN 'On Time'

        ELSE 'Late'

    END AS delivery_status,

    CURRENT_TIMESTAMP()
        AS etl_load_timestamp

FROM
`detleng-case-studies.cs003_olist_raw.cs003_olist_raw_orders`;
```

---

# Validation Query

```sql
SELECT *
FROM `detleng-case-studies.cs003_olist_stg.stg_orders`
LIMIT 20;
```

---

# Expected Output Structure

| Column                 | Business Purpose                  |
| ---------------------- | --------------------------------- |
| order_id               | Order Business Key                |
| customer_id            | Customer Reference                |
| order_status           | Operational Status                |
| purchase_date          | Reporting Date                    |
| purchase_year          | Year Analysis                     |
| purchase_month         | Monthly Analysis                  |
| purchase_quarter       | Quarterly Analysis                |
| purchase_weekday       | Weekday Analysis                  |
| purchase_hour          | Hourly Trends                     |
| delivery_days          | Logistics KPI                     |
| delivery_variance_days | Delay KPI                         |
| delivery_status        | Executive Delivery Classification |
| etl_load_timestamp     | ETL Governance                    |

---

# Data Quality Risks Addressed

### Risk 1

Complex Timestamp Analysis

Impact:

```text
Difficult Executive Reporting
```

---

### Risk 2

No Delivery KPI Visibility

Impact:

```text
Hidden Logistics Problems
```

---

### Risk 3

No Delay Classification

Impact:

```text
Poor Operational Monitoring
```

---

### Risk 4

No Time Intelligence

Impact:

```text
Limited Trend Analysis
```

---

# Business Intelligence Opportunities

This table directly powers:

## Order Analytics

```text
Orders by Month
Orders by Quarter
Orders by Weekday
Orders by Hour
```

---

## Delivery Analytics

```text
Average Delivery Days
Late Deliveries
On-Time Deliveries
Delivery Performance Trends
```

---

## Logistics Intelligence

```text
Delivery Variance
Regional Delivery Performance
Operational Efficiency Monitoring
```

---

## Executive Dashboards

```text
Order KPIs
Delivery KPIs
Operational KPIs
Customer Service KPIs
```

---

# Analytics Layer Mapping

This staging table becomes the foundation of:

```text
fact_orders
```

and connects directly with:

```text
dim_customers
dim_products
dim_sellers
dim_dates
fact_payments
fact_reviews
```

---

# Enterprise Data Model Relationship

```text
dim_customers
       |
       |
   fact_orders
       |
 -------------------
 |                 |
fact_payments   fact_reviews
```

This makes `stg_orders` one of the most important assets within the analytics architecture.

---

# Staging Success Criteria

The staging implementation is successful when:

✅ Time intelligence is generated

✅ Delivery KPIs are available

✅ Delay analysis is enabled

✅ Delivery status is classified

✅ ETL timestamps are created

✅ Analytics-ready structure is achieved

---

# DeTLeng Engineering Observation

Many organizations store order data successfully but fail to transform it into business intelligence.

Raw timestamps provide operational visibility.

Transformed order intelligence provides strategic visibility.

The difference between operational reporting and executive intelligence often begins with the staging layer.

---

# DeTLeng Executive Takeaway

The `stg_orders` table transforms raw operational order records into a comprehensive order intelligence foundation.

By generating delivery KPIs, time intelligence attributes, delay metrics, and business-friendly classifications, this staging table becomes the central component of the future analytics ecosystem.

Within the CS-003 architecture, `stg_orders` serves as the foundation for Delivery Analytics, Revenue Analytics, Customer Intelligence, Operational Monitoring, and Executive Dashboard development.

---

# DeTLeng Staging Layer Status

```text
✅ stg_customers
✅ stg_orders
✅ stg_payments

⏳ stg_order_items
⏳ stg_products
⏳ stg_sellers
⏳ stg_reviews
⏳ stg_geolocation
⏳ stg_category_translation
```

---

### By Muhammad Naveed

Founder of DeTLeng — Data Engineering, ETL & Analytics Solutions

[www.detleng.com](http://www.detleng.com)

https://insights.detleng.com/

https://casestudy.detleng.com/
