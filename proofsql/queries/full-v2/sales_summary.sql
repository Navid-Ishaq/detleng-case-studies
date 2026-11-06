-- Adapted from trusted backend/analytics/tools/executive_tools.py:get_sales_summary
SELECT
        ROUND(SUM(total_sale_value), 2) AS total_revenue,
        COUNT(DISTINCT order_id) AS total_orders,
        COUNT(*) AS total_order_items,
        ROUND((CAST((SUM(total_sale_value)) AS DOUBLE) / NULLIF(CAST((COUNT(DISTINCT order_id)) AS DOUBLE), 0)), 2)
            AS average_order_value,
        ROUND(AVG(price), 2) AS average_item_price,
        ROUND(SUM(freight_value), 2) AS total_freight_value
    FROM proofsql_full.fact_sales;
