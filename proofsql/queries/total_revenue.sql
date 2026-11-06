-- Adapted from revenue_tools.py:get_total_revenue
SELECT CAST(ROUND(SUM(CAST(total_sale_value AS DECIMAL(18,2))),2) AS DOUBLE) AS total_revenue
FROM fact_sales;
