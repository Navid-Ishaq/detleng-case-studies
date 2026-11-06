(function () {
  const CATEGORIES = {
    "Executive KPIs": ["executive_dashboard","business_summary","sales_summary","customer_summary","delivery_summary","payment_summary","review_summary","average_order_value","revenue_per_customer","total_categories","total_sellers","total_products","customer_count","total_orders","total_revenue"],
    "Revenue Analytics": ["monthly_revenue_growth","quarterly_revenue_growth","yearly_revenue_growth","revenue_by_month","revenue_by_year","top_revenue_month","lowest_revenue_month","revenue_by_seller","revenue_by_category","revenue_by_product","revenue_by_state","revenue_by_city"],
    "Customer Analytics": ["new_customers","repeat_customers","customer_growth","customers_by_month","customers_by_year","customer_lifetime_value","average_customer_spend","top_customers","customers_by_state","customers_by_city"],
    "Product Analytics": ["highest_priced_products","lowest_priced_products","largest_categories","smallest_categories","products_per_category","best_selling_products","worst_selling_products","products_by_category","average_product_price","product_count"],
    "Seller Analytics": ["bottom_sellers","seller_growth","average_seller_revenue","sellers_by_state","top_sellers","seller_revenue","seller_count"],
    "Order Analytics": ["cancelled_orders","delivered_orders","pending_orders","processing_orders","shipped_orders","order_status_distribution","orders_by_month","orders_by_weekday","orders_by_hour"],
    "Delivery Analytics": ["late_deliveries","on_time_deliveries","delivery_success_rate","average_delivery_variance","average_delivery_days","delivery_performance"],
    "Payment Analytics": ["payment_type_distribution","installments_distribution","highest_payment_orders","revenue_by_payment_type","average_payment_value","payment_installments"],
    "Review Analytics": ["positive_reviews","negative_reviews","reviews_by_month","average_comment_length","highest_rated_products","lowest_rated_products","rating_distribution","average_rating"],
    "Geography Analytics": ["top_cities","top_states","customer_density","seller_density"],
    "Time Intelligence": ["monthly_orders","monthly_customers","monthly_payments","monthly_reviews","month_over_month_growth","year_over_year_growth","quarterly_revenue","monthly_revenue","yearly_revenue"],
    "Sales Analytics": ["bottom_categories","top_categories","bottom_products","top_products"]
  };
  const DESCRIPTIONS = {
    "Executive KPIs": "A decision-level measure or summary drawn from the verified business layer.",
    "Revenue Analytics": "Explore revenue performance, contribution, trends or geographic distribution.",
    "Customer Analytics": "Understand customer volume, value, retention, growth and location patterns.",
    "Product Analytics": "Examine product range, pricing, categories and sales performance.",
    "Seller Analytics": "Compare seller scale, revenue, growth and geographic coverage.",
    "Order Analytics": "Inspect order volumes, status and ordering patterns across time.",
    "Delivery Analytics": "Measure delivery speed, reliability, lateness and success.",
    "Payment Analytics": "Analyze payment types, installments, values and revenue contribution.",
    "Review Analytics": "Understand ratings, sentiment signals and review activity.",
    "Geography Analytics": "Explore customer and seller concentration by city or state.",
    "Time Intelligence": "Track business movement across months, quarters and years.",
    "Sales Analytics": "Identify leading and underperforming products or categories."
  };
  const PROMPTS = {monthly_orders:"monthly order trend",monthly_customers:"monthly customer trend",monthly_reviews:"monthly review trend",total_sellers:"executive seller total",total_products:"executive product total"};
  const groups = document.getElementById("taskGroups");
  const search = document.getElementById("taskSearch");
  const count = document.getElementById("taskCount");
  const empty = document.getElementById("taskEmpty");
  const humanize = value => value.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  const promptFor = tool => `Show ${PROMPTS[tool] || tool.replaceAll("_", " ")} and explain the verified result clearly.`;

  function render(query) {
    const needle = query.trim().toLowerCase(); let visible = 0;
    groups.innerHTML = Object.entries(CATEGORIES).map(([category, tools]) => {
      const matches = tools.filter(tool => `${category} ${tool} ${humanize(tool)}`.toLowerCase().includes(needle));
      if (!matches.length) return "";
      visible += matches.length;
      return `<section class="task-category"><div class="task-category-head"><div><p>${category}</p><h3>${matches.length} supported task${matches.length === 1 ? "" : "s"}</h3></div><span>${DESCRIPTIONS[category]}</span></div><div class="task-card-grid">${matches.map(tool => `<article class="task-card"><div class="task-card-number">${String(Object.values(CATEGORIES).flat().indexOf(tool) + 1).padStart(2,"0")}</div><h4>${humanize(tool)}</h4><p>${DESCRIPTIONS[category]}</p><small>MCP tool: ${tool}</small><button type="button" data-tool="${tool}">Query this in Analytics AI <span aria-hidden="true">→</span></button></article>`).join("")}</div></section>`;
    }).join("");
    count.textContent = `${visible} task${visible === 1 ? "" : "s"}`; empty.hidden = visible !== 0;
  }

  groups.addEventListener("click", event => {
    const button = event.target.closest("[data-tool]");
    if (!button || !window.detlengAnalyticsAI) return;
    window.detlengAnalyticsAI.prefill(promptFor(button.dataset.tool));
  });
  search.addEventListener("input", () => render(search.value));
  render("");
})();
