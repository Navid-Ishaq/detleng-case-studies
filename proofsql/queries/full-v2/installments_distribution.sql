-- Adapted from trusted backend/analytics/tools/payment_tools.py:get_installments_distribution
SELECT
        installment_category,
        COUNT(*) AS payment_count,
        ROUND(AVG(payment_installments), 2) AS average_installments,
        ROUND(SUM(payment_value), 2) AS total_payment_value
    FROM proofsql_full.fact_payments
    GROUP BY
        installment_category
    ORDER BY
        payment_count DESC;
