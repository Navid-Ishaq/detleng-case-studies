# Geographic Intelligence Postmortem Report
<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/605cbe57-e44b-4447-a882-480102af5000" />

## Diagnostic Query 1

# Customer Geographic Coverage

### Purpose

Determine the overall geographic reach of the marketplace customer base.

### SQL

```sql
SELECT
COUNT(DISTINCT customer_city) AS unique_cities,
COUNT(DISTINCT customer_state) AS unique_states
FROM `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_customers`;
```

### Result

| Unique Cities | Unique States |
| ------------- | ------------- |
| 4,119         | 27            |

### Business Insight

The marketplace serves customers across all 27 Brazilian states and more than 4,100 cities.

### Executive Observation

Customer penetration has reached nationwide scale.

This is a strong indicator of:

* Brand reach
* Market awareness
* Customer accessibility

### DeTLeng Diagnosis

The demand side of the marketplace has already achieved national coverage.

The challenge is no longer customer reach.

The challenge is operational optimization and supply expansion.

---

# Diagnostic Query 2

# Seller Geographic Coverage

### Purpose

Determine the geographic spread of the seller ecosystem.

### SQL

```sql
SELECT
COUNT(DISTINCT seller_city) AS unique_seller_cities,
COUNT(DISTINCT seller_state) AS unique_seller_states
FROM `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_sellers`;
```

### Result

| Unique Seller Cities | Unique Seller States |
| -------------------- | -------------------- |
| 611                  | 23                   |

### Business Insight

Sellers operate from only 611 cities compared to 4,119 customer cities.

### Executive Observation

Demand is geographically diversified.

Supply is geographically concentrated.

### DeTLeng Diagnosis

A major marketplace imbalance exists.

```text
Customers → Nationwide

Sellers → Concentrated
```

Future growth should prioritize seller acquisition.

---

# Diagnostic Query 3

# Customer Distribution by State

### Purpose

Identify where customer demand is concentrated.

### SQL

```sql
SELECT
customer_state,
COUNT(*) AS total_customers
FROM `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_customers`
GROUP BY customer_state
ORDER BY total_customers DESC;
```

### Result (Top States)

| State | Customers |
| ----- | --------: |
| SP    |    41,746 |
| RJ    |    12,852 |
| MG    |    11,635 |
| RS    |     5,466 |
| PR    |     5,045 |

### Business Insight

São Paulo alone represents approximately 42% of all customers.

### Executive Observation

Customer demand is heavily concentrated in Brazil's economic centers.

### Strategic Recommendation

Marketing budgets should prioritize:

* São Paulo
* Rio de Janeiro
* Minas Gerais

These states generate the highest return potential.

### DeTLeng Diagnosis

Brazilian e-commerce demand is highly urbanized and economically concentrated.

---

# Diagnostic Query 4

# Seller Distribution by State

### Purpose

Identify where marketplace supply originates.

### SQL

```sql
SELECT
seller_state,
COUNT(*) AS total_sellers
FROM `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_sellers`
GROUP BY seller_state
ORDER BY total_sellers DESC;
```

### Result (Top States)

| State | Sellers |
| ----- | ------: |
| SP    |   1,849 |
| PR    |     349 |
| MG    |     244 |
| SC    |     190 |
| RJ    |     171 |

### Business Insight

Nearly 60% of all sellers are located in São Paulo.

### Executive Observation

Supply concentration exceeds demand concentration.

### Strategic Risk

Any disruption in São Paulo can impact:

* Revenue
* Inventory
* Fulfillment
* Customer experience

### DeTLeng Diagnosis

Marketplace resilience depends heavily on one geographic region.

---

# Diagnostic Query 5

# Top Customer Cities

### Purpose

Identify the largest customer markets.

### SQL

```sql
SELECT
customer_city,
COUNT(*) AS total_customers
FROM `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_customers`
GROUP BY customer_city
ORDER BY total_customers DESC
LIMIT 20;
```

### Result (Top Cities)

| City           | Customers |
| -------------- | --------: |
| Sao Paulo      |    15,540 |
| Rio de Janeiro |     6,882 |
| Belo Horizonte |     2,773 |
| Brasilia       |     2,131 |
| Curitiba       |     1,521 |

### Business Insight

The marketplace is driven by major metropolitan areas.

### Executive Observation

Urban centers remain the primary source of marketplace growth.

### DeTLeng Diagnosis

Customer acquisition efforts should prioritize metropolitan expansion before rural expansion.

---

# Diagnostic Query 6

# Top Seller Cities

### Purpose

Identify the largest seller hubs.

### SQL

```sql
SELECT
seller_city,
COUNT(*) AS total_sellers
FROM `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_sellers`
GROUP BY seller_city
ORDER BY total_sellers DESC
LIMIT 20;
```

### Result (Top Cities)

| City           | Sellers |
| -------------- | ------: |
| Sao Paulo      |     694 |
| Curitiba       |     127 |
| Rio de Janeiro |      96 |
| Belo Horizonte |      68 |
| Ribeirao Preto |      52 |

### Business Insight

Seller ecosystems cluster around major logistics corridors.

### Executive Observation

Supply naturally follows infrastructure.

### DeTLeng Diagnosis

Future seller acquisition should target regions currently lacking commercial hubs.

---

# Diagnostic Query 7

# Revenue by Customer State

### Purpose

Identify where revenue is generated.

### SQL

```sql
SELECT
c.customer_state,
ROUND(SUM(oi.price),2) AS total_revenue
FROM `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_orders` o
JOIN `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_customers` c
ON o.customer_id = c.customer_id
JOIN `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_order_items` oi
ON o.order_id = oi.order_id
GROUP BY c.customer_state
ORDER BY total_revenue DESC;
```

### Result (Top States)

| State | Revenue |
| ----- | ------: |
| SP    |   5.20M |
| RJ    |   1.82M |
| MG    |   1.59M |

### Business Insight

More than one-third of total revenue originates from São Paulo.

### Executive Observation

Revenue concentration mirrors customer concentration.

### DeTLeng Diagnosis

Protecting São Paulo operations is financially critical.

---

# Diagnostic Query 8

# Revenue by Seller State

### Purpose

Measure supply-side revenue contribution.

### SQL

```sql
SELECT
s.seller_state,
ROUND(SUM(oi.price),2) AS total_revenue
FROM `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_order_items` oi
JOIN `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_sellers` s
ON oi.seller_id = s.seller_id
GROUP BY s.seller_state
ORDER BY total_revenue DESC;
```

### Result (Top States)

| State | Revenue |
| ----- | ------: |
| SP    |   8.75M |
| PR    |   1.26M |
| MG    |   1.01M |

### Business Insight

Seller-side revenue is even more concentrated than customer-side revenue.

### DeTLeng Diagnosis

Marketplace supply diversification should become a strategic priority.

---

# Diagnostic Query 9

# Customer vs Seller Ratio by State

### Purpose

Identify supply-demand imbalances.

### SQL

```sql
WITH customers AS (
SELECT
customer_state,
COUNT(*) AS total_customers
FROM `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_customers`
GROUP BY customer_state
),
sellers AS (
SELECT
seller_state,
COUNT(*) AS total_sellers
FROM `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_sellers`
GROUP BY seller_state
)
SELECT
c.customer_state,
c.total_customers,
s.total_sellers,
ROUND(c.total_customers/s.total_sellers,2) AS customer_seller_ratio
FROM customers c
LEFT JOIN sellers s
ON c.customer_state=s.seller_state
ORDER BY customer_seller_ratio DESC;
```

### Result (Top Opportunities)

| State |  Ratio |
| ----- | -----: |
| PA    |    975 |
| MA    |    747 |
| PI    |    495 |
| MT    | 226.75 |
| PE    | 183.56 |

### Business Insight

These states have customers but almost no seller presence.

### Executive Observation

This is the strongest expansion signal in the entire investigation.

### DeTLeng Diagnosis

Customers already exist.

Sellers are missing.

---

# Diagnostic Query 10

# Orders by State

### Purpose

Analyze regional logistics intensity through average delivery time.

### SQL

```sql
SELECT
c.customer_state,
ROUND(
AVG(
TIMESTAMP_DIFF(
o.order_delivered_customer_date,
o.order_purchase_timestamp,
DAY
)
),2
) AS avg_delivery_days
FROM `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_orders` o
JOIN `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_customers` c
ON o.customer_id=c.customer_id
WHERE o.order_status='delivered'
GROUP BY c.customer_state
ORDER BY avg_delivery_days DESC;
```

### Result

| State | Avg Delivery Days |
| ----- | ----------------: |
| RR    |             28.98 |
| AP    |             26.73 |
| AM    |             25.99 |
| PA    |             23.32 |
| SP    |              8.30 |

### Business Insight

Northern states face significantly longer delivery times.

### DeTLeng Diagnosis

Geographic distance directly impacts customer experience.

---

# Diagnostic Query 11

# Review Score by State

### Purpose

Measure customer satisfaction geographically.

### SQL

```sql
SELECT
c.customer_state,
ROUND(AVG(r.review_score),2) AS avg_review_score
FROM `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_reviews` r
JOIN `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_orders` o
ON r.order_id=o.order_id
JOIN `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_customers` c
ON o.customer_id=c.customer_id
GROUP BY c.customer_state
ORDER BY avg_review_score DESC;
```

### Result

| State | Review Score |
| ----- | -----------: |
| AP    |         4.19 |
| PR    |         4.18 |
| AM    |         4.18 |
| SP    |         4.17 |
| RR    |         3.61 |

### Business Insight

Customer satisfaction remains strong nationwide despite delivery challenges.

### DeTLeng Diagnosis

Trust in the marketplace remains healthy.

---

# Diagnostic Query 12

# Revenue per Customer by State

### Purpose

Identify high-value customer markets.

### SQL

```sql
SELECT
c.customer_state,
ROUND(
SUM(oi.price)/COUNT(DISTINCT c.customer_id),
2
) AS revenue_per_customer
FROM `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_orders` o
JOIN `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_customers` c
ON o.customer_id=c.customer_id
JOIN `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_order_items` oi
ON o.order_id=oi.order_id
GROUP BY c.customer_state
ORDER BY revenue_per_customer DESC;
```

### Result

| State | Revenue per Customer |
| ----- | -------------------: |
| PB    |               216.67 |
| AP    |               198.15 |
| AC    |               197.32 |

### Business Insight

Some smaller markets generate higher customer value than larger markets.

### DeTLeng Diagnosis

Customer quality and customer quantity are not always the same thing.

---

# Diagnostic Query 13

# Geographic Expansion Opportunity Matrix

### Purpose

Identify the most attractive future expansion regions.

### SQL

```sql
WITH customers AS (
SELECT
customer_state,
COUNT(*) AS total_customers
FROM `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_customers`
GROUP BY customer_state
),
sellers AS (
SELECT
seller_state,
COUNT(*) AS total_sellers
FROM `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_sellers`
GROUP BY seller_state
)
SELECT
c.customer_state,
c.total_customers,
s.total_sellers,
ROUND(c.total_customers/s.total_sellers,2) AS opportunity_score
FROM customers c
LEFT JOIN sellers s
ON c.customer_state=s.seller_state
ORDER BY opportunity_score DESC;
```

### Result (Top Expansion Targets)

| State | Opportunity Score |
| ----- | ----------------: |
| PA    |               975 |
| MA    |               747 |
| PI    |               495 |
| MT    |            226.75 |
| PE    |            183.56 |

### Strategic Recommendation

**Tier 1 Targets**

* Pará (PA)
* Maranhão (MA)
* Piauí (PI)

**Tier 2 Targets**

* Mato Grosso (MT)
* Pernambuco (PE)
* Bahia (BA)

### DeTLeng Executive Diagnosis

The marketplace has successfully conquered customer acquisition.

The next chapter of growth is seller acquisition.

---

### Author

**Muhammad Naveed**
Founder of DeTLeng — Data Engineering, ETL & Analytics Solutions

🌐 [www.detleng.com](http://www.detleng.com)
📘 [https://insights.detleng.com/](https://insights.detleng.com/)
📊 [https://casestudy.detleng.com/](https://casestudy.detleng.com/)
