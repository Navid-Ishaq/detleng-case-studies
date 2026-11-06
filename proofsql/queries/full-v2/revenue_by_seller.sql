-- Adapted from trusted backend/analytics/tools/revenue_tools.py:get_revenue_by_seller
SELECT
        se.seller_id,
        se.seller_city,
        se.seller_state,
        ROUND(SUM(s.total_sale_value), 2) AS total_revenue
    FROM proofsql_full.fact_sales s
    JOIN proofsql_full.dim_sellers se
        ON s.seller_key = se.seller_key
    GROUP BY
        se.seller_id,
        se.seller_city,
        se.seller_state
    ORDER BY
        total_revenue DESC
    LIMIT 10;
