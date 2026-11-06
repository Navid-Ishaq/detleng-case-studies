-- Adapted from trusted backend/analytics/tools/revenue_tools.py:get_lowest_revenue_month
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
    ORDER BY
        total_revenue ASC
    LIMIT 10;
