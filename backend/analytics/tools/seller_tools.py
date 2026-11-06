"""
=========================================================
Seller Business Intelligence Tools
=========================================================
"""

from .executive_tools import get_total_sellers
from .geography_tools import get_sellers_by_state
from .revenue_tools import get_revenue_by_seller
from .common import execute_query, table, to_json_number


def get_seller_count():
    """
    Return total number of sellers.
    """

    return get_total_sellers()


def get_top_sellers(limit=10):
    """
    Return top sellers by revenue.
    """

    return get_revenue_by_seller(limit)


def get_seller_revenue(limit=10):
    """
    Return seller revenue.
    """

    return get_revenue_by_seller(limit)


def get_bottom_sellers(limit=10):
    """
    Return bottom sellers by revenue.
    """

    from .common import safe_limit

    safe_limit_value = safe_limit(limit)

    sql = """
    SELECT
        se.seller_id,
        se.seller_city,
        se.seller_state,
        ROUND(SUM(s.total_sale_value), 2) AS total_revenue
    FROM {fact_sales} s
    JOIN {dim_sellers} se
        ON s.seller_key = se.seller_key
    GROUP BY
        se.seller_id,
        se.seller_city,
        se.seller_state
    ORDER BY
        total_revenue ASC
    LIMIT {limit}
    """.format(
        fact_sales=table("fact_sales"),
        dim_sellers=table("dim_sellers"),
        limit=safe_limit_value,
    )

    result = execute_query(sql)

    return [
        {
            "seller_id": row.seller_id,
            "seller_city": row.seller_city,
            "seller_state": row.seller_state,
            "total_revenue": to_json_number(row.total_revenue)
        }
        for row in result
    ]


def get_seller_growth():
    """
    Return monthly new seller growth.
    """

    sql = """
    WITH first_sales AS (
        SELECT
            s.seller_key,
            MIN(o.date_key) AS first_date_key
        FROM {fact_sales} s
        JOIN {fact_orders} o
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
        new_sellers,
        LAG(new_sellers) OVER (
            ORDER BY calendar_year, calendar_month
        ) AS previous_month_sellers,
        ROUND(
            SAFE_DIVIDE(
                new_sellers - LAG(new_sellers) OVER (
                    ORDER BY calendar_year, calendar_month
                ),
                LAG(new_sellers) OVER (
                    ORDER BY calendar_year, calendar_month
                )
            ) * 100,
            2
        ) AS seller_growth_percent
    FROM monthly_sellers
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
            "month_name": row.month_name,
            "new_sellers": int(row.new_sellers),
            "previous_month_sellers": int(row.previous_month_sellers or 0),
            "seller_growth_percent": to_json_number(row.seller_growth_percent)
        }
        for row in result
    ]


def get_average_seller_revenue():
    """
    Return average revenue per seller.
    """

    sql = """
    SELECT
        ROUND(SAFE_DIVIDE(SUM(total_sale_value), COUNT(DISTINCT seller_key)), 2)
            AS average_seller_revenue
    FROM {fact_sales}
    """.format(fact_sales=table("fact_sales"))

    result = execute_query(sql)

    for row in result:
        return {
            "average_seller_revenue": to_json_number(row.average_seller_revenue)
        }

    return {
        "average_seller_revenue": 0
    }
