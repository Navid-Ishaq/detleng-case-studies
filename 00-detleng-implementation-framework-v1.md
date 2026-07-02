# DeTLeng Intelligent Data Platform Framework

## Version 1.0

---

# Purpose

This document defines the standard implementation architecture for all DeTLeng Data Engineering, Business Intelligence, AI, and Automation projects.

Every future client implementation should follow this framework unless there is a justified business requirement to deviate.

The framework ensures:

- Consistency
- Scalability
- Automation
- AI Readiness
- Business Intelligence
- Maintainability

---

# DeTLeng Philosophy

We do not simply build ETL pipelines.

We build Intelligent Business Platforms that transform raw business data into trusted Business Intelligence and AI-powered decision support.

---

# High-Level Architecture

```text
Business Data
        │
        ▼
Google Cloud Platform
        │
        ▼
Analytics Warehouse
        │
 ┌──────┴─────────┐
 ▼                ▼
Dashboards      AI Assistant
                (via MCP)
```

---

# The DeTLeng Technology Flow

```text
BigQuery
        ↓
Scheduled Queries
        ↓
Cloud Storage
        ↓
Cloud Functions
        ↓
n8n
        ↓
MCP
```

Every layer has a specific responsibility.

---

# Layer 1 — BigQuery

## Purpose

Central Data Warehouse

### Responsibilities

- Store Raw Data
- Store Staging Layer
- Store Analytics Layer
- Fact Tables
- Dimension Tables
- Historical Data
- Business KPIs

BigQuery is the **Single Source of Truth**.

Nothing bypasses BigQuery.

---

# Layer 2 — Scheduled Queries

## Purpose

Automate SQL execution.

### Responsibilities

- Run staging transformations
- Run analytics transformations
- Refresh fact tables
- Refresh dimension tables
- Execute ETL automatically

### Example

```text
02:00 AM

↓

Run stg_orders.sql

↓

Run fact_sales.sql

↓

Run fact_delivery.sql
```

No manual execution.

---

# Layer 3 — Cloud Storage

## Purpose

Landing area for incoming business data.

### Typical Sources

- CSV
- Excel
- JSON
- ERP exports
- API exports

### Example

```text
Client uploads

sales_2026_07_03.csv

↓

Cloud Storage
```

Cloud Storage becomes the Raw Data Landing Zone.

---

# Layer 4 — Cloud Functions / Triggers

## Purpose

Automatically detect new business data.

### Responsibilities

- Watch Cloud Storage
- Detect new files
- Load into Raw Layer
- Trigger ETL
- Send notifications

### Example

```text
New CSV

↓

Cloud Function

↓

Load Raw Table

↓

Trigger ETL
```

No human intervention.

---

# Layer 5 — n8n

## Purpose

Business Workflow Automation.

### Responsibilities

Connect BigQuery with:

- Google Drive
- Gmail
- Slack
- Microsoft Teams
- GitHub
- APIs
- CRM
- ERP
- OpenAI
- Claude
- External systems

n8n does **not** replace ETL.

It orchestrates business workflows.

### Example

```text
Daily Sales File

↓

BigQuery

↓

Generate Report

↓

Email CEO

↓

Notify Slack
```

---

# Layer 6 — MCP

## Purpose

Connect AI to trusted business data.

### Responsibilities

Allow AI to:

- Query BigQuery
- Read Analytics Layer
- Explain KPIs
- Answer business questions
- Generate summaries
- Support executives

MCP never replaces ETL.

MCP never replaces BigQuery.

MCP simply provides AI access to the Analytics Layer.

### Example

```text
CEO asks

"What was revenue this month?"

↓

AI

↓

MCP

↓

BigQuery

↓

fact_sales

↓

Business Answer
```

---

# Analytics Layer

## Purpose

Create business-ready datasets.

### Fact Tables

- fact_orders
- fact_sales
- fact_payments
- fact_delivery
- fact_reviews

### Dimension Tables

- dim_customers
- dim_products
- dim_sellers
- dim_dates
- dim_geography

Every dashboard and every AI assistant must consume this layer.

Never expose Raw tables directly.

---

# Business Intelligence Layer

## Purpose

Visual Analytics.

### Tools

- Power BI
- Looker Studio

### Responsibilities

- Executive Dashboards
- Operational Reporting
- KPI Monitoring
- Trend Analysis

---

# AI Layer

## Purpose

Conversational Business Intelligence.

### Technologies

- OpenAI
- Claude
- MCP

### Capabilities

- Ask business questions
- Explain KPIs
- Generate executive summaries
- Analyze trends
- Recommend actions

AI consumes the Analytics Layer.

AI never replaces Data Engineering.

---

# Automation Layer

## Purpose

Remove repetitive manual work.

### Example

```text
Daily CSV

↓

Automatic Import

↓

Automatic ETL

↓

Dashboard Refresh

↓

Executive Notification

↓

AI Ready
```

Everything happens automatically.

---

# Complete DeTLeng Data Flow

```text
Business Files / APIs
        │
        ▼
Cloud Storage
        │
        ▼
Cloud Functions
        │
        ▼
BigQuery Raw Layer
        │
        ▼
Scheduled Queries
        │
        ▼
Staging Layer
        │
        ▼
Scheduled Queries
        │
        ▼
Analytics Layer
        │
        ├──────────────► Power BI
        │
        ├──────────────► Looker Studio
        │
        └──────────────► MCP
                              │
                              ▼
                     AI Business Assistant
```

---

# Responsibility Matrix

| Component | Responsibility |
|------------|----------------|
| BigQuery | Data Warehouse |
| Cloud Storage | File Landing Zone |
| Scheduled Queries | ETL Execution |
| Cloud Functions | Automation Trigger |
| n8n | Business Workflow Automation |
| MCP | AI Connectivity |
| Power BI / Looker Studio | Visualization |
| OpenAI / Claude | Conversational Analytics |

---

# DeTLeng Core Principle

Data Engineering creates trusted data.

Business Intelligence visualizes trusted data.

Automation keeps trusted data updated.

Artificial Intelligence makes trusted data conversational.

Together they create an Intelligent Business Platform.

---

# Final Principle

The objective of DeTLeng is **not** to sell SQL.

The objective is **not** to sell dashboards.

The objective is to deliver an automated, scalable, AI-ready Business Intelligence Platform where:

- Business data flows automatically.
- ETL executes automatically.
- Dashboards refresh automatically.
- AI answers business questions.
- Executives make decisions using trusted information.

This framework becomes the standard implementation architecture for every future DeTLeng client project.
