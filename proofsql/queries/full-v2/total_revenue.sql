-- Adapted from trusted backend/analytics/tools/revenue_tools.py:get_total_revenue
SELECT ROUND(SUM(total_sale_value), 2) AS total_revenue
    FROM proofsql_full.fact_sales;
