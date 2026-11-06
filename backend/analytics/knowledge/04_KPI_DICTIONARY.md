# KPI_DICTIONARY.md

# DeTLeng Business Intelligence KPI Dictionary

Dataset

cs003_olist_analytics

Version

1.0

This document defines every supported Business Intelligence KPI.

These KPI definitions are the source of truth for the AI Assistant.

Never invent KPIs.

Never invent business calculations.

Only use the KPIs defined in this document.

------------------------------------------------------------

# Executive KPIs

## Total Revenue

Business Meaning

Total sales generated.

Fact Table

fact_sales

Metric

SUM(total_sale_value)

------------------------------------------------------------

## Total Orders

Business Meaning

Total number of customer orders.

Fact Table

fact_orders

Metric

COUNT(DISTINCT order_id)

------------------------------------------------------------

## Total Customers

Business Meaning

Total unique customers.

Dimension

dim_customers

Metric

COUNT(customer_key)

------------------------------------------------------------

## Total Products

Business Meaning

Total products available.

Dimension

dim_products

Metric

COUNT(product_key)

------------------------------------------------------------

## Total Sellers

Business Meaning

Total registered sellers.

Dimension

dim_sellers

Metric

COUNT(seller_key)

------------------------------------------------------------

## Total Categories

Business Meaning

Number of product categories.

Dimension

dim_products

Metric

COUNT(DISTINCT product_category_name)

------------------------------------------------------------

# Sales KPIs

## Revenue by Category

Fact

fact_sales

Dimension

dim_products

Metric

SUM(total_sale_value)

Group By

product_category_name

------------------------------------------------------------

## Revenue by Seller

Fact

fact_sales

Dimension

dim_sellers

Metric

SUM(total_sale_value)

Group By

seller_state

seller_city

seller_id

------------------------------------------------------------

## Top Product Categories

Fact

fact_sales

Dimension

dim_products

Metric

SUM(total_sale_value)

Sort

DESC

Limit

10

------------------------------------------------------------

## Bottom Product Categories

Same KPI

Sort

ASC

Limit

10

------------------------------------------------------------

## Top Products

Fact

fact_sales

Dimension

dim_products

Metric

SUM(total_sale_value)

Sort

DESC

------------------------------------------------------------

## Bottom Products

Fact

fact_sales

Dimension

dim_products

Metric

SUM(total_sale_value)

Sort

ASC

------------------------------------------------------------

# Customer KPIs

## Customers by State

Dimension

dim_customers

Metric

COUNT(customer_key)

Group By

customer_state

------------------------------------------------------------

## Customers by City

Dimension

dim_customers

Metric

COUNT(customer_key)

Group By

customer_city

------------------------------------------------------------

# Delivery KPIs

## Average Delivery Days

Fact

fact_delivery

Metric

AVG(delivery_days)

------------------------------------------------------------

## Delivery Performance

Fact

fact_delivery

Metrics

AVG(delivery_days)

AVG(delivery_variance_days)

SUM(on_time_delivery_flag)

SUM(late_delivery_flag)

------------------------------------------------------------

# Payment KPIs

## Average Payment Value

Fact

fact_payments

Metric

AVG(payment_value)

------------------------------------------------------------

## Revenue by Payment Type

Fact

fact_payments

Metric

SUM(payment_value)

Group By

payment_type

------------------------------------------------------------

## Payment Installments

Fact

fact_payments

Metric

AVG(payment_installments)

------------------------------------------------------------

# Review KPIs

## Average Rating

Fact

fact_reviews

Metric

AVG(review_score)

------------------------------------------------------------

## Rating Distribution

Fact

fact_reviews

Metric

COUNT(review_score)

Group By

review_score

------------------------------------------------------------

# Time Intelligence

## Monthly Revenue

Fact

fact_sales

Dimension

dim_dates

Metric

SUM(total_sale_value)

Group By

calendar_year

calendar_month

------------------------------------------------------------

## Quarterly Revenue

Fact

fact_sales

Dimension

dim_dates

Metric

SUM(total_sale_value)

Group By

calendar_year

calendar_quarter

------------------------------------------------------------

## Yearly Revenue

Fact

fact_sales

Dimension

dim_dates

Metric

SUM(total_sale_value)

Group By

calendar_year

------------------------------------------------------------

## Month over Month Growth

Fact

fact_sales

Dimension

dim_dates

Metric

SUM(total_sale_value)

Comparison

Previous Month

------------------------------------------------------------

## Year over Year Growth

Fact

fact_sales

Dimension

dim_dates

Metric

SUM(total_sale_value)

Comparison

Previous Year

------------------------------------------------------------

# Geography KPIs

## Revenue by State

Fact

fact_sales

Dimension

dim_sellers

Metric

SUM(total_sale_value)

Group By

seller_state

------------------------------------------------------------

## Revenue by City

Fact

fact_sales

Dimension

dim_sellers

Metric

SUM(total_sale_value)

Group By

seller_city

------------------------------------------------------------

# AI Rules

The AI must NEVER invent KPIs.

The AI must NEVER change KPI formulas.

The AI must NEVER estimate values.

Every KPI must use the documented fact table.

Every grouping must use the documented dimension.

Every aggregation must follow this document.

If a KPI is not listed here, the AI must report:

"This KPI is currently not available through the Business Intelligence layer."

------------------------------------------------------------

# Supported Aggregations

SUM

COUNT

COUNT DISTINCT

AVG

MIN

MAX

------------------------------------------------------------

# Forbidden Behaviour

Never invent metrics.

Never invent formulas.

Never invent joins.

Never use columns outside the analytics schema.

Never calculate unsupported KPIs.