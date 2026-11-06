-- Adapted from trusted backend/analytics/tools/product_tools.py:get_product_count
SELECT COUNT(*) AS total_products
    FROM proofsql_full.dim_products;
