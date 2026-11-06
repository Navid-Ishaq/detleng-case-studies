-- Verified subset: 4 of 9 executive dashboard KPIs only.
-- Remaining KPIs need additional approved snapshots and are NOT verified.
SELECT
  (SELECT CAST(ROUND(SUM(CAST(total_sale_value AS DECIMAL(18,2))),2) AS DOUBLE) FROM fact_sales) AS total_revenue,
  (SELECT COUNT(DISTINCT order_id) FROM fact_orders) AS total_orders,
  (SELECT COUNT(DISTINCT product_key) FROM dim_products) AS total_products,
  (SELECT CAST(ROUND(SUM(CAST(on_time_delivery_flag AS BIGINT))*100.0 /
      NULLIF(COUNT(DISTINCT order_id),0),2) AS DOUBLE) FROM fact_delivery) AS on_time_delivery_percent;
