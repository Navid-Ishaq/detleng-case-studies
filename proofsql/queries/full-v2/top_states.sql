-- Adapted from trusted backend/analytics/tools/geography_tools.py:get_top_states
SELECT
        customer_state,
        COUNT(DISTINCT customer_key) AS total_customers
    FROM proofsql_full.dim_customers
    GROUP BY
        customer_state
    ORDER BY
        total_customers DESC
    LIMIT 27;
