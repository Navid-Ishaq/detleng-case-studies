# DeTLeng Intelligent Data Platform Framework
## Version 1.0

---

# Purpose

This document defines the standard implementation architecture for all
DeTLeng Data Engineering, Business Intelligence, AI, and Automation
projects.

Every future client implementation should follow this framework unless
there is a justified business requirement to deviate.

The framework ensures:

- Consistency
- Scalability
- Automation
- AI Readiness
- Business Intelligence
- Maintainability

---

# DeTLeng Philosophy

We do not build dashboards.

We do not simply build ETL pipelines.

We build Intelligent Business Platforms that transform raw business data
into trusted business intelligence and AI-powered decision support.

---

# High-Level Architecture

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

---

# The DeTLeng Technology Flow

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

Every layer has a specific responsibility.

---

# Layer 1

## BigQuery

Purpose

Central Data Warehouse

Responsibilities

- Store Raw Data
- Store Staging Layer
- Store Analytics Layer
- Fact Tables
- Dimension Tables
- Historical Data
- Business KPIs

This is the Single Source of Truth.

Nothing bypasses BigQuery.

---

# Layer 2

## BigQuery Scheduled Queries

Purpose

Automate SQL execution.

Responsibilities

- Run staging transformations
- Run analytics transformations
- Refresh fact tables
- Refresh dimensions
- Schedule ETL jobs

Example

02:00 AM

↓

Run stg_orders.sql

↓

Run fact_sales.sql

↓

Run fact_delivery.sql

No manual execution.

---

# Layer 3

## Cloud Storage

Purpose

Landing area for incoming business data.

Typical Sources

- CSV
- Excel
- JSON
- API exports
- ERP exports

Example

Client uploads

sales_2026_07_03.csv

↓

Cloud Storage

Cloud Storage becomes the Raw Data Landing Zone.

---

# Layer 4

## Cloud Functions / Triggers

Purpose

Automatically detect new data.

Responsibilities

- Watch Cloud Storage
- Detect new files
- Load into Raw Layer
- Trigger ETL process
- Send notifications if required

Example

New CSV

↓

Cloud Function

↓

Load Raw Table

↓

Run Scheduled ETL

No human intervention.

---

# Layer 5

## n8n

Purpose

Business Process Automation

Responsibilities

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
- External Systems

n8n does NOT replace ETL.

It orchestrates business workflows.

Example

Daily Sales File

↓

BigQuery

↓

Generate Report

↓

Email CEO

↓

Notify Slack

---

# Layer 6

## MCP (Model Context Protocol)

Purpose

Connect AI to trusted business data.

Responsibilities

Allow AI to:

- Query BigQuery
- Read analytics tables
- Explain KPIs
- Answer business questions
- Generate summaries
- Assist executives

MCP never replaces ETL.

MCP never replaces BigQuery.

MCP provides AI access to the Analytics Layer.

Example

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

---

# Analytics Layer

Purpose

Create business-ready datasets.

Contains

- Fact Orders
- Fact Sales
- Fact Payments
- Fact Delivery
- Fact Reviews

Dimensions

- Customers
- Products
- Sellers
- Dates
- Geography

Every dashboard and every AI assistant must use this layer.

Never query Raw tables directly.

---

# Business Intelligence Layer

Purpose

Visual analytics.

Tools

- Power BI
- Looker Studio

Responsibilities

- Executive Dashboards
- Operational Dashboards
- KPI Monitoring
- Trend Analysis

---

# AI Layer

Purpose

Conversational Business Intelligence.

Technologies

- OpenAI
- Claude
- MCP

Capabilities

- Ask business questions
- Explain KPIs
- Generate executive reports
- Analyze trends
- Recommend actions

AI consumes Analytics Data.

AI never replaces Data Engineering.

---

# Automation Layer

Purpose

Remove repetitive manual work.

Examples

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

Everything happens automatically.

---

# DeTLeng Data Flow

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

---

# Responsibility Matrix

BigQuery

Responsible for

✓ Data

Cloud Storage

Responsible for

✓ File Landing

Scheduled Queries

Responsible for

✓ ETL Execution

Cloud Functions

Responsible for

✓ Automation Trigger

n8n

Responsible for

✓ Business Workflow Automation

MCP

Responsible for

✓ AI Connectivity

Power BI / Looker

Responsible for

✓ Visualization

OpenAI / Claude

Responsible for

✓ Conversational Analytics

---

# DeTLeng Core Principle

Data Engineering creates trusted data.

Business Intelligence visualizes trusted data.

Automation keeps trusted data updated.

Artificial Intelligence makes trusted data conversational.

Together they create an Intelligent Business Platform.

---

# Final Principle

The objective of DeTLeng is NOT to sell SQL.

The objective is NOT to sell dashboards.

The objective is to deliver an automated, scalable, AI-ready Business Intelligence Platform where:

• Business data flows automatically.
• ETL executes automatically.
• Dashboards refresh automatically.
• AI answers business questions.
• Executives make decisions using trusted information.

This is the standard implementation framework for all future DeTLeng projects.
