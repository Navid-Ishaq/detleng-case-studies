-- Adapted from trusted backend/analytics/tools/payment_tools.py:get_average_payment_value
SELECT ROUND(AVG(payment_value), 2) AS average_payment_value
    FROM proofsql_full.fact_payments;
