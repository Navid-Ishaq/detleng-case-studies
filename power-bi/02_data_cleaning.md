# Step 2: Data Cleaning

## Transforming Raw Data into Trusted Data

### Project

Online Retail Analytics Solution

### Organization

DeTLeng

### Methodology Stage

Step 2 of 6

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

Data Cleaning is the process of improving data quality, consistency, completeness, and reliability.

While the extraction phase focuses on acquiring and preserving source data, the cleaning phase focuses on improving the usability of that data.

Raw operational datasets frequently contain:

* Duplicate records
* Missing values
* Invalid values
* Inconsistent formats
* Data entry errors
* Incorrect data types
* Incomplete information

These issues may appear minor individually, but collectively they can significantly impact reporting accuracy and business decision-making.

The purpose of this stage is to identify and correct data quality issues before business logic and analytical modeling are applied.

At DeTLeng, we believe:

> Reliable analytics begin with reliable data.

Before a dashboard can be trusted, the underlying data must be trusted.

---

# Business Objective

The objective of the cleaning phase is to transform raw operational data into a standardized and reliable dataset suitable for business analysis.

Specifically, this phase aims to:

* Improve data quality
* Remove inconsistencies
* Standardize structures
* Correct technical issues
* Establish trust in the data
* Prepare datasets for business transformation

At this stage:

No KPIs are calculated.

No business metrics are introduced.

No reporting structures are built.

The sole objective is to improve data quality.

---

# Input Layer

The cleaning phase consumes the raw datasets created during Step 1.

Input Tables:

* retail_raw_2009_2010
* retail_raw_2010_2011

These tables remain unchanged.

The raw layer acts as the permanent source-of-truth.

---

# Cleaning Architecture

```text
Raw Layer

retail_raw_2009_2010
retail_raw_2010_2011

↓

Data Cleaning

↓

Staging Layer

retail_staging
```

The purpose of the staging layer is to store cleaned and standardized data.

---

# Why Data Cleaning Matters

Business users often assume reports are wrong because dashboards are incorrect.

In reality, reporting issues frequently originate much earlier in the data lifecycle.

Examples:

Duplicate transactions may inflate revenue.

Missing customer identifiers may distort customer counts.

Invalid dates may break trend analysis.

Incorrect data types may prevent calculations.

Inconsistent formats may produce misleading results.

The purpose of cleaning is to eliminate these risks before they affect reporting.

---

# Power BI Data Cleaning Environment

## Tool

Power Query Editor

Power Query serves as the primary data preparation environment inside Power BI.

It allows engineers to:

* Inspect data quality
* Profile datasets
* Apply transformations
* Standardize formats
* Remove errors
* Create repeatable cleaning logic

All cleaning activities were performed inside Power Query before loading the final dataset into the Power BI model.

---

# Data Profiling

## Objective

Understand the condition of the raw data before making any modifications.

Data profiling answers questions such as:

* What data exists?
* How complete is it?
* Are there missing values?
* Are there duplicates?
* Are data types correct?
* Are values consistent?

---

## Activities Performed

Reviewed:

### Record Counts

Verified total number of records.

---

### Column Inventory

Verified available fields.

---

### Data Types

Reviewed automatic type detection.

---

### Missing Values

Identified null values.

---

### Unique Values

Reviewed categorical fields.

---

### Data Distribution

Inspected transaction patterns.

---

# Duplicate Analysis

## Objective

Identify records that may appear multiple times.

Duplicate records can create:

* Inflated revenue
* Incorrect customer counts
* Misleading KPIs

---

## Activities Performed

Reviewed:

* Invoice numbers
* Product identifiers
* Customer identifiers

Analyzed:

* Duplicate invoices
* Duplicate transaction records
* Repeated business events

---

## Outcome

Potential duplicate records identified and reviewed.

Only valid business transactions were retained.

---

# Missing Value Assessment

## Objective

Identify incomplete records.

Missing values often indicate:

* Data collection issues
* Operational errors
* System limitations

---

## Fields Reviewed

Customer ID

Description

Country

InvoiceDate

Quantity

Price

---

## Business Considerations

Each missing value was evaluated individually.

Questions considered:

Can the value be recovered?

Should the record be retained?

Does the missing value impact reporting?

Does the missing value violate business rules?

---

## Outcome

Missing value inventory documented.

Appropriate treatment strategies applied.

---

# Data Type Standardization

## Objective

Ensure every column uses an appropriate data type.

Incorrect data types frequently cause:

* Calculation failures
* Reporting issues
* Aggregation errors
* Performance problems

---

## Transformations Applied

### InvoiceDate

Converted to:

DateTime

---

### Quantity

Converted to:

Whole Number

---

### Price

Converted to:

Decimal Number

---

### Customer ID

Converted to:

Text

---

### Country

Converted to:

Text

---

## Outcome

Consistent and reliable data types established.

---

# Data Quality Corrections

## Objective

Identify and correct invalid values.

---

## Examples Reviewed

### Negative Quantities

May indicate:

Returns

Cancellations

Operational adjustments

---

### Negative Revenue Scenarios

Reviewed for business validity.

---

### Invalid Dates

Checked for future dates.

Checked for malformed dates.

---

### Blank Descriptions

Reviewed product records.

---

## Outcome

Invalid values investigated and documented.

---

# Column Standardization

## Objective

Create consistent and maintainable structures.

---

## Activities Performed

Standardized:

Column Names

Field Formats

Naming Conventions

Data Structures

---

## Example

Before

Customer ID

After

customer_id

---

Before

InvoiceDate

After

invoice_date

---

## Outcome

Consistent naming standards established.

---

# Data Consolidation

## Objective

Create a unified staging dataset.

After cleaning individual source files, data was consolidated into a single analytical staging table.

---

## Input

retail_raw_2009_2010

*

retail_raw_2010_2011

---

## Output

retail_staging

---

## Benefits

Single source for future transformations.

Simplified maintenance.

Improved reporting consistency.

---

# Revenue Preparation

## Objective

Prepare foundational financial metrics.

A new column was introduced:

Revenue

Formula:

Quantity × Price

This creates a transaction-level revenue value that can later support business metrics and KPI calculations.

---

## Purpose

At this stage:

Revenue is not yet a KPI.

Revenue is simply a prepared analytical attribute.

Business metrics are introduced later.

---

# Data Quality Validation

## Objective

Verify cleaning results before moving to transformation.

---

## Validation Activities

### Record Count Verification

Source vs Staging

---

### Null Value Review

Critical fields checked.

---

### Data Type Verification

All columns reviewed.

---

### Duplicate Review

Duplicate issues confirmed resolved.

---

### Revenue Validation

Revenue calculation verified.

---

## Outcome

Dataset approved for business transformation.

---

# Staging Layer Deliverable

The cleaning phase produced:

Table:

retail_staging

Purpose:

Trusted transactional dataset for analytical preparation.

Characteristics:

✓ Cleaned

✓ Standardized

✓ Consolidated

✓ Quality Checked

✓ Ready for Business Logic

---

# Risks Mitigated

The cleaning process reduced the risk of:

* Incorrect revenue calculations
* Duplicate business events
* Inaccurate customer counts
* Invalid time analysis
* Reporting inconsistencies
* KPI distortion

---

# Success Criteria

The cleaning phase was considered complete when:

✓ Data quality reviewed

✓ Missing values assessed

✓ Data types standardized

✓ Invalid values reviewed

✓ Duplicate records investigated

✓ Revenue prepared

✓ Source files consolidated

✓ Staging dataset created

✓ Quality checks completed

---

# Output of Step 2

The cleaning phase transformed raw retail transaction data into a trusted analytical staging layer.

Output Table:

retail_staging

This dataset now serves as the foundation for business enrichment, analytical modeling, KPI development, and reporting.

The organization now possesses clean and reliable data ready for transformation.

---

# Key Learning

Raw data is rarely analytics-ready.

Before organizations can trust dashboards, they must first trust the data that powers them.

Data cleaning is not simply a technical exercise.

It is the process of establishing confidence in business information.

Without clean data, reliable analytics cannot exist.

---

# DeTLeng Principle

Data quality is not a reporting problem.

It is a data engineering responsibility.

Clean data creates trusted metrics.

Trusted metrics create confident decisions.

And confident decisions create business value.
