-- Adapted from trusted backend/analytics/tools/review_tools.py:get_highest_rated_products
SELECT
        p.product_id,
        p.product_category_name,
        ROUND(AVG(r.review_score), 2) AS average_rating,
        COUNT(*) AS review_count
    FROM proofsql_full.fact_reviews r
    JOIN proofsql_full.fact_sales s
        ON r.order_id = s.order_id
    JOIN proofsql_full.dim_products p
        ON s.product_key = p.product_key
    GROUP BY
        p.product_id,
        p.product_category_name
    ORDER BY
        average_rating DESC,
        review_count DESC
    LIMIT 10;
