# DeTLeng Business Intelligence Assistant Framework
## Version 1.0

---

# Purpose

This document defines the standard implementation roadmap for transforming an existing DeTLeng AI chatbot into an AI-powered Business Intelligence Assistant using:

- Google BigQuery
- MCP (Model Context Protocol)
- OpenAI Responses API
- Analytics-Ready Data Warehouse

This framework will be reused across all future DeTLeng implementations.

---

# Objective

Current Situation

```text
Case Study Website
        │
        ▼
Agents DeTLeng Chatbot
        │
        ▼
OpenAI API
        │
        ▼
General Company Information
```

Target Architecture

```text
Case Study Website
        │
        ▼
Business Intelligence Assistant
        │
        ▼
OpenAI Responses API
        │
        ▼
MCP BigQuery Server
        │
        ▼
Analytics Warehouse
```

Goal

Allow users to ask business questions using natural language while AI retrieves answers directly from the Analytics Layer.

---

# Why We Implement Step-by-Step

Do NOT connect everything at once.

Reason

If something fails, it becomes difficult to determine whether the issue exists in:

- OpenAI API
- MCP Server
- BigQuery
- Authentication
- Permissions
- Prompt Engineering

Each component must be verified independently.

---

# Current DeTLeng Architecture

Completed

```text
Raw Layer
        │
        ▼
Staging Layer
        │
        ▼
Analytics Layer
```

Current Analytics Dataset

```text
cs003_olist_analytics
```

Contains

- fact_sales
- fact_orders
- fact_payments
- fact_delivery
- fact_reviews

Dimensions

- dim_customers
- dim_products
- dim_sellers
- dim_dates
- dim_geography

This dataset becomes the AI Knowledge Source.

---

# Phase 1
## Build the Business Intelligence Assistant

Objective

Replace the existing informational chatbot with a business-aware assistant.

Current

```text
User

↓

Chatbot

↓

General Information
```

Future

```text
User

↓

AI

↓

MCP

↓

BigQuery

↓

Business Answer
```

---

# Step 1
## Install MCP Server

Objective

Enable AI to communicate with BigQuery.

Recommendation

Use the official Google BigQuery MCP Server whenever possible.

Alternative

Community BigQuery MCP implementation.

Deliverable

Working MCP Server connected to Google Cloud.

---

# Step 2
## Configure Authentication

Create a dedicated Google Cloud Service Account.

Grant

BigQuery Read Permission

Only for

```text
cs003_olist_analytics
```

Never expose

- Raw Layer
- Staging Layer

AI should only access trusted business data.

---

# Step 3
## Restrict AI Access

The assistant must NEVER query raw business tables.

Approved Dataset

```text
cs003_olist_analytics
```

Approved Tables

- fact_sales
- fact_orders
- fact_payments
- fact_delivery
- fact_reviews
- dim_customers
- dim_products
- dim_sellers
- dim_dates
- dim_geography

Principle

AI consumes trusted analytics.

AI never consumes raw operational data.

---

# Step 4
## Configure System Prompt

Example

```text
You are the DeTLeng Business Intelligence Assistant.

Whenever users ask business questions,
use the BigQuery MCP Server.

Answer only from the Analytics Layer.

Never invent data.

Never guess business metrics.

If data is unavailable,
inform the user honestly.
```

Purpose

The prompt defines the assistant's behaviour and prevents hallucination.

---

# Step 5
## Test Initial Queries

Start with simple business questions.

Examples

Question

```text
How many customers exist?
```

Expected Flow

```text
User

↓

OpenAI

↓

MCP

↓

BigQuery

↓

SQL Generation

↓

Query Execution

↓

Results

↓

Business Explanation
```

Additional Tests

```text
Total Revenue
```

```text
Top 10 Products
```

```text
Average Delivery Time
```

```text
Top Customers
```

```text
Monthly Sales
```

Goal

Verify that the complete AI → MCP → BigQuery → AI workflow functions correctly.

---

# Step 6
## Improve AI Context

AI generates better SQL when it understands the warehouse.

Create documentation for every table.

Example

fact_sales.md

```text
Purpose

Stores sales metrics.

Business KPIs

Revenue

Freight

Quantity

Granularity

One row per order item.
```

Repeat for

- fact_orders
- fact_delivery
- fact_payments
- fact_reviews
- dim_customers
- dim_products
- dim_dates
- dim_sellers
- dim_geography

Purpose

Improve SQL quality.

Improve business explanations.

Improve AI understanding.

---

# Future Automation

Current

Static Analytics Dataset

Future

```text
Daily Business Data

↓

Cloud Storage

↓

Cloud Functions

↓

Raw Layer

↓

Scheduled Queries

↓

Staging Layer

↓

Scheduled Queries

↓

Analytics Layer

↓

Dashboard Refresh

↓

AI Ready
```

The Business Intelligence Assistant will always query the latest Analytics Layer automatically.

No additional AI configuration will be required.

---

# Final Architecture

```text
                    Case Study Website
                             │
                             ▼
          DeTLeng Business Intelligence Assistant
                             │
                             ▼
                 OpenAI Responses API
                             │
                             ▼
                  MCP BigQuery Server
                             │
                             ▼
                 cs003_olist_analytics
                             │
       ┌─────────────────────┼─────────────────────┐
       ▼                     ▼                     ▼
 fact_sales           fact_orders          dim_customers
 fact_payments        fact_delivery        dim_products
 fact_reviews                               dim_dates
                                            dim_sellers
                                            dim_geography
                             │
                             ▼
                  Trusted Business Answers
```

---

# Product Positioning

Do NOT replace the existing website chatbot.

Instead create a dedicated product.

Recommended Name

**DeTLeng Business Intelligence Assistant**

Alternative Names

- Ask the Data
- BI Assistant
- Analytics Copilot
- Executive Insight Assistant

Reason

Current chatbot responsibilities

- Company Information
- Services
- Contact Details

Business Intelligence Assistant responsibilities

- Revenue
- Orders
- Customers
- Products
- KPIs
- Business Analytics
- Executive Insights

Both assistants solve different business problems.

---

# Implementation Checklist

## Infrastructure

- [ ] Install MCP Server
- [ ] Create Google Cloud Service Account
- [ ] Configure BigQuery Authentication
- [ ] Restrict Dataset Permissions

---

## AI

- [ ] Configure OpenAI Responses API
- [ ] Create Business Intelligence System Prompt
- [ ] Connect MCP Server
- [ ] Validate SQL Generation

---

## Testing

- [ ] Customer Queries
- [ ] Revenue Queries
- [ ] Sales Queries
- [ ] Product Queries
- [ ] Delivery Queries

---

## Documentation

- [ ] fact_sales.md
- [ ] fact_orders.md
- [ ] fact_payments.md
- [ ] fact_delivery.md
- [ ] fact_reviews.md
- [ ] dim_customers.md
- [ ] dim_products.md
- [ ] dim_sellers.md
- [ ] dim_dates.md
- [ ] dim_geography.md

---

# Future Roadmap

Phase 1

Business Intelligence Assistant

↓

Phase 2

Automated ETL

↓

Phase 3

Live Dashboards

↓

Phase 4

Conversational Business Intelligence

↓

Phase 5

Intelligent Business Platform

---

# DeTLeng Principle

Data Engineering creates trusted data.

Business Intelligence transforms trusted data into insights.

Automation keeps trusted data continuously updated.

Artificial Intelligence makes trusted data conversational.

Together, they form the DeTLeng Intelligent Business Platform.

---

# Final Objective

The objective is not to build another chatbot.

The objective is to build an AI-powered Business Intelligence Assistant capable of answering real business questions directly from a trusted Analytics Warehouse.

This implementation becomes the standard architecture for all future DeTLeng Business Intelligence solutions.
