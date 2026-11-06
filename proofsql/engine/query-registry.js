/** Approved browser queries adapted from fixed backend/analytics/tools SQL. */
export const METRIC_DEFS = Object.freeze({
  total_revenue: {label:"Total revenue", unit:"BRL", tolerance:0.005},
  total_orders: {label:"Total orders", unit:"count", tolerance:0},
  total_products: {label:"Total products", unit:"count", tolerance:0},
  average_order_value: {label:"Average order value", unit:"BRL", tolerance:0.005},
  delivery_success_rate: {label:"On-time delivery rate", unit:"%", tolerance:0.005},
  on_time_delivery_percent: {label:"On-time delivery rate", unit:"%", tolerance:0.005},
  on_time_deliveries: {label:"On-time deliveries", unit:"count", tolerance:0},
  total_delivery_orders: {label:"Delivery orders", unit:"count", tolerance:0},
});

const e = (label, tables, metrics, source) => ({label, tables, metrics, source});
export const QUERIES = Object.freeze({
  total_revenue: e("Total Revenue", ["fact_sales"], ["total_revenue"], "revenue_tools.py:get_total_revenue"),
  total_orders: e("Total Orders", ["fact_orders"], ["total_orders"], "executive_tools.py:get_total_orders"),
  total_products: e("Total Products", ["dim_products"], ["total_products"], "executive_tools.py:get_total_products"),
  product_count: e("Product Count", ["dim_products"], ["total_products"], "product_tools.py:get_product_count → get_total_products"),
  average_order_value: e("Average Order Value", ["fact_sales"], ["average_order_value"], "executive_tools.py:get_average_order_value"),
  delivery_success_rate: e("Delivery Success Rate", ["fact_delivery"], ["delivery_success_rate"], "delivery_tools.py:get_delivery_success_rate"),
  on_time_deliveries: e("On-time Deliveries", ["fact_delivery"], ["on_time_deliveries"], "delivery_tools.py:get_on_time_deliveries"),
  executive_dashboard: e("Executive Dashboard · verified subset", ["fact_sales","fact_orders","dim_products","fact_delivery"], ["total_revenue","total_orders","total_products","on_time_delivery_percent"], "executive_tools.py:get_executive_dashboard"),
  business_summary: e("Business Summary · verified subset", ["fact_sales","fact_orders","dim_products"], ["total_revenue","total_orders","total_products"], "executive_tools.py:get_business_summary"),
  sales_summary: e("Sales Summary · verified subset", ["fact_sales"], ["total_revenue","total_orders","average_order_value"], "executive_tools.py:get_sales_summary"),
  delivery_summary: e("Delivery Summary · verified subset", ["fact_delivery"], ["total_delivery_orders","on_time_deliveries","on_time_delivery_percent"], "executive_tools.py:get_delivery_summary"),
});

export function queryForTool(tool) {
  return Object.prototype.hasOwnProperty.call(QUERIES, tool) ? QUERIES[tool] : null;
}
