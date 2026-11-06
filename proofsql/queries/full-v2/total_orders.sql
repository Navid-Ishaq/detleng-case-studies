-- Adapted from trusted backend/analytics/tools/executive_tools.py:get_total_orders
SELECT COUNT(*) AS total_orders
    FROM proofsql_full.fact_orders;
