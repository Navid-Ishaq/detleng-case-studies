-- Adapted from trusted backend/analytics/tools/order_tools.py:get_orders_by_weekday
SELECT
        purchase_weekday,
        COUNT(DISTINCT order_id) AS total_orders
    FROM proofsql_full.fact_orders
    GROUP BY
        purchase_weekday
    ORDER BY
        total_orders DESC;
