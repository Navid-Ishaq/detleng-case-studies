-- Adapted from trusted backend/analytics/tools/delivery_tools.py:get_delivery_success_rate
SELECT
        ROUND(
            (CAST((SUM(on_time_delivery_flag)) AS DOUBLE) / NULLIF(CAST((COUNT(DISTINCT order_id)) AS DOUBLE), 0)) * 100,
            2
        ) AS delivery_success_rate
    FROM proofsql_full.fact_delivery;
