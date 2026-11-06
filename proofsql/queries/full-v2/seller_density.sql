-- Adapted from trusted backend/analytics/tools/geography_tools.py:get_seller_density
SELECT
        seller_state,
        COUNT(*) AS total_sellers
    FROM proofsql_full.dim_sellers
    GROUP BY
        seller_state
    ORDER BY
        total_sellers DESC
    LIMIT 27;
