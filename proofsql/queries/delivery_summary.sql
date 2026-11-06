-- Verified subset: 3 of 6 delivery summary KPIs only.
SELECT
  COUNT(DISTINCT order_id) AS total_delivery_orders,
  SUM(CAST(on_time_delivery_flag AS BIGINT)) AS on_time_deliveries,
  CAST(ROUND(SUM(CAST(on_time_delivery_flag AS BIGINT))*100.0 /
    NULLIF(COUNT(DISTINCT order_id),0),2) AS DOUBLE) AS on_time_delivery_percent
FROM fact_delivery;
