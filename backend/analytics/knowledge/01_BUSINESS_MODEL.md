# BUSINESS_MODEL.md

# DeTLeng Business Intelligence Dataset

## Project

Case Study 003

Application:
DeTLeng AI Business Intelligence Assistant

Dataset:

cs003_olist_analytics

Project Type:

Analytics Engineering
Business Intelligence
Data Engineering
Artificial Intelligence

---

# Business Domain

Brazilian E-Commerce Analytics

The dataset represents an online marketplace where customers purchase products from multiple sellers.

The analytics platform has been transformed into a Business Intelligence semantic layer that allows AI to answer business questions using trusted KPIs.

The AI Assistant never queries raw operational tables.

It only uses the analytics layer.

---

# Analytics Architecture

The analytics warehouse follows a Star Schema.

Dimension Tables

- dim_customers
- dim_products
- dim_dates
- dim_geography
- dim_sellers

Fact Tables

- fact_orders
- fact_sales
- fact_payments
- fact_delivery
- fact_reviews

The analytics layer is the only source used for reporting and AI.

---

# Business Areas

The Business Intelligence layer supports the following business domains.

## Executive Dashboard

Executive KPIs
Business Overview
Revenue
Orders
Customers
Products
Sellers

---

## Sales Analytics

Revenue Analysis

Product Performance

Category Performance

Sales Trends

Growth Analysis

---

## Customer Analytics

Customer Count

Customer Spending

Customer Geography

Customer Lifetime Value

Customer Distribution

---

## Product Analytics

Top Products

Bottom Products

Category Performance

Product Revenue

Product Pricing

---

## Seller Analytics

Top Sellers

Seller Revenue

Seller Geography

Seller Performance

---

## Payment Analytics

Payment Types

Average Payment

Installments

Revenue by Payment Type

---

## Delivery Analytics

Average Delivery Days

Delivery Performance

Delivery Time Analysis

---

## Review Analytics

Average Rating

Rating Distribution

Product Reviews

Customer Satisfaction

---

## Geography Analytics

Revenue by State

Revenue by City

Customers by State

Customers by City

---

## Time Intelligence

Monthly Revenue

Quarterly Revenue

Yearly Revenue

Month over Month Growth

Year over Year Growth

---

# AI Assistant Responsibilities

The AI Assistant has two responsibilities.

1.

Business Knowledge

Explain concepts such as

- Data Engineering
- ETL
- ELT
- BigQuery
- Business Intelligence
- Analytics Engineering
- Artificial Intelligence
- Dashboards
- Data Warehousing

2.

Business Intelligence

Answer KPI questions using the MCP Business Intelligence tools.

The AI must never invent KPI values.

All business values must come from the MCP server.

---

# Data Source Policy

Business KPI answers must always use the analytics dataset.

Dataset

cs003_olist_analytics

Raw datasets must never be queried.

---

# Design Principle

The analytics layer represents trusted business data.

Fact tables contain measurable business events.

Dimension tables provide business context.

Every KPI is calculated from the analytics layer.

The AI Assistant is not a chatbot.

It is a Business Intelligence Assistant built on trusted analytics.