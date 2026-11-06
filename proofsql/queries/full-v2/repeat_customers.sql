-- Adapted from trusted backend/analytics/tools/customer_tools.py:get_repeat_customers
WITH customer_orders AS (
        SELECT
            customer_key,
            COUNT(DISTINCT order_id) AS total_orders
        FROM proofsql_full.fact_orders
        GROUP BY
            customer_key
    )
    SELECT COUNT(*) AS repeat_customers
    FROM customer_orders
    WHERE total_orders > 1;
