# Step 1: Data Extraction

## Establishing a Reliable Data Ingestion Foundation in BigQuery

Data Extraction is the process of collecting data from source systems and making it available within the analytics environment.

While often considered a simple task, extraction is one of the most important stages of the Data Engineering lifecycle. Decisions made during this phase directly affect data quality, pipeline reliability, scalability, and future maintenance costs.

In a BigQuery-based architecture, the goal is not simply to move data.

The goal is to establish a repeatable, reliable, and scalable ingestion process that consistently delivers source data into the analytics platform.

---

# Phase 1: Source System Discovery

## Understanding Where Data Lives

Before any technical implementation begins, all business data sources must be identified.

Typical sources include:

* ERP Systems
* CRM Platforms
* Accounting Software
* E-Commerce Platforms
* Marketing Platforms
* Excel Files
* CSV Files
* Internal Databases
* APIs
* Third-Party Systems

The objective is to answer a simple question:

> What systems generate the business data we need?

### Deliverables

* Source inventory
* System owners
* Data access requirements
* Data refresh frequency
* Business purpose of each source

---

# Phase 2: Source Assessment

## Evaluating Data Accessibility

Not all systems expose data in the same way.

Each source must be evaluated to determine how data will be extracted.

Possible extraction methods:

### API Access

Examples:

* HubSpot
* Shopify
* Google Analytics
* Stripe

### Database Access

Examples:

* MySQL
* PostgreSQL
* SQL Server

### File-Based Sources

Examples:

* CSV
* Excel
* Google Sheets

### Cloud Storage

Examples:

* Google Cloud Storage
* AWS S3

### Deliverables

* Extraction method selected
* Authentication requirements documented
* Data ownership confirmed

---

# Phase 3: Data Mapping

## Identifying Required Business Entities

Not every table should be extracted.

The objective is to identify the data that supports business reporting requirements.

Examples:

### Sales Reporting

Required entities:

* Orders
* Order Items
* Products
* Customers

### Marketing Reporting

Required entities:

* Campaigns
* Traffic Sources
* Leads
* Conversions

### Finance Reporting

Required entities:

* Invoices
* Payments
* Expenses

### Deliverables

* Table inventory
* Entity inventory
* Required fields documented
* Data dictionary initiated

---

# Phase 4: BigQuery Landing Zone Design

## Creating the Raw Data Layer

Before extraction begins, a destination environment must be prepared.

A common BigQuery architecture includes:

### Raw Layer

Purpose:

Store source data exactly as received.

Example:

raw_shopify.orders

raw_hubspot.contacts

raw_ga4.events

No business logic should be applied here.

The raw layer acts as the system of record for ingestion.

### Deliverables

* BigQuery project configured
* Datasets created
* Access permissions assigned
* Naming standards established

---

# Phase 5: Initial Data Load

## Performing Historical Extraction

The first extraction normally loads historical data.

Examples:

* Last 12 months
* Last 24 months
* Full system history

This creates the initial analytical foundation.

Activities include:

* Full extraction
* Schema discovery
* Data type identification
* Initial load verification

### Deliverables

* Historical data loaded
* Row counts verified
* Initial schema documented

---

# Phase 6: Incremental Extraction Strategy

## Designing Ongoing Data Loads

After historical loading, incremental ingestion must be configured.

Instead of reloading everything every day, only new or modified records are extracted.

Common approaches:

### Timestamp-Based Loading

Example:

updated_at

created_at

### Change Data Capture (CDC)

Example:

Database transaction logs

### API Incremental Sync

Example:

Pull records modified since last execution

### Deliverables

* Incremental logic defined
* Watermark strategy established
* Refresh schedule documented

---

# Phase 7: Orchestration and Automation

## Making Extraction Repeatable

Manual extraction does not scale.

Pipelines must be automated.

Typical orchestration options:

* Cloud Scheduler
* Cloud Functions
* Cloud Run
* Apache Airflow
* Cloud Composer

The objective is to create a reliable ingestion process that executes automatically.

### Deliverables

* Automated workflow deployed
* Scheduling configured
* Retry logic implemented

---

# Phase 8: Monitoring and Logging

## Ensuring Operational Reliability

Data extraction should never operate as a black box.

Every execution should be monitored.

Key metrics include:

* Execution status
* Records processed
* Load duration
* Failed extractions
* API errors

Monitoring allows issues to be detected before they affect reporting.

### Deliverables

* Pipeline logs
* Error alerts
* Execution tracking dashboards

---

# Extraction Stage Completion Criteria

The extraction phase is considered complete when:

✓ All required source systems are connected

✓ Historical data is loaded into BigQuery

✓ Incremental ingestion is operational

✓ Automation is deployed

✓ Monitoring is active

✓ Raw data is available for downstream processing

At this point, business data has successfully moved from operational systems into BigQuery and is ready for the next stage:

**Data Cleaning and Quality Engineering.**

DeTLeng insight: Most companies think the dashboard is the project. In reality, by the time you've completed a proper extraction layer like this, you've already done a large part of the engineering work that makes trustworthy analytics possible.

