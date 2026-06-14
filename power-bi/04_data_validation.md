# 04_data_validation.md

# Step 4: Data Validation

## Establishing Trust, Accuracy, and Business Confidence

### Project

Online Retail Analytics Solution

### Organization

DeTLeng

### Methodology Stage

Step 4 of 6

### Data Engineering Lifecycle

Data Extraction

↓

Data Cleaning

↓

Data Transformation & Integration

↓

Data Validation

↓

Analytics Dataset Engineering

↓

Delivery & Business Enablement

---

# Executive Overview

Data Validation is the process of verifying that transformed data accurately represents the original business activity and complies with approved business logic.

By this stage:

The data has been extracted.

The data has been cleaned.

The data has been transformed.

Business attributes have been created.

Revenue calculations have been introduced.

Analytical dimensions have been prepared.

However, none of these activities automatically guarantee correctness.

Validation exists to answer a critical question:

> Can the organization trust the data?

The purpose of validation is not to create new information.

The purpose is to verify that the information already created is accurate, complete, and reliable.

Validation transforms confidence into evidence.

---

# Business Objective

The objective of validation is to establish trust in the analytical dataset before it becomes the foundation for reporting and decision-making.

The validation process seeks to:

* Verify data accuracy
* Confirm business logic
* Validate calculations
* Detect inconsistencies
* Identify exceptions
* Ensure completeness
* Establish confidence

At DeTLeng, we believe:

> If data is not validated, it is not trusted.

And if it is not trusted, it should never appear in a dashboard.

---

# Input Layer

Source Dataset

retail_staging

Characteristics:

✓ Cleaned

✓ Standardized

✓ Transformed

✓ Business Enriched

✓ Analytics Prepared

---

# Validation Architecture

```text
Raw Data

↓

Cleaning

↓

Transformation

↓

Validation

↓

Trusted Dataset

↓

Analytics Engineering
```

Validation acts as the quality control checkpoint of the Data Engineering lifecycle.

---

# Why Validation Matters

Organizations frequently encounter situations where reports disagree.

Examples:

Finance reports one revenue figure.

Sales reports another.

Marketing dashboards show different numbers.

Executives lose confidence.

The issue is rarely the dashboard.

The issue is usually unvalidated data.

Validation prevents these problems before they reach decision makers.

---

# Validation Philosophy

Data Validation is based on a simple principle:

Every transformation must be proven.

Every calculation must be verified.

Every business rule must be tested.

Every dataset must earn trust.

Nothing should be assumed.

Everything should be validated.

---

# Validation Environment

## Tool

Power Query

Power BI Data Model

Manual Reconciliation

Business Rule Verification

---

# Validation Categories

The project implemented multiple layers of validation.

---

# Validation Layer 1

## Source Completeness Validation

### Objective

Verify that all source records remain available after cleaning and transformation.

---

## Validation Questions

Did all source records load successfully?

Were records unintentionally removed?

Was historical data preserved?

Did dataset consolidation work correctly?

---

## Activities Performed

Compared:

Source Record Counts

vs

Staging Record Counts

---

Reviewed:

* Imported records
* Consolidated records
* Historical periods

---

## Outcome

Source completeness confirmed.

---

# Validation Layer 2

## Revenue Validation

### Objective

Verify that revenue calculations are accurate.

---

# Business Logic

Revenue

=

Quantity × Price

---

## Validation Activities

Reviewed sample transactions.

Verified calculations manually.

Compared expected and actual values.

Reviewed outliers.

Reviewed unusually high revenue values.

Reviewed unusually low revenue values.

---

## Validation Questions

Are calculations mathematically correct?

Do revenue totals align with transaction data?

Are negative values valid?

---

## Outcome

Revenue calculations approved.

---

# Validation Layer 3

## Date Intelligence Validation

### Objective

Verify time-based transformations.

---

## Fields Reviewed

Year

Month

Month Name

Quarter

Day Name

---

## Validation Activities

Selected sample transactions.

Compared source dates against derived values.

Reviewed quarter assignments.

Reviewed month names.

Reviewed calendar logic.

---

## Example

Invoice Date

08-Nov-2011

Expected Quarter

Q4

Expected Month

November

Expected Year

2011

---

## Outcome

Date intelligence logic verified.

---

# Validation Layer 4

## Duplicate Validation

### Objective

Verify duplicate handling was successful.

---

## Activities Performed

Reviewed:

Invoice Numbers

Customer IDs

Product Transactions

Repeated Records

---

## Validation Questions

Do duplicate invoices exist?

Were duplicate transactions removed?

Were legitimate transactions preserved?

---

## Outcome

Duplicate handling approved.

---

# Validation Layer 5

## Missing Value Validation

### Objective

Verify treatment of incomplete records.

---

## Fields Reviewed

Customer ID

Description

Country

InvoiceDate

Quantity

Price

---

## Validation Questions

Are critical fields populated?

Were missing values handled correctly?

Do null values impact reporting?

---

## Outcome

Missing value treatment approved.

---

# Validation Layer 6

## Business Rule Validation

### Objective

Verify that business logic was applied correctly.

---

## Rules Reviewed

Revenue Calculation

Time Intelligence Logic

Customer Identification

Transaction Handling

Dataset Consolidation

---

## Validation Questions

Were business rules implemented correctly?

Are calculations repeatable?

Do results align with expectations?

---

## Outcome

Business logic approved.

---

# Validation Layer 7

## Analytical Consistency Validation

### Objective

Verify dataset readiness for reporting.

---

## Questions Reviewed

Can revenue be aggregated accurately?

Can customers be analyzed correctly?

Can products be ranked correctly?

Can countries be compared reliably?

Can trends be analyzed consistently?

---

## Outcome

Dataset confirmed suitable for analytics.

---

# Exception Analysis

## Objective

Identify unusual records requiring review.

---

## Examples Reviewed

Negative Quantities

Unusually Large Orders

Missing Customer IDs

Rare Product Codes

Unexpected Country Values

---

## Outcome

Exceptions documented and assessed.

---

# Validation Evidence

Validation activities generated evidence supporting trust in the dataset.

Examples:

✓ Record Counts Verified

✓ Revenue Verified

✓ Time Logic Verified

✓ Business Rules Verified

✓ Duplicate Handling Verified

✓ Missing Values Reviewed

✓ Exception Analysis Completed

---

# Validation Deliverables

The validation phase produced:

## Validation Report

Dataset Validation Summary

---

## Data Quality Findings

Validation Results

---

## Exception Log

Identified Anomalies

---

## Approved Dataset

Validated Retail Dataset

---

# Trust Assessment

At the conclusion of validation, the dataset demonstrated:

### Accuracy

The data reflects actual business activity.

---

### Completeness

Expected records are present.

---

### Consistency

Business rules are applied uniformly.

---

### Reliability

Results are repeatable.

---

### Trustworthiness

The organization can confidently use the data.

---

# Risks Mitigated

Validation reduced the risk of:

* Incorrect KPIs
* Revenue discrepancies
* Dashboard inconsistencies
* Reporting conflicts
* Misleading analysis
* Poor business decisions

---

# Success Criteria

The validation phase was considered complete when:

✓ Source completeness verified

✓ Revenue validated

✓ Date logic validated

✓ Duplicate handling verified

✓ Missing values reviewed

✓ Business rules approved

✓ Analytical consistency confirmed

✓ Exceptions reviewed

✓ Validation report completed

---

# Output of Step 4

The validation phase transformed a prepared analytical dataset into a trusted analytical dataset.

The organization now possesses data that has been independently verified for quality, accuracy, consistency, and business alignment.

The dataset is now approved for advanced analytical modeling.

---

# Key Learning

Transformation creates business information.

Validation creates trust.

Without validation, analytical results remain assumptions.

With validation, analytical results become dependable business assets.

Trust is not created by dashboards.

Trust is created by verification.

---

# DeTLeng Principle

Data should never be trusted because it looks correct.

Data should be trusted because it has been proven correct.

Validation is the process that transforms confidence into evidence and evidence into trust.

Only trusted data deserves to influence business decisions.
