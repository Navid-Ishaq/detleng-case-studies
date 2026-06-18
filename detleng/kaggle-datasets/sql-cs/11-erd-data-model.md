# CS-003 Enterprise Data Architecture Blueprint

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/8c9d2023-6c75-4a17-8716-b457e0c6d5c1" />

## Designing the Foundational Data Structure for ETL, Analytics Engineering, Business Intelligence, and Executive Decision-Making

---

# Executive Summary

Following the successful completion of Orders, Customers, Products, Sellers, Payments, Reviews, Delivery & Logistics, and Geographic Intelligence investigations, the next phase of the DeTLeng methodology focuses on formalizing the enterprise data architecture.

This document establishes the official data model for the Brazilian E-Commerce Public Dataset by Olist and serves as the foundational blueprint for future ETL pipelines, analytics engineering, business intelligence reporting, dashboard development, and executive decision-support systems.

The objective of this architecture is to transform a collection of raw transactional tables into a structured, scalable, and analytics-ready ecosystem capable of supporting operational reporting, strategic planning, customer intelligence, revenue optimization, logistics monitoring, and marketplace growth initiatives.

---

# Dataset Information

## Dataset Name

Brazilian E-Commerce Public Dataset by Olist

## Source

Kaggle

## Dataset URL

https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce

---

# Business Context

The Olist platform operates as a multi-vendor e-commerce marketplace.

The business ecosystem consists of:

* Customers who create demand
* Orders that record transactions
* Products that satisfy demand
* Sellers who fulfill products
* Payments that generate revenue
* Reviews that measure customer satisfaction
* Geographic entities that determine market reach and logistics efficiency

Together, these entities form the core operational framework of the marketplace.

---

# Business Process Flow

The complete customer journey can be represented as:

Customer
→ Places Order
→ Purchases Products
→ Payment Processed
→ Seller Fulfills Order
→ Delivery Completed
→ Customer Leaves Review

This flow represents the primary revenue-generating lifecycle of the marketplace.

---

# Enterprise Data Domains

## Customer Domain

Responsible for customer identity and location.

Tables:

* customers

---

## Sales Domain

Responsible for transactional activity.

Tables:

* orders
* order_items

---

## Product Domain

Responsible for product catalog management.

Tables:

* products
* category_translation

---

## Seller Domain

Responsible for supply-side marketplace operations.

Tables:

* sellers

---

## Finance Domain

Responsible for revenue realization and payment behavior.

Tables:

* payments

---

## Customer Experience Domain

Responsible for customer satisfaction analysis.

Tables:

* reviews

---

## Geographic Intelligence Domain

Responsible for market coverage and logistics analysis.

Tables:

* geolocation

---

# Enterprise Data Asset Catalog

| Table                | Purpose                       |
| -------------------- | ----------------------------- |
| customers            | Customer master information   |
| orders               | Order transaction records     |
| order_items          | Product-level sales records   |
| products             | Product catalog               |
| sellers              | Seller master information     |
| payments             | Financial transaction records |
| reviews              | Customer feedback records     |
| geolocation          | Geographic reference data     |
| category_translation | Product category translation  |

---

# Primary Keys

| Table                | Primary Key                 |
| -------------------- | --------------------------- |
| customers            | customer_id                 |
| orders               | order_id                    |
| order_items          | order_id + order_item_id    |
| products             | product_id                  |
| sellers              | seller_id                   |
| payments             | order_id                    |
| reviews              | review_id                   |
| geolocation          | geolocation_zip_code_prefix |
| category_translation | product_category_name       |

---

# Relationship Matrix

| Parent Table         | Child Table | Relationship |
| -------------------- | ----------- | ------------ |
| customers            | orders      | 1 : Many     |
| orders               | order_items | 1 : Many     |
| products             | order_items | 1 : Many     |
| sellers              | order_items | 1 : Many     |
| orders               | payments    | 1 : Many     |
| orders               | reviews     | 1 : 1        |
| category_translation | products    | 1 : Many     |

---

# Official Enterprise Entity Relationship Diagram

CUSTOMERS
(customer_id)

↓

ORDERS
(order_id)

↓

ORDER_ITEMS
(order_id, order_item_id)

↓

+--------------------------+

↓

PRODUCTS

(product_id)

↓

CATEGORY_TRANSLATION

AND

↓

SELLERS

(seller_id)

Additional Relationships

ORDERS
→ PAYMENTS

ORDERS
→ REVIEWS

---

# Data Flow Architecture

The DeTLeng architecture follows a layered design approach.

RAW LAYER

cs003_olist_raw

↓

STAGING LAYER

cs003_olist_stg

↓

ANALYTICS LAYER

cs003_olist_analytics

↓

LOOKER STUDIO

↓

BUSINESS DECISION MAKING

---

# Proposed Analytics Star Schema

## Fact Table

fact_orders

Measures:

* Revenue
* Freight Cost
* Quantity Sold
* Delivery Days
* Review Score
* Payment Value

---

## Dimension Tables

dim_customer

dim_product

dim_seller

dim_geography

dim_payment

dim_date

---

# Business Value of the Architecture

This enterprise architecture enables:

* Customer Analytics
* Revenue Analytics
* Seller Performance Monitoring
* Product Performance Analysis
* Geographic Intelligence
* Delivery Optimization
* Customer Satisfaction Monitoring
* Executive KPI Reporting

The architecture also establishes a scalable foundation for future machine learning, forecasting, customer segmentation, and advanced analytics initiatives.

---

# Future Data Engineering Roadmap

## Phase 1

Completed

* Orders Postmortem
* Customers Postmortem
* Products & Sellers Postmortem
* Payments Postmortem
* Reviews Postmortem
* Delivery & Logistics Postmortem
* Geographic Intelligence Postmortem

---

## Phase 2

Next

* Staging Layer Design
* Data Standardization
* Business Rule Implementation
* Data Quality Checks

---

## Phase 3

Analytics Layer

* Fact Tables
* Dimension Tables
* KPI Layer
* Executive Metrics

---

## Phase 4

Business Intelligence

* Looker Studio Dashboards
* Executive Reporting
* Operational Reporting
* Self-Service Analytics

---

# DeTLeng Executive Conclusion

The CS-003 Enterprise Data Architecture establishes the foundational blueprint required to transform raw marketplace transactions into a structured analytics ecosystem.

The model successfully integrates customers, orders, products, sellers, payments, reviews, and geographic entities into a unified business framework capable of supporting enterprise-scale reporting, decision-making, and future analytical growth.

This architecture serves as the official foundation for all subsequent ETL, Analytics Engineering, Business Intelligence, and Data Platform initiatives within the CS-003 project.

---

By Muhammad Naveed

Founder of DeTLeng — Data Engineering, ETL & Analytics Solutions

[www.detleng.com](http://www.detleng.com)

https://insights.detleng.com

https://casestudy.detleng.com
