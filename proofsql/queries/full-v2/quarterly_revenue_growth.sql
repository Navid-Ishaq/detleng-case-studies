-- Adapted from trusted backend/analytics/tools/revenue_tools.py:get_quarterly_revenue_growth
WITH quarterly_revenue AS (
        SELECT
            d.calendar_year,
            d.calendar_quarter,
            ROUND(SUM(s.total_sale_value), 2) AS total_revenue
        FROM proofsql_full.fact_sales s
        JOIN proofsql_full.fact_orders o
            ON s.order_id = o.order_id
        JOIN proofsql_full.dim_dates d
            ON o.date_key = d.date_key
        GROUP BY
            d.calendar_year,
            d.calendar_quarter
    )
    SELECT
        calendar_year,
        calendar_quarter,
        total_revenue,
        LAG(total_revenue) OVER (
            ORDER BY calendar_year, calendar_quarter
        ) AS previous_quarter_revenue,
        ROUND(
            (CAST((total_revenue - LAG(total_revenue) OVER (
                    ORDER BY calendar_year, calendar_quarter
                )) AS DOUBLE) / NULLIF(CAST((LAG(total_revenue) OVER (
                    ORDER BY calendar_year, calendar_quarter
                )) AS DOUBLE), 0)) * 100,
            2
        ) AS quarterly_revenue_growth_percent
    FROM quarterly_revenue
    ORDER BY
        calendar_year ASC,
        calendar_quarter ASC;
