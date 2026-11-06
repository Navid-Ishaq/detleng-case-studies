-- Adapted from trusted backend/analytics/tools/executive_tools.py:get_total_categories
SELECT COUNT(DISTINCT product_category_name) AS total_categories
    FROM proofsql_full.dim_products
    WHERE product_category_name IS NOT NULL;
