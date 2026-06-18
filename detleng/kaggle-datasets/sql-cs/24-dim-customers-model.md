# 🏆 DeTLeng Analytics Layer Implementation

# dim_customers

## Building a Business-Ready Customer Dimension for Customer Intelligence, Geographic Analytics, Revenue Analysis, and Executive Reporting

---

# Executive Purpose

The Customer Dimension is the first official Dimension Table in the Analytics Layer (Gold Layer).

While the staging layer focuses on data cleansing and standardization, the Analytics Layer focuses on creating business-ready entities that can be consumed by reporting tools, dashboards, executive scorecards, and analytical models.

The purpose of `dim_customers` is to create a single, trusted, and reusable customer reference table that supports all future analytics initiatives across the organization.

This table becomes the foundation for:

* Customer Analytics
* Revenue Analytics
* Review Analytics
* Geographic Intelligence
* Executive Reporting
* Business Intelligence Dashboards

---

# Business Problem

In raw operational systems, customer information is often stored as transactional records.

This creates several challenges:

* Customer attributes are repeatedly duplicated across reports.
* Different teams use different customer definitions.
* Analytics queries become unnecessarily complex.
* Dashboard performance decreases as joins become larger and more complicated.

A dedicated Customer Dimension solves these issues by creating a single source of truth for customer information.

---

# Source Table

```text
cs003_olist_stg.stg_customers
```

---

# Target Table

```text
cs003_olist_analytics.dim_customers
```

---

# Analytics Layer Objectives

The Customer Dimension performs the following functions:

### Customer Master Reference

Provides a centralized customer reference table.

---

### Star Schema Enablement

Supports future Fact Tables:

```text
fact_orders
fact_sales
fact_payments
fact_reviews
fact_delivery
```

---

### Business-Friendly Structure

Creates an analytics-ready customer entity.

---

### Surrogate Key Creation

Introduces:

```text
customer_key
```

which becomes the primary analytical key used throughout the Analytics Layer.

---

### Enterprise Reporting Readiness

Supports:

* Power BI
* Looker Studio
* Tableau
* Executive Dashboards
* Data Warehousing Best Practices

---

# Transformation SQL

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

# SQL Transformation Breakdown

## Customer Surrogate Key

```sql
ROW_NUMBER() OVER(
    ORDER BY customer_id
)
```

Creates:

```text
customer_key
```

Example:

| customer_key | customer_id |
| ------------ | ----------- |
| 1            | abc123      |
| 2            | xyz456      |
| 3            | pqr789      |

This becomes the preferred join key for analytical models.

---

## Customer Identity Preservation

The original business identifiers are preserved:

```text
customer_id
customer_unique_id
```

This ensures traceability back to operational systems.

---

## Geographic Attributes

Customer location information is retained:

```text
customer_city
customer_state
```

Supporting:

* Geographic Analytics
* Regional Revenue Analysis
* Customer Distribution Reporting
* Expansion Opportunity Analysis

---

## ETL Auditability

The ETL timestamp is retained:

```text
etl_load_timestamp
```

Supporting:

* Data Lineage
* Data Freshness Monitoring
* Audit Trails
* ETL Operations

---

# Validation Query

After creating the table:

```sql
SELECT *
FROM `detleng-case-studies.cs003_olist_analytics.dim_customers`
LIMIT 20;
```

---

# Expected Output Structure

| Column             | Purpose                         |
| ------------------ | ------------------------------- |
| customer_key       | Analytics Surrogate Key         |
| customer_id        | Operational Customer Identifier |
| customer_unique_id | Unique Customer Reference       |
| customer_city      | Customer City                   |
| customer_state     | Customer State                  |
| etl_load_timestamp | ETL Audit Timestamp             |

---

# Star Schema Relationship

The Customer Dimension will connect with multiple Fact Tables.

```text
                 dim_customers
                       |
                       |
                       |
                 customer_key
                       |
                       |
 ------------------------------------------------
 |              |             |                 |
fact_orders  fact_sales  fact_reviews  fact_delivery
```

This structure dramatically simplifies reporting and improves query performance.

---

# Business Value

The Customer Dimension enables organizations to answer strategic questions such as:

### Customer Distribution

```text
Where are customers located?
```

---

### Customer Revenue Analysis

```text
Which regions generate the most revenue?
```

---

### Customer Satisfaction Analysis

```text
Which customer segments provide the highest review scores?
```

---

### Geographic Intelligence

```text
Which states and cities represent future growth opportunities?
```

---

### Executive Reporting

```text
Customer KPIs
Customer Growth
Customer Distribution
Customer Concentration
Regional Performance
```

---

# Future Analytics Usage

The Customer Dimension will directly support:

## Customer Analytics

```text
CS-005 Customer Analytics
```

---

## Revenue Analytics

```text
Revenue by Customer
Revenue by Region
```

---

## Review Analytics

```text
Customer Satisfaction
Review Trends
```

---

## Geographic Intelligence

```text
State Analysis
City Analysis
Expansion Analysis
```

---

## Executive Dashboards

```text
Customer Overview Dashboard
Executive KPI Dashboard
```

---

# DeTLeng Engineering Observation

Many reporting projects directly connect fact tables to raw customer data.

This approach increases complexity and reduces scalability.

Creating a dedicated Customer Dimension introduces:

* Consistency
* Performance
* Reusability
* Governance
* Scalability

which are core principles of modern Data Warehousing.

---

# DeTLeng Executive Takeaway

The `dim_customers` table is the first official business entity in the Gold Layer.

It transforms cleansed customer data into a reusable analytical asset that supports customer intelligence, revenue reporting, geographic analysis, and executive decision-making.

This dimension serves as a foundational building block for the entire CS-003 Analytics Architecture and future Business Intelligence initiatives.

---

### By Muhammad Naveed

Founder of DeTLeng — Data Engineering, ETL & Analytics Solutions

[www.detleng.com](http://www.detleng.com)

https://insights.detleng.com/

https://casestudy.detleng.com/

---

# 🏆 Analytics Layer Status

```text
Dataset Created

✅ dim_customers

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

The Analytics Layer has officially begun.

The next object will be:

🏆 dim_products

which will become the foundation for Product Analytics, Category Intelligence, Revenue by Category, Product Portfolio Analysis, and Executive Product Reporting.
