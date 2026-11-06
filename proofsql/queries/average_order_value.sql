-- BigQuery SAFE_DIVIDE translated to DuckDB division by NULLIF
SELECT CAST(ROUND(SUM(CAST(total_sale_value AS DECIMAL(18,2))) /
  NULLIF(COUNT(DISTINCT order_id), 0), 2) AS DOUBLE) AS average_order_value
FROM fact_sales;
