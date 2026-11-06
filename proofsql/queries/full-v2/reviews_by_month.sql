-- Adapted from trusted backend/analytics/tools/review_tools.py:get_reviews_by_month
SELECT
        d.calendar_year,
        d.calendar_month,
        d.month_name,
        COUNT(*) AS total_reviews,
        ROUND(AVG(r.review_score), 2) AS average_rating
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
