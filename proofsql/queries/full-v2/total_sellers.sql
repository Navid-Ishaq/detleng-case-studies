-- Adapted from trusted backend/analytics/tools/executive_tools.py:get_total_sellers
SELECT COUNT(*) AS total_sellers
    FROM proofsql_full.dim_sellers;
