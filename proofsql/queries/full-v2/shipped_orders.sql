-- Adapted from trusted backend/analytics/tools/order_tools.py:get_shipped_orders
SELECT COUNT(DISTINCT order_id) AS total_orders
    FROM proofsql_full.fact_orders
    WHERE order_status = 'shipped';
