-- Adapted from trusted backend/analytics/tools/payment_tools.py:get_revenue_by_payment_type
SELECT
        payment_type,
        ROUND(SUM(payment_value), 2) AS total_payment_value
    FROM proofsql_full.fact_payments
    GROUP BY
        payment_type
    ORDER BY
        total_payment_value DESC;
