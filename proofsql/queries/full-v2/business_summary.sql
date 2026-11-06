-- Adapted from trusted backend/analytics/tools/executive_tools.py:get_business_summary
SELECT
        (
            SELECT ROUND(SUM(total_sale_value), 2)
            FROM proofsql_full.fact_sales
        ) AS total_revenue,
        (
            SELECT COUNT(DISTINCT order_id)
            FROM proofsql_full.fact_orders
        ) AS total_orders,
        (
            SELECT COUNT(DISTINCT customer_key)
            FROM proofsql_full.dim_customers
        ) AS total_customers,
        (
            SELECT COUNT(DISTINCT product_key)
            FROM proofsql_full.dim_products
        ) AS total_products,
        (
            SELECT COUNT(DISTINCT seller_key)
            FROM proofsql_full.dim_sellers
        ) AS total_sellers;
