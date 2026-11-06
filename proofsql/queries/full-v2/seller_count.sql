-- Adapted from trusted backend/analytics/tools/seller_tools.py:get_seller_count
SELECT COUNT(*) AS total_sellers
    FROM proofsql_full.dim_sellers;
