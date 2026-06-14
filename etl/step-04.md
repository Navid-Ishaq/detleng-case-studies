This is actually one of the most important DeTLeng SOPs.

Most junior engineers think:

> Extract → Clean → Transform → Dashboard

But professional Data Engineering has a mandatory checkpoint:

> **Extract → Clean → Transform → Validate → Analytics Layer**

Without validation, nobody knows whether the transformations are correct.

# Step 4: Data Validation SOP

## Establishing Trust and Accuracy in Business Data

### Objective

The purpose of Data Validation is to verify that all extracted, cleaned, and transformed datasets accurately represent the source systems and approved business logic.

Validation is the final quality control stage before data is promoted to analytics-ready datasets.

No dataset should proceed to reporting, Business Intelligence, KPI calculation, or executive dashboards without completing the validation process.

The objective is simple:

> Ensure the data is correct before anyone makes decisions using it.

---

# Data Architecture

Source Layer:

transform_*

Destination:

validated_*

Example:

transform_sales.sales_summary

↓

validated_sales.sales_summary

---

Rule:

No dataset may enter the analytics layer without passing validation checks.

---

# Task 1: Create Validation Dataset

Navigate:

BigQuery Studio

Select Project

Click:

Create Dataset

Dataset Name:

validated_sales

Purpose:

Store approved and validated datasets.

---

## Expected Result

Validation layer created.

Example:

validated_sales.sales_summary

validated_sales.customer_summary

validated_sales.product_performance

---

# Task 2: Review Validation Requirements

## Objective

Identify what must be validated before approval.

Review:

* Source systems
* Transformation logic
* KPI definitions
* Business rules
* Project requirements

Review documentation:

documentation/business_logic.md

documentation/transformation_rules.md

documentation/source_inventory.md

---

## Expected Result

Validation checklist prepared.

---

# Task 3: Perform Record Count Validation

## Objective

Verify that expected records exist after transformation.

Example:

Source

```sql
SELECT COUNT(*)
FROM clean_shopify.orders;
```

Target

```sql
SELECT COUNT(*)
FROM transform_sales.sales_summary;
```

Investigate any significant differences.

Document findings.

---

## Validation Questions

* Were records lost?
* Were records duplicated?
* Were records intentionally filtered?

---

## Expected Result

Record counts reconciled.

---

# Task 4: Perform Revenue Validation

## Objective

Verify financial accuracy.

Financial metrics must match approved source totals.

Example:

Source Revenue

```sql
SELECT
SUM(total_price)
FROM clean_shopify.orders;
```

Transformed Revenue

```sql
SELECT
SUM(net_revenue)
FROM transform_sales.sales_summary;
```

---

## Validation Questions

* Do totals match?
* Are refunds applied correctly?
* Are discounts calculated correctly?

---

## Expected Result

Revenue calculations approved.

---

# Task 5: Perform Duplicate Detection Validation

## Objective

Verify unique business entities remain unique.

Examples:

* customer_id
* order_id
* invoice_id
* product_id

Example Query

```sql
SELECT
order_id,
COUNT(*)
FROM transform_sales.sales_summary
GROUP BY order_id
HAVING COUNT(*) > 1;
```

---

## Expected Result

No unexpected duplicates exist.

---

# Task 6: Perform Null Value Validation

## Objective

Verify critical business fields contain valid values.

Critical fields:

* customer_id
* order_id
* revenue
* transaction_date

Example

```sql
SELECT
COUNTIF(customer_id IS NULL)
FROM transform_sales.sales_summary;
```

---

## Validation Questions

* Are required fields populated?
* Are missing values expected?

---

## Expected Result

Null values reviewed and approved.

---

# Task 7: Perform Business Rule Validation

## Objective

Verify approved business rules were applied correctly.

Review:

documentation/business_logic.md

Examples:

### Active Customer Rule

Customer purchased within last 12 months.

---

### Net Revenue Rule

Net Revenue

=

Sales

− Refunds

− Discounts

---

### Completed Order Rule

Only completed orders included.

---

Example Query

```sql
SELECT *
FROM transform_sales.sales_summary
WHERE order_status != 'completed';
```

---

## Expected Result

Business rules validated successfully.

---

# Task 8: Perform Relationship Validation

## Objective

Verify joins produced expected results.

Examples:

Customer

↓

Orders

↓

Revenue

---

Check for:

* Orphan records
* Missing joins
* Unexpected exclusions

Example

```sql
SELECT *
FROM transform_sales.sales_summary
WHERE customer_id IS NULL;
```

---

## Expected Result

Dataset relationships validated.

---

# Task 9: Perform Data Type Validation

## Objective

Ensure all fields use correct data types.

Examples:

Correct

* DATE
* TIMESTAMP
* NUMERIC
* INTEGER
* STRING

Incorrect

Revenue stored as STRING

Date stored as TEXT

---

## Expected Result

Schema approved.

---

# Task 10: Perform KPI Validation

## Objective

Verify calculated KPIs against stakeholder expectations.

Examples:

* Total Revenue
* Average Order Value
* Customer Lifetime Value
* Active Customers

Compare calculations against:

* Source systems
* Finance reports
* Approved business logic

---

## Expected Result

KPIs approved by stakeholders.

---

# Task 11: Create Exception Report

## Objective

Document all validation failures.

Create file:

documentation/validation_exceptions.md

Record:

* Issue Description
* Dataset
* Impact
* Resolution
* Owner

---

Example

Issue:

Duplicate Orders

Dataset:

sales_summary

Resolution:

Join logic corrected

Status:

Resolved

---

## Expected Result

Complete audit trail maintained.

---

# Task 12: Create Validation Summary Report

Create file:

documentation/validation_report.md

Document:

### Record Counts

Pass / Fail

### Revenue Validation

Pass / Fail

### Duplicate Validation

Pass / Fail

### Null Validation

Pass / Fail

### Business Rule Validation

Pass / Fail

### KPI Validation

Pass / Fail

---

## Expected Result

Formal validation evidence completed.

---

# Task 13: Promote to Validated Layer

Only after all validation checks pass.

Example

```sql
CREATE OR REPLACE TABLE
validated_sales.sales_summary
AS

SELECT *
FROM transform_sales.sales_summary;
```

---

## Expected Result

Dataset promoted to validated layer.

---

# Validation Phase Completion Criteria

The validation phase is complete when:

✓ Record counts reconciled

✓ Revenue totals validated

✓ Duplicate checks passed

✓ Null value checks passed

✓ Business rules verified

✓ Relationships validated

✓ Data types approved

✓ KPI calculations validated

✓ Exception report completed

✓ Validation report completed

✓ Stakeholder approval received

---

# Final Outputs

validated_sales.sales_summary

validated_sales.customer_summary

validated_sales.product_performance

validated_marketing.campaign_performance

validated_finance.revenue_metrics

---

# Business Outcome

The organization now has trusted and verified datasets that accurately represent business operations.

Stakeholders can rely on the data with confidence.

Reporting teams, analysts, and Business Intelligence platforms can consume validated datasets knowing that calculations, business rules, and metrics have been independently verified.

These validated datasets are now approved for Step 5: Analytics Dataset Engineering and Reporting Layer Development.

One DeTLeng principle I'd add at the top of this SOP:

> **If it is not validated, it is not trusted.**
>
> If it is not trusted, it should never appear in a dashboard.

That single rule will save a lot of future headaches.
