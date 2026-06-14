# Step 3: Data Transformation & Integration

## Converting Trusted Data into Business Information

### Project

Online Retail Analytics Solution

### Organization

DeTLeng

### Methodology Stage

Step 3 of 6

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

Data Transformation is the process of converting clean and reliable data into meaningful business information.

By the completion of Step 2, the organization possesses trusted data.

However, trusted data alone does not automatically generate business value.

Business users do not think in terms of:

* Invoice Numbers
* Product Codes
* Raw Timestamps
* Technical Columns

Business users think in terms of:

* Revenue
* Customers
* Products
* Time Periods
* Growth
* Performance

The objective of this stage is to bridge the gap between technical datasets and business understanding.

This is where business context is introduced.

This is where analytical structures begin to emerge.

---

# Business Objective

The purpose of transformation is to enrich data so it can answer business questions.

The transformation process seeks to:

* Add business meaning
* Create analytical attributes
* Generate reporting dimensions
* Prepare future KPIs
* Support trend analysis
* Simplify analytical consumption

At this stage, the goal is not reporting.

The goal is to prepare the business information that reporting will later consume.

---

# Input Layer

Source Dataset

retail_staging

Characteristics:

✓ Clean

✓ Standardized

✓ Consolidated

✓ Quality Checked

✓ Trusted

---

# Transformation Architecture

```text
Raw Data

↓

Clean Data

retail_staging

↓

Business Enrichment

↓

Business Information Layer

↓

Validation
```

Transformation introduces business intelligence into the dataset.

---

# Why Transformation Matters

Organizations often possess large amounts of data.

What they frequently lack is business information.

Example:

Raw Record

Invoice:
574950

Date:
08/11/2011

Quantity:
1

Price:
2.46

---

Useful?

Technically yes.

Business users still cannot answer:

* How much revenue was generated?
* Which quarter performed best?
* Which month drove growth?
* Which products performed strongest?

Transformation solves this problem.

---

# Transformation Environment

## Tool

Power Query

Transformation activities were performed inside Power Query.

Power Query allows:

* Column creation
* Data enrichment
* Derived attributes
* Business logic implementation
* Data integration

All transformation logic was designed to remain repeatable and auditable.

---

# Business Enrichment Strategy

The project focused on enriching transactional retail data with analytical attributes.

The goal was to prepare data for future:

* KPI Development
* Trend Analysis
* Revenue Reporting
* Customer Analysis
* Product Analysis

---

# Revenue Engineering

## Objective

Create transaction-level revenue values.

---

## Business Logic

Revenue

=

Quantity × Price

---

## Purpose

This calculation converts individual transaction records into measurable business value.

Before transformation:

Quantity

Price

---

After transformation:

Revenue

---

## Business Impact

Enables:

* Revenue Analysis
* Revenue Trends
* Revenue Aggregations
* Financial KPIs

---

# Time Intelligence Engineering

## Objective

Transform timestamps into business reporting dimensions.

---

# Year Extraction

Created:

Year

Derived from:

InvoiceDate

---

## Example

Before

08/11/2011 09:29

After

2011

---

## Business Benefit

Supports:

* Annual Reporting
* Year-over-Year Analysis

---

# Month Extraction

Created:

Month

Derived from:

InvoiceDate

---

## Example

Before

08/11/2011

After

11

---

## Business Benefit

Supports:

* Monthly Reporting
* Trend Analysis

---

# Month Name Creation

Created:

Month Name

---

## Example

Before

11

After

November

---

## Business Benefit

Improves dashboard readability.

Improves business communication.

---

# Quarter Engineering

Created:

Quarter

---

## Example

Month 1–3

↓

Quarter 1

---

Month 4–6

↓

Quarter 2

---

Month 7–9

↓

Quarter 3

---

Month 10–12

↓

Quarter 4

---

## Business Benefit

Supports executive reporting and strategic analysis.

---

# Day Intelligence

Created:

Day Name

Derived from:

InvoiceDate

---

## Example

Monday

Tuesday

Wednesday

Thursday

Friday

Saturday

Sunday

---

## Business Benefit

Supports:

* Daily Sales Analysis
* Operational Planning
* Peak Activity Identification

---

# Analytical Dimension Development

## Objective

Create attributes that support slicing and filtering.

Business users require the ability to view data from multiple perspectives.

Transformation creates these perspectives.

---

# Time Dimension

Created:

* Year
* Quarter
* Month
* Month Name
* Day Name

---

# Product Dimension Support

Prepared:

* StockCode
* Description

for future product analysis.

---

# Customer Dimension Support

Prepared:

* Customer ID
* Country

for future customer analysis.

---

# Geographic Dimension Support

Prepared:

Country

for geographic reporting.

---

# Data Integration

## Objective

Unify multiple source periods into a single analytical dataset.

---

Input

retail_raw_2009_2010

*

retail_raw_2010_2011

↓

retail_staging

---

The staging layer now serves as a consolidated business dataset.

---

# Analytical Readiness Assessment

At this stage, the dataset can answer questions such as:

What was total revenue?

Which months generated the most sales?

Which quarter performed best?

Which countries generated the highest revenue?

Which products generated the highest revenue?

These questions could not be answered directly from the original source data.

Transformation enables these analytical capabilities.

---

# Transformation Deliverables

The transformation phase produced:

## Enhanced Revenue Attributes

Revenue

---

## Enhanced Time Dimensions

Year

Month

Month Name

Quarter

Day Name

---

## Analytical Dimensions

Country

Customer ID

Product Description

StockCode

---

## Enriched Dataset

retail_staging

---

# Transformation Validation Preparation

The transformation stage prepares data for validation.

Future validation activities will verify:

* Revenue accuracy
* Date calculations
* Quarter assignments
* Attribute consistency
* Business logic correctness

---

# Risks Mitigated

Transformation reduces:

* Reporting complexity
* Repetitive calculations
* Manual analysis effort
* Inconsistent business logic
* KPI discrepancies

---

# Success Criteria

The transformation phase was considered complete when:

✓ Revenue calculated

✓ Time dimensions created

✓ Month names generated

✓ Quarter logic applied

✓ Day intelligence created

✓ Analytical dimensions prepared

✓ Business enrichment completed

✓ Dataset ready for validation

---

# Output of Step 3

The transformation phase successfully converted trusted transactional data into meaningful business information.

Output Dataset:

retail_staging

Enhanced with:

✓ Revenue

✓ Year

✓ Month

✓ Month Name

✓ Quarter

✓ Day Name

✓ Analytical Attributes

The dataset now contains the business context required for reporting and analysis.

---

# Key Learning

Data becomes valuable when business meaning is attached to it.

Raw transactions describe events.

Transformed data explains business performance.

Transformation is the stage where technical information begins its journey toward strategic decision-making.

---

# DeTLeng Principle

Data transformation is not about changing data.

It is about revealing business meaning hidden within the data.

Every successful dashboard, KPI, report, and business insight begins with a transformation that converts technical records into understandable business information.

Transformation turns data into language the business can understand.
