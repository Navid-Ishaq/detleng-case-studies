-- Adapted from trusted backend/analytics/tools/executive_tools.py:get_revenue_per_customer
SELECT
        ROUND((CAST((SUM(s.total_sale_value)) AS DOUBLE) / NULLIF(CAST((COUNT(DISTINCT o.customer_key)) AS DOUBLE), 0)), 2)
            AS revenue_per_customer
    FROM proofsql_full.fact_sales s
    JOIN proofsql_full.fact_orders o
        ON s.order_id = o.order_id;
