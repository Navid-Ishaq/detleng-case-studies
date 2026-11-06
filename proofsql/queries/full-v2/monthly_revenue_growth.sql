-- Adapted from trusted backend/analytics/tools/revenue_tools.py:get_monthly_revenue_growth
WITH monthly_revenue AS (
        SELECT
            d.calendar_year,
            d.calendar_month,
            d.month_name,
            ROUND(SUM(s.total_sale_value), 2) AS total_revenue
        FROM proofsql_full.fact_sales s
        JOIN proofsql_full.fact_orders o
            ON s.order_id = o.order_id
        JOIN proofsql_full.dim_dates d
            ON o.date_key = d.date_key
        GROUP BY
            d.calendar_year,
            d.calendar_month,
            d.month_name
    )
    SELECT
        calendar_year,
        calendar_month,
        month_name,
        total_revenue,
        LAG(total_revenue) OVER (
            ORDER BY calendar_year, calendar_month
        ) AS previous_month_revenue,
        ROUND(
            (CAST((total_revenue - LAG(total_revenue) OVER (
                    ORDER BY calendar_year, calendar_month
                )) AS DOUBLE) / NULLIF(CAST((LAG(total_revenue) OVER (
                    ORDER BY calendar_year, calendar_month
                )) AS DOUBLE), 0)) * 100,
            2
        ) AS monthly_revenue_growth_percent
    FROM monthly_revenue
    ORDER BY
        calendar_year ASC,
        calendar_month ASC;
