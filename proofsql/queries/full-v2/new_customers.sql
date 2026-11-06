-- Adapted from trusted backend/analytics/tools/customer_tools.py:get_new_customers
SELECT COUNT(DISTINCT customer_key) AS new_customers
    FROM proofsql_full.fact_orders;
