-- Adapted from trusted backend/analytics/tools/product_tools.py:get_lowest_priced_products
SELECT
        p.product_id,
        p.product_category_name,
        ROUND(MIN(s.price), 2) AS lowest_price
    FROM proofsql_full.fact_sales s
    JOIN proofsql_full.dim_products p
        ON s.product_key = p.product_key
    GROUP BY
        p.product_id,
        p.product_category_name
    ORDER BY
        lowest_price ASC
    LIMIT 10;
