/** Trusted build-time generated mapping for all 100 fixed BI tools.
 * A tool is VERIFIED only after a matching, locally executed SQL comparison.
 */
export const FULL_QUERIES = Object.freeze({
  "average_comment_length": {
    "tables": [
      "fact_reviews"
    ],
    "fields": {
      "average_comment_length": "average_comment_length"
    },
    "dimensions": [],
    "integer": [],
    "nullToZero": [
      "average_comment_length"
    ],
    "suppressedIdentifiers": [],
    "source": "review_tools.py:get_average_comment_length"
  },
  "average_customer_spend": {
    "tables": [
      "fact_orders",
      "fact_sales"
    ],
    "fields": {
      "revenue_per_customer": "revenue_per_customer"
    },
    "dimensions": [],
    "integer": [],
    "nullToZero": [
      "revenue_per_customer"
    ],
    "suppressedIdentifiers": [],
    "source": "customer_tools.py:get_average_customer_spend"
  },
  "average_delivery_days": {
    "tables": [
      "fact_delivery"
    ],
    "fields": {
      "average_delivery_days": "average_delivery_days"
    },
    "dimensions": [],
    "integer": [],
    "nullToZero": [
      "average_delivery_days"
    ],
    "suppressedIdentifiers": [],
    "source": "delivery_tools.py:get_average_delivery_days"
  },
  "average_delivery_variance": {
    "tables": [
      "fact_delivery"
    ],
    "fields": {
      "average_delivery_variance": "average_delivery_variance"
    },
    "dimensions": [],
    "integer": [],
    "nullToZero": [
      "average_delivery_variance"
    ],
    "suppressedIdentifiers": [],
    "source": "delivery_tools.py:get_average_delivery_variance"
  },
  "average_order_value": {
    "tables": [
      "fact_sales"
    ],
    "fields": {
      "average_order_value": "average_order_value"
    },
    "dimensions": [],
    "integer": [],
    "nullToZero": [
      "average_order_value"
    ],
    "suppressedIdentifiers": [],
    "source": "executive_tools.py:get_average_order_value"
  },
  "average_payment_value": {
    "tables": [
      "fact_payments"
    ],
    "fields": {
      "average_payment_value": "average_payment_value"
    },
    "dimensions": [],
    "integer": [],
    "nullToZero": [
      "average_payment_value"
    ],
    "suppressedIdentifiers": [],
    "source": "payment_tools.py:get_average_payment_value"
  },
  "average_product_price": {
    "tables": [
      "fact_sales"
    ],
    "fields": {
      "average_product_price": "average_product_price"
    },
    "dimensions": [],
    "integer": [],
    "nullToZero": [
      "average_product_price"
    ],
    "suppressedIdentifiers": [],
    "source": "product_tools.py:get_average_product_price"
  },
  "average_rating": {
    "tables": [
      "fact_reviews"
    ],
    "fields": {
      "average_rating": "average_rating"
    },
    "dimensions": [],
    "integer": [],
    "nullToZero": [
      "average_rating"
    ],
    "suppressedIdentifiers": [],
    "source": "review_tools.py:get_average_rating"
  },
  "average_seller_revenue": {
    "tables": [
      "fact_sales"
    ],
    "fields": {
      "average_seller_revenue": "average_seller_revenue"
    },
    "dimensions": [],
    "integer": [],
    "nullToZero": [
      "average_seller_revenue"
    ],
    "suppressedIdentifiers": [],
    "source": "seller_tools.py:get_average_seller_revenue"
  },
  "best_selling_products": {
    "tables": [
      "dim_products",
      "fact_sales"
    ],
    "fields": {
      "product_category": "product_category_name",
      "units_sold": "units_sold",
      "total_revenue": "total_revenue"
    },
    "dimensions": [
      "product_category"
    ],
    "integer": [
      "units_sold"
    ],
    "nullToZero": [
      "total_revenue"
    ],
    "suppressedIdentifiers": [
      "product_id"
    ],
    "source": "product_tools.py:get_best_selling_products"
  },
  "bottom_categories": {
    "tables": [
      "dim_products",
      "fact_sales"
    ],
    "fields": {
      "product_category": "product_category_name",
      "total_revenue": "total_revenue"
    },
    "dimensions": [
      "product_category"
    ],
    "integer": [],
    "nullToZero": [
      "total_revenue"
    ],
    "suppressedIdentifiers": [],
    "source": "sales_tools.py:get_bottom_categories"
  },
  "bottom_products": {
    "tables": [
      "dim_products",
      "fact_sales"
    ],
    "fields": {
      "product_category": "product_category_name",
      "total_revenue": "total_revenue"
    },
    "dimensions": [
      "product_category"
    ],
    "integer": [],
    "nullToZero": [
      "total_revenue"
    ],
    "suppressedIdentifiers": [
      "product_id"
    ],
    "source": "sales_tools.py:get_bottom_products"
  },
  "bottom_sellers": {
    "tables": [
      "dim_sellers",
      "fact_sales"
    ],
    "fields": {
      "seller_city": "seller_city",
      "seller_state": "seller_state",
      "total_revenue": "total_revenue"
    },
    "dimensions": [
      "seller_city",
      "seller_state"
    ],
    "integer": [],
    "nullToZero": [
      "total_revenue"
    ],
    "suppressedIdentifiers": [
      "seller_id"
    ],
    "source": "seller_tools.py:get_bottom_sellers"
  },
  "business_summary": {
    "tables": [
      "dim_customers",
      "dim_products",
      "dim_sellers",
      "fact_orders",
      "fact_sales"
    ],
    "fields": {
      "total_revenue": "total_revenue",
      "total_orders": "total_orders",
      "total_customers": "total_customers",
      "total_products": "total_products",
      "total_sellers": "total_sellers"
    },
    "dimensions": [],
    "integer": [
      "total_customers",
      "total_orders",
      "total_products",
      "total_sellers"
    ],
    "nullToZero": [
      "total_revenue"
    ],
    "suppressedIdentifiers": [],
    "source": "executive_tools.py:get_business_summary"
  },
  "cancelled_orders": {
    "tables": [
      "fact_orders"
    ],
    "fields": {
      "cancelled_orders": "total_orders"
    },
    "dimensions": [],
    "integer": [
      "cancelled_orders"
    ],
    "nullToZero": [],
    "suppressedIdentifiers": [],
    "source": "order_tools.py:get_cancelled_orders"
  },
  "customer_count": {
    "tables": [
      "dim_customers"
    ],
    "fields": {
      "total_customers": "total_customers"
    },
    "dimensions": [],
    "integer": [
      "total_customers"
    ],
    "nullToZero": [],
    "suppressedIdentifiers": [],
    "source": "executive_tools.py:get_customer_count"
  },
  "customer_density": {
    "tables": [
      "dim_customers"
    ],
    "fields": {
      "customer_city": "customer_city",
      "customer_state": "customer_state",
      "total_customers": "total_customers"
    },
    "dimensions": [
      "customer_city",
      "customer_state"
    ],
    "integer": [
      "total_customers"
    ],
    "nullToZero": [],
    "suppressedIdentifiers": [],
    "source": "geography_tools.py:get_customer_density"
  },
  "customer_growth": {
    "tables": [
      "dim_dates",
      "fact_orders"
    ],
    "fields": {
      "year": "calendar_year",
      "month": "calendar_month",
      "month_name": "month_name",
      "new_customers": "new_customers",
      "previous_month_customers": "previous_month_customers",
      "customer_growth_percent": "customer_growth_percent"
    },
    "dimensions": [
      "month_name"
    ],
    "integer": [
      "month",
      "new_customers",
      "previous_month_customers",
      "year"
    ],
    "nullToZero": [
      "customer_growth_percent",
      "previous_month_customers"
    ],
    "suppressedIdentifiers": [],
    "source": "customer_tools.py:get_customer_growth"
  },
  "customer_lifetime_value": {
    "tables": [
      "dim_customers",
      "fact_orders",
      "fact_sales"
    ],
    "fields": {
      "customer_city": "customer_city",
      "customer_state": "customer_state",
      "total_revenue": "total_revenue"
    },
    "dimensions": [
      "customer_city",
      "customer_state"
    ],
    "integer": [],
    "nullToZero": [
      "total_revenue"
    ],
    "suppressedIdentifiers": [
      "customer_id",
      "customer_unique_id"
    ],
    "source": "customer_tools.py:get_customer_lifetime_value"
  },
  "customer_summary": {
    "tables": [
      "dim_customers",
      "fact_orders",
      "fact_sales"
    ],
    "fields": {
      "total_customers": "total_customers",
      "customer_states": "customer_states",
      "customer_cities": "customer_cities",
      "average_customer_spend": "average_customer_spend"
    },
    "dimensions": [],
    "integer": [
      "customer_cities",
      "customer_states",
      "total_customers"
    ],
    "nullToZero": [
      "average_customer_spend"
    ],
    "suppressedIdentifiers": [],
    "source": "executive_tools.py:get_customer_summary"
  },
  "customers_by_city": {
    "tables": [
      "dim_customers"
    ],
    "fields": {
      "customer_city": "customer_city",
      "customer_state": "customer_state",
      "total_customers": "total_customers"
    },
    "dimensions": [
      "customer_city",
      "customer_state"
    ],
    "integer": [
      "total_customers"
    ],
    "nullToZero": [],
    "suppressedIdentifiers": [],
    "source": "geography_tools.py:get_customers_by_city"
  },
  "customers_by_month": {
    "tables": [
      "dim_dates",
      "fact_orders"
    ],
    "fields": {
      "year": "calendar_year",
      "month": "calendar_month",
      "month_name": "month_name",
      "total_customers": "total_customers"
    },
    "dimensions": [
      "month_name"
    ],
    "integer": [
      "month",
      "total_customers",
      "year"
    ],
    "nullToZero": [],
    "suppressedIdentifiers": [],
    "source": "customer_tools.py:get_customers_by_month"
  },
  "customers_by_state": {
    "tables": [
      "dim_customers"
    ],
    "fields": {
      "customer_state": "customer_state",
      "total_customers": "total_customers"
    },
    "dimensions": [
      "customer_state"
    ],
    "integer": [
      "total_customers"
    ],
    "nullToZero": [],
    "suppressedIdentifiers": [],
    "source": "geography_tools.py:get_customers_by_state"
  },
  "customers_by_year": {
    "tables": [
      "dim_dates",
      "fact_orders"
    ],
    "fields": {
      "year": "calendar_year",
      "total_customers": "total_customers"
    },
    "dimensions": [],
    "integer": [
      "total_customers",
      "year"
    ],
    "nullToZero": [],
    "suppressedIdentifiers": [],
    "source": "customer_tools.py:get_customers_by_year"
  },
  "delivered_orders": {
    "tables": [
      "fact_orders"
    ],
    "fields": {
      "delivered_orders": "total_orders"
    },
    "dimensions": [],
    "integer": [
      "delivered_orders"
    ],
    "nullToZero": [],
    "suppressedIdentifiers": [],
    "source": "order_tools.py:get_delivered_orders"
  },
  "delivery_performance": {
    "tables": [
      "fact_delivery"
    ],
    "fields": {
      "average_delivery_days": "average_delivery_days"
    },
    "dimensions": [],
    "integer": [],
    "nullToZero": [
      "average_delivery_days"
    ],
    "suppressedIdentifiers": [],
    "source": "delivery_tools.py:get_delivery_performance"
  },
  "delivery_success_rate": {
    "tables": [
      "fact_delivery"
    ],
    "fields": {
      "delivery_success_rate": "delivery_success_rate"
    },
    "dimensions": [],
    "integer": [],
    "nullToZero": [
      "delivery_success_rate"
    ],
    "suppressedIdentifiers": [],
    "source": "delivery_tools.py:get_delivery_success_rate"
  },
  "delivery_summary": {
    "tables": [
      "fact_delivery"
    ],
    "fields": {
      "total_delivery_orders": "total_delivery_orders",
      "average_delivery_days": "average_delivery_days",
      "late_deliveries": "late_deliveries",
      "on_time_deliveries": "on_time_deliveries",
      "on_time_delivery_percent": "on_time_delivery_percent",
      "average_delivery_variance": "average_delivery_variance"
    },
    "dimensions": [],
    "integer": [
      "late_deliveries",
      "on_time_deliveries",
      "total_delivery_orders"
    ],
    "nullToZero": [
      "average_delivery_days",
      "average_delivery_variance",
      "late_deliveries",
      "on_time_deliveries",
      "on_time_delivery_percent"
    ],
    "suppressedIdentifiers": [],
    "source": "executive_tools.py:get_delivery_summary"
  },
  "executive_dashboard": {
    "tables": [
      "dim_customers",
      "dim_products",
      "dim_sellers",
      "fact_delivery",
      "fact_orders",
      "fact_payments",
      "fact_reviews",
      "fact_sales"
    ],
    "fields": {
      "total_revenue": "total_revenue",
      "total_orders": "total_orders",
      "total_customers": "total_customers",
      "total_products": "total_products",
      "total_sellers": "total_sellers",
      "average_delivery_days": "average_delivery_days",
      "on_time_delivery_percent": "on_time_delivery_percent",
      "average_payment_value": "average_payment_value",
      "average_rating": "average_rating"
    },
    "dimensions": [],
    "integer": [
      "total_customers",
      "total_orders",
      "total_products",
      "total_sellers"
    ],
    "nullToZero": [
      "average_delivery_days",
      "average_payment_value",
      "average_rating",
      "on_time_delivery_percent",
      "total_revenue"
    ],
    "suppressedIdentifiers": [],
    "source": "executive_tools.py:get_executive_dashboard"
  },
  "highest_payment_orders": {
    "tables": [
      "fact_payments"
    ],
    "fields": {
      "total_payment_value": "total_payment_value"
    },
    "dimensions": [],
    "integer": [],
    "nullToZero": [
      "total_payment_value"
    ],
    "suppressedIdentifiers": [
      "order_id"
    ],
    "source": "payment_tools.py:get_highest_payment_orders"
  },
  "highest_priced_products": {
    "tables": [
      "dim_products",
      "fact_sales"
    ],
    "fields": {
      "product_category": "product_category_name",
      "highest_price": "highest_price"
    },
    "dimensions": [
      "product_category"
    ],
    "integer": [],
    "nullToZero": [
      "highest_price"
    ],
    "suppressedIdentifiers": [
      "product_id"
    ],
    "source": "product_tools.py:get_highest_priced_products"
  },
  "highest_rated_products": {
    "tables": [
      "dim_products",
      "fact_reviews",
      "fact_sales"
    ],
    "fields": {
      "product_category": "product_category_name",
      "average_rating": "average_rating",
      "review_count": "review_count"
    },
    "dimensions": [
      "product_category"
    ],
    "integer": [
      "review_count"
    ],
    "nullToZero": [
      "average_rating"
    ],
    "suppressedIdentifiers": [
      "product_id"
    ],
    "source": "review_tools.py:get_highest_rated_products"
  },
  "installments_distribution": {
    "tables": [
      "fact_payments"
    ],
    "fields": {
      "installment_category": "installment_category",
      "payment_count": "payment_count",
      "average_installments": "average_installments",
      "total_payment_value": "total_payment_value"
    },
    "dimensions": [
      "installment_category"
    ],
    "integer": [
      "payment_count"
    ],
    "nullToZero": [
      "average_installments",
      "total_payment_value"
    ],
    "suppressedIdentifiers": [],
    "source": "payment_tools.py:get_installments_distribution"
  },
  "largest_categories": {
    "tables": [
      "dim_products"
    ],
    "fields": {
      "product_category": "product_category_name",
      "total_products": "total_products"
    },
    "dimensions": [
      "product_category"
    ],
    "integer": [
      "total_products"
    ],
    "nullToZero": [],
    "suppressedIdentifiers": [],
    "source": "product_tools.py:get_largest_categories"
  },
  "late_deliveries": {
    "tables": [
      "fact_delivery"
    ],
    "fields": {
      "late_deliveries": "late_deliveries"
    },
    "dimensions": [],
    "integer": [
      "late_deliveries"
    ],
    "nullToZero": [
      "late_deliveries"
    ],
    "suppressedIdentifiers": [],
    "source": "delivery_tools.py:get_late_deliveries"
  },
  "lowest_priced_products": {
    "tables": [
      "dim_products",
      "fact_sales"
    ],
    "fields": {
      "product_category": "product_category_name",
      "lowest_price": "lowest_price"
    },
    "dimensions": [
      "product_category"
    ],
    "integer": [],
    "nullToZero": [
      "lowest_price"
    ],
    "suppressedIdentifiers": [
      "product_id"
    ],
    "source": "product_tools.py:get_lowest_priced_products"
  },
  "lowest_rated_products": {
    "tables": [
      "dim_products",
      "fact_reviews",
      "fact_sales"
    ],
    "fields": {
      "product_category": "product_category_name",
      "average_rating": "average_rating",
      "review_count": "review_count"
    },
    "dimensions": [
      "product_category"
    ],
    "integer": [
      "review_count"
    ],
    "nullToZero": [
      "average_rating"
    ],
    "suppressedIdentifiers": [
      "product_id"
    ],
    "source": "review_tools.py:get_lowest_rated_products"
  },
  "lowest_revenue_month": {
    "tables": [
      "dim_dates",
      "fact_orders",
      "fact_sales"
    ],
    "fields": {
      "year": "calendar_year",
      "month": "calendar_month",
      "month_name": "month_name",
      "total_revenue": "total_revenue"
    },
    "dimensions": [
      "month_name"
    ],
    "integer": [
      "month",
      "year"
    ],
    "nullToZero": [
      "total_revenue"
    ],
    "suppressedIdentifiers": [],
    "source": "revenue_tools.py:get_lowest_revenue_month"
  },
  "month_over_month_growth": {
    "tables": [
      "dim_dates",
      "fact_orders",
      "fact_sales"
    ],
    "fields": {
      "year": "calendar_year",
      "month": "calendar_month",
      "total_revenue": "total_revenue",
      "previous_month_revenue": "previous_month_revenue",
      "month_over_month_growth_percent": "month_over_month_growth_percent"
    },
    "dimensions": [],
    "integer": [
      "month",
      "year"
    ],
    "nullToZero": [
      "month_over_month_growth_percent",
      "previous_month_revenue",
      "total_revenue"
    ],
    "suppressedIdentifiers": [],
    "source": "time_tools.py:get_month_over_month_growth"
  },
  "monthly_customers": {
    "tables": [
      "dim_dates",
      "fact_orders"
    ],
    "fields": {
      "year": "calendar_year",
      "month": "calendar_month",
      "month_name": "month_name",
      "total_customers": "total_customers"
    },
    "dimensions": [
      "month_name"
    ],
    "integer": [
      "month",
      "total_customers",
      "year"
    ],
    "nullToZero": [],
    "suppressedIdentifiers": [],
    "source": "time_tools.py:get_monthly_customers"
  },
  "monthly_orders": {
    "tables": [
      "dim_dates",
      "fact_orders"
    ],
    "fields": {
      "year": "calendar_year",
      "month": "calendar_month",
      "month_name": "month_name",
      "total_orders": "total_orders"
    },
    "dimensions": [
      "month_name"
    ],
    "integer": [
      "month",
      "total_orders",
      "year"
    ],
    "nullToZero": [],
    "suppressedIdentifiers": [],
    "source": "time_tools.py:get_monthly_orders"
  },
  "monthly_payments": {
    "tables": [
      "dim_dates",
      "fact_payments"
    ],
    "fields": {
      "year": "calendar_year",
      "month": "calendar_month",
      "month_name": "month_name",
      "total_payment_value": "total_payment_value"
    },
    "dimensions": [
      "month_name"
    ],
    "integer": [
      "month",
      "year"
    ],
    "nullToZero": [
      "total_payment_value"
    ],
    "suppressedIdentifiers": [],
    "source": "time_tools.py:get_monthly_payments"
  },
  "monthly_reviews": {
    "tables": [
      "dim_dates",
      "fact_reviews"
    ],
    "fields": {
      "year": "calendar_year",
      "month": "calendar_month",
      "month_name": "month_name",
      "total_reviews": "total_reviews"
    },
    "dimensions": [
      "month_name"
    ],
    "integer": [
      "month",
      "total_reviews",
      "year"
    ],
    "nullToZero": [],
    "suppressedIdentifiers": [],
    "source": "time_tools.py:get_monthly_reviews"
  },
  "monthly_revenue": {
    "tables": [
      "dim_dates",
      "fact_orders",
      "fact_sales"
    ],
    "fields": {
      "year": "calendar_year",
      "month": "calendar_month",
      "month_name": "month_name",
      "total_revenue": "total_revenue"
    },
    "dimensions": [
      "month_name"
    ],
    "integer": [
      "month",
      "year"
    ],
    "nullToZero": [
      "total_revenue"
    ],
    "suppressedIdentifiers": [],
    "source": "time_tools.py:get_monthly_revenue"
  },
  "monthly_revenue_growth": {
    "tables": [
      "dim_dates",
      "fact_orders",
      "fact_sales"
    ],
    "fields": {
      "year": "calendar_year",
      "month": "calendar_month",
      "month_name": "month_name",
      "total_revenue": "total_revenue",
      "previous_month_revenue": "previous_month_revenue",
      "monthly_revenue_growth_percent": "monthly_revenue_growth_percent"
    },
    "dimensions": [
      "month_name"
    ],
    "integer": [
      "month",
      "year"
    ],
    "nullToZero": [
      "monthly_revenue_growth_percent",
      "previous_month_revenue",
      "total_revenue"
    ],
    "suppressedIdentifiers": [],
    "source": "revenue_tools.py:get_monthly_revenue_growth"
  },
  "negative_reviews": {
    "tables": [
      "fact_reviews"
    ],
    "fields": {
      "negative_reviews": "negative_reviews"
    },
    "dimensions": [],
    "integer": [
      "negative_reviews"
    ],
    "nullToZero": [],
    "suppressedIdentifiers": [],
    "source": "review_tools.py:get_negative_reviews"
  },
  "new_customers": {
    "tables": [
      "fact_orders"
    ],
    "fields": {
      "new_customers": "new_customers"
    },
    "dimensions": [],
    "integer": [
      "new_customers"
    ],
    "nullToZero": [],
    "suppressedIdentifiers": [],
    "source": "customer_tools.py:get_new_customers"
  },
  "on_time_deliveries": {
    "tables": [
      "fact_delivery"
    ],
    "fields": {
      "on_time_deliveries": "on_time_deliveries"
    },
    "dimensions": [],
    "integer": [
      "on_time_deliveries"
    ],
    "nullToZero": [
      "on_time_deliveries"
    ],
    "suppressedIdentifiers": [],
    "source": "delivery_tools.py:get_on_time_deliveries"
  },
  "order_status_distribution": {
    "tables": [
      "fact_orders"
    ],
    "fields": {
      "order_status": "order_status",
      "total_orders": "total_orders"
    },
    "dimensions": [
      "order_status"
    ],
    "integer": [
      "total_orders"
    ],
    "nullToZero": [],
    "suppressedIdentifiers": [],
    "source": "order_tools.py:get_order_status_distribution"
  },
  "orders_by_hour": {
    "tables": [
      "fact_orders"
    ],
    "fields": {
      "purchase_hour": "purchase_hour",
      "total_orders": "total_orders"
    },
    "dimensions": [],
    "integer": [
      "purchase_hour",
      "total_orders"
    ],
    "nullToZero": [],
    "suppressedIdentifiers": [],
    "source": "order_tools.py:get_orders_by_hour"
  },
  "orders_by_month": {
    "tables": [
      "dim_dates",
      "fact_orders"
    ],
    "fields": {
      "year": "calendar_year",
      "month": "calendar_month",
      "month_name": "month_name",
      "total_orders": "total_orders"
    },
    "dimensions": [
      "month_name"
    ],
    "integer": [
      "month",
      "total_orders",
      "year"
    ],
    "nullToZero": [],
    "suppressedIdentifiers": [],
    "source": "order_tools.py:get_orders_by_month"
  },
  "orders_by_weekday": {
    "tables": [
      "fact_orders"
    ],
    "fields": {
      "weekday": "purchase_weekday",
      "total_orders": "total_orders"
    },
    "dimensions": [
      "weekday"
    ],
    "integer": [
      "total_orders"
    ],
    "nullToZero": [],
    "suppressedIdentifiers": [],
    "source": "order_tools.py:get_orders_by_weekday"
  },
  "payment_installments": {
    "tables": [
      "fact_payments"
    ],
    "fields": {
      "payment_installments": "payment_installments",
      "payment_count": "payment_count",
      "total_payment_value": "total_payment_value"
    },
    "dimensions": [],
    "integer": [
      "payment_count",
      "payment_installments"
    ],
    "nullToZero": [
      "total_payment_value"
    ],
    "suppressedIdentifiers": [],
    "source": "payment_tools.py:get_payment_installments"
  },
  "payment_summary": {
    "tables": [
      "fact_payments"
    ],
    "fields": {
      "total_payment_records": "total_payment_records",
      "paid_orders": "paid_orders",
      "total_payment_value": "total_payment_value",
      "average_payment_value": "average_payment_value",
      "average_installments": "average_installments",
      "payment_types": "payment_types"
    },
    "dimensions": [],
    "integer": [
      "paid_orders",
      "payment_types",
      "total_payment_records"
    ],
    "nullToZero": [
      "average_installments",
      "average_payment_value",
      "total_payment_value"
    ],
    "suppressedIdentifiers": [],
    "source": "executive_tools.py:get_payment_summary"
  },
  "payment_type_distribution": {
    "tables": [
      "fact_payments"
    ],
    "fields": {
      "payment_type": "payment_type",
      "payment_count": "payment_count",
      "total_payment_value": "total_payment_value"
    },
    "dimensions": [
      "payment_type"
    ],
    "integer": [
      "payment_count"
    ],
    "nullToZero": [
      "total_payment_value"
    ],
    "suppressedIdentifiers": [],
    "source": "payment_tools.py:get_payment_type_distribution"
  },
  "pending_orders": {
    "tables": [
      "fact_orders"
    ],
    "fields": {
      "pending_orders": "total_orders"
    },
    "dimensions": [],
    "integer": [
      "pending_orders"
    ],
    "nullToZero": [],
    "suppressedIdentifiers": [],
    "source": "order_tools.py:get_pending_orders"
  },
  "positive_reviews": {
    "tables": [
      "fact_reviews"
    ],
    "fields": {
      "positive_reviews": "positive_reviews"
    },
    "dimensions": [],
    "integer": [
      "positive_reviews"
    ],
    "nullToZero": [],
    "suppressedIdentifiers": [],
    "source": "review_tools.py:get_positive_reviews"
  },
  "processing_orders": {
    "tables": [
      "fact_orders"
    ],
    "fields": {
      "processing_orders": "total_orders"
    },
    "dimensions": [],
    "integer": [
      "processing_orders"
    ],
    "nullToZero": [],
    "suppressedIdentifiers": [],
    "source": "order_tools.py:get_processing_orders"
  },
  "product_count": {
    "tables": [
      "dim_products"
    ],
    "fields": {
      "total_products": "total_products"
    },
    "dimensions": [],
    "integer": [
      "total_products"
    ],
    "nullToZero": [],
    "suppressedIdentifiers": [],
    "source": "product_tools.py:get_product_count"
  },
  "products_by_category": {
    "tables": [
      "dim_products"
    ],
    "fields": {
      "product_category": "product_category_name",
      "total_products": "total_products"
    },
    "dimensions": [
      "product_category"
    ],
    "integer": [
      "total_products"
    ],
    "nullToZero": [],
    "suppressedIdentifiers": [],
    "source": "product_tools.py:get_products_by_category"
  },
  "products_per_category": {
    "tables": [
      "dim_products"
    ],
    "fields": {
      "product_category": "product_category_name",
      "total_products": "total_products"
    },
    "dimensions": [
      "product_category"
    ],
    "integer": [
      "total_products"
    ],
    "nullToZero": [],
    "suppressedIdentifiers": [],
    "source": "product_tools.py:get_products_per_category"
  },
  "quarterly_revenue": {
    "tables": [
      "dim_dates",
      "fact_orders",
      "fact_sales"
    ],
    "fields": {
      "year": "calendar_year",
      "quarter": "calendar_quarter",
      "total_revenue": "total_revenue"
    },
    "dimensions": [],
    "integer": [
      "quarter",
      "year"
    ],
    "nullToZero": [
      "total_revenue"
    ],
    "suppressedIdentifiers": [],
    "source": "time_tools.py:get_quarterly_revenue"
  },
  "quarterly_revenue_growth": {
    "tables": [
      "dim_dates",
      "fact_orders",
      "fact_sales"
    ],
    "fields": {
      "year": "calendar_year",
      "quarter": "calendar_quarter",
      "total_revenue": "total_revenue",
      "previous_quarter_revenue": "previous_quarter_revenue",
      "quarterly_revenue_growth_percent": "quarterly_revenue_growth_percent"
    },
    "dimensions": [],
    "integer": [
      "quarter",
      "year"
    ],
    "nullToZero": [
      "previous_quarter_revenue",
      "quarterly_revenue_growth_percent",
      "total_revenue"
    ],
    "suppressedIdentifiers": [],
    "source": "revenue_tools.py:get_quarterly_revenue_growth"
  },
  "rating_distribution": {
    "tables": [
      "fact_reviews"
    ],
    "fields": {
      "review_score": "review_score",
      "review_count": "review_count"
    },
    "dimensions": [],
    "integer": [
      "review_count",
      "review_score"
    ],
    "nullToZero": [],
    "suppressedIdentifiers": [],
    "source": "review_tools.py:get_rating_distribution"
  },
  "repeat_customers": {
    "tables": [
      "fact_orders"
    ],
    "fields": {
      "repeat_customers": "repeat_customers"
    },
    "dimensions": [],
    "integer": [
      "repeat_customers"
    ],
    "nullToZero": [],
    "suppressedIdentifiers": [],
    "source": "customer_tools.py:get_repeat_customers"
  },
  "revenue_by_category": {
    "tables": [
      "dim_products",
      "fact_sales"
    ],
    "fields": {
      "product_category": "product_category_name",
      "total_revenue": "total_revenue"
    },
    "dimensions": [
      "product_category"
    ],
    "integer": [],
    "nullToZero": [
      "total_revenue"
    ],
    "suppressedIdentifiers": [],
    "source": "revenue_tools.py:get_revenue_by_category"
  },
  "revenue_by_city": {
    "tables": [
      "dim_sellers",
      "fact_sales"
    ],
    "fields": {
      "seller_city": "seller_city",
      "seller_state": "seller_state",
      "total_revenue": "total_revenue"
    },
    "dimensions": [
      "seller_city",
      "seller_state"
    ],
    "integer": [],
    "nullToZero": [
      "total_revenue"
    ],
    "suppressedIdentifiers": [],
    "source": "revenue_tools.py:get_revenue_by_city"
  },
  "revenue_by_month": {
    "tables": [
      "dim_dates",
      "fact_orders",
      "fact_sales"
    ],
    "fields": {
      "year": "calendar_year",
      "month": "calendar_month",
      "month_name": "month_name",
      "total_revenue": "total_revenue"
    },
    "dimensions": [
      "month_name"
    ],
    "integer": [
      "month",
      "year"
    ],
    "nullToZero": [
      "total_revenue"
    ],
    "suppressedIdentifiers": [],
    "source": "time_tools.py:get_revenue_by_month"
  },
  "revenue_by_payment_type": {
    "tables": [
      "fact_payments"
    ],
    "fields": {
      "payment_type": "payment_type",
      "total_payment_value": "total_payment_value"
    },
    "dimensions": [
      "payment_type"
    ],
    "integer": [],
    "nullToZero": [
      "total_payment_value"
    ],
    "suppressedIdentifiers": [],
    "source": "payment_tools.py:get_revenue_by_payment_type"
  },
  "revenue_by_product": {
    "tables": [
      "dim_products",
      "fact_sales"
    ],
    "fields": {
      "product_category": "product_category_name",
      "total_revenue": "total_revenue"
    },
    "dimensions": [
      "product_category"
    ],
    "integer": [],
    "nullToZero": [
      "total_revenue"
    ],
    "suppressedIdentifiers": [
      "product_id"
    ],
    "source": "revenue_tools.py:get_revenue_by_product"
  },
  "revenue_by_seller": {
    "tables": [
      "dim_sellers",
      "fact_sales"
    ],
    "fields": {
      "seller_city": "seller_city",
      "seller_state": "seller_state",
      "total_revenue": "total_revenue"
    },
    "dimensions": [
      "seller_city",
      "seller_state"
    ],
    "integer": [],
    "nullToZero": [
      "total_revenue"
    ],
    "suppressedIdentifiers": [
      "seller_id"
    ],
    "source": "revenue_tools.py:get_revenue_by_seller"
  },
  "revenue_by_state": {
    "tables": [
      "dim_sellers",
      "fact_sales"
    ],
    "fields": {
      "seller_state": "seller_state",
      "total_revenue": "total_revenue"
    },
    "dimensions": [
      "seller_state"
    ],
    "integer": [],
    "nullToZero": [
      "total_revenue"
    ],
    "suppressedIdentifiers": [],
    "source": "revenue_tools.py:get_revenue_by_state"
  },
  "revenue_by_year": {
    "tables": [
      "dim_dates",
      "fact_orders",
      "fact_sales"
    ],
    "fields": {
      "year": "calendar_year",
      "total_revenue": "total_revenue"
    },
    "dimensions": [],
    "integer": [
      "year"
    ],
    "nullToZero": [
      "total_revenue"
    ],
    "suppressedIdentifiers": [],
    "source": "time_tools.py:get_revenue_by_year"
  },
  "revenue_per_customer": {
    "tables": [
      "fact_orders",
      "fact_sales"
    ],
    "fields": {
      "revenue_per_customer": "revenue_per_customer"
    },
    "dimensions": [],
    "integer": [],
    "nullToZero": [
      "revenue_per_customer"
    ],
    "suppressedIdentifiers": [],
    "source": "executive_tools.py:get_revenue_per_customer"
  },
  "review_summary": {
    "tables": [
      "fact_reviews"
    ],
    "fields": {
      "total_reviews": "total_reviews",
      "average_rating": "average_rating",
      "positive_reviews": "positive_reviews",
      "negative_reviews": "negative_reviews",
      "average_comment_length": "average_comment_length"
    },
    "dimensions": [],
    "integer": [
      "negative_reviews",
      "positive_reviews",
      "total_reviews"
    ],
    "nullToZero": [
      "average_comment_length",
      "average_rating",
      "negative_reviews",
      "positive_reviews"
    ],
    "suppressedIdentifiers": [],
    "source": "executive_tools.py:get_review_summary"
  },
  "reviews_by_month": {
    "tables": [
      "dim_dates",
      "fact_reviews"
    ],
    "fields": {
      "year": "calendar_year",
      "month": "calendar_month",
      "month_name": "month_name",
      "total_reviews": "total_reviews",
      "average_rating": "average_rating"
    },
    "dimensions": [
      "month_name"
    ],
    "integer": [
      "month",
      "total_reviews",
      "year"
    ],
    "nullToZero": [
      "average_rating"
    ],
    "suppressedIdentifiers": [],
    "source": "review_tools.py:get_reviews_by_month"
  },
  "sales_summary": {
    "tables": [
      "fact_sales"
    ],
    "fields": {
      "total_revenue": "total_revenue",
      "total_orders": "total_orders",
      "total_order_items": "total_order_items",
      "average_order_value": "average_order_value",
      "average_item_price": "average_item_price",
      "total_freight_value": "total_freight_value"
    },
    "dimensions": [],
    "integer": [
      "total_order_items",
      "total_orders"
    ],
    "nullToZero": [
      "average_item_price",
      "average_order_value",
      "total_freight_value",
      "total_revenue"
    ],
    "suppressedIdentifiers": [],
    "source": "executive_tools.py:get_sales_summary"
  },
  "seller_count": {
    "tables": [
      "dim_sellers"
    ],
    "fields": {
      "total_sellers": "total_sellers"
    },
    "dimensions": [],
    "integer": [
      "total_sellers"
    ],
    "nullToZero": [],
    "suppressedIdentifiers": [],
    "source": "seller_tools.py:get_seller_count"
  },
  "seller_density": {
    "tables": [
      "dim_sellers"
    ],
    "fields": {
      "seller_state": "seller_state",
      "total_sellers": "total_sellers"
    },
    "dimensions": [
      "seller_state"
    ],
    "integer": [
      "total_sellers"
    ],
    "nullToZero": [],
    "suppressedIdentifiers": [],
    "source": "geography_tools.py:get_seller_density"
  },
  "seller_growth": {
    "tables": [
      "dim_dates",
      "fact_orders",
      "fact_sales"
    ],
    "fields": {
      "year": "calendar_year",
      "month": "calendar_month",
      "month_name": "month_name",
      "new_sellers": "new_sellers",
      "previous_month_sellers": "previous_month_sellers",
      "seller_growth_percent": "seller_growth_percent"
    },
    "dimensions": [
      "month_name"
    ],
    "integer": [
      "month",
      "new_sellers",
      "previous_month_sellers",
      "year"
    ],
    "nullToZero": [
      "previous_month_sellers",
      "seller_growth_percent"
    ],
    "suppressedIdentifiers": [],
    "source": "seller_tools.py:get_seller_growth"
  },
  "seller_revenue": {
    "tables": [
      "dim_sellers",
      "fact_sales"
    ],
    "fields": {
      "seller_city": "seller_city",
      "seller_state": "seller_state",
      "total_revenue": "total_revenue"
    },
    "dimensions": [
      "seller_city",
      "seller_state"
    ],
    "integer": [],
    "nullToZero": [
      "total_revenue"
    ],
    "suppressedIdentifiers": [
      "seller_id"
    ],
    "source": "seller_tools.py:get_seller_revenue"
  },
  "sellers_by_state": {
    "tables": [
      "dim_sellers"
    ],
    "fields": {
      "seller_state": "seller_state",
      "total_sellers": "total_sellers"
    },
    "dimensions": [
      "seller_state"
    ],
    "integer": [
      "total_sellers"
    ],
    "nullToZero": [],
    "suppressedIdentifiers": [],
    "source": "geography_tools.py:get_sellers_by_state"
  },
  "shipped_orders": {
    "tables": [
      "fact_orders"
    ],
    "fields": {
      "shipped_orders": "total_orders"
    },
    "dimensions": [],
    "integer": [
      "shipped_orders"
    ],
    "nullToZero": [],
    "suppressedIdentifiers": [],
    "source": "order_tools.py:get_shipped_orders"
  },
  "smallest_categories": {
    "tables": [
      "dim_products"
    ],
    "fields": {
      "product_category": "product_category_name",
      "total_products": "total_products"
    },
    "dimensions": [
      "product_category"
    ],
    "integer": [
      "total_products"
    ],
    "nullToZero": [],
    "suppressedIdentifiers": [],
    "source": "product_tools.py:get_smallest_categories"
  },
  "top_categories": {
    "tables": [
      "dim_products",
      "fact_sales"
    ],
    "fields": {
      "product_category": "product_category_name",
      "total_revenue": "total_revenue"
    },
    "dimensions": [
      "product_category"
    ],
    "integer": [],
    "nullToZero": [
      "total_revenue"
    ],
    "suppressedIdentifiers": [],
    "source": "sales_tools.py:get_top_categories"
  },
  "top_cities": {
    "tables": [
      "dim_customers"
    ],
    "fields": {
      "customer_city": "customer_city",
      "customer_state": "customer_state",
      "total_customers": "total_customers"
    },
    "dimensions": [
      "customer_city",
      "customer_state"
    ],
    "integer": [
      "total_customers"
    ],
    "nullToZero": [],
    "suppressedIdentifiers": [],
    "source": "geography_tools.py:get_top_cities"
  },
  "top_customers": {
    "tables": [
      "dim_customers",
      "fact_orders",
      "fact_sales"
    ],
    "fields": {
      "customer_city": "customer_city",
      "customer_state": "customer_state",
      "total_revenue": "total_revenue"
    },
    "dimensions": [
      "customer_city",
      "customer_state"
    ],
    "integer": [],
    "nullToZero": [
      "total_revenue"
    ],
    "suppressedIdentifiers": [
      "customer_id",
      "customer_unique_id"
    ],
    "source": "customer_tools.py:get_top_customers"
  },
  "top_products": {
    "tables": [
      "dim_products",
      "fact_sales"
    ],
    "fields": {
      "product_category": "product_category_name",
      "total_revenue": "total_revenue"
    },
    "dimensions": [
      "product_category"
    ],
    "integer": [],
    "nullToZero": [
      "total_revenue"
    ],
    "suppressedIdentifiers": [],
    "source": "sales_tools.py:get_top_products"
  },
  "top_revenue_month": {
    "tables": [
      "dim_dates",
      "fact_orders",
      "fact_sales"
    ],
    "fields": {
      "year": "calendar_year",
      "month": "calendar_month",
      "month_name": "month_name",
      "total_revenue": "total_revenue"
    },
    "dimensions": [
      "month_name"
    ],
    "integer": [
      "month",
      "year"
    ],
    "nullToZero": [
      "total_revenue"
    ],
    "suppressedIdentifiers": [],
    "source": "revenue_tools.py:get_top_revenue_month"
  },
  "top_sellers": {
    "tables": [
      "dim_sellers",
      "fact_sales"
    ],
    "fields": {
      "seller_city": "seller_city",
      "seller_state": "seller_state",
      "total_revenue": "total_revenue"
    },
    "dimensions": [
      "seller_city",
      "seller_state"
    ],
    "integer": [],
    "nullToZero": [
      "total_revenue"
    ],
    "suppressedIdentifiers": [
      "seller_id"
    ],
    "source": "seller_tools.py:get_top_sellers"
  },
  "top_states": {
    "tables": [
      "dim_customers"
    ],
    "fields": {
      "customer_state": "customer_state",
      "total_customers": "total_customers"
    },
    "dimensions": [
      "customer_state"
    ],
    "integer": [
      "total_customers"
    ],
    "nullToZero": [],
    "suppressedIdentifiers": [],
    "source": "geography_tools.py:get_top_states"
  },
  "total_categories": {
    "tables": [
      "dim_products"
    ],
    "fields": {
      "total_categories": "total_categories"
    },
    "dimensions": [],
    "integer": [
      "total_categories"
    ],
    "nullToZero": [],
    "suppressedIdentifiers": [],
    "source": "executive_tools.py:get_total_categories"
  },
  "total_orders": {
    "tables": [
      "fact_orders"
    ],
    "fields": {
      "total_orders": "total_orders"
    },
    "dimensions": [],
    "integer": [
      "total_orders"
    ],
    "nullToZero": [],
    "suppressedIdentifiers": [],
    "source": "executive_tools.py:get_total_orders"
  },
  "total_products": {
    "tables": [
      "dim_products"
    ],
    "fields": {
      "total_products": "total_products"
    },
    "dimensions": [],
    "integer": [
      "total_products"
    ],
    "nullToZero": [],
    "suppressedIdentifiers": [],
    "source": "executive_tools.py:get_total_products"
  },
  "total_revenue": {
    "tables": [
      "fact_sales"
    ],
    "fields": {
      "total_revenue": "total_revenue"
    },
    "dimensions": [],
    "integer": [],
    "nullToZero": [
      "total_revenue"
    ],
    "suppressedIdentifiers": [],
    "source": "revenue_tools.py:get_total_revenue"
  },
  "total_sellers": {
    "tables": [
      "dim_sellers"
    ],
    "fields": {
      "total_sellers": "total_sellers"
    },
    "dimensions": [],
    "integer": [
      "total_sellers"
    ],
    "nullToZero": [],
    "suppressedIdentifiers": [],
    "source": "executive_tools.py:get_total_sellers"
  },
  "worst_selling_products": {
    "tables": [
      "dim_products",
      "fact_sales"
    ],
    "fields": {
      "product_category": "product_category_name",
      "units_sold": "units_sold",
      "total_revenue": "total_revenue"
    },
    "dimensions": [
      "product_category"
    ],
    "integer": [
      "units_sold"
    ],
    "nullToZero": [
      "total_revenue"
    ],
    "suppressedIdentifiers": [
      "product_id"
    ],
    "source": "product_tools.py:get_worst_selling_products"
  },
  "year_over_year_growth": {
    "tables": [
      "dim_dates",
      "fact_orders",
      "fact_sales"
    ],
    "fields": {
      "year": "calendar_year",
      "total_revenue": "total_revenue",
      "previous_year_revenue": "previous_year_revenue",
      "year_over_year_growth_percent": "year_over_year_growth_percent"
    },
    "dimensions": [],
    "integer": [
      "year"
    ],
    "nullToZero": [
      "previous_year_revenue",
      "total_revenue",
      "year_over_year_growth_percent"
    ],
    "suppressedIdentifiers": [],
    "source": "time_tools.py:get_year_over_year_growth"
  },
  "yearly_revenue": {
    "tables": [
      "dim_dates",
      "fact_orders",
      "fact_sales"
    ],
    "fields": {
      "year": "calendar_year",
      "total_revenue": "total_revenue"
    },
    "dimensions": [],
    "integer": [
      "year"
    ],
    "nullToZero": [
      "total_revenue"
    ],
    "suppressedIdentifiers": [],
    "source": "time_tools.py:get_yearly_revenue"
  },
  "yearly_revenue_growth": {
    "tables": [
      "dim_dates",
      "fact_orders",
      "fact_sales"
    ],
    "fields": {
      "year": "calendar_year",
      "total_revenue": "total_revenue",
      "previous_year_revenue": "previous_year_revenue",
      "yearly_revenue_growth_percent": "yearly_revenue_growth_percent"
    },
    "dimensions": [],
    "integer": [
      "year"
    ],
    "nullToZero": [
      "previous_year_revenue",
      "total_revenue",
      "yearly_revenue_growth_percent"
    ],
    "suppressedIdentifiers": [],
    "source": "revenue_tools.py:get_yearly_revenue_growth"
  }
});
export function fullQueryForTool(name) {
  return Object.prototype.hasOwnProperty.call(FULL_QUERIES,name) ? FULL_QUERIES[name] : null;
}
