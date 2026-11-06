-- Adapted from trusted backend/analytics/tools/order_tools.py:get_orders_by_hour
SELECT
        purchase_hour,
        COUNT(DISTINCT order_id) AS total_orders
    FROM proofsql_full.fact_orders
    GROUP BY
        purchase_hour
    ORDER BY
        purchase_hour ASC;
