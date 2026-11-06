-- Adapted from trusted backend/analytics/tools/product_tools.py:get_worst_selling_products
SELECT
        p.product_id,
        p.product_category_name,
        COUNT(*) AS units_sold,
        ROUND(SUM(s.total_sale_value), 2) AS total_revenue
    FROM proofsql_full.fact_sales s
    JOIN proofsql_full.dim_products p
        ON s.product_key = p.product_key
    GROUP BY
        p.product_id,
        p.product_category_name
    ORDER BY
        units_sold ASC,
        total_revenue ASC
    LIMIT 10;
