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

# Full-deployment metadata remains a numeric/public-dimension projection of the
# existing BI result, never an extra BigQuery query or AI request. This allows
# all 100 fixed analytics tools to be compared after the full snapshot is
# prepared and published. Customer/product/order/seller identifiers are omitted.
# Keep the pilot payload unchanged so existing live verification never regresses.
from decimal import Decimal
import math

_PUBLIC_DIMENSIONS = frozenset({
    "month_name", "customer_city", "customer_state", "seller_city",
    "seller_state", "order_status", "payment_type", "installment_category",
    "product_category", "weekday",
})
_DISALLOWED = frozenset({
    "order_id", "review_id", "customer_id", "customer_unique_id",
    "product_id", "seller_id", "customer_key", "product_key", "seller_key",
    "geography_key",
})


def _public_record(value):
    if not isinstance(value, dict):
        return None
    record = {}
    for field, item in value.items():
        if not isinstance(field, str) or field in _DISALLOWED:
            continue
        if field in _PUBLIC_DIMENSIONS and isinstance(item, str):
            record[field] = item[:120]
        elif isinstance(item, (int, float, Decimal)) and not isinstance(item, bool):
            n = float(item)
            if math.isfinite(n):
                record[field] = int(item) if isinstance(item, int) else n
        elif item is None:
            record[field] = None
    return record


def verification_for_tool(tool_name, result):
    """All fixed tools, sanitized. Schema validation happens in the browser.

    A missing public snapshot cannot cause a MATCH. No raw ID, private text,
    or visitor-supplied SQL is exposed by this metadata.
    """
    from analytics.registry import TOOL_REGISTRY
    if tool_name not in TOOL_REGISTRY:
        return None
    pilot = pilot_verification(tool_name, result)
    if isinstance(result, dict):
        records = [_public_record(result)]
        shape = "scalar"
    elif isinstance(result, list) and len(result) <= 500:
        records = [_public_record(item) for item in result]
        shape = "rows"
    else:
        return pilot
    if any(item is None for item in records):
        return pilot
    payload = pilot or {
        "tool": tool_name,
        "live_queried_at": datetime.now(timezone.utc).isoformat(),
    }
    # Numeric and safe categorical values only. Empty records are legitimate
    # (e.g., queries with no results), but the browser must still compare counts.
    payload["records"] = records
    payload["record_shape"] = shape
    payload["comparison_scope"] = "full_snapshot_required"
    return payload
