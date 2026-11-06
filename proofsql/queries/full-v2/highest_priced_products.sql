-- Adapted from trusted backend/analytics/tools/product_tools.py:get_highest_priced_products
SELECT
        p.product_id,
        p.product_category_name,
        ROUND(MAX(s.price), 2) AS highest_price
    FROM proofsql_full.fact_sales s
    JOIN proofsql_full.dim_products p
        ON s.product_key = p.product_key
    GROUP BY
        p.product_id,
        p.product_category_name
    ORDER BY
        highest_price DESC
    LIMIT 10;
