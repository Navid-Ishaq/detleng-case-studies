# 🏆 DeTLeng Analytics Layer Implementation

# dim_sellers

## Building a Business-Ready Seller Dimension for Marketplace Intelligence, Revenue Analysis, Geographic Supply Analytics, and Executive Reporting

---

# Executive Purpose

The Seller Dimension represents the supply-side foundation of the marketplace ecosystem.

While customers generate demand and products represent the marketplace catalog, sellers are the entities responsible for fulfilling demand and generating revenue.

The purpose of `dim_sellers` is to create a trusted, reusable, and analytics-ready seller reference table that supports executive reporting, seller performance analytics, marketplace intelligence, and geographic supply analysis.

This dimension becomes the single source of truth for seller-related reporting throughout the Analytics Layer.

---

# Business Problem

Raw seller data is designed for operational processing rather than analytical consumption.

Without a dedicated Seller Dimension:

* Seller reporting becomes repetitive.
* Geographic seller analysis becomes inconsistent.
* Revenue attribution becomes difficult.
* Marketplace concentration risks become harder to identify.
* Dashboard development becomes more complex.

A dedicated Seller Dimension solves these challenges by centralizing seller information into a reusable analytical entity.

---

# Source Table

```text
cs003_olist_stg.stg_sellers
```

---

# Target Table

```text
cs003_olist_analytics.dim_sellers
```

---

# Analytics Layer Objectives

The Seller Dimension performs several critical analytical functions.

### Seller Master Reference

Creates a centralized seller reference table.

---

### Marketplace Intelligence

Supports:

```text
Seller Performance
Revenue Contribution
Seller Distribution
Marketplace Concentration
Supply Coverage Analysis
```

---

### Geographic Supply Analysis

Provides visibility into:

```text
Seller Cities
Seller States
Regional Seller Coverage
```

---

### Star Schema Enablement

Supports future Fact Tables:

```text
fact_orders
fact_sales
fact_delivery
fact_reviews
```

---

### Surrogate Key Creation

Introduces:

```text
seller_key
```

which becomes the analytical join key throughout the Gold Layer.

---

# Transformation SQL

```sql
CREATE OR REPLACE TABLE
`detleng-case-studies.cs003_olist_analytics.dim_sellers`
AS

SELECT

    ROW_NUMBER() OVER(
        ORDER BY seller_id
    ) AS seller_key,

    seller_id,

    seller_zip_code_prefix,

    seller_city,

    seller_state,

    etl_load_timestamp

FROM
`detleng-case-studies.cs003_olist_stg.stg_sellers`;
```

---

# SQL Transformation Breakdown

## Seller Surrogate Key

```sql
ROW_NUMBER() OVER(
    ORDER BY seller_id
)
```

Creates:

```text
seller_key
```

Example:

| seller_key | seller_id  |
| ---------- | ---------- |
| 1          | seller_abc |
| 2          | seller_xyz |
| 3          | seller_pqr |

This becomes the preferred analytical join key.

---

## Seller Identity Preservation

Business identifiers remain intact:

```text
seller_id
```

allowing complete traceability back to operational systems.

---

## Geographic Intelligence Attributes

Seller location information is preserved:

```text
seller_city
seller_state
seller_zip_code_prefix
```

Supporting:

* Geographic Intelligence
* Supply Distribution Analysis
* Regional Coverage Reporting
* Marketplace Expansion Planning

---

## ETL Auditability

The ETL timestamp remains available:

```text
etl_load_timestamp
```

Supporting:

* Data Lineage
* Data Freshness Monitoring
* ETL Auditing
* Operational Governance

---

# Validation Query

After creating the table:

```sql
SELECT *
FROM `detleng-case-studies.cs003_olist_analytics.dim_sellers`
LIMIT 20;
```

---

# Expected Output Structure

| Column                 | Purpose                 |
| ---------------------- | ----------------------- |
| seller_key             | Analytics Surrogate Key |
| seller_id              | Seller Identifier       |
| seller_zip_code_prefix | Seller ZIP Code         |
| seller_city            | Seller City             |
| seller_state           | Seller State            |
| etl_load_timestamp     | ETL Audit Timestamp     |

---

# Star Schema Relationship

The Seller Dimension connects directly with multiple fact tables.

```text
                 dim_sellers
                       |
                       |
                    seller_key
                       |
                       |
 ------------------------------------------------
 |               |             |                |
fact_orders   fact_sales   fact_reviews   fact_delivery
```

This structure simplifies reporting and improves analytical performance.

---

# Business Value

The Seller Dimension enables organizations to answer strategic questions such as:

### Seller Revenue Analysis

```text
Which sellers generate the highest revenue?
```

---

### Geographic Supply Coverage

```text
Where are sellers located?
```

---

### Marketplace Concentration Risk

```text
Is revenue concentrated among a small number of sellers?
```

---

### Seller Expansion Opportunities

```text
Which regions require additional seller recruitment?
```

---

### Supply-Demand Balance

```text
Do customer-heavy regions have sufficient seller coverage?
```

---

# Future Analytics Usage

The Seller Dimension will directly support:

## Seller Analytics

```text
CS-007 Seller Analytics
```

---

## Revenue Analytics

```text
Revenue by Seller
Revenue Contribution Analysis
```

---

## Geographic Intelligence

```text
Seller Distribution
Regional Supply Coverage
Expansion Opportunity Analysis
```

---

## Delivery Analytics

```text
Seller Delivery Performance
Logistics Efficiency Analysis
```

---

## Executive Dashboards

```text
Top Sellers
Seller Revenue Rankings
Marketplace Supply Overview
```

---

# DeTLeng Engineering Observation

Many organizations focus primarily on customers and revenue while overlooking seller intelligence.

However, sellers directly influence:

* Product availability
* Customer satisfaction
* Delivery performance
* Revenue generation
* Marketplace scalability

A dedicated Seller Dimension ensures that supply-side analytics becomes a first-class citizen within the data warehouse architecture.

---

# DeTLeng Executive Takeaway

The `dim_sellers` table transforms operational seller records into a reusable analytical asset that supports marketplace intelligence, seller performance reporting, geographic supply analysis, and executive decision-making.

This dimension becomes a critical building block for understanding how marketplace supply drives revenue, customer satisfaction, and long-term business growth.

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

⏳ dim_dates
⏳ dim_geography

⏳ fact_orders
⏳ fact_sales
⏳ fact_payments
⏳ fact_reviews
⏳ fact_delivery
```

The Marketplace Dimension Family is now growing.

Next Object:

🏆 dim_dates

which will become the Time Intelligence Engine powering Year, Quarter, Month, Weekday, Seasonal Trends, Growth Analysis, and Executive KPI Reporting across the entire Analytics Layer.
