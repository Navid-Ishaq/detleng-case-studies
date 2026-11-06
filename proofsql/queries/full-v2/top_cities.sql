-- Adapted from trusted backend/analytics/tools/geography_tools.py:get_top_cities
SELECT
        customer_city,
        customer_state,
        COUNT(DISTINCT customer_key) AS total_customers
    FROM proofsql_full.dim_customers
    GROUP BY
        customer_city,
        customer_state
    ORDER BY
        total_customers DESC
    LIMIT 20;
