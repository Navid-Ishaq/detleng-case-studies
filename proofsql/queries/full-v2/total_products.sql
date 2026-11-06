-- Adapted from trusted backend/analytics/tools/executive_tools.py:get_total_products
SELECT COUNT(*) AS total_products
    FROM proofsql_full.dim_products;
