-- Adapted from delivery_tools.py:get_delivery_success_rate
SELECT CAST(ROUND(SUM(CAST(on_time_delivery_flag AS BIGINT)) * 100.0 /
  NULLIF(COUNT(DISTINCT order_id), 0), 2) AS DOUBLE) AS delivery_success_rate
FROM fact_delivery;
