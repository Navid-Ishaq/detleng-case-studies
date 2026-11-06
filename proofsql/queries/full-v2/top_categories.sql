-- Adapted from trusted backend/analytics/tools/sales_tools.py:get_top_categories
SELECT
        p.product_category_name,
        ROUND(SUM(s.total_sale_value), 2) AS total_revenue
    FROM proofsql_full.fact_sales s
    JOIN proofsql_full.dim_products p
        ON s.product_key = p.product_key
    GROUP BY
        p.product_category_name
    ORDER BY
        total_revenue DESC
    LIMIT 10;
