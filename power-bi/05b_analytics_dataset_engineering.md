# 05_analytics_dataset_engineering_and_data_modeling.md

# Step 5: Analytics Dataset Engineering & Data Modeling

## Transforming Trusted Business Information into Analytics-Ready Assets

---

## Executive Overview

Analytics Dataset Engineering and Data Modeling represent the stage where trusted business information is transformed into structured analytical assets capable of supporting reporting, Business Intelligence, KPI development, and decision-making.

At this point in the Data Engineering lifecycle:

* Data has been extracted.
* Data has been cleaned.
* Data has been transformed.
* Data has been validated.

The organization now possesses trusted business information.

However, trusted information alone is not sufficient for analytics.

Business Intelligence platforms require carefully designed analytical structures that allow data to be queried, filtered, aggregated, and analyzed efficiently.

This stage focuses on engineering those structures.

---

# Why Data Modeling Matters

Many organizations attempt to build reports directly from operational datasets.

While this approach may work for small datasets, it quickly creates challenges:

* Slow report performance
* Duplicate business logic
* Inconsistent KPI calculations
* Complex report development
* Difficult maintenance

Data Modeling solves these problems by organizing business information into analytical structures specifically designed for reporting and analysis.

The objective is simple:

> Make business questions easy to answer.

---

# What Is Data Modeling?

Data Modeling is the process of organizing business information into structured relationships that accurately represent how a business operates.

A well-designed model allows organizations to answer questions such as:

* What is total revenue?
* Who are the top customers?
* Which products perform best?
* Which countries generate the most sales?
* How is performance changing over time?

Rather than repeatedly combining datasets inside reports, Data Modeling creates a reusable analytical foundation.

---

# Analytics Architecture

```text
Raw Data

↓

Clean Data

↓

Business Information

↓

Validated Information

↓

Analytics Dataset Engineering

↓

Data Modeling

↓

KPIs & Measures

↓

Reports & Dashboards

↓

Business Decisions
```

---

# Fact Table Engineering

## What Is a Fact Table?

Fact tables contain measurable business events.

They answer questions such as:

* How much?
* How many?
* How often?

Examples:

* Sales Transactions
* Orders
* Payments
* Inventory Movements

---

## Fact Table Created

### fact_sales

Purpose:

Store measurable sales activity.

Contains:

* Invoice Number
* Product Identifier
* Customer Identifier
* Date Identifier
* Revenue
* Quantity
* Unit Price

Business Questions Supported:

* Total Revenue
* Total Orders
* Total Quantity Sold
* Sales Trends

---

# Dimension Engineering

## What Is a Dimension Table?

Dimension tables provide business context.

Fact tables tell us:

> Something happened.

Dimension tables tell us:

> Who?
>
> What?
>
> When?
>
> Where?

Dimensions make business information understandable.

---

## Customer Dimension

### dim_customer

Contains:

* Customer ID
* Country

Purpose:

Support customer analytics.

---

## Product Dimension

### dim_product

Contains:

* StockCode
* Product Description

Purpose:

Support product performance analysis.

---

## Date Dimension

### dim_date

Contains:

* Date
* Year
* Quarter
* Month
* Month Name
* Day Name

Purpose:

Support time intelligence and trend analysis.

---

## Country Dimension

### dim_country

Contains:

* Country

Purpose:

Support geographic analysis.

---

# Why Relationships Matter

Data stored in separate tables cannot create business intelligence unless those tables can communicate with one another.

Relationships allow business entities to work together.

Example:

Business Question:

> Which products generated the highest revenue in Germany during Q4?

To answer this question, information must come from multiple business entities:

* Sales Transactions
* Products
* Countries
* Dates

Relationships connect these entities.

Without relationships, these datasets remain isolated.

With relationships, they become business intelligence.

---

# Relationship Design

Relationships were created between:

```text
fact_sales

├── dim_customer

├── dim_product

├── dim_date

└── dim_country
```

These relationships allow Power BI to filter, aggregate, and analyze data correctly.

---

# Star Schema Design

## What Is a Star Schema?

A Star Schema is the preferred analytical structure for Business Intelligence systems.

It consists of:

* One central fact table
* Multiple supporting dimensions

Example:

```text
                 dim_date

                    |

dim_product --- fact_sales --- dim_customer

                    |

               dim_country
```

---

## Benefits of a Star Schema

* Faster reporting
* Simpler maintenance
* Better scalability
* Consistent KPI calculations
* Improved dashboard performance
* Easier analytical development

---

# KPI Engineering

Once the model was established, KPI calculations were created.

Examples:

* Total Revenue
* Total Orders
* Total Customers
* Total Products
* Revenue by Country
* Revenue by Product
* Revenue by Month

All KPIs rely on the underlying model.

Without the model, KPI consistency cannot be guaranteed.

---

# Business Value

Before Data Modeling:

* Data existed.
* Reporting was difficult.
* Analysis was fragmented.

After Data Modeling:

* Business information became connected.
* KPIs became consistent.
* Reporting became scalable.
* Analytics became reusable.

---

# Success Criteria

The Analytics Dataset Engineering & Data Modeling phase is complete when:

* Fact tables are created.
* Dimension tables are created.
* Relationships are established.
* Star schema is implemented.
* KPIs are defined.
* Business logic is documented.
* Analytical model is approved.

---

# Output

The project produced:

* fact_sales
* dim_customer
* dim_product
* dim_date
* dim_country
* Analytical Relationships
* KPI Framework
* Business Intelligence Foundation

---

# DeTLeng Principle

Dashboards do not create Business Intelligence.

Data Models create Business Intelligence.

Dashboards simply make that intelligence visible.

At DeTLeng, we engineer trusted analytical foundations before building reporting solutions.

Because every KPI, report, dashboard, and business decision ultimately depends on the quality of the data model behind it.
