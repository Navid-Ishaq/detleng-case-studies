# DeTLeng Business Intelligence
## Phase 2 - New MCP Tools

Purpose

Extend the existing Business Intelligence layer without changing
the architecture.

All tools must use the existing Analytics Dataset.

Dataset

cs003_olist_analytics

------------------------------------------------------------

# Revenue Analytics

✓ total_revenue (Already Exists)

✓ revenue_by_category (Already Exists)

✓ revenue_by_city (Already Exists)

✓ revenue_by_state (Already Exists)

✓ revenue_by_seller (Already Exists)

✓ revenue_by_product (Already Exists)

NEW

monthly_revenue_growth

quarterly_revenue_growth

yearly_revenue_growth

top_revenue_month

lowest_revenue_month

------------------------------------------------------------

# Customer Analytics

✓ customer_count

✓ customers_by_city

✓ customers_by_state

✓ top_customers

✓ average_customer_spend

✓ customer_lifetime_value

NEW

new_customers

repeat_customers

customer_growth

customers_by_month

customers_by_year

------------------------------------------------------------

# Product Analytics

✓ top_products

✓ bottom_products

✓ top_categories

✓ bottom_categories

✓ product_count

✓ average_product_price

NEW

highest_priced_products

lowest_priced_products

largest_categories

smallest_categories

products_per_category

------------------------------------------------------------

# Seller Analytics

✓ seller_count

✓ sellers_by_state

✓ top_sellers

✓ seller_revenue

NEW

bottom_sellers

seller_growth

average_seller_revenue

------------------------------------------------------------

# Order Analytics

✓ total_orders

✓ average_order_value

NEW

cancelled_orders

delivered_orders

pending_orders

processing_orders

shipped_orders

order_status_distribution

orders_by_month

orders_by_weekday

orders_by_hour

------------------------------------------------------------

# Delivery Analytics

✓ average_delivery_days

✓ delivery_performance

NEW

late_deliveries

on_time_deliveries

delivery_success_rate

average_delivery_variance

------------------------------------------------------------

# Payment Analytics

✓ average_payment_value

✓ payment_installments

✓ revenue_by_payment_type

NEW

payment_type_distribution

installments_distribution

highest_payment_orders

------------------------------------------------------------

# Review Analytics

✓ average_rating

✓ rating_distribution

✓ highest_rated_products

✓ lowest_rated_products

NEW

positive_reviews

negative_reviews

reviews_by_month

average_comment_length

------------------------------------------------------------

# Geography Analytics

✓ revenue_by_city

✓ revenue_by_state

✓ customers_by_city

✓ customers_by_state

✓ sellers_by_state

NEW

top_cities

top_states

customer_density

seller_density

------------------------------------------------------------

# Executive Dashboard

NEW

business_summary

sales_summary

customer_summary

delivery_summary

payment_summary

review_summary

executive_dashboard

------------------------------------------------------------

# Time Intelligence

✓ monthly_revenue

✓ quarterly_revenue

✓ yearly_revenue

✓ month_over_month_growth

✓ year_over_year_growth

NEW

monthly_orders

monthly_customers

monthly_payments

monthly_reviews

------------------------------------------------------------

# AI Rules

Every tool must have

- deterministic SQL
- one responsibility
- one business purpose
- one documented KPI
- one Python file registration

Never generate SQL dynamically.

Never invent joins.

Only use documented relationships.

Only use documented schema.