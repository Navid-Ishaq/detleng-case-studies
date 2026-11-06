-- Adapted from delivery_tools.py:get_on_time_deliveries
SELECT SUM(CAST(on_time_delivery_flag AS BIGINT)) AS on_time_deliveries
FROM fact_delivery;
