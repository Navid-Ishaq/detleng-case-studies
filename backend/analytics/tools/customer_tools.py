"""
=========================================================
Customer Business Intelligence Tools
=========================================================
"""

from .common import execute_query, safe_limit, table, to_json_number
from .executive_tools import get_revenue_per_customer


def get_top_customers(limit=10):
    """
    Return top customers by revenue.
    """

    safe_limit_value = safe_limit(limit)

    sql = """
    SELECT
        c.customer_id,
        c.customer_unique_id,
        c.customer_city,
        c.customer_state,
        ROUND(SUM(s.total_sale_value), 2) AS total_revenue
    FROM {fact_sales} s
    JOIN {fact_orders} o
        ON s.order_id = o.order_id
    JOIN {dim_customers} c
        ON o.customer_key = c.customer_key
    GROUP BY
        c.customer_id,
        c.customer_unique_id,
        c.customer_city,
        c.customer_state
    ORDER BY
        total_revenue DESC
    LIMIT {limit}
    """.format(
        fact_sales=table("fact_sales"),
        fact_orders=table("fact_orders"),
        dim_customers=table("dim_customers"),
        limit=safe_limit_value,
    )

    result = execute_query(sql)

    return [
        {
            "customer_id": row.customer_id,
            "customer_unique_id": row.customer_unique_id,
            "customer_city": row.customer_city,
            "customer_state": row.customer_state,
            "total_revenue": to_json_number(row.total_revenue)
        }
        for row in result
    ]


def get_average_customer_spend():
    """
    Return average customer spend.
    """

    return get_revenue_per_customer()


def get_customer_lifetime_value(limit=10):
    """
    Return customer lifetime value by customer.
    """

    return get_top_customers(limit)


def get_new_customers():
    """
    Return total customers with at least one order.
    """

    sql = """
    SELECT COUNT(DISTINCT customer_key) AS new_customers
    FROM {fact_orders}
    """.format(fact_orders=table("fact_orders"))

    result = execute_query(sql)

    for row in result:
        return {
            "new_customers": int(row.new_customers)
        }

    return {
        "new_customers": 0
    }


def get_repeat_customers():
    """
    Return customers with more than one order.
    """

    sql = """
    WITH customer_orders AS (
        SELECT
            customer_key,
            COUNT(DISTINCT order_id) AS total_orders
        FROM {fact_orders}
        GROUP BY
            customer_key
    )
    SELECT COUNT(*) AS repeat_customers
    FROM customer_orders
    WHERE total_orders > 1
    """.format(fact_orders=table("fact_orders"))

    result = execute_query(sql)

    for row in result:
        return {
            "repeat_customers": int(row.repeat_customers)
        }

    return {
        "repeat_customers": 0
    }


def get_customer_growth():
    """
    Return monthly new customer growth.
    """

    sql = """
    WITH first_orders AS (
        SELECT
            customer_key,
            MIN(date_key) AS first_date_key
        FROM {fact_orders}
        GROUP BY
            customer_key
    ),
    monthly_customers AS (
        SELECT
            d.calendar_year,
            d.calendar_month,
            d.month_name,
            COUNT(DISTINCT f.customer_key) AS new_customers
        FROM first_orders f
        JOIN {dim_dates} d
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
        new_customers,
        LAG(new_customers) OVER (
            ORDER BY calendar_year, calendar_month
        ) AS previous_month_customers,
        ROUND(
            SAFE_DIVIDE(
                new_customers - LAG(new_customers) OVER (
                    ORDER BY calendar_year, calendar_month
                ),
                LAG(new_customers) OVER (
                    ORDER BY calendar_year, calendar_month
                )
            ) * 100,
            2
        ) AS customer_growth_percent
    FROM monthly_customers
    ORDER BY
        calendar_year ASC,
        calendar_month ASC
    """.format(
        fact_orders=table("fact_orders"),
        dim_dates=table("dim_dates"),
    )

    result = execute_query(sql)

    return [
        {
            "year": int(row.calendar_year),
            "month": int(row.calendar_month),
            "month_name": row.month_name,
            "new_customers": int(row.new_customers),
            "previous_month_customers": int(row.previous_month_customers or 0),
            "customer_growth_percent": to_json_number(row.customer_growth_percent)
        }
        for row in result
    ]


def get_customers_by_month():
    """
    Return customers by order month.
    """

    sql = """
    SELECT
        d.calendar_year,
        d.calendar_month,
        d.month_name,
        COUNT(DISTINCT o.customer_key) AS total_customers
    FROM {fact_orders} o
    JOIN {dim_dates} d
        ON o.date_key = d.date_key
    GROUP BY
        d.calendar_year,
        d.calendar_month,
        d.month_name
    ORDER BY
        d.calendar_year ASC,
        d.calendar_month ASC
    """.format(
        fact_orders=table("fact_orders"),
        dim_dates=table("dim_dates"),
    )

    result = execute_query(sql)

    return [
        {
            "year": int(row.calendar_year),
            "month": int(row.calendar_month),
            "month_name": row.month_name,
            "total_customers": int(row.total_customers)
        }
        for row in result
    ]


def get_customers_by_year():
    """
    Return customers by order year.
    """

    sql = """
    SELECT
        d.calendar_year,
        COUNT(DISTINCT o.customer_key) AS total_customers
    FROM {fact_orders} o
    JOIN {dim_dates} d
        ON o.date_key = d.date_key
    GROUP BY
        d.calendar_year
    ORDER BY
        d.calendar_year ASC
    """.format(
        fact_orders=table("fact_orders"),
        dim_dates=table("dim_dates"),
    )

    result = execute_query(sql)

    return [
        {
            "year": int(row.calendar_year),
            "total_customers": int(row.total_customers)
        }
        for row in result
    ]
