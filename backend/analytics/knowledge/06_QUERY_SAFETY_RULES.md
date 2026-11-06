# QUERY_SAFETY_RULES.md

# DeTLeng Analytics AI
## BigQuery Query Safety Rules

Version: 1.0

Status: FINAL

Purpose

These rules are mandatory for every SQL query generated for the
DeTLeng Business Intelligence MCP Server.

These rules exist to:

- prevent expensive queries
- prevent invalid SQL
- prevent incorrect joins
- keep BigQuery costs predictable
- ensure deterministic Business Intelligence

------------------------------------------------------------
1. DATASET
------------------------------------------------------------

Only use:

cs003_olist_analytics

Never use:

cs003_olist_raw

Never scan raw tables.

------------------------------------------------------------
2. SQL GENERATION
------------------------------------------------------------

SQL must be deterministic.

Never generate SQL dynamically.

Every MCP Tool owns one SQL query.

The SQL should only change if the tool itself is intentionally updated.

------------------------------------------------------------
3. SELECT RULES
------------------------------------------------------------

Never use

SELECT *

Always select only the required columns.

GOOD

SELECT
customer_state,
SUM(total_sale_value)

BAD

SELECT *

------------------------------------------------------------
4. LIMIT RULES
------------------------------------------------------------

Whenever returning lists,
always use LIMIT.

Examples

Top Products

LIMIT 10

Top Sellers

LIMIT 10

Top Customers

LIMIT 10

Revenue by City

LIMIT 20

Never return entire tables.

------------------------------------------------------------
5. AGGREGATION
------------------------------------------------------------

Always aggregate before returning data.

Examples

SUM()

COUNT()

AVG()

MIN()

MAX()

GROUP BY

Avoid returning row-level data unless the tool specifically requires it.

------------------------------------------------------------
6. TABLE GRAIN
------------------------------------------------------------

Always respect table grain.

fact_orders

1 row = 1 order

fact_sales

1 row = 1 order item

fact_reviews

1 row = 1 review

fact_payments

1 row = 1 payment transaction

fact_delivery

1 row = 1 delivery record

Never ignore grain when writing SQL.

------------------------------------------------------------
7. APPROVED TABLES
------------------------------------------------------------

Revenue

fact_sales

Orders

fact_orders

Delivery

fact_delivery

Payments

fact_payments

Reviews

fact_reviews

Customers

dim_customers

Products

dim_products

Sellers

dim_sellers

Dates

dim_dates

Geography

dim_geography

------------------------------------------------------------
8. JOINS
------------------------------------------------------------

Only use documented joins from

RELATIONSHIPS.md

Never invent joins.

Never guess relationships.

Never join on unknown columns.

------------------------------------------------------------
9. BUSINESS KEYS
------------------------------------------------------------

Approved keys

order_id

customer_key

product_key

seller_key

date_key

geography_key

Never use columns that do not exist.

Example

order_key

This column does not exist.

------------------------------------------------------------
10. COUNT RULES
------------------------------------------------------------

Orders

COUNT(DISTINCT order_id)

Customers

COUNT(DISTINCT customer_key)

Products

COUNT(DISTINCT product_key)

Sellers

COUNT(DISTINCT seller_key)

Never count rows from fact_sales when calculating orders.

------------------------------------------------------------
11. REVENUE RULES
------------------------------------------------------------

Revenue is always

SUM(total_sale_value)

Table

fact_sales

Never calculate revenue from

fact_orders

------------------------------------------------------------
12. TIME ANALYSIS
------------------------------------------------------------

Use

date_key

Join

dim_dates

Never derive dates manually if the Date Dimension already contains them.

------------------------------------------------------------
13. PERFORMANCE
------------------------------------------------------------

Avoid unnecessary joins.

Avoid duplicate joins.

Avoid scanning unused tables.

Always query the smallest number of tables required.

------------------------------------------------------------
14. FORBIDDEN SQL
------------------------------------------------------------

Never use

SELECT *

Never use

CROSS JOIN

Never use

Cartesian Product

Never use

Dynamic Table Names

Never use

Dynamic Column Names

Never generate SQL using LLM reasoning.

------------------------------------------------------------
15. BIGQUERY COST CONTROL
------------------------------------------------------------

All production queries should use:

maximum_bytes_billed

Recommended:

100 MB

or

500 MB

depending on deployment.

Queries exceeding this limit must fail safely.

------------------------------------------------------------
16. DEVELOPMENT SAFETY
------------------------------------------------------------

New SQL should first be tested using:

Dry Run

before production execution.

------------------------------------------------------------
17. MCP TOOL DESIGN
------------------------------------------------------------

Each MCP Tool must:

- Have one business purpose
- Execute one SQL query
- Return one deterministic result
- Not generate SQL dynamically
- Not modify SQL at runtime

------------------------------------------------------------
18. AI SAFETY
------------------------------------------------------------

The AI Assistant must never create SQL.

The AI Assistant only selects the appropriate MCP Tool.

The MCP Tool executes the predefined SQL.

AI → Routing

MCP Tool → SQL

BigQuery → Result

------------------------------------------------------------
19. PROJECT PRINCIPLE
------------------------------------------------------------

Predictability is more important than flexibility.

Business correctness is more important than creativity.

Deterministic SQL is preferred over AI-generated SQL.

Every query should produce consistent, explainable, and trusted business results.