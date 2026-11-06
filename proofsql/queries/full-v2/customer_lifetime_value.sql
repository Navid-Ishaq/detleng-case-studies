-- Adapted from trusted backend/analytics/tools/customer_tools.py:get_customer_lifetime_value
SELECT
        c.customer_id,
        c.customer_unique_id,
        c.customer_city,
        c.customer_state,
        ROUND(SUM(s.total_sale_value), 2) AS total_revenue
    FROM proofsql_full.fact_sales s
    JOIN proofsql_full.fact_orders o
        ON s.order_id = o.order_id
    JOIN proofsql_full.dim_customers c
        ON o.customer_key = c.customer_key
    GROUP BY
        c.customer_id,
        c.customer_unique_id,
        c.customer_city,
        c.customer_state
    ORDER BY
        total_revenue DESC
    LIMIT 10;
