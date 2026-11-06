"""
=========================================================
Business Intelligence Tool Registry
=========================================================
"""

import functools
import inspect
from collections.abc import Callable
from typing import Any

from .executor import execute_tool
from .tools import (
    get_average_comment_length,
    get_average_customer_spend,
    get_average_delivery_days,
    get_average_delivery_variance,
    get_average_order_value,
    get_average_payment_value,
    get_average_product_price,
    get_average_rating,
    get_average_seller_revenue,
    get_best_selling_products,
    get_bottom_categories,
    get_bottom_products,
    get_bottom_sellers,
    get_business_summary,
    get_cancelled_orders,
    get_customer_count,
    get_customer_density,
    get_customer_growth,
    get_customer_lifetime_value,
    get_customer_summary,
    get_customers_by_city,
    get_customers_by_month,
    get_customers_by_state,
    get_customers_by_year,
    get_delivered_orders,
    get_delivery_performance,
    get_delivery_success_rate,
    get_delivery_summary,
    get_executive_dashboard,
    get_highest_payment_orders,
    get_highest_priced_products,
    get_highest_rated_products,
    get_installments_distribution,
    get_largest_categories,
    get_late_deliveries,
    get_lowest_priced_products,
    get_lowest_rated_products,
    get_lowest_revenue_month,
    get_month_over_month_growth,
    get_monthly_customers,
    get_monthly_orders,
    get_monthly_payments,
    get_monthly_reviews,
    get_monthly_revenue,
    get_monthly_revenue_growth,
    get_negative_reviews,
    get_new_customers,
    get_on_time_deliveries,
    get_order_status_distribution,
    get_orders_by_hour,
    get_orders_by_month,
    get_orders_by_weekday,
    get_payment_installments,
    get_payment_summary,
    get_payment_type_distribution,
    get_pending_orders,
    get_positive_reviews,
    get_processing_orders,
    get_product_count,
    get_products_by_category,
    get_products_per_category,
    get_quarterly_revenue,
    get_quarterly_revenue_growth,
    get_rating_distribution,
    get_repeat_customers,
    get_revenue_by_category,
    get_revenue_by_city,
    get_revenue_by_month,
    get_revenue_by_payment_type,
    get_revenue_by_product,
    get_revenue_by_seller,
    get_revenue_by_state,
    get_revenue_by_year,
    get_revenue_per_customer,
    get_review_summary,
    get_reviews_by_month,
    get_sales_summary,
    get_seller_count,
    get_seller_density,
    get_seller_growth,
    get_seller_revenue,
    get_sellers_by_state,
    get_shipped_orders,
    get_smallest_categories,
    get_top_categories,
    get_top_cities,
    get_top_customers,
    get_top_products,
    get_top_revenue_month,
    get_top_sellers,
    get_top_states,
    get_total_categories,
    get_total_orders,
    get_total_products,
    get_total_revenue,
    get_total_sellers,
    get_worst_selling_products,
    get_year_over_year_growth,
    get_yearly_revenue,
    get_yearly_revenue_growth,
)


ToolFunction = Callable[..., Any]


TOOL_REGISTRY: dict[str, ToolFunction] = {
    "average_comment_length": get_average_comment_length,
    "average_customer_spend": get_average_customer_spend,
    "average_delivery_days": get_average_delivery_days,
    "average_delivery_variance": get_average_delivery_variance,
    "average_order_value": get_average_order_value,
    "average_payment_value": get_average_payment_value,
    "average_product_price": get_average_product_price,
    "average_rating": get_average_rating,
    "average_seller_revenue": get_average_seller_revenue,
    "best_selling_products": get_best_selling_products,
    "bottom_categories": get_bottom_categories,
    "bottom_products": get_bottom_products,
    "bottom_sellers": get_bottom_sellers,
    "business_summary": get_business_summary,
    "cancelled_orders": get_cancelled_orders,
    "customer_count": get_customer_count,
    "customer_density": get_customer_density,
    "customer_growth": get_customer_growth,
    "customer_lifetime_value": get_customer_lifetime_value,
    "customer_summary": get_customer_summary,
    "customers_by_city": get_customers_by_city,
    "customers_by_month": get_customers_by_month,
    "customers_by_state": get_customers_by_state,
    "customers_by_year": get_customers_by_year,
    "delivered_orders": get_delivered_orders,
    "delivery_performance": get_delivery_performance,
    "delivery_success_rate": get_delivery_success_rate,
    "delivery_summary": get_delivery_summary,
    "executive_dashboard": get_executive_dashboard,
    "highest_payment_orders": get_highest_payment_orders,
    "highest_priced_products": get_highest_priced_products,
    "highest_rated_products": get_highest_rated_products,
    "installments_distribution": get_installments_distribution,
    "largest_categories": get_largest_categories,
    "late_deliveries": get_late_deliveries,
    "lowest_priced_products": get_lowest_priced_products,
    "lowest_rated_products": get_lowest_rated_products,
    "lowest_revenue_month": get_lowest_revenue_month,
    "month_over_month_growth": get_month_over_month_growth,
    "monthly_customers": get_monthly_customers,
    "monthly_orders": get_monthly_orders,
    "monthly_payments": get_monthly_payments,
    "monthly_reviews": get_monthly_reviews,
    "monthly_revenue": get_monthly_revenue,
    "monthly_revenue_growth": get_monthly_revenue_growth,
    "negative_reviews": get_negative_reviews,
    "new_customers": get_new_customers,
    "on_time_deliveries": get_on_time_deliveries,
    "order_status_distribution": get_order_status_distribution,
    "orders_by_hour": get_orders_by_hour,
    "orders_by_month": get_orders_by_month,
    "orders_by_weekday": get_orders_by_weekday,
    "payment_installments": get_payment_installments,
    "payment_summary": get_payment_summary,
    "payment_type_distribution": get_payment_type_distribution,
    "pending_orders": get_pending_orders,
    "positive_reviews": get_positive_reviews,
    "processing_orders": get_processing_orders,
    "product_count": get_product_count,
    "products_by_category": get_products_by_category,
    "products_per_category": get_products_per_category,
    "quarterly_revenue": get_quarterly_revenue,
    "quarterly_revenue_growth": get_quarterly_revenue_growth,
    "rating_distribution": get_rating_distribution,
    "repeat_customers": get_repeat_customers,
    "revenue_by_category": get_revenue_by_category,
    "revenue_by_city": get_revenue_by_city,
    "revenue_by_month": get_revenue_by_month,
    "revenue_by_payment_type": get_revenue_by_payment_type,
    "revenue_by_product": get_revenue_by_product,
    "revenue_by_seller": get_revenue_by_seller,
    "revenue_by_state": get_revenue_by_state,
    "revenue_by_year": get_revenue_by_year,
    "revenue_per_customer": get_revenue_per_customer,
    "review_summary": get_review_summary,
    "reviews_by_month": get_reviews_by_month,
    "sales_summary": get_sales_summary,
    "seller_count": get_seller_count,
    "seller_density": get_seller_density,
    "seller_growth": get_seller_growth,
    "seller_revenue": get_seller_revenue,
    "sellers_by_state": get_sellers_by_state,
    "shipped_orders": get_shipped_orders,
    "smallest_categories": get_smallest_categories,
    "top_categories": get_top_categories,
    "top_cities": get_top_cities,
    "top_customers": get_top_customers,
    "top_products": get_top_products,
    "top_revenue_month": get_top_revenue_month,
    "top_sellers": get_top_sellers,
    "top_states": get_top_states,
    "total_categories": get_total_categories,
    "total_orders": get_total_orders,
    "total_products": get_total_products,
    "total_revenue": get_total_revenue,
    "total_sellers": get_total_sellers,
    "worst_selling_products": get_worst_selling_products,
    "year_over_year_growth": get_year_over_year_growth,
    "yearly_revenue": get_yearly_revenue,
    "yearly_revenue_growth": get_yearly_revenue_growth,
}


def build_mcp_wrapper(tool_name: str, tool_function: ToolFunction) -> ToolFunction:
    """
    Build a FastMCP-facing wrapper while preserving the tool signature.
    """

    @functools.wraps(tool_function)
    def wrapper(*args, **kwargs):
        bound_arguments = inspect.signature(tool_function).bind_partial(
            *args,
            **kwargs,
        )
        bound_arguments.apply_defaults()

        return execute_tool(tool_name, dict(bound_arguments.arguments))

    wrapper.__name__ = tool_name
    wrapper.__qualname__ = tool_name
    wrapper.__doc__ = tool_function.__doc__
    wrapper.__signature__ = inspect.signature(tool_function)

    return wrapper


def register_mcp_tools(mcp) -> None:
    """
    Register every Business Intelligence tool with FastMCP.
    """

    for tool_name, tool_function in TOOL_REGISTRY.items():
        mcp.tool(build_mcp_wrapper(tool_name, tool_function))


def list_tools() -> list[str]:
    """
    Return every registered Business Intelligence tool name.
    """

    return sorted(TOOL_REGISTRY.keys())
