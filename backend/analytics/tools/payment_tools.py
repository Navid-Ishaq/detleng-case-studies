"""
=========================================================
Payment Business Intelligence Tools
=========================================================
"""

from .common import execute_query, table, to_json_number


def get_revenue_by_payment_type():
    """
    Return payment value by payment type.
    """

    sql = """
    SELECT
        payment_type,
        ROUND(SUM(payment_value), 2) AS total_payment_value
    FROM {fact_payments}
    GROUP BY
        payment_type
    ORDER BY
        total_payment_value DESC
    """.format(fact_payments=table("fact_payments"))

    result = execute_query(sql)

    return [
        {
            "payment_type": row.payment_type,
            "total_payment_value": to_json_number(row.total_payment_value)
        }
        for row in result
    ]


def get_average_payment_value():
    """
    Return average payment value.
    """

    sql = """
    SELECT ROUND(AVG(payment_value), 2) AS average_payment_value
    FROM {fact_payments}
    """.format(fact_payments=table("fact_payments"))

    result = execute_query(sql)

    for row in result:
        return {
            "average_payment_value": to_json_number(row.average_payment_value)
        }

    return {
        "average_payment_value": 0
    }


def get_payment_installments():
    """
    Return payment installment distribution.
    """

    sql = """
    SELECT
        payment_installments,
        COUNT(*) AS payment_count,
        ROUND(SUM(payment_value), 2) AS total_payment_value
    FROM {fact_payments}
    GROUP BY
        payment_installments
    ORDER BY
        payment_installments ASC
    """.format(fact_payments=table("fact_payments"))

    result = execute_query(sql)

    return [
        {
            "payment_installments": int(row.payment_installments),
            "payment_count": int(row.payment_count),
            "total_payment_value": to_json_number(row.total_payment_value)
        }
        for row in result
    ]


def get_payment_type_distribution():
    """
    Return payment type distribution.
    """

    sql = """
    SELECT
        payment_type,
        COUNT(*) AS payment_count,
        ROUND(SUM(payment_value), 2) AS total_payment_value
    FROM {fact_payments}
    GROUP BY
        payment_type
    ORDER BY
        payment_count DESC
    """.format(fact_payments=table("fact_payments"))

    result = execute_query(sql)

    return [
        {
            "payment_type": row.payment_type,
            "payment_count": int(row.payment_count),
            "total_payment_value": to_json_number(row.total_payment_value)
        }
        for row in result
    ]


def get_installments_distribution():
    """
    Return installment category distribution.
    """

    sql = """
    SELECT
        installment_category,
        COUNT(*) AS payment_count,
        ROUND(AVG(payment_installments), 2) AS average_installments,
        ROUND(SUM(payment_value), 2) AS total_payment_value
    FROM {fact_payments}
    GROUP BY
        installment_category
    ORDER BY
        payment_count DESC
    """.format(fact_payments=table("fact_payments"))

    result = execute_query(sql)

    return [
        {
            "installment_category": row.installment_category,
            "payment_count": int(row.payment_count),
            "average_installments": to_json_number(row.average_installments),
            "total_payment_value": to_json_number(row.total_payment_value)
        }
        for row in result
    ]


def get_highest_payment_orders(limit=10):
    """
    Return highest payment orders.
    """

    from .common import safe_limit

    safe_limit_value = safe_limit(limit)

    sql = """
    SELECT
        order_id,
        ROUND(SUM(payment_value), 2) AS total_payment_value
    FROM {fact_payments}
    GROUP BY
        order_id
    ORDER BY
        total_payment_value DESC
    LIMIT {limit}
    """.format(
        fact_payments=table("fact_payments"),
        limit=safe_limit_value,
    )

    result = execute_query(sql)

    return [
        {
            "order_id": row.order_id,
            "total_payment_value": to_json_number(row.total_payment_value)
        }
        for row in result
    ]
