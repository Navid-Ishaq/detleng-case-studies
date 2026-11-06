-- Adapted from trusted backend/analytics/tools/executive_tools.py:get_customer_summary
SELECT
        (
            SELECT COUNT(DISTINCT customer_key)
            FROM proofsql_full.dim_customers
        ) AS total_customers,
        (
            SELECT COUNT(DISTINCT customer_state)
            FROM proofsql_full.dim_customers
            WHERE customer_state IS NOT NULL
        ) AS customer_states,
        (
            SELECT COUNT(DISTINCT customer_city)
            FROM proofsql_full.dim_customers
            WHERE customer_city IS NOT NULL
        ) AS customer_cities,
        (
            SELECT ROUND((CAST((SUM(s.total_sale_value)) AS DOUBLE) / NULLIF(CAST((COUNT(DISTINCT o.customer_key)) AS DOUBLE), 0)), 2)
            FROM proofsql_full.fact_sales s
            JOIN proofsql_full.fact_orders o
                ON s.order_id = o.order_id
        ) AS average_customer_spend;
