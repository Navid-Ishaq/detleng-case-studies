"""
=========================================================
Order Business Intelligence Tools
=========================================================
"""

from .common import execute_query, table


def get_cancelled_orders():
    """
    Return cancelled orders.
    """

    return get_orders_by_status("canceled", "cancelled_orders")


def get_delivered_orders():
    """
    Return delivered orders.
    """

    return get_orders_by_status("delivered", "delivered_orders")


def get_pending_orders():
    """
    Return pending orders.
    """

    return get_orders_by_status("pending", "pending_orders")


def get_processing_orders():
    """
    Return processing orders.
    """

    return get_orders_by_status("processing", "processing_orders")


def get_shipped_orders():
    """
    Return shipped orders.
    """

    return get_orders_by_status("shipped", "shipped_orders")


def get_orders_by_status(status: str, output_key: str):
    """
    Return order count for a fixed order status.
    """

    sql = """
    SELECT COUNT(DISTINCT order_id) AS total_orders
    FROM {fact_orders}
    WHERE order_status = '{status}'
    """.format(
        fact_orders=table("fact_orders"),
        status=status,
    )

    result = execute_query(sql)

    for row in result:
        return {
            output_key: int(row.total_orders)
        }

    return {
        output_key: 0
    }


def get_order_status_distribution():
    """
    Return order status distribution.
    """

    sql = """
    SELECT
        order_status,
        COUNT(DISTINCT order_id) AS total_orders
    FROM {fact_orders}
    GROUP BY
        order_status
    ORDER BY
        total_orders DESC
    """.format(fact_orders=table("fact_orders"))

    result = execute_query(sql)

    return [
        {
            "order_status": row.order_status,
            "total_orders": int(row.total_orders)
        }
        for row in result
    ]


def get_orders_by_month():
    """
    Return orders by month.
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


def get_orders_by_weekday():
    """
    Return orders by weekday.
    """

    sql = """
    SELECT
        purchase_weekday,
        COUNT(DISTINCT order_id) AS total_orders
    FROM {fact_orders}
    GROUP BY
        purchase_weekday
    ORDER BY
        total_orders DESC
    """.format(fact_orders=table("fact_orders"))

    result = execute_query(sql)

    return [
        {
            "weekday": row.purchase_weekday,
            "total_orders": int(row.total_orders)
        }
        for row in result
    ]


def get_orders_by_hour():
    """
    Return orders by purchase hour.
    """

    sql = """
    SELECT
        purchase_hour,
        COUNT(DISTINCT order_id) AS total_orders
    FROM {fact_orders}
    GROUP BY
        purchase_hour
    ORDER BY
        purchase_hour ASC
    """.format(fact_orders=table("fact_orders"))

    result = execute_query(sql)

    return [
        {
            "purchase_hour": int(row.purchase_hour),
            "total_orders": int(row.total_orders)
        }
        for row in result
    ]
