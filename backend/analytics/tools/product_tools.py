"""
=========================================================
Product Business Intelligence Tools
=========================================================
"""

from .common import execute_query, safe_limit, table, to_json_number
from .executive_tools import get_total_products


def get_product_count():
    """
    Return total number of products.
    """

    return get_total_products()


def get_products_by_category(limit=50):
    """
    Return product count by category.
    """

    safe_limit_value = safe_limit(limit, 100)

    sql = """
    SELECT
        product_category_name,
        COUNT(*) AS total_products
    FROM {dim_products}
    GROUP BY
        product_category_name
    ORDER BY
        total_products DESC
    LIMIT {limit}
    """.format(
        dim_products=table("dim_products"),
        limit=safe_limit_value,
    )

    result = execute_query(sql)

    return [
        {
            "product_category": row.product_category_name,
            "total_products": int(row.total_products)
        }
        for row in result
    ]


def get_best_selling_products(limit=10):
    """
    Return best selling products by item count.
    """

    safe_limit_value = safe_limit(limit)

    sql = """
    SELECT
        p.product_id,
        p.product_category_name,
        COUNT(*) AS units_sold,
        ROUND(SUM(s.total_sale_value), 2) AS total_revenue
    FROM {fact_sales} s
    JOIN {dim_products} p
        ON s.product_key = p.product_key
    GROUP BY
        p.product_id,
        p.product_category_name
    ORDER BY
        units_sold DESC,
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
            "units_sold": int(row.units_sold),
            "total_revenue": to_json_number(row.total_revenue)
        }
        for row in result
    ]


def get_worst_selling_products(limit=10):
    """
    Return worst selling products by item count.
    """

    safe_limit_value = safe_limit(limit)

    sql = """
    SELECT
        p.product_id,
        p.product_category_name,
        COUNT(*) AS units_sold,
        ROUND(SUM(s.total_sale_value), 2) AS total_revenue
    FROM {fact_sales} s
    JOIN {dim_products} p
        ON s.product_key = p.product_key
    GROUP BY
        p.product_id,
        p.product_category_name
    ORDER BY
        units_sold ASC,
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
            "units_sold": int(row.units_sold),
            "total_revenue": to_json_number(row.total_revenue)
        }
        for row in result
    ]


def get_average_product_price():
    """
    Return average product sale value.
    """

    sql = """
    SELECT ROUND(AVG(total_sale_value), 2) AS average_product_price
    FROM {fact_sales}
    """.format(fact_sales=table("fact_sales"))

    result = execute_query(sql)

    for row in result:
        return {
            "average_product_price": to_json_number(row.average_product_price)
        }

    return {
        "average_product_price": 0
    }


def get_highest_priced_products(limit=10):
    """
    Return highest priced products.
    """

    safe_limit_value = safe_limit(limit)

    sql = """
    SELECT
        p.product_id,
        p.product_category_name,
        ROUND(MAX(s.price), 2) AS highest_price
    FROM {fact_sales} s
    JOIN {dim_products} p
        ON s.product_key = p.product_key
    GROUP BY
        p.product_id,
        p.product_category_name
    ORDER BY
        highest_price DESC
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
            "highest_price": to_json_number(row.highest_price)
        }
        for row in result
    ]


def get_lowest_priced_products(limit=10):
    """
    Return lowest priced products.
    """

    safe_limit_value = safe_limit(limit)

    sql = """
    SELECT
        p.product_id,
        p.product_category_name,
        ROUND(MIN(s.price), 2) AS lowest_price
    FROM {fact_sales} s
    JOIN {dim_products} p
        ON s.product_key = p.product_key
    GROUP BY
        p.product_id,
        p.product_category_name
    ORDER BY
        lowest_price ASC
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
            "lowest_price": to_json_number(row.lowest_price)
        }
        for row in result
    ]


def get_largest_categories(limit=10):
    """
    Return largest product categories by product count.
    """

    safe_limit_value = safe_limit(limit)

    sql = """
    SELECT
        product_category_name,
        COUNT(DISTINCT product_key) AS total_products
    FROM {dim_products}
    GROUP BY
        product_category_name
    ORDER BY
        total_products DESC
    LIMIT {limit}
    """.format(
        dim_products=table("dim_products"),
        limit=safe_limit_value,
    )

    result = execute_query(sql)

    return [
        {
            "product_category": row.product_category_name,
            "total_products": int(row.total_products)
        }
        for row in result
    ]


def get_smallest_categories(limit=10):
    """
    Return smallest product categories by product count.
    """

    safe_limit_value = safe_limit(limit)

    sql = """
    SELECT
        product_category_name,
        COUNT(DISTINCT product_key) AS total_products
    FROM {dim_products}
    GROUP BY
        product_category_name
    ORDER BY
        total_products ASC
    LIMIT {limit}
    """.format(
        dim_products=table("dim_products"),
        limit=safe_limit_value,
    )

    result = execute_query(sql)

    return [
        {
            "product_category": row.product_category_name,
            "total_products": int(row.total_products)
        }
        for row in result
    ]


def get_products_per_category(limit=50):
    """
    Return products per category.
    """

    return get_products_by_category(limit)
