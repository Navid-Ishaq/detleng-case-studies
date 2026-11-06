-- Adapted from trusted backend/analytics/tools/delivery_tools.py:get_average_delivery_days
SELECT ROUND(AVG(delivery_days), 2) AS average_delivery_days
    FROM proofsql_full.fact_delivery;
