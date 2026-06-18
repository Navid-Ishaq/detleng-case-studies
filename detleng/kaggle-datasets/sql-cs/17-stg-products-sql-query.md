# DeTLeng Staging Layer Implementation

# stg_products

## Transforming Raw Product Catalog Data into Enterprise-Ready Product Intelligence

---

# Executive Overview

The Products table is one of the most strategically important assets within the Olist marketplace ecosystem.

Every customer purchase, seller transaction, category analysis, logistics calculation, profitability report, and executive dashboard ultimately depends on the quality of product data.

While revenue is generated through orders, products provide the context required to understand:

* What customers are buying
* Which categories are growing
* Which products drive revenue
* Which products increase logistics costs
* Which categories deserve future investment

The purpose of the staging layer is to transform raw product records into a clean, governed, analytics-ready product foundation that can be trusted across reporting, analytics, and business intelligence initiatives.

---

# Business Problem Statement

Raw product datasets often contain:

* Inconsistent category naming
* Missing dimensions
* Missing product attributes
* Non-standard text values
* Null measurements

These issues create significant challenges for:

* Revenue reporting
* Category analysis
* Freight calculations
* Inventory intelligence
* Executive dashboards

Without proper standardization, business users may reach incorrect conclusions based on inconsistent product metadata.

The staging layer eliminates these risks before data reaches analytics consumers.

---

# Why Products Matter

In marketplace businesses:

```text
Customers Create Demand
Products Satisfy Demand
Sellers Fulfill Demand
Orders Capture Demand
Payments Monetize Demand
```

Products sit at the center of the commercial ecosystem.

Every future analytical model will eventually rely on product intelligence.

---

# Source Table

```text
cs003_olist_raw_products
```

---

# Target Table

```text
cs003_olist_stg.stg_products
```

---

# Data Engineering Objectives

The staging process performs several critical transformations designed to improve reliability, consistency, and analytical usability.

---

## 1. Category Standardization

Normalize category naming conventions.

### Example

Raw:

```text
beleza_saude
```

Staging:

```text
BELEZA_SAUDE
```

### Business Value

Ensures:

* Consistent grouping
* Accurate aggregations
* Reliable category reporting
* Standardized executive dashboards

---

## 2. Null Handling

Replace null numeric values with zero.

### Affected Columns

```text
product_name_lenght
product_description_lenght
product_photos_qty
product_weight_g
product_length_cm
product_height_cm
product_width_cm
```

### Business Value

Prevents:

* Reporting failures
* BI calculation errors
* Dashboard inconsistencies
* ETL processing interruptions

---

## 3. Metadata Cleansing

Normalize product metadata fields.

Improve consistency across the catalog.

### Business Value

Supports:

* Product quality analysis
* Catalog optimization
* Product performance monitoring

---

## 4. ETL Auditability

Add ETL processing timestamp.

### Business Value

Provides:

* Data lineage
* Operational monitoring
* Pipeline observability
* Governance compliance

---

# Transformation SQL

```sql
CREATE OR REPLACE TABLE
`detleng-case-studies.cs003_olist_stg.stg_products`
AS

SELECT

    product_id,

    UPPER(TRIM(product_category_name))
        AS product_category_name,

    IFNULL(product_name_lenght,0)
        AS product_name_length,

    IFNULL(product_description_lenght,0)
        AS product_description_length,

    IFNULL(product_photos_qty,0)
        AS product_photos_qty,

    IFNULL(product_weight_g,0)
        AS product_weight_g,

    IFNULL(product_length_cm,0)
        AS product_length_cm,

    IFNULL(product_height_cm,0)
        AS product_height_cm,

    IFNULL(product_width_cm,0)
        AS product_width_cm,

    CURRENT_TIMESTAMP()
        AS etl_load_timestamp

FROM
`detleng-case-studies.cs003_olist_raw.cs003_olist_raw_products`;
```

---

# Validation Query

```sql
SELECT *
FROM `detleng-case-studies.cs003_olist_stg.stg_products`
LIMIT 20;
```

---

# Expected Output Structure

| Column                     | Business Purpose         |
| -------------------------- | ------------------------ |
| product_id                 | Product Business Key     |
| product_category_name      | Standardized Category    |
| product_name_length        | Product Content Metadata |
| product_description_length | Description Metadata     |
| product_photos_qty         | Product Media Quality    |
| product_weight_g           | Logistics Intelligence   |
| product_length_cm          | Packaging Intelligence   |
| product_height_cm          | Packaging Intelligence   |
| product_width_cm           | Packaging Intelligence   |
| etl_load_timestamp         | ETL Governance           |

---

# Data Quality Risks Addressed

The staging layer mitigates several common data quality issues.

### Risk 1

Missing Product Measurements

Impact:

```text
Incorrect Freight Calculations
```

---

### Risk 2

Inconsistent Category Naming

Impact:

```text
Broken Category Reporting
```

---

### Risk 3

Null Metadata

Impact:

```text
Dashboard Errors
```

---

### Risk 4

Untraceable Data Loads

Impact:

```text
Difficult ETL Troubleshooting
```

---

# Business Intelligence Opportunities

This table enables future analysis such as:

## Product Portfolio Analytics

```text
Products by Category
```

---

## Revenue Analytics

```text
Revenue by Category
```

---

## Catalog Health Monitoring

```text
Products with Low Metadata Quality
```

---

## Product Content Optimization

```text
Photo Count vs Sales
Description Length vs Conversion
```

---

## Logistics Analytics

```text
Weight Distribution
Size Distribution
Freight Impact Analysis
```

---

# Analytics Layer Mapping

This staging table will later become:

```text
dim_products
```

within the Analytics Layer.

It will serve as one of the primary dimensions used across:

```text
Fact Orders
Fact Revenue
Fact Payments
Fact Logistics
Fact Reviews
```

---

# Enterprise Data Model Relationship

```text
dim_products
        |
        |
fact_order_items
        |
        |
fact_orders
```

Products will become one of the most frequently used dimensions throughout the analytics ecosystem.

---

# Staging Success Criteria

The staging implementation is considered successful when:

✅ Product categories are standardized

✅ Null numeric values are eliminated

✅ Product metadata is normalized

✅ ETL timestamps are generated

✅ Data is analytics-ready

✅ Future dimensional modeling requirements are supported

---

# DeTLeng Engineering Observation

One of the most common mistakes in analytics projects is underestimating the importance of product master data.

Organizations frequently focus on:

* Orders
* Revenue
* Customers

while ignoring the contextual intelligence stored inside product attributes.

However, product metadata often explains:

* Revenue performance
* Category growth
* Customer engagement
* Logistics costs
* Marketplace profitability

High-quality analytics begins with high-quality product intelligence.

---

# DeTLeng Executive Takeaway

The stg_products table transforms raw marketplace catalog data into a governed, analytics-ready product foundation.

Although products do not directly generate revenue, they provide the context required to explain revenue.

This staging table becomes a critical building block for future Product Analytics, Revenue Intelligence, Logistics Analysis, Category Performance Monitoring, Executive Dashboards, and Enterprise Reporting initiatives.

Within the CS-003 architecture, stg_products serves as the foundation upon which trusted product intelligence is built.

---

# Next Stage in the Staging Layer

```text
✅ stg_customers
✅ stg_orders
✅ stg_payments
✅ stg_order_items
✅ stg_products

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
