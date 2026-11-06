-- Adapted from trusted backend/analytics/tools/customer_tools.py:get_customers_by_year
SELECT
        d.calendar_year,
        COUNT(DISTINCT o.customer_key) AS total_customers
    FROM proofsql_full.fact_orders o
    JOIN proofsql_full.dim_dates d
        ON o.date_key = d.date_key
    GROUP BY
        d.calendar_year
    ORDER BY
        d.calendar_year ASC;
