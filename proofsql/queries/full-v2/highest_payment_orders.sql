-- Adapted from trusted backend/analytics/tools/payment_tools.py:get_highest_payment_orders
SELECT
        order_id,
        ROUND(SUM(payment_value), 2) AS total_payment_value
    FROM proofsql_full.fact_payments
    GROUP BY
        order_id
    ORDER BY
        total_payment_value DESC
    LIMIT 10;
