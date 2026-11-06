-- Adapted from trusted backend/analytics/tools/executive_tools.py:get_executive_dashboard
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
        ) AS total_sellers,
        (
            SELECT ROUND(AVG(delivery_days), 2)
            FROM proofsql_full.fact_delivery
        ) AS average_delivery_days,
        (
            SELECT ROUND((CAST((SUM(on_time_delivery_flag)) AS DOUBLE) / NULLIF(CAST((COUNT(DISTINCT order_id)) AS DOUBLE), 0)) * 100, 2)
            FROM proofsql_full.fact_delivery
        ) AS on_time_delivery_percent,
        (
            SELECT ROUND(AVG(payment_value), 2)
            FROM proofsql_full.fact_payments
        ) AS average_payment_value,
        (
            SELECT ROUND(AVG(review_score), 2)
            FROM proofsql_full.fact_reviews
        ) AS average_rating;
