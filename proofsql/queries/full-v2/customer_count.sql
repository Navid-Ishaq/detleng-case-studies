-- Adapted from trusted backend/analytics/tools/executive_tools.py:get_customer_count
SELECT COUNT(*) AS total_customers
    FROM proofsql_full.dim_customers;
