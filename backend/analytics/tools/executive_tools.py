"""
=========================================================
Executive Business Intelligence Tools
=========================================================
"""

from .common import execute_query, table, to_json_number


def get_customer_count():
    """
    Return total number of customers.
    """

    sql = """
    SELECT COUNT(*) AS total_customers
    FROM {dim_customers}
    """.format(dim_customers=table("dim_customers"))

    result = execute_query(sql)

    for row in result:
        return {
            "total_customers": int(row.total_customers)
        }

    return {
        "total_customers": 0
    }


def get_total_orders():
    """
    Return total number of orders.
    """

    sql = """
    SELECT COUNT(*) AS total_orders
    FROM {fact_orders}
    """.format(fact_orders=table("fact_orders"))

    result = execute_query(sql)

    for row in result:
        return {
            "total_orders": int(row.total_orders)
        }

    return {
        "total_orders": 0
    }


def get_total_products():
    """
    Return total number of products.
    """

    sql = """
    SELECT COUNT(*) AS total_products
    FROM {dim_products}
    """.format(dim_products=table("dim_products"))

    result = execute_query(sql)

    for row in result:
        return {
            "total_products": int(row.total_products)
        }

    return {
        "total_products": 0
    }


def get_total_sellers():
    """
    Return total number of sellers.
    """

    sql = """
    SELECT COUNT(*) AS total_sellers
    FROM {dim_sellers}
    """.format(dim_sellers=table("dim_sellers"))

    result = execute_query(sql)

    for row in result:
        return {
            "total_sellers": int(row.total_sellers)
        }

    return {
        "total_sellers": 0
    }


def get_total_categories():
    """
    Return total number of product categories.
    """

    sql = """
    SELECT COUNT(DISTINCT product_category_name) AS total_categories
    FROM {dim_products}
    WHERE product_category_name IS NOT NULL
    """.format(dim_products=table("dim_products"))

    result = execute_query(sql)

    for row in result:
        return {
            "total_categories": int(row.total_categories)
        }

    return {
        "total_categories": 0
    }


def get_average_order_value():
    """
    Return average revenue per order.
    """

    sql = """
    SELECT
        ROUND(SAFE_DIVIDE(SUM(total_sale_value), COUNT(DISTINCT order_id)), 2)
            AS average_order_value
    FROM {fact_sales}
    """.format(fact_sales=table("fact_sales"))

    result = execute_query(sql)

    for row in result:
        return {
            "average_order_value": to_json_number(row.average_order_value)
        }

    return {
        "average_order_value": 0
    }


def get_revenue_per_customer():
    """
    Return average revenue per customer.
    """

    sql = """
    SELECT
        ROUND(SAFE_DIVIDE(SUM(s.total_sale_value), COUNT(DISTINCT o.customer_key)), 2)
            AS revenue_per_customer
    FROM {fact_sales} s
    JOIN {fact_orders} o
        ON s.order_id = o.order_id
    """.format(
        fact_sales=table("fact_sales"),
        fact_orders=table("fact_orders"),
    )

    result = execute_query(sql)

    for row in result:
        return {
            "revenue_per_customer": to_json_number(row.revenue_per_customer)
        }

    return {
        "revenue_per_customer": 0
    }


def get_business_summary():
    """
    Return high-level business summary metrics.
    """

    sql = """
    SELECT
        (
            SELECT ROUND(SUM(total_sale_value), 2)
            FROM {fact_sales}
        ) AS total_revenue,
        (
            SELECT COUNT(DISTINCT order_id)
            FROM {fact_orders}
        ) AS total_orders,
        (
            SELECT COUNT(DISTINCT customer_key)
            FROM {dim_customers}
        ) AS total_customers,
        (
            SELECT COUNT(DISTINCT product_key)
            FROM {dim_products}
        ) AS total_products,
        (
            SELECT COUNT(DISTINCT seller_key)
            FROM {dim_sellers}
        ) AS total_sellers
    """.format(
        fact_sales=table("fact_sales"),
        fact_orders=table("fact_orders"),
        dim_customers=table("dim_customers"),
        dim_products=table("dim_products"),
        dim_sellers=table("dim_sellers"),
    )

    result = execute_query(sql)

    for row in result:
        return {
            "total_revenue": to_json_number(row.total_revenue),
            "total_orders": int(row.total_orders),
            "total_customers": int(row.total_customers),
            "total_products": int(row.total_products),
            "total_sellers": int(row.total_sellers),
        }

    return {}


def get_sales_summary():
    """
    Return sales summary metrics.
    """

    sql = """
    SELECT
        ROUND(SUM(total_sale_value), 2) AS total_revenue,
        COUNT(DISTINCT order_id) AS total_orders,
        COUNT(*) AS total_order_items,
        ROUND(SAFE_DIVIDE(SUM(total_sale_value), COUNT(DISTINCT order_id)), 2)
            AS average_order_value,
        ROUND(AVG(price), 2) AS average_item_price,
        ROUND(SUM(freight_value), 2) AS total_freight_value
    FROM {fact_sales}
    """.format(fact_sales=table("fact_sales"))

    result = execute_query(sql)

    for row in result:
        return {
            "total_revenue": to_json_number(row.total_revenue),
            "total_orders": int(row.total_orders),
            "total_order_items": int(row.total_order_items),
            "average_order_value": to_json_number(row.average_order_value),
            "average_item_price": to_json_number(row.average_item_price),
            "total_freight_value": to_json_number(row.total_freight_value),
        }

    return {}


def get_customer_summary():
    """
    Return customer summary metrics.
    """

    sql = """
    SELECT
        (
            SELECT COUNT(DISTINCT customer_key)
            FROM {dim_customers}
        ) AS total_customers,
        (
            SELECT COUNT(DISTINCT customer_state)
            FROM {dim_customers}
            WHERE customer_state IS NOT NULL
        ) AS customer_states,
        (
            SELECT COUNT(DISTINCT customer_city)
            FROM {dim_customers}
            WHERE customer_city IS NOT NULL
        ) AS customer_cities,
        (
            SELECT ROUND(SAFE_DIVIDE(SUM(s.total_sale_value), COUNT(DISTINCT o.customer_key)), 2)
            FROM {fact_sales} s
            JOIN {fact_orders} o
                ON s.order_id = o.order_id
        ) AS average_customer_spend
    """.format(
        dim_customers=table("dim_customers"),
        fact_sales=table("fact_sales"),
        fact_orders=table("fact_orders"),
    )

    result = execute_query(sql)

    for row in result:
        return {
            "total_customers": int(row.total_customers),
            "customer_states": int(row.customer_states),
            "customer_cities": int(row.customer_cities),
            "average_customer_spend": to_json_number(row.average_customer_spend),
        }

    return {}


def get_delivery_summary():
    """
    Return delivery summary metrics.
    """

    sql = """
    SELECT
        COUNT(DISTINCT order_id) AS total_delivery_orders,
        ROUND(AVG(delivery_days), 2) AS average_delivery_days,
        SUM(late_delivery_flag) AS late_deliveries,
        SUM(on_time_delivery_flag) AS on_time_deliveries,
        ROUND(SAFE_DIVIDE(SUM(on_time_delivery_flag), COUNT(DISTINCT order_id)) * 100, 2)
            AS on_time_delivery_percent,
        ROUND(AVG(delivery_variance_days), 2) AS average_delivery_variance
    FROM {fact_delivery}
    """.format(fact_delivery=table("fact_delivery"))

    result = execute_query(sql)

    for row in result:
        return {
            "total_delivery_orders": int(row.total_delivery_orders),
            "average_delivery_days": to_json_number(row.average_delivery_days),
            "late_deliveries": int(row.late_deliveries or 0),
            "on_time_deliveries": int(row.on_time_deliveries or 0),
            "on_time_delivery_percent": to_json_number(row.on_time_delivery_percent),
            "average_delivery_variance": to_json_number(row.average_delivery_variance),
        }

    return {}


def get_payment_summary():
    """
    Return payment summary metrics.
    """

    sql = """
    SELECT
        COUNT(*) AS total_payment_records,
        COUNT(DISTINCT order_id) AS paid_orders,
        ROUND(SUM(payment_value), 2) AS total_payment_value,
        ROUND(AVG(payment_value), 2) AS average_payment_value,
        ROUND(AVG(payment_installments), 2) AS average_installments,
        COUNT(DISTINCT payment_type) AS payment_types
    FROM {fact_payments}
    """.format(fact_payments=table("fact_payments"))

    result = execute_query(sql)

    for row in result:
        return {
            "total_payment_records": int(row.total_payment_records),
            "paid_orders": int(row.paid_orders),
            "total_payment_value": to_json_number(row.total_payment_value),
            "average_payment_value": to_json_number(row.average_payment_value),
            "average_installments": to_json_number(row.average_installments),
            "payment_types": int(row.payment_types),
        }

    return {}


def get_review_summary():
    """
    Return review summary metrics.
    """

    sql = """
    SELECT
        COUNT(DISTINCT review_id) AS total_reviews,
        ROUND(AVG(review_score), 2) AS average_rating,
        SUM(CASE WHEN review_score >= 4 THEN 1 ELSE 0 END) AS positive_reviews,
        SUM(CASE WHEN review_score <= 2 THEN 1 ELSE 0 END) AS negative_reviews,
        ROUND(AVG(comment_length), 2) AS average_comment_length
    FROM {fact_reviews}
    """.format(fact_reviews=table("fact_reviews"))

    result = execute_query(sql)

    for row in result:
        return {
            "total_reviews": int(row.total_reviews),
            "average_rating": to_json_number(row.average_rating),
            "positive_reviews": int(row.positive_reviews or 0),
            "negative_reviews": int(row.negative_reviews or 0),
            "average_comment_length": to_json_number(row.average_comment_length),
        }

    return {}


def get_executive_dashboard():
    """
    Return executive dashboard metrics across core business areas.
    """

    sql = """
    SELECT
        (
            SELECT ROUND(SUM(total_sale_value), 2)
            FROM {fact_sales}
        ) AS total_revenue,
        (
            SELECT COUNT(DISTINCT order_id)
            FROM {fact_orders}
        ) AS total_orders,
        (
            SELECT COUNT(DISTINCT customer_key)
            FROM {dim_customers}
        ) AS total_customers,
        (
            SELECT COUNT(DISTINCT product_key)
            FROM {dim_products}
        ) AS total_products,
        (
            SELECT COUNT(DISTINCT seller_key)
            FROM {dim_sellers}
        ) AS total_sellers,
        (
            SELECT ROUND(AVG(delivery_days), 2)
            FROM {fact_delivery}
        ) AS average_delivery_days,
        (
            SELECT ROUND(SAFE_DIVIDE(SUM(on_time_delivery_flag), COUNT(DISTINCT order_id)) * 100, 2)
            FROM {fact_delivery}
        ) AS on_time_delivery_percent,
        (
            SELECT ROUND(AVG(payment_value), 2)
            FROM {fact_payments}
        ) AS average_payment_value,
        (
            SELECT ROUND(AVG(review_score), 2)
            FROM {fact_reviews}
        ) AS average_rating
    """.format(
        fact_sales=table("fact_sales"),
        fact_orders=table("fact_orders"),
        dim_customers=table("dim_customers"),
        dim_products=table("dim_products"),
        dim_sellers=table("dim_sellers"),
        fact_delivery=table("fact_delivery"),
        fact_payments=table("fact_payments"),
        fact_reviews=table("fact_reviews"),
    )

    result = execute_query(sql)

    for row in result:
        return {
            "total_revenue": to_json_number(row.total_revenue),
            "total_orders": int(row.total_orders),
            "total_customers": int(row.total_customers),
            "total_products": int(row.total_products),
            "total_sellers": int(row.total_sellers),
            "average_delivery_days": to_json_number(row.average_delivery_days),
            "on_time_delivery_percent": to_json_number(row.on_time_delivery_percent),
            "average_payment_value": to_json_number(row.average_payment_value),
            "average_rating": to_json_number(row.average_rating),
        }

    return {}
