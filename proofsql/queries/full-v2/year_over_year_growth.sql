-- Adapted from trusted backend/analytics/tools/time_tools.py:get_year_over_year_growth
WITH yearly_revenue AS (
        SELECT
            d.calendar_year,
            ROUND(SUM(s.total_sale_value), 2) AS total_revenue
        FROM proofsql_full.fact_sales s
        JOIN proofsql_full.fact_orders o
            ON s.order_id = o.order_id
        JOIN proofsql_full.dim_dates d
            ON o.date_key = d.date_key
        GROUP BY
            d.calendar_year
    )
    SELECT
        calendar_year,
        total_revenue,
        LAG(total_revenue) OVER (
            ORDER BY calendar_year
        ) AS previous_year_revenue,
        ROUND(
            (CAST((total_revenue - LAG(total_revenue) OVER (ORDER BY calendar_year)) AS DOUBLE) / NULLIF(CAST((LAG(total_revenue) OVER (ORDER BY calendar_year)) AS DOUBLE), 0)) * 100,
            2
        ) AS year_over_year_growth_percent
    FROM yearly_revenue
    ORDER BY
        calendar_year ASC;
