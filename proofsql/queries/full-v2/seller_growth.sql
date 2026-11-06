-- Adapted from trusted backend/analytics/tools/seller_tools.py:get_seller_growth
WITH first_sales AS (
        SELECT
            s.seller_key,
            MIN(o.date_key) AS first_date_key
        FROM proofsql_full.fact_sales s
        JOIN proofsql_full.fact_orders o
            ON s.order_id = o.order_id
        GROUP BY
            s.seller_key
    ),
    monthly_sellers AS (
        SELECT
            d.calendar_year,
            d.calendar_month,
            d.month_name,
            COUNT(DISTINCT f.seller_key) AS new_sellers
        FROM first_sales f
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
        new_sellers,
        LAG(new_sellers) OVER (
            ORDER BY calendar_year, calendar_month
        ) AS previous_month_sellers,
        ROUND(
            (CAST((new_sellers - LAG(new_sellers) OVER (
                    ORDER BY calendar_year, calendar_month
                )) AS DOUBLE) / NULLIF(CAST((LAG(new_sellers) OVER (
                    ORDER BY calendar_year, calendar_month
                )) AS DOUBLE), 0)) * 100,
            2
        ) AS seller_growth_percent
    FROM monthly_sellers
    ORDER BY
        calendar_year ASC,
        calendar_month ASC;
