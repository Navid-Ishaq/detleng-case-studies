"""
=========================================================
Sales Business Intelligence Tools
=========================================================
"""

from .common import execute_query, safe_limit, table, to_json_number
from .revenue_tools import get_revenue_by_category


def get_top_products(limit=10):
    """
    Return top product categories by revenue.
    """

    return get_revenue_by_category(limit)


def get_bottom_products(limit=10):
    """
    Return bottom products by revenue.
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
        total_revenue ASC
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


def get_top_categories(limit=10):
    """
    Return top product categories by revenue.
    """

    return get_revenue_by_category(limit)


def get_bottom_categories(limit=10):
    """
    Return bottom product categories by revenue.
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
        total_revenue ASC
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
