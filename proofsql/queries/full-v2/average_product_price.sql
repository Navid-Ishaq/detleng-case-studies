-- Adapted from trusted backend/analytics/tools/product_tools.py:get_average_product_price
SELECT ROUND(AVG(total_sale_value), 2) AS average_product_price
    FROM proofsql_full.fact_sales;
