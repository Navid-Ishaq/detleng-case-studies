# DeTLeng Staging Layer Implementation

# stg_customers

## Transforming Raw Customer Records into Enterprise-Ready Customer Intelligence

---

# Executive Overview

The Customers table represents the demand side of the marketplace ecosystem.

Every order begins with a customer.

Every payment originates from a customer.

Every review is submitted by a customer.

Because of this central role, customer data becomes one of the most valuable assets within the analytical architecture.

The purpose of the staging layer is not simply to copy customer records.

Instead, the objective is to standardize, cleanse, govern, and prepare customer information for future analytics, reporting, geographic intelligence, customer segmentation, and executive dashboards.

This staging table will later support:

* Customer Analytics
* Geographic Intelligence
* Revenue Analysis
* Customer Segmentation
* Market Expansion Studies
* Executive Reporting

---

# Business Problem Statement

Raw customer datasets often contain:

* Inconsistent city names
* Mixed capitalization
* Leading and trailing spaces
* Duplicate location formatting
* Reporting inconsistencies

Examples:

Raw:

```text
sao paulo
 Sao Paulo
SAO PAULO
```

These values represent the same city but appear as different values in reports.

Without proper standardization:

* Customer counts become inaccurate
* Geographic analysis becomes unreliable
* Dashboards become inconsistent
* Market expansion decisions become misleading

The staging layer eliminates these risks before customer data reaches analytical models.

---

# Why Customers Matter

In every marketplace:

```text
Customers
    ↓
Orders
    ↓
Payments
    ↓
Revenue
```

Without customers:

* No orders
* No payments
* No reviews
* No revenue

Customer intelligence serves as the foundation of every business decision.

---

# Source Table

```text
cs003_olist_raw.cs003_olist_raw_customers
```

---

# Target Table

```text
cs003_olist_stg.stg_customers
```

---

# Data Engineering Objectives

The staging process performs several critical transformations.

---

## 1. Customer City Standardization

Normalize city names.

### Example

Raw:

```text
sao paulo
 Sao Paulo
SAO PAULO
```

Staging:

```text
SAO PAULO
```

### Business Value

Ensures:

* Consistent reporting
* Accurate aggregations
* Reliable geographic analysis
* Standardized dashboards

---

## 2. Customer State Standardization

Normalize state values.

### Example

Raw:

```text
sp
Sp
 SP
```

Staging:

```text
SP
```

### Business Value

Supports:

* Geographic Intelligence
* Regional Revenue Analysis
* Expansion Planning

---

## 3. Data Cleansing

Remove leading and trailing spaces.

### Functions Used

```sql
TRIM()
```

### Business Value

Prevents:

* Duplicate location records
* Reporting inconsistencies
* Dashboard errors

---

## 4. ETL Auditability

Generate ETL timestamp.

### Business Value

Provides:

* Data lineage
* Data freshness visibility
* ETL troubleshooting
* Governance support

---

# Transformation SQL

```sql
CREATE OR REPLACE TABLE
`detleng-case-studies.cs003_olist_stg.stg_customers`
AS

SELECT

    customer_id,

    customer_unique_id,

    UPPER(TRIM(customer_city))
        AS customer_city,

    UPPER(TRIM(customer_state))
        AS customer_state,

    CURRENT_TIMESTAMP()
        AS etl_load_timestamp

FROM
`detleng-case-studies.cs003_olist_raw.cs003_olist_raw_customers`;
```

---

# Validation Query

```sql
SELECT *
FROM `detleng-case-studies.cs003_olist_stg.stg_customers`
LIMIT 20;
```

---

# Expected Output Structure

| Column             | Business Purpose           |
| ------------------ | -------------------------- |
| customer_id        | Customer Business Key      |
| customer_unique_id | Unique Customer Identity   |
| customer_city      | Standardized Customer City |
| customer_state     | Standardized State Code    |
| etl_load_timestamp | ETL Governance             |

---

# Data Quality Risks Addressed

### Risk 1

Inconsistent City Names

Impact:

```text
Incorrect Geographic Reporting
```

---

### Risk 2

Mixed State Formats

Impact:

```text
Broken Regional Analysis
```

---

### Risk 3

Leading and Trailing Spaces

Impact:

```text
Duplicate Geographic Records
```

---

### Risk 4

Missing Audit Information

Impact:

```text
Difficult ETL Troubleshooting
```

---

# Business Intelligence Opportunities

This table directly powers:

## Customer Analytics

```text
Customer Distribution
Customer Growth
Customer Coverage
```

---

## Geographic Intelligence

```text
Customers by State
Customers by City
Market Penetration Analysis
```

---

## Revenue Analytics

```text
Revenue by State
Revenue by Customer Region
Customer Concentration Analysis
```

---

## Expansion Strategy

```text
High Demand Regions
Low Supply Regions
Market Opportunity Analysis
```

---

## Executive Dashboards

```text
Customer KPIs
Regional KPIs
Market Expansion KPIs
```

---

# Analytics Layer Mapping

This staging table becomes the foundation of:

```text
dim_customers
```

and will connect directly with:

```text
fact_orders
fact_payments
fact_reviews
```

to support enterprise analytics.

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

Customer intelligence becomes one of the primary dimensions throughout the analytical ecosystem.

---

# Future Enhancement Opportunities

As the platform matures, future versions may introduce:

```text
customer_city_clean
customer_state_name
customer_region
```

Example:

```text
SP → Southeast
RJ → Southeast
PR → South
RS → South
```

These enhancements significantly improve executive reporting and regional analytics.

---

# Staging Success Criteria

The staging implementation is considered successful when:

✅ Customer cities are standardized

✅ Customer states are standardized

✅ Leading/trailing spaces are removed

✅ ETL timestamps are generated

✅ Data is analytics-ready

✅ Future dimensional modeling requirements are supported

---

# DeTLeng Engineering Observation

Many analytics projects underestimate the importance of customer master data.

However, customer information often explains:

* Revenue concentration
* Geographic demand patterns
* Market expansion opportunities
* Customer behavior trends

High-quality customer intelligence begins with high-quality customer data.

---

# DeTLeng Executive Takeaway

The `stg_customers` table transforms raw customer records into a governed, analytics-ready customer foundation.

By standardizing customer locations and introducing auditability, the staging layer ensures that future geographic analysis, customer intelligence, revenue reporting, and executive dashboards are built upon trusted and consistent data.

Within the CS-003 architecture, `stg_customers` serves as the foundation for Customer Analytics, Geographic Intelligence, Revenue Analysis, and Strategic Market Expansion initiatives.

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
