# Step 2: Data Cleaning SOP

## Example Project: Shopify Data Cleaning in BigQuery

### Objective

Improve data quality, consistency, and reliability by identifying and correcting issues within the extracted raw datasets.

The purpose of this phase is not to create reporting tables.

The purpose is to ensure that source data is complete, consistent, standardized, and trustworthy before any business transformations are applied.

---

# Data Architecture

At this stage:

Source Layer:

raw_shopify

Destination Layer:

clean_shopify

Rule:

Never modify raw tables.

Always create cleaned versions.

Example:

raw_shopify.orders

↓

clean_shopify.orders

---

# Task 1: Create Clean Dataset

Navigate:

BigQuery Studio

Select Project:

detleng-shopify-analytics

Click:

Create Dataset

Dataset Name:

clean_shopify

Location:

US

Click:

Create Dataset

---

## Expected Result

Dataset created:

clean_shopify

Purpose:

Store cleaned and standardized business data.

---

# Task 2: Profile Source Data

Objective:

Understand data quality issues before making any changes.

Open:

raw_shopify.orders

Review:

* Row counts
* Column names
* Null values
* Data types
* Duplicate records
* Invalid values

Example Query

```sql
SELECT COUNT(*)
FROM raw_shopify.orders;
```

Example Query

```sql
SELECT *
FROM raw_shopify.orders
LIMIT 100;
```

---

## Expected Result

Initial understanding of source data quality.

---

# Task 3: Identify Duplicate Records

Objective:

Find duplicate business entities.

Common duplicate candidates:

* order_id
* customer_id
* product_id

Example

```sql
SELECT
order_id,
COUNT(*) cnt
FROM raw_shopify.orders
GROUP BY order_id
HAVING COUNT(*) > 1;
```

Document findings.

---

## Expected Result

Duplicate records identified.

---

# Task 4: Remove Duplicates

Objective:

Retain only valid records.

Example

Keep latest version using updated_at.

```sql
CREATE OR REPLACE TABLE clean_shopify.orders AS

SELECT *
FROM (

SELECT *,
ROW_NUMBER() OVER(
PARTITION BY order_id
ORDER BY updated_at DESC
) rn

FROM raw_shopify.orders

)

WHERE rn = 1;
```

---

## Expected Result

One valid record per order.

---

# Task 5: Assess Missing Values

Objective:

Identify important fields containing NULL values.

Critical fields:

* order_id
* customer_id
* created_at
* total_price

Example

```sql
SELECT
COUNTIF(customer_id IS NULL) AS missing_customer_id,
COUNTIF(total_price IS NULL) AS missing_total_price
FROM clean_shopify.orders;
```

Document findings.

---

## Expected Result

Missing value inventory prepared.

---

# Task 6: Handle Missing Values

Objective:

Apply approved business rules.

Examples

Scenario 1:

Missing email

Action:

Replace with NULL

Do not invent data.

---

Scenario 2:

Missing customer name

Action:

Use source system lookup if available.

---

Scenario 3:

Missing revenue amount

Action:

Flag for business review.

---

## Expected Result

Missing value treatment completed.

---

# Task 7: Standardize Data Formats

Objective:

Ensure consistent formatting across all records.

Examples:

Dates

Before:

01/01/25

Jan 1 2025

2025-01-01

After:

2025-01-01

---

Country Names

Before:

USA

U.S.A.

United States

After:

United States

---

Currency

Before:

USD

usd

Usd

After:

USD

---

## Expected Result

Consistent formatting across datasets.

---

# Task 8: Correct Data Types

Objective:

Ensure every field uses appropriate BigQuery data types.

Examples

Before:

order_date STRING

After:

order_date DATE

---

Before:

total_price STRING

After:

total_price NUMERIC

---

Example

```sql
CAST(total_price AS NUMERIC)
```

---

## Expected Result

Columns converted to correct data types.

---

# Task 9: Normalize Naming Conventions

Objective:

Apply DeTLeng naming standards.

Examples

Before:

Order Date

Customer Name

Product ID

After:

order_date

customer_name

product_id

Rules:

* lowercase
* snake_case
* descriptive names

---

## Expected Result

Consistent schema naming.

---

# Task 10: Detect Invalid Values

Objective:

Identify business rule violations.

Examples

Negative Revenue

```sql
SELECT *
FROM clean_shopify.orders
WHERE total_price < 0;
```

---

Future Dates

```sql
SELECT *
FROM clean_shopify.orders
WHERE order_date > CURRENT_DATE();
```

---

## Expected Result

Invalid records identified and documented.

---

# Task 11: Perform Data Quality Validation

Objective:

Verify cleaning process accuracy.

Validation Checks

### Row Counts

```sql
SELECT COUNT(*)
FROM raw_shopify.orders;
```

vs

```sql
SELECT COUNT(*)
FROM clean_shopify.orders;
```

---

### Duplicate Check

Expected:

Zero duplicates.

---

### Null Check

Critical fields reviewed.

---

### Data Type Check

All columns validated.

---

## Expected Result

Cleaning results verified.

---

# Task 12: Create Data Quality Report

Document:

* Total Records
* Duplicate Records Removed
* Missing Values Found
* Missing Values Resolved
* Invalid Records Found
* Data Type Corrections
* Standardization Rules Applied

Store:

documentation/data_quality_report.md

---

## Expected Result

Complete audit trail available.

---

# Cleaning Phase Completion Criteria

The cleaning phase is complete when:

✓ Duplicate records removed

✓ Missing values assessed

✓ Data formats standardized

✓ Data types corrected

✓ Naming conventions normalized

✓ Invalid records reviewed

✓ Data quality checks passed

✓ Cleaning report documented

Final Output:

clean_shopify.orders

clean_shopify.customers

clean_shopify.products

clean_shopify.transactions

clean_shopify.refunds

These cleaned datasets are now ready for Step 3: Data Transformation and Integration.

---

# Business Outcome

Raw operational data has been transformed into clean, consistent, and reliable datasets.

The organization now has a trusted foundation for data modeling, analytics engineering, reporting, and business intelligence.
