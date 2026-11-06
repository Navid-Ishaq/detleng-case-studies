-- Adapted from trusted backend/analytics/tools/delivery_tools.py:get_on_time_deliveries
SELECT SUM(on_time_delivery_flag) AS on_time_deliveries
    FROM proofsql_full.fact_delivery;
