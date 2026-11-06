"""
=========================================================
Delivery Business Intelligence Tools
=========================================================
"""

from .common import execute_query, table, to_json_number


def get_delivery_performance():
    """
    Return average delivery performance.
    """

    return get_average_delivery_days()


def get_average_delivery_days():
    """
    Return average delivery days.
    """

    sql = """
    SELECT ROUND(AVG(delivery_days), 2) AS average_delivery_days
    FROM {fact_delivery}
    """.format(fact_delivery=table("fact_delivery"))

    result = execute_query(sql)

    for row in result:
        return {
            "average_delivery_days": to_json_number(row.average_delivery_days)
        }

    return {
        "average_delivery_days": 0
    }


def get_late_deliveries():
    """
    Return late delivery count.
    """

    sql = """
    SELECT SUM(late_delivery_flag) AS late_deliveries
    FROM {fact_delivery}
    """.format(fact_delivery=table("fact_delivery"))

    result = execute_query(sql)

    for row in result:
        return {
            "late_deliveries": int(row.late_deliveries or 0)
        }

    return {
        "late_deliveries": 0
    }


def get_on_time_deliveries():
    """
    Return on-time delivery count.
    """

    sql = """
    SELECT SUM(on_time_delivery_flag) AS on_time_deliveries
    FROM {fact_delivery}
    """.format(fact_delivery=table("fact_delivery"))

    result = execute_query(sql)

    for row in result:
        return {
            "on_time_deliveries": int(row.on_time_deliveries or 0)
        }

    return {
        "on_time_deliveries": 0
    }


def get_delivery_success_rate():
    """
    Return on-time delivery percentage.
    """

    sql = """
    SELECT
        ROUND(
            SAFE_DIVIDE(SUM(on_time_delivery_flag), COUNT(DISTINCT order_id)) * 100,
            2
        ) AS delivery_success_rate
    FROM {fact_delivery}
    """.format(fact_delivery=table("fact_delivery"))

    result = execute_query(sql)

    for row in result:
        return {
            "delivery_success_rate": to_json_number(row.delivery_success_rate)
        }

    return {
        "delivery_success_rate": 0
    }


def get_average_delivery_variance():
    """
    Return average delivery variance days.
    """

    sql = """
    SELECT ROUND(AVG(delivery_variance_days), 2) AS average_delivery_variance
    FROM {fact_delivery}
    """.format(fact_delivery=table("fact_delivery"))

    result = execute_query(sql)

    for row in result:
        return {
            "average_delivery_variance": to_json_number(row.average_delivery_variance)
        }

    return {
        "average_delivery_variance": 0
    }
