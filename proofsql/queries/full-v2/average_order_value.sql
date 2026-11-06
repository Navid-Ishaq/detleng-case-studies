-- Adapted from trusted backend/analytics/tools/executive_tools.py:get_average_order_value
SELECT
        ROUND((CAST((SUM(total_sale_value)) AS DOUBLE) / NULLIF(CAST((COUNT(DISTINCT order_id)) AS DOUBLE), 0)), 2)
            AS average_order_value
    FROM proofsql_full.fact_sales;
