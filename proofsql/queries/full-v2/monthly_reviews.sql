-- Adapted from trusted backend/analytics/tools/time_tools.py:get_monthly_reviews
SELECT
        d.calendar_year,
        d.calendar_month,
        d.month_name,
        COUNT(DISTINCT r.review_id) AS total_reviews
    FROM proofsql_full.fact_reviews r
    JOIN proofsql_full.dim_dates d
        ON r.date_key = d.date_key
    GROUP BY
        d.calendar_year,
        d.calendar_month,
        d.month_name
    ORDER BY
        d.calendar_year ASC,
        d.calendar_month ASC;
