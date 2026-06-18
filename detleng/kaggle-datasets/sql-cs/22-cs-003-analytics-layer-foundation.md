# CS-003 Analytics Layer Foundation

## Building Enterprise-Ready Fact and Dimension Models for Business Intelligence, Reporting, Executive Dashboards, and Decision-Making

---

# Executive Overview

The completion of the Raw Layer, Business Investigation Phase, Entity Relationship Model (ERD), and Staging Layer marks a major milestone within the CS-003 Olist Marketplace Data Engineering project.

At this stage, the project transitions from data preparation into business intelligence engineering.

Until now, the primary objective was to:

* Understand the business
* Investigate operational processes
* Clean and standardize raw data
* Establish trusted data foundations

The next objective is different.

The Analytics Layer transforms clean operational data into business-ready analytical models capable of powering dashboards, executive reporting, self-service analytics, and strategic decision-making.

This is where data begins generating measurable business value.

---

# Project Evolution

The CS-003 project has progressed through multiple layers of maturity.

```text
Raw Data Layer
        ↓
Business Investigation Layer
        ↓
Postmortem Analysis Layer
        ↓
Entity Relationship Model (ERD)
        ↓
Staging Layer
        ↓
Analytics Layer   ← Current Phase
        ↓
Executive BI Layer
        ↓
Final Case Study
```

The Analytics Layer acts as the bridge between Data Engineering and Business Intelligence.

---

# Why the Analytics Layer Exists

Raw tables are optimized for operational systems.

Staging tables are optimized for data quality.

Analytics tables are optimized for business decisions.

Without an Analytics Layer:

```text
Dashboard Performance Slows
Complex SQL Increases
Business Logic Gets Repeated
Reporting Becomes Inconsistent
```

The Analytics Layer solves these challenges by creating reusable business models.

---

# Analytics Dataset

## Target Dataset

```text
cs003_olist_analytics
```

---

# Dataset Creation SQL

```sql
CREATE SCHEMA
`detleng-case-studies.cs003_olist_analytics`;
```

---

# Analytics Architecture

The Analytics Layer follows a Star Schema architecture.

This is the industry-standard design used in:

* Google BigQuery
* Microsoft Fabric
* Snowflake
* Amazon Redshift
* Databricks
* Power BI
* Looker Studio
* Tableau

---

# High-Level Analytics Model

```text
                     dim_dates
                         |
                         |
                         |
dim_customers --- fact_orders --- dim_products
                         |
                         |
                         |
                    dim_sellers
                         |
                         |
                    dim_geography
```

Additional fact tables:

```text
fact_sales
fact_payments
fact_reviews
fact_delivery
```

---

# Analytics Layer Objectives

The Analytics Layer will provide:

### Business-Friendly Models

Instead of:

```text
Raw Transactions
```

users consume:

```text
Revenue
Sales
Customers
Products
Reviews
Payments
```

---

### Faster Dashboard Performance

Pre-modeled fact and dimension tables reduce dashboard complexity and improve response times.

---

### Reusable Business Logic

Business calculations are defined once and reused everywhere.

---

### Trusted Metrics

Ensures consistency across:

* Executive Dashboards
* Sales Reports
* Customer Reports
* Product Reports
* Financial Reports

---

# Analytics Layer Components

The architecture contains two primary components:

## Dimension Tables

Dimension tables describe business entities.

---

### dim_customers

Source:

```text
stg_customers
```

Purpose:

```text
Customer Intelligence
Customer Geography
Customer Segmentation
```

Key Attributes:

```text
Customer
City
State
Region
```

---

### dim_products

Source:

```text
stg_products
+
stg_category_translation
```

Purpose:

```text
Product Analytics
Category Reporting
Portfolio Analysis
```

Key Attributes:

```text
Product
Category
Physical Characteristics
```

---

### dim_sellers

Source:

```text
stg_sellers
```

Purpose:

```text
Seller Intelligence
Supply Analytics
Geographic Supply Analysis
```

---

### dim_dates

Source:

Generated Calendar Table

Purpose:

```text
Year
Quarter
Month
Week
Day
```

Every enterprise analytics project requires a dedicated date dimension.

---

### dim_geography

Source:

```text
stg_geolocation
```

Purpose:

```text
Geographic Analytics
Regional Performance
Expansion Intelligence
```

---

# Fact Tables

Fact tables capture measurable business events.

---

## fact_orders

Source:

```text
stg_orders
```

Purpose:

```text
Order Analytics
Delivery Analytics
Order KPIs
```

Example Metrics:

```text
Order Count
Delivery Days
Delivery Status
Late Orders
```

---

## fact_sales

Source:

```text
stg_order_items
+
dim_products
+
dim_sellers
```

Purpose:

```text
Sales Analytics
Revenue Analytics
Product Performance
Seller Performance
```

Example Metrics:

```text
Revenue
Freight Cost
Items Sold
Average Order Value
```

---

## fact_payments

Source:

```text
stg_payments
```

Purpose:

```text
Payment Analytics
Revenue Realization
Installment Analysis
```

Example Metrics:

```text
Payment Value
Installments
Payment Method
```

---

## fact_reviews

Source:

```text
stg_reviews
```

Purpose:

```text
Customer Satisfaction
Service Quality
Review Analytics
```

Example Metrics:

```text
Review Score
Positive Reviews
Negative Reviews
Review Trends
```

---

## fact_delivery

Source:

```text
stg_orders
```

Purpose:

```text
Logistics Intelligence
Delivery Performance
Operational Monitoring
```

Example Metrics:

```text
Delivery Days
Late Deliveries
On-Time Deliveries
Delivery Variance
```

---

# Expected Deliverables

Upon completion of the Analytics Layer:

```text
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

---

# Business Value

The Analytics Layer enables:

### Executive Reporting

```text
Revenue KPIs
Customer KPIs
Operational KPIs
```

---

### Self-Service Analytics

Business users can answer questions without writing SQL.

---

### Dashboard Development

Supports:

```text
Power BI
Looker Studio
Tableau
```

---

### Strategic Decision-Making

Provides visibility into:

```text
Demand
Supply
Revenue
Customer Behavior
Delivery Performance
Geographic Opportunities
```

---

# Future Dashboard Mapping

The Analytics Layer directly supports:

```text
Dashboard 1
Executive Overview

Dashboard 2
Sales Performance

Dashboard 3
Customer Analytics

Dashboard 4
Product Analytics

Dashboard 5
Seller Analytics

Dashboard 6
Payment Analytics

Dashboard 7
Review Analytics

Dashboard 8
Delivery Analytics

Dashboard 9
Geographic Analytics
```

---

# Analytics Layer Success Criteria

The Analytics Layer is considered successful when:

✅ Star Schema exists

✅ Fact tables exist

✅ Dimension tables exist

✅ Business logic is centralized

✅ Dashboard-ready models are available

✅ Executive reporting can be built without querying raw data

---

# DeTLeng Engineering Observation

Most analytics projects fail because they jump directly from raw data into dashboards.

Professional Data Engineering follows a structured progression:

```text
Raw
↓
Staging
↓
Analytics
↓
Business Intelligence
```

The Analytics Layer is where technical data structures become business assets.

---

# DeTLeng Executive Takeaway

The Analytics Layer represents the first truly business-facing component of the CS-003 architecture.

By transforming staging datasets into reusable fact and dimension models, the organization establishes a scalable foundation for reporting, dashboards, executive analytics, and future machine learning initiatives.

This layer serves as the analytical core of the entire marketplace ecosystem and becomes the primary data source for all future Business Intelligence solutions.

---

# Current Project Status

```text
✅ Business Investigation Complete

✅ Orders Postmortem
✅ Customers Postmortem
✅ Product & Seller Postmortem
✅ Payments Postmortem
✅ Reviews Postmortem
✅ Delivery & Logistics Postmortem
✅ Geographic Intelligence Postmortem

✅ ERD Complete

✅ Raw Layer Complete

✅ Staging Layer Complete

🎯 Analytics Layer (CURRENT PHASE)

⏳ ETL Pipeline Design
⏳ Executive BI Layer
⏳ Final Case Study
```

---

### By Muhammad Naveed

Founder of DeTLeng — Data Engineering, ETL & Analytics Solutions

[www.detleng.com](http://www.detleng.com)

https://insights.detleng.com/

https://casestudy.detleng.com/
