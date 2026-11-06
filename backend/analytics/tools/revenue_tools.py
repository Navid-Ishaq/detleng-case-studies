"""
=========================================================
Revenue Business Intelligence Tools
=========================================================
"""

from .common import execute_query, safe_limit, table, to_json_number


def get_total_revenue():
    """
    Return total business revenue.
    """

    sql = """
    SELECT ROUND(SUM(total_sale_value), 2) AS total_revenue
    FROM {fact_sales}
    """.format(fact_sales=table("fact_sales"))

    result = execute_query(sql)

    for row in result:
        return {
            "total_revenue": to_json_number(row.total_revenue)
        }

    return {
        "total_revenue": 0
    }


def get_revenue_by_product(limit=10):
    """
    Return revenue by product.
    """

    safe_limit_value = safe_limit(limit)

    sql = """
    SELECT
        p.product_id,
        p.product_category_name,
        ROUND(SUM(s.total_sale_value), 2) AS total_revenue
    FROM {fact_sales} s
    JOIN {dim_products} p
        ON s.product_key = p.product_key
    GROUP BY
        p.product_id,
        p.product_category_name
    ORDER BY
        total_revenue DESC
    LIMIT {limit}
    """.format(
        fact_sales=table("fact_sales"),
        dim_products=table("dim_products"),
        limit=safe_limit_value,
    )

    result = execute_query(sql)

    return [
        {
            "product_id": row.product_id,
            "product_category": row.product_category_name,
            "total_revenue": to_json_number(row.total_revenue)
        }
        for row in result
    ]


def get_revenue_by_category(limit=10):
    """
    Return revenue by product category.
    """

    safe_limit_value = safe_limit(limit)

    sql = """
    SELECT
        p.product_category_name,
        ROUND(SUM(s.total_sale_value), 2) AS total_revenue
    FROM {fact_sales} s
    JOIN {dim_products} p
        ON s.product_key = p.product_key
    GROUP BY
        p.product_category_name
    ORDER BY
        total_revenue DESC
    LIMIT {limit}
    """.format(
        fact_sales=table("fact_sales"),
        dim_products=table("dim_products"),
        limit=safe_limit_value,
    )

    result = execute_query(sql)

    return [
        {
            "product_category": row.product_category_name,
            "total_revenue": to_json_number(row.total_revenue)
        }
        for row in result
    ]


def get_revenue_by_seller(limit=10):
    """
    Return revenue by seller.
    """

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
        total_revenue DESC
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


def get_revenue_by_state(limit=27):
    """
    Return revenue by seller state.
    """

    safe_limit_value = safe_limit(limit, 100)

    sql = """
    SELECT
        se.seller_state,
        ROUND(SUM(s.total_sale_value), 2) AS total_revenue
    FROM {fact_sales} s
    JOIN {dim_sellers} se
        ON s.seller_key = se.seller_key
    GROUP BY
        se.seller_state
    ORDER BY
        total_revenue DESC
    LIMIT {limit}
    """.format(
        fact_sales=table("fact_sales"),
        dim_sellers=table("dim_sellers"),
        limit=safe_limit_value,
    )

    result = execute_query(sql)

    return [
        {
            "seller_state": row.seller_state,
            "total_revenue": to_json_number(row.total_revenue)
        }
        for row in result
    ]


def get_revenue_by_city(limit=50):
    """
    Return revenue by seller city.
    """

    safe_limit_value = safe_limit(limit, 100)

    sql = """
    SELECT
        se.seller_city,
        se.seller_state,
        ROUND(SUM(s.total_sale_value), 2) AS total_revenue
    FROM {fact_sales} s
    JOIN {dim_sellers} se
        ON s.seller_key = se.seller_key
    GROUP BY
        se.seller_city,
        se.seller_state
    ORDER BY
        total_revenue DESC
    LIMIT {limit}
    """.format(
        fact_sales=table("fact_sales"),
        dim_sellers=table("dim_sellers"),
        limit=safe_limit_value,
    )

    result = execute_query(sql)

    return [
        {
            "seller_city": row.seller_city,
            "seller_state": row.seller_state,
            "total_revenue": to_json_number(row.total_revenue)
        }
        for row in result
    ]


def get_monthly_revenue_growth():
    """
    Return monthly revenue growth.
    """

    sql = """
    WITH monthly_revenue AS (
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
            SAFE_DIVIDE(
                total_revenue - LAG(total_revenue) OVER (
                    ORDER BY calendar_year, calendar_month
                ),
                LAG(total_revenue) OVER (
                    ORDER BY calendar_year, calendar_month
                )
            ) * 100,
            2
        ) AS monthly_revenue_growth_percent
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
            "month_name": row.month_name,
            "total_revenue": to_json_number(row.total_revenue),
            "previous_month_revenue": to_json_number(row.previous_month_revenue),
            "monthly_revenue_growth_percent": to_json_number(
                row.monthly_revenue_growth_percent
            )
        }
        for row in result
    ]


def get_quarterly_revenue_growth():
    """
    Return quarterly revenue growth.
    """

    sql = """
    WITH quarterly_revenue AS (
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
    )
    SELECT
        calendar_year,
        calendar_quarter,
        total_revenue,
        LAG(total_revenue) OVER (
            ORDER BY calendar_year, calendar_quarter
        ) AS previous_quarter_revenue,
        ROUND(
            SAFE_DIVIDE(
                total_revenue - LAG(total_revenue) OVER (
                    ORDER BY calendar_year, calendar_quarter
                ),
                LAG(total_revenue) OVER (
                    ORDER BY calendar_year, calendar_quarter
                )
            ) * 100,
            2
        ) AS quarterly_revenue_growth_percent
    FROM quarterly_revenue
    ORDER BY
        calendar_year ASC,
        calendar_quarter ASC
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
            "total_revenue": to_json_number(row.total_revenue),
            "previous_quarter_revenue": to_json_number(row.previous_quarter_revenue),
            "quarterly_revenue_growth_percent": to_json_number(
                row.quarterly_revenue_growth_percent
            )
        }
        for row in result
    ]


def get_yearly_revenue_growth():
    """
    Return yearly revenue growth.
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
        ) AS yearly_revenue_growth_percent
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
            "yearly_revenue_growth_percent": to_json_number(
                row.yearly_revenue_growth_percent
            )
        }
        for row in result
    ]


def get_top_revenue_month(limit=10):
    """
    Return highest revenue months.
    """

    safe_limit_value = safe_limit(limit)

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
        total_revenue DESC
    LIMIT {limit}
    """.format(
        fact_sales=table("fact_sales"),
        fact_orders=table("fact_orders"),
        dim_dates=table("dim_dates"),
        limit=safe_limit_value,
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


def get_lowest_revenue_month(limit=10):
    """
    Return lowest revenue months.
    """

    safe_limit_value = safe_limit(limit)

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
        total_revenue ASC
    LIMIT {limit}
    """.format(
        fact_sales=table("fact_sales"),
        fact_orders=table("fact_orders"),
        dim_dates=table("dim_dates"),
        limit=safe_limit_value,
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
