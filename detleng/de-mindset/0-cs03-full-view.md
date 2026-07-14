# AI Business Assistant (Case Study 003)

## Project Overview

This project is an AI-powered Business Intelligence Assistant built as part of **Case Study 003 – Building an Analytics-Ready E-Commerce Dataset with Google BigQuery**.

It combines Data Engineering, Analytics Engineering, BigQuery, FastAPI, and Model Context Protocol (MCP) to allow users to interact with trusted analytical data using natural language.

The objective is **not** to build a general chatbot.

The objective is to build a **Business Intelligence Assistant** capable of answering business questions using curated BigQuery analytics.

---

# Current Technology Stack

## Backend

* Python
* FastAPI
* OpenAI Responses API
* MCP Client
* Deterministic Tool Routing

---

## AI Layer

* OpenAI
* System Prompt
* Tool Calling
* Natural Language Interface

---

## Business Intelligence Layer

* Custom BigQuery MCP Server
* 100+ Business Intelligence Tools
* Deterministic Tool Selection
* Analytics-first Architecture

---

## Data Platform

* Google BigQuery
* Analytics Dataset
* Star Schema
* Fact Tables
* Dimension Tables

---

## Frontend

* HTML
* JavaScript
* Chat Interface

---

## Deployment

* GitHub
* Render

---

# Current Verified Features

The following functionality is implemented.

## AI Chat Interface

Users can ask business questions in natural language.

Example

* Total Revenue
* Total Orders
* Customer Count
* Top Categories
* Average Delivery Days

---

## BigQuery Integration

The assistant retrieves data from a live BigQuery analytics dataset through the MCP server.

It does not directly expose unrestricted SQL access.

---

## MCP Integration

The assistant communicates with a custom BigQuery MCP Server.

The MCP server exposes curated Business Intelligence tools instead of raw database access.

---

## Business Intelligence Tools

The MCP layer exposes more than 100 business tools including:

Executive KPIs

Revenue Analytics

Customer Analytics

Product Analytics

Seller Analytics

Delivery Analytics

Payment Analytics

Review Analytics

Time Intelligence

Geography Analytics

Order Analytics

---

## Deterministic Tool Routing

The backend contains deterministic routing logic.

Known business questions are routed directly to the correct MCP tool instead of relying entirely on LLM reasoning.

---

## Structured Business Responses

Business answers include

* KPI
* Short explanation
* Business insight
* Recommendations

---

## Dataset Information

The assistant can report

Project

Dataset

Server Status

Application

---

## Enterprise Documentation

The project contains documentation describing

Business Model

Relationships

KPIs

Table Grain

Query Safety Rules

Business Tool Specifications

Analytics Schema

---

## Knowledge Layer

The backend includes a business knowledge layer describing

DeTLeng

Data Engineering

Analytics Engineering

Business Intelligence

BigQuery

AI

Services

Company Information

---

# Analytics Dataset

Current dataset

```
Project

detleng-case-studies

Dataset

cs003_olist_analytics
```

Analytics model

```
5 Dimension Tables

5 Fact Tables
```

Star schema architecture.

---

# Supported Question Types

Examples

Executive KPIs

```
Total Revenue

Total Orders

Customer Count

Average Order Value

Revenue per Customer
```

Revenue Analytics

```
Revenue by State

Revenue by Seller

Revenue by Product

Revenue by Category

Revenue by Month
```

Customer Analytics

```
Top Customers

Customers by State

Customer Lifetime Value

Average Customer Spend
```

Product Analytics

```
Top Products

Bottom Products

Top Categories

Product Performance
```

Delivery

```
Average Delivery Days

Late Deliveries

On-time Deliveries

Delivery Performance
```

Reviews

```
Average Rating

Rating Distribution

Highest Rated Products

Lowest Rated Products
```

Payments

```
Payment Types

Installments

Average Payment
```

Time Intelligence

```
Monthly Revenue

Quarterly Revenue

Yearly Revenue

Month over Month Growth

Year over Year Growth
```

---

# Current Architecture

```
User

↓

HTML Frontend

↓

FastAPI Backend

↓

Deterministic Router

↓

OpenAI

↓

MCP Client

↓

BigQuery MCP Server

↓

Business Intelligence Tools

↓

Google BigQuery Analytics Dataset
```

---

# Current Strengths

Enterprise architecture

Analytics-first design

Reusable MCP server

Production deployment

Business Intelligence abstraction

Natural language interface

Secure analytics access

Reusable tool architecture

Good separation of responsibilities

Scalable documentation

---

# Current Known Limitations

The following items are **not yet verified**.

## RAG

Unknown.

The current implementation may rely on prompts and deterministic routing rather than Retrieval-Augmented Generation.

Needs verification.

---

## SQL Generation

Unknown.

Some MCP tools execute predefined SQL.

Whether the assistant generates SQL dynamically for arbitrary user questions needs verification.

---

## Dynamic Tool Discovery

Unknown.

Need to verify whether tool discovery is automatic or registry-based.

---

## Conversation Memory

Unknown.

Need to verify whether multi-turn context is preserved across requests.

---

## Streaming Responses

Unknown.

Needs verification.

---

## Authentication

Unknown.

Needs verification.

---

## Rate Limiting

Unknown.

Needs verification.

---

## Caching

Unknown.

Needs verification.

---

## Observability

Unknown.

Need to verify logging, monitoring, metrics, and tracing.

---

## Error Recovery

Partially implemented.

Needs complete review.

---

## Prompt Architecture

Needs documentation.

Need to inspect

* system prompt
* routing prompt
* tool instructions

---

# Files That Require Technical Review

To fully understand the project, these files should be inspected.

Backend

```
main.py

executor.py

registry.py

mcp_client.py
```

MCP Server

```
server.py

registry.py

tools/

bigquery_client.py
```

Prompts

```
prompts/

system_prompt.md
```

Knowledge

```
knowledge/

Business Model

Relationships

KPIs

Tool Specifications
```

---

# Summary

This project is **not** a generic chatbot.

It is an **AI-powered Business Intelligence platform** built on top of:

* Google BigQuery
* Analytics Engineering
* Star Schema
* Model Context Protocol (MCP)
* FastAPI
* OpenAI
* Deterministic Tool Routing
* Enterprise Documentation

It enables business users to query trusted analytics using natural language while protecting the underlying analytics warehouse behind a curated Business Intelligence layer.

**Overall maturity:** Advanced prototype / production-style architecture with a strong Data Engineering foundation and extensible Business Intelligence capabilities.
