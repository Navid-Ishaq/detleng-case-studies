-- Adapted from trusted backend/analytics/tools/customer_tools.py:get_customer_growth
WITH first_orders AS (
        SELECT
            customer_key,
            MIN(date_key) AS first_date_key
        FROM proofsql_full.fact_orders
        GROUP BY
            customer_key
    ),
    monthly_customers AS (
        SELECT
            d.calendar_year,
            d.calendar_month,
            d.month_name,
            COUNT(DISTINCT f.customer_key) AS new_customers
        FROM first_orders f
        JOIN proofsql_full.dim_dates d
            ON f.first_date_key = d.date_key
        GROUP BY
            d.calendar_year,
            d.calendar_month,
            d.month_name
    )
    SELECT
        calendar_year,
        calendar_month,
        month_name,
        new_customers,
        LAG(new_customers) OVER (
            ORDER BY calendar_year, calendar_month
        ) AS previous_month_customers,
        ROUND(
            (CAST((new_customers - LAG(new_customers) OVER (
                    ORDER BY calendar_year, calendar_month
                )) AS DOUBLE) / NULLIF(CAST((LAG(new_customers) OVER (
                    ORDER BY calendar_year, calendar_month
                )) AS DOUBLE), 0)) * 100,
            2
        ) AS customer_growth_percent
    FROM monthly_customers
    ORDER BY
        calendar_year ASC,
        calendar_month ASC;
