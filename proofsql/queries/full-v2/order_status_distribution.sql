-- Adapted from trusted backend/analytics/tools/order_tools.py:get_order_status_distribution
SELECT
        order_status,
        COUNT(DISTINCT order_id) AS total_orders
    FROM proofsql_full.fact_orders
    GROUP BY
        order_status
    ORDER BY
        total_orders DESC;
