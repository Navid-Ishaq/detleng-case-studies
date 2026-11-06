-- Adapted from trusted backend/analytics/tools/geography_tools.py:get_customer_density
SELECT
        customer_city,
        customer_state,
        COUNT(*) AS total_customers
    FROM proofsql_full.dim_customers
    GROUP BY
        customer_city,
        customer_state
    ORDER BY
        total_customers DESC
    LIMIT 50;
