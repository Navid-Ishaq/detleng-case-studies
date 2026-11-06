-- Adapted from trusted backend/analytics/tools/payment_tools.py:get_payment_installments
SELECT
        payment_installments,
        COUNT(*) AS payment_count,
        ROUND(SUM(payment_value), 2) AS total_payment_value
    FROM proofsql_full.fact_payments
    GROUP BY
        payment_installments
    ORDER BY
        payment_installments ASC;
