"""Allowlisted ProofSQL pilot metadata, separate from the OpenAI explanation.

Only numeric metrics from known fixed BI tools are exposed.  Browser comparison
uses a static educational snapshot, not a second live BigQuery query.
"""
from datetime import datetime, timezone
from numbers import Real

PILOT_METRICS = {
    "total_revenue": ("total_revenue",),
    "total_orders": ("total_orders",),
    "total_products": ("total_products",),
    "product_count": ("total_products",),
    "average_order_value": ("average_order_value",),
    "delivery_success_rate": ("delivery_success_rate",),
    "on_time_deliveries": ("on_time_deliveries",),
    "executive_dashboard": ("total_revenue", "total_orders", "total_products", "on_time_delivery_percent"),
    "business_summary": ("total_revenue", "total_orders", "total_products"),
    "sales_summary": ("total_revenue", "total_orders", "average_order_value"),
    "delivery_summary": ("total_delivery_orders", "on_time_deliveries", "on_time_delivery_percent"),
}


def pilot_verification(tool_name, result):
    """Return a small, JSON-safe, optional verification payload; never SQL or keys."""
    fields = PILOT_METRICS.get(tool_name)
    if not fields or not isinstance(result, dict):
        return None
    metrics = {}
    for field in fields:
        value = result.get(field)
        if isinstance(value, bool) or not isinstance(value, Real):
            return None
        metrics[field] = value
    return {
        "tool": tool_name,
        "metrics": metrics,
        "live_queried_at": datetime.now(timezone.utc).isoformat(),
        "comparison_scope": "proofsql_pilot",
    }
