-- Adapted from trusted backend/analytics/tools/time_tools.py:get_monthly_payments
SELECT
        d.calendar_year,
        d.calendar_month,
        d.month_name,
        ROUND(SUM(p.payment_value), 2) AS total_payment_value
    FROM proofsql_full.fact_payments p
    JOIN proofsql_full.dim_dates d
        ON p.date_key = d.date_key
    GROUP BY
        d.calendar_year,
        d.calendar_month,
        d.month_name
    ORDER BY
        d.calendar_year ASC,
        d.calendar_month ASC;
