This is now becoming one of the strongest sections in the entire CS-003 series.

Why?

Because this is the first investigation where we can scientifically prove:

```text
Delivery Performance
        ↓
Customer Experience
        ↓
Review Scores
        ↓
Revenue Risk
```

This is no longer reporting.

This is business diagnosis.

For DeTLeng terminology:

```text
Orders Table     = Patient Registration
Customers Table  = Population Analysis
Products Table   = Commercial Engine Analysis
Payments Table   = Cash Flow Analysis
Reviews Table    = Voice of Customer Analysis

Delivery & Logistics = Root Cause Diagnosis
```

This is where the Operation Theatre starts finding the actual disease.

---

# Delivery & Logistics Postmortem Report

## Understanding Delivery Efficiency, Logistics Performance, Customer Satisfaction, and Revenue Risk

---

# Data Source

## Dataset Name

Brazilian E-Commerce Public Dataset by Olist

## Source

Kaggle

## Dataset URL

[https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce](https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce)

---

# Executive Summary

Delivery performance represents one of the most critical operational functions within an e-commerce ecosystem.

Customers may tolerate higher prices.

Customers may tolerate limited product availability.

Customers may even tolerate occasional payment issues.

However, delayed deliveries directly affect customer trust, satisfaction, retention, and long-term revenue growth.

For this reason, the DeTLeng Operation Theatre performed a comprehensive logistics investigation across the Orders, Customers, Sellers, Reviews, and Order Items datasets.

The primary objective was to identify:

* Delivery efficiency
* Regional logistics performance
* Seller-related bottlenecks
* Customer satisfaction impacts
* Revenue exposure caused by delivery delays

The findings reveal a generally healthy logistics operation, but also highlight specific geographic and seller concentration risks that could affect future scalability.

---

# Diagnostic Query 1

## Delivered Orders Count

### SQL

```sql
SELECT
COUNT(*) AS delivered_orders
FROM `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_orders`
WHERE order_status='delivered';
```

### Result

| Metric           |  Value |
| ---------------- | -----: |
| Delivered Orders | 96,478 |

### Purpose

Measures how many orders successfully completed the fulfillment cycle.

### Business Insight

More than 96 thousand orders reached customers successfully.

This confirms:

* Strong operational execution
* Mature fulfillment capability
* Reliable logistics infrastructure

### Executive Observation

With 96,478 delivered orders from 99,441 total orders, the marketplace achieved an extremely high fulfillment completion rate.

This indicates a well-functioning operational ecosystem.

---

# Diagnostic Query 2

## Average Delivery Time

### SQL

```sql
SELECT
ROUND(
AVG(
TIMESTAMP_DIFF(
order_delivered_customer_date,
order_purchase_timestamp,
DAY
)
),2
) AS avg_delivery_days
FROM `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_orders`
WHERE order_status='delivered';
```

### Result

| Metric                |      Value |
| --------------------- | ---------: |
| Average Delivery Time | 12.09 Days |

### Purpose

Measures overall customer waiting time.

### Business Insight

Customers wait approximately 12 days between purchase and final delivery.

### Executive Observation

For a geographically large country such as Brazil, a 12-day average delivery cycle is operationally reasonable.

However, customer expectations continue to rise globally.

Reducing this figure by even 1–2 days could significantly improve customer satisfaction and repeat purchases.

---

# Diagnostic Query 3

## Fastest Delivery

### SQL

```sql
SELECT
MIN(
TIMESTAMP_DIFF(
order_delivered_customer_date,
order_purchase_timestamp,
DAY
)
) AS fastest_delivery_days
FROM `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_orders`
WHERE order_status='delivered';
```

### Result

| Metric           |  Value |
| ---------------- | -----: |
| Fastest Delivery | 0 Days |

### Purpose

Identifies the best-case delivery scenario.

### Business Insight

Some customers received products on the same day as purchase.

### Executive Observation

This demonstrates that under ideal logistics conditions the marketplace can achieve near-instant fulfillment.

These deliveries can serve as operational benchmarks for future optimization.

---

# Diagnostic Query 4

## Slowest Delivery

### SQL

```sql
SELECT
MAX(
TIMESTAMP_DIFF(
order_delivered_customer_date,
order_purchase_timestamp,
DAY
)
) AS slowest_delivery_days
FROM `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_orders`
WHERE order_status='delivered';
```

### Result

| Metric           |    Value |
| ---------------- | -------: |
| Slowest Delivery | 209 Days |

### Purpose

Identifies the worst-case customer experience.

### Business Insight

Some customers waited nearly seven months for delivery.

### Executive Observation

Although likely an outlier, such extreme delays can cause:

* Negative reviews
* Refund requests
* Brand reputation damage
* Customer churn

### Strategic Recommendation

Outlier delivery investigations should become part of logistics monitoring processes.

---

# Diagnostic Query 5

## Late Deliveries Count

### SQL

```sql
SELECT
COUNT(*) AS late_deliveries
FROM `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_orders`
WHERE
order_delivered_customer_date >
order_estimated_delivery_date;
```

### Result

| Metric          | Value |
| --------------- | ----: |
| Late Deliveries | 7,827 |

### Purpose

Measures delivery promise failures.

### Business Insight

Nearly eight thousand customers received orders later than promised.

### Executive Observation

Every delayed order creates customer experience risk and increases the likelihood of support tickets and negative reviews.

---

# Diagnostic Query 6

## Late Delivery Percentage

### SQL

```sql
SELECT
ROUND(
100 * COUNTIF(
order_delivered_customer_date >
order_estimated_delivery_date
)
/
COUNT(*)
,2
) AS late_delivery_pct
FROM `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_orders`
WHERE order_status='delivered';
```

### Result

| Metric                   | Value |
| ------------------------ | ----: |
| Late Delivery Percentage | 8.11% |

### Purpose

Measures logistics reliability.

### Business Insight

More than 91% of deliveries arrived on time or early.

### Executive Observation

An 8.11% delay rate indicates generally strong logistics performance.

However, reducing delays below 5% would significantly strengthen customer experience outcomes.

---

# Diagnostic Query 7

## Early Deliveries

### SQL

```sql
SELECT
COUNT(*) AS early_deliveries
FROM `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_orders`
WHERE
order_delivered_customer_date <
order_estimated_delivery_date;
```

### Result

| Metric           |  Value |
| ---------------- | -----: |
| Early Deliveries | 88,649 |

### Business Insight

The overwhelming majority of orders arrive before the estimated delivery date.

### Executive Observation

This is one of the strongest operational indicators discovered so far.

Customers receiving products earlier than expected often report:

* Higher satisfaction
* Stronger loyalty
* Better review scores

---

# Diagnostic Query 8

## Average Delivery Variance

### SQL

```sql
SELECT
ROUND(
AVG(
TIMESTAMP_DIFF(
order_delivered_customer_date,
order_estimated_delivery_date,
DAY
)
),2
) AS avg_delivery_variance
FROM `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_orders`
WHERE order_status='delivered';
```

### Result

| Metric           |       Value |
| ---------------- | ----------: |
| Average Variance | -10.96 Days |

### Business Insight

Orders arrive almost 11 days earlier than promised on average.

### Executive Observation

This suggests delivery estimates are intentionally conservative.

While this creates positive customer experiences, management should evaluate whether delivery promises can be made more accurate.

---

# Diagnostic Query 9

## Delivery Performance By State

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

### Key Results

| State | Avg Delivery Days |
| ----- | ----------------: |
| RR    |             28.98 |
| AP    |             26.73 |
| AM    |             25.99 |
| AL    |             24.04 |
| PA    |             23.32 |
| SP    |              8.30 |

### Business Insight

Remote northern states experience delivery times more than three times longer than São Paulo.

### Executive Observation

Brazil's geography directly impacts logistics efficiency.

São Paulo operates as the logistics center of gravity for the marketplace.

---

# Diagnostic Query 10

## Late Deliveries By State

### SQL

```sql
SELECT
c.customer_state,
COUNT(*) AS late_orders
FROM `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_orders` o
JOIN `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_customers` c
ON o.customer_id=c.customer_id
WHERE
o.order_delivered_customer_date >
o.order_estimated_delivery_date
GROUP BY c.customer_state
ORDER BY late_orders DESC;
```

### Key Results

| State | Late Orders |
| ----- | ----------: |
| SP    |       2,387 |
| RJ    |       1,664 |
| MG    |         638 |
| BA    |         457 |

### Business Insight

Large customer markets naturally generate the largest volume of delivery exceptions.

### Executive Observation

Operational improvements in SP and RJ alone could significantly reduce overall marketplace delay volumes.

---

# Diagnostic Query 11

## Average Delivery Time by Seller Location (City & State)

### SQL

```sql
SELECT
s.seller_city,
s.seller_state,
ROUND(
AVG(
TIMESTAMP_DIFF(
o.order_delivered_customer_date,
o.order_purchase_timestamp,
DAY
)
),2
) AS avg_delivery_days,
COUNT(*) AS total_orders
FROM `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_orders` o
JOIN `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_order_items` oi
ON o.order_id = oi.order_id
JOIN `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_sellers` s
ON oi.seller_id = s.seller_id
WHERE o.order_status='delivered'
GROUP BY s.seller_city,s.seller_state
HAVING COUNT(*) > 50
ORDER BY avg_delivery_days DESC
LIMIT 10;
```

### Key Results

| Seller Location    | Avg Days | Orders |
| ------------------ | -------: | -----: |
| Itaquaquecetuba-SP |    21.31 |  1,639 |
| Congonhal-MG       |    20.78 |    102 |
| Foz do Iguaçu-PR   |    19.12 |    190 |

### Business Insight

Some seller hubs consistently generate slower delivery outcomes.

### Executive Observation

These locations should be prioritized for:

* Warehouse optimization
* Carrier review
* Route analysis
* Logistics partnerships

---

# Diagnostic Query 12

## Top Seller Locations with Highest Late Deliveries

### SQL

```sql
SELECT
s.seller_city,
s.seller_state,
COUNT(*) AS late_orders
FROM `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_orders` o
JOIN `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_order_items` oi
ON o.order_id = oi.order_id
JOIN `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_sellers` s
ON oi.seller_id = s.seller_id
WHERE o.order_delivered_customer_date >
o.order_estimated_delivery_date
GROUP BY s.seller_city,s.seller_state
ORDER BY late_orders DESC
LIMIT 10;
```

### Key Results

| Seller Location   | Late Orders |
| ----------------- | ----------: |
| São Paulo-SP      |       2,193 |
| Ibitinga-SP       |         761 |
| Ribeirão Preto-SP |         283 |

### Executive Observation

Seller concentration in São Paulo creates operational efficiency but also centralizes logistics risk.

---

# Diagnostic Query 13

## Review Score By Delivery Status

### Result

| Delivery Status | Average Review Score |
| --------------- | -------------------: |
| On Time         |                 4.29 |
| Late            |                 2.57 |

### Business Insight

This is the most important finding in the entire investigation.

### Executive Observation

Late deliveries reduce customer satisfaction by approximately 40%.

This establishes a direct statistical relationship between logistics performance and customer sentiment.

---

# Diagnostic Query 14

## Negative Reviews Caused By Late Deliveries

### Result

| Metric                | Value |
| --------------------- | ----: |
| Negative Late Reviews | 4,160 |

### Business Insight

Thousands of negative reviews can be directly linked to delivery delays.

### Executive Observation

Customer dissatisfaction is not primarily caused by product quality in these cases.

It is caused by operational execution failures.

---

# Diagnostic Query 15

## Revenue At Risk Due To Late Deliveries

### Result

| Metric          |        Value |
| --------------- | -----------: |
| Revenue At Risk | 1,158,950.50 |

### Business Insight

More than 1.15 million in marketplace revenue is associated with delayed deliveries.

### Executive Observation

Delivery performance is not merely a logistics KPI.

It is a revenue protection KPI.

---

# DeTLeng Executive Diagnosis

The marketplace appears operationally healthy, with over 91% of deliveries arriving on time or early. However, logistics delays create measurable customer dissatisfaction and expose over 1.15 million in revenue to risk.

The investigation conclusively demonstrates that delivery performance directly influences customer sentiment, review quality, brand reputation, and long-term revenue sustainability.

This is the first major cross-functional diagnosis within CS-003 where Orders, Customers, Sellers, Reviews, and Revenue metrics converge to reveal a clear operational cause-and-effect relationship.

---

## DeTLeng Operation Theatre Status

✅ Orders Postmortem Complete
✅ Customers Postmortem Complete
✅ Product & Seller Postmortem Complete
✅ Payments Postmortem Complete
✅ Reviews Postmortem Complete
✅ Delivery & Logistics Postmortem Complete

🎯 Next Investigation:

**Geographic Intelligence Postmortem**

Focus Areas:

* Customer vs Seller distribution
* Geographic demand clusters
* Geographic supply clusters
* Regional revenue generation
* Market expansion opportunities
* Logistics optimization zones

This next phase will transform operational diagnostics into strategic growth intelligence.
