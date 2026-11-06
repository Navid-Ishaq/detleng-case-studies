-- Adapted from trusted backend/analytics/tools/executive_tools.py:get_delivery_summary
SELECT
        COUNT(DISTINCT order_id) AS total_delivery_orders,
        ROUND(AVG(delivery_days), 2) AS average_delivery_days,
        SUM(late_delivery_flag) AS late_deliveries,
        SUM(on_time_delivery_flag) AS on_time_deliveries,
        ROUND((CAST((SUM(on_time_delivery_flag)) AS DOUBLE) / NULLIF(CAST((COUNT(DISTINCT order_id)) AS DOUBLE), 0)) * 100, 2)
            AS on_time_delivery_percent,
        ROUND(AVG(delivery_variance_days), 2) AS average_delivery_variance
    FROM proofsql_full.fact_delivery;
