"""
=========================================================
Geography Business Intelligence Tools
=========================================================
"""

from .common import execute_query, safe_limit, table
from .revenue_tools import get_revenue_by_city, get_revenue_by_state


def get_customers_by_state(limit=27):
    """
    Return customer count by state.
    """

    safe_limit_value = safe_limit(limit, 100)

    sql = """
    SELECT
        customer_state,
        COUNT(*) AS total_customers
    FROM {dim_customers}
    GROUP BY
        customer_state
    ORDER BY
        total_customers DESC
    LIMIT {limit}
    """.format(
        dim_customers=table("dim_customers"),
        limit=safe_limit_value,
    )

    result = execute_query(sql)

    return [
        {
            "customer_state": row.customer_state,
            "total_customers": int(row.total_customers)
        }
        for row in result
    ]


def get_customers_by_city(limit=50):
    """
    Return customer count by city.
    """

    safe_limit_value = safe_limit(limit, 100)

    sql = """
    SELECT
        customer_city,
        customer_state,
        COUNT(*) AS total_customers
    FROM {dim_customers}
    GROUP BY
        customer_city,
        customer_state
    ORDER BY
        total_customers DESC
    LIMIT {limit}
    """.format(
        dim_customers=table("dim_customers"),
        limit=safe_limit_value,
    )

    result = execute_query(sql)

    return [
        {
            "customer_city": row.customer_city,
            "customer_state": row.customer_state,
            "total_customers": int(row.total_customers)
        }
        for row in result
    ]


def get_sellers_by_state(limit=27):
    """
    Return seller count by state.
    """

    safe_limit_value = safe_limit(limit, 100)

    sql = """
    SELECT
        seller_state,
        COUNT(*) AS total_sellers
    FROM {dim_sellers}
    GROUP BY
        seller_state
    ORDER BY
        total_sellers DESC
    LIMIT {limit}
    """.format(
        dim_sellers=table("dim_sellers"),
        limit=safe_limit_value,
    )

    result = execute_query(sql)

    return [
        {
            "seller_state": row.seller_state,
            "total_sellers": int(row.total_sellers)
        }
        for row in result
    ]


def get_top_cities(limit=20):
    """
    Return top customer cities by customer count.
    """

    safe_limit_value = safe_limit(limit, 100)

    sql = """
    SELECT
        customer_city,
        customer_state,
        COUNT(DISTINCT customer_key) AS total_customers
    FROM {dim_customers}
    GROUP BY
        customer_city,
        customer_state
    ORDER BY
        total_customers DESC
    LIMIT {limit}
    """.format(
        dim_customers=table("dim_customers"),
        limit=safe_limit_value,
    )

    result = execute_query(sql)

    return [
        {
            "customer_city": row.customer_city,
            "customer_state": row.customer_state,
            "total_customers": int(row.total_customers)
        }
        for row in result
    ]


def get_top_states(limit=27):
    """
    Return top customer states by customer count.
    """

    safe_limit_value = safe_limit(limit, 100)

    sql = """
    SELECT
        customer_state,
        COUNT(DISTINCT customer_key) AS total_customers
    FROM {dim_customers}
    GROUP BY
        customer_state
    ORDER BY
        total_customers DESC
    LIMIT {limit}
    """.format(
        dim_customers=table("dim_customers"),
        limit=safe_limit_value,
    )

    result = execute_query(sql)

    return [
        {
            "customer_state": row.customer_state,
            "total_customers": int(row.total_customers)
        }
        for row in result
    ]


def get_customer_density(limit=50):
    """
    Return customer density by city and state.
    """

    return get_customers_by_city(limit)


def get_seller_density(limit=27):
    """
    Return seller density by state.
    """

    return get_sellers_by_state(limit)
