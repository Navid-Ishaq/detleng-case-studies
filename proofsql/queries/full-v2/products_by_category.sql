-- Adapted from trusted backend/analytics/tools/product_tools.py:get_products_by_category
SELECT
        product_category_name,
        COUNT(*) AS total_products
    FROM proofsql_full.dim_products
    GROUP BY
        product_category_name
    ORDER BY
        total_products DESC
    LIMIT 50;
