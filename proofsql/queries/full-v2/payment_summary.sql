-- Adapted from trusted backend/analytics/tools/executive_tools.py:get_payment_summary
SELECT
        COUNT(*) AS total_payment_records,
        COUNT(DISTINCT order_id) AS paid_orders,
        ROUND(SUM(payment_value), 2) AS total_payment_value,
        ROUND(AVG(payment_value), 2) AS average_payment_value,
        ROUND(AVG(payment_installments), 2) AS average_installments,
        COUNT(DISTINCT payment_type) AS payment_types
    FROM proofsql_full.fact_payments;
