-- Verified subset: revenue, order count, product count only.
SELECT
  (SELECT CAST(ROUND(SUM(CAST(total_sale_value AS DECIMAL(18,2))),2) AS DOUBLE) FROM fact_sales) AS total_revenue,
  (SELECT COUNT(DISTINCT order_id) FROM fact_orders) AS total_orders,
  (SELECT COUNT(DISTINCT product_key) FROM dim_products) AS total_products;
