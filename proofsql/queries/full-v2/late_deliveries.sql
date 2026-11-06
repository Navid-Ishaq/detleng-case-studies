-- Adapted from trusted backend/analytics/tools/delivery_tools.py:get_late_deliveries
SELECT SUM(late_delivery_flag) AS late_deliveries
    FROM proofsql_full.fact_delivery;
