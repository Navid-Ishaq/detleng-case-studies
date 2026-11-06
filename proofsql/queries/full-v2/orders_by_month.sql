-- Adapted from trusted backend/analytics/tools/order_tools.py:get_orders_by_month
SELECT
        d.calendar_year,
        d.calendar_month,
        d.month_name,
        COUNT(DISTINCT o.order_id) AS total_orders
    FROM proofsql_full.fact_orders o
    JOIN proofsql_full.dim_dates d
        ON o.date_key = d.date_key
    GROUP BY
        d.calendar_year,
        d.calendar_month,
        d.month_name
    ORDER BY
        d.calendar_year ASC,
        d.calendar_month ASC;
