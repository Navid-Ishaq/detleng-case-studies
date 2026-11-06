-- Sales order count intentionally uses fact_sales, not fact_orders.
-- This definition returns 98,666 sale-bearing orders, NOT 99,441 all orders.
SELECT
  CAST(ROUND(SUM(CAST(total_sale_value AS DECIMAL(18,2))),2) AS DOUBLE) AS total_revenue,
  COUNT(DISTINCT order_id) AS total_orders,
  CAST(ROUND(SUM(CAST(total_sale_value AS DECIMAL(18,2))) /
    NULLIF(COUNT(DISTINCT order_id),0),2) AS DOUBLE) AS average_order_value
FROM fact_sales;
