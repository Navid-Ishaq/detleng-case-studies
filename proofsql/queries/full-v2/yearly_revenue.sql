-- Adapted from trusted backend/analytics/tools/time_tools.py:get_yearly_revenue
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
    ORDER BY
        d.calendar_year ASC;
