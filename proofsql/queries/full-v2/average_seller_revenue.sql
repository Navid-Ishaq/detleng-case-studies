-- Adapted from trusted backend/analytics/tools/seller_tools.py:get_average_seller_revenue
SELECT
        ROUND((CAST((SUM(total_sale_value)) AS DOUBLE) / NULLIF(CAST((COUNT(DISTINCT seller_key)) AS DOUBLE), 0)), 2)
            AS average_seller_revenue
    FROM proofsql_full.fact_sales;
