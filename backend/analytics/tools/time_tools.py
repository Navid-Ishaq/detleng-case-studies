"""
=========================================================
Time Intelligence Tools
=========================================================
"""

from .common import execute_query, table, to_json_number


def get_monthly_revenue():
    """
    Return monthly revenue.
    """

    sql = """
    SELECT
        d.calendar_year,
        d.calendar_month,
        d.month_name,
        ROUND(SUM(s.total_sale_value), 2) AS total_revenue
    FROM {fact_sales} s
    JOIN {fact_orders} o
        ON s.order_id = o.order_id
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
        fact_sales=table("fact_sales"),
        fact_orders=table("fact_orders"),
        dim_dates=table("dim_dates"),
    )

    result = execute_query(sql)

    return [
        {
            "year": int(row.calendar_year),
            "month": int(row.calendar_month),
            "month_name": row.month_name,
            "total_revenue": to_json_number(row.total_revenue)
        }
        for row in result
    ]


def get_revenue_by_month():
    """
    Return revenue by month.
    """

    return get_monthly_revenue()


def get_quarterly_revenue():
    """
    Return quarterly revenue.
    """

    sql = """
    SELECT
        d.calendar_year,
        d.calendar_quarter,
        ROUND(SUM(s.total_sale_value), 2) AS total_revenue
    FROM {fact_sales} s
    JOIN {fact_orders} o
        ON s.order_id = o.order_id
    JOIN {dim_dates} d
        ON o.date_key = d.date_key
    GROUP BY
        d.calendar_year,
        d.calendar_quarter
    ORDER BY
        d.calendar_year ASC,
        d.calendar_quarter ASC
    """.format(
        fact_sales=table("fact_sales"),
        fact_orders=table("fact_orders"),
        dim_dates=table("dim_dates"),
    )

    result = execute_query(sql)

    return [
        {
            "year": int(row.calendar_year),
            "quarter": int(row.calendar_quarter),
            "total_revenue": to_json_number(row.total_revenue)
        }
        for row in result
    ]


def get_yearly_revenue():
    """
    Return yearly revenue.
    """

    sql = """
    SELECT
        d.calendar_year,
        ROUND(SUM(s.total_sale_value), 2) AS total_revenue
    FROM {fact_sales} s
    JOIN {fact_orders} o
        ON s.order_id = o.order_id
    JOIN {dim_dates} d
        ON o.date_key = d.date_key
    GROUP BY
        d.calendar_year
    ORDER BY
        d.calendar_year ASC
    """.format(
        fact_sales=table("fact_sales"),
        fact_orders=table("fact_orders"),
        dim_dates=table("dim_dates"),
    )

    result = execute_query(sql)

    return [
        {
            "year": int(row.calendar_year),
            "total_revenue": to_json_number(row.total_revenue)
        }
        for row in result
    ]


def get_revenue_by_year():
    """
    Return revenue by year.
    """

    return get_yearly_revenue()


def get_month_over_month_growth():
    """
    Return month-over-month revenue growth.
    """

    sql = """
    WITH monthly_revenue AS (
        SELECT
            d.calendar_year,
            d.calendar_month,
            ROUND(SUM(s.total_sale_value), 2) AS total_revenue
        FROM {fact_sales} s
        JOIN {fact_orders} o
            ON s.order_id = o.order_id
        JOIN {dim_dates} d
            ON o.date_key = d.date_key
        GROUP BY
            d.calendar_year,
            d.calendar_month
    )
    SELECT
        calendar_year,
        calendar_month,
        total_revenue,
        LAG(total_revenue) OVER (
            ORDER BY calendar_year, calendar_month
        ) AS previous_month_revenue,
        ROUND(
            SAFE_DIVIDE(
                total_revenue - LAG(total_revenue) OVER (
                    ORDER BY calendar_year, calendar_month
                ),
                LAG(total_revenue) OVER (
                    ORDER BY calendar_year, calendar_month
                )
            ) * 100,
            2
        ) AS month_over_month_growth_percent
    FROM monthly_revenue
    ORDER BY
        calendar_year ASC,
        calendar_month ASC
    """.format(
        fact_sales=table("fact_sales"),
        fact_orders=table("fact_orders"),
        dim_dates=table("dim_dates"),
    )

    result = execute_query(sql)

    return [
        {
            "year": int(row.calendar_year),
            "month": int(row.calendar_month),
            "total_revenue": to_json_number(row.total_revenue),
            "previous_month_revenue": to_json_number(row.previous_month_revenue),
            "month_over_month_growth_percent": to_json_number(
                row.month_over_month_growth_percent
            )
        }
        for row in result
    ]


def get_year_over_year_growth():
    """
    Return year-over-year revenue growth.
    """

    sql = """
    WITH yearly_revenue AS (
        SELECT
            d.calendar_year,
            ROUND(SUM(s.total_sale_value), 2) AS total_revenue
        FROM {fact_sales} s
        JOIN {fact_orders} o
            ON s.order_id = o.order_id
        JOIN {dim_dates} d
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
            SAFE_DIVIDE(
                total_revenue - LAG(total_revenue) OVER (ORDER BY calendar_year),
                LAG(total_revenue) OVER (ORDER BY calendar_year)
            ) * 100,
            2
        ) AS year_over_year_growth_percent
    FROM yearly_revenue
    ORDER BY
        calendar_year ASC
    """.format(
        fact_sales=table("fact_sales"),
        fact_orders=table("fact_orders"),
        dim_dates=table("dim_dates"),
    )

    result = execute_query(sql)

    return [
        {
            "year": int(row.calendar_year),
            "total_revenue": to_json_number(row.total_revenue),
            "previous_year_revenue": to_json_number(row.previous_year_revenue),
            "year_over_year_growth_percent": to_json_number(
                row.year_over_year_growth_percent
            )
        }
        for row in result
    ]


def get_monthly_orders():
    """
    Return monthly order count.
    """

    sql = """
    SELECT
        d.calendar_year,
        d.calendar_month,
        d.month_name,
        COUNT(DISTINCT o.order_id) AS total_orders
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
            "total_orders": int(row.total_orders)
        }
        for row in result
    ]


def get_monthly_customers():
    """
    Return monthly active customer count.
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


def get_monthly_payments():
    """
    Return monthly payment value.
    """

    sql = """
    SELECT
        d.calendar_year,
        d.calendar_month,
        d.month_name,
        ROUND(SUM(p.payment_value), 2) AS total_payment_value
    FROM {fact_payments} p
    JOIN {dim_dates} d
        ON p.date_key = d.date_key
    GROUP BY
        d.calendar_year,
        d.calendar_month,
        d.month_name
    ORDER BY
        d.calendar_year ASC,
        d.calendar_month ASC
    """.format(
        fact_payments=table("fact_payments"),
        dim_dates=table("dim_dates"),
    )

    result = execute_query(sql)

    return [
        {
            "year": int(row.calendar_year),
            "month": int(row.calendar_month),
            "month_name": row.month_name,
            "total_payment_value": to_json_number(row.total_payment_value)
        }
        for row in result
    ]


def get_monthly_reviews():
    """
    Return monthly review count.
    """

    sql = """
    SELECT
        d.calendar_year,
        d.calendar_month,
        d.month_name,
        COUNT(DISTINCT r.review_id) AS total_reviews
    FROM {fact_reviews} r
    JOIN {dim_dates} d
        ON r.date_key = d.date_key
    GROUP BY
        d.calendar_year,
        d.calendar_month,
        d.month_name
    ORDER BY
        d.calendar_year ASC,
        d.calendar_month ASC
    """.format(
        fact_reviews=table("fact_reviews"),
        dim_dates=table("dim_dates"),
    )

    result = execute_query(sql)

    return [
        {
            "year": int(row.calendar_year),
            "month": int(row.calendar_month),
            "month_name": row.month_name,
            "total_reviews": int(row.total_reviews)
        }
        for row in result
    ]
