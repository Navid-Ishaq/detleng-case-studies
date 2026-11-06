-- Adapted from trusted backend/analytics/tools/delivery_tools.py:get_average_delivery_variance
SELECT ROUND(AVG(delivery_variance_days), 2) AS average_delivery_variance
    FROM proofsql_full.fact_delivery;
