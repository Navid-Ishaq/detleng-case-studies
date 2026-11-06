"""
=========================================================
Review Business Intelligence Tools
=========================================================
"""

from .common import execute_query, safe_limit, table, to_json_number


def get_average_rating():
    """
    Return average review rating.
    """

    sql = """
    SELECT ROUND(AVG(review_score), 2) AS average_rating
    FROM {fact_reviews}
    """.format(fact_reviews=table("fact_reviews"))

    result = execute_query(sql)

    for row in result:
        return {
            "average_rating": to_json_number(row.average_rating)
        }

    return {
        "average_rating": 0
    }


def get_rating_distribution():
    """
    Return review rating distribution.
    """

    sql = """
    SELECT
        review_score,
        COUNT(*) AS review_count
    FROM {fact_reviews}
    GROUP BY
        review_score
    ORDER BY
        review_score ASC
    """.format(fact_reviews=table("fact_reviews"))

    result = execute_query(sql)

    return [
        {
            "review_score": int(row.review_score),
            "review_count": int(row.review_count)
        }
        for row in result
    ]


def get_highest_rated_products(limit=10):
    """
    Return highest rated products.
    """

    safe_limit_value = safe_limit(limit)

    sql = """
    SELECT
        p.product_id,
        p.product_category_name,
        ROUND(AVG(r.review_score), 2) AS average_rating,
        COUNT(*) AS review_count
    FROM {fact_reviews} r
    JOIN {fact_sales} s
        ON r.order_id = s.order_id
    JOIN {dim_products} p
        ON s.product_key = p.product_key
    GROUP BY
        p.product_id,
        p.product_category_name
    ORDER BY
        average_rating DESC,
        review_count DESC
    LIMIT {limit}
    """.format(
        fact_reviews=table("fact_reviews"),
        fact_sales=table("fact_sales"),
        dim_products=table("dim_products"),
        limit=safe_limit_value,
    )

    result = execute_query(sql)

    return [
        {
            "product_id": row.product_id,
            "product_category": row.product_category_name,
            "average_rating": to_json_number(row.average_rating),
            "review_count": int(row.review_count)
        }
        for row in result
    ]


def get_lowest_rated_products(limit=10):
    """
    Return lowest rated products.
    """

    safe_limit_value = safe_limit(limit)

    sql = """
    SELECT
        p.product_id,
        p.product_category_name,
        ROUND(AVG(r.review_score), 2) AS average_rating,
        COUNT(*) AS review_count
    FROM {fact_reviews} r
    JOIN {fact_sales} s
        ON r.order_id = s.order_id
    JOIN {dim_products} p
        ON s.product_key = p.product_key
    GROUP BY
        p.product_id,
        p.product_category_name
    ORDER BY
        average_rating ASC,
        review_count DESC
    LIMIT {limit}
    """.format(
        fact_reviews=table("fact_reviews"),
        fact_sales=table("fact_sales"),
        dim_products=table("dim_products"),
        limit=safe_limit_value,
    )

    result = execute_query(sql)

    return [
        {
            "product_id": row.product_id,
            "product_category": row.product_category_name,
            "average_rating": to_json_number(row.average_rating),
            "review_count": int(row.review_count)
        }
        for row in result
    ]


def get_positive_reviews():
    """
    Return positive review count.
    """

    sql = """
    SELECT COUNT(*) AS positive_reviews
    FROM {fact_reviews}
    WHERE review_score >= 4
    """.format(fact_reviews=table("fact_reviews"))

    result = execute_query(sql)

    for row in result:
        return {
            "positive_reviews": int(row.positive_reviews)
        }

    return {
        "positive_reviews": 0
    }


def get_negative_reviews():
    """
    Return negative review count.
    """

    sql = """
    SELECT COUNT(*) AS negative_reviews
    FROM {fact_reviews}
    WHERE review_score <= 2
    """.format(fact_reviews=table("fact_reviews"))

    result = execute_query(sql)

    for row in result:
        return {
            "negative_reviews": int(row.negative_reviews)
        }

    return {
        "negative_reviews": 0
    }


def get_reviews_by_month():
    """
    Return reviews by month.
    """

    sql = """
    SELECT
        d.calendar_year,
        d.calendar_month,
        d.month_name,
        COUNT(*) AS total_reviews,
        ROUND(AVG(r.review_score), 2) AS average_rating
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
            "total_reviews": int(row.total_reviews),
            "average_rating": to_json_number(row.average_rating)
        }
        for row in result
    ]


def get_average_comment_length():
    """
    Return average review comment length.
    """

    sql = """
    SELECT ROUND(AVG(comment_length), 2) AS average_comment_length
    FROM {fact_reviews}
    """.format(fact_reviews=table("fact_reviews"))

    result = execute_query(sql)

    for row in result:
        return {
            "average_comment_length": to_json_number(row.average_comment_length)
        }

    return {
        "average_comment_length": 0
    }
