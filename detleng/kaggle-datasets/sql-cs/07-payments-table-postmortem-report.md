# Payments Table Postmortem Report

## Understanding Payment Behavior, Revenue Realization, Installment Utilization, and Customer Payment Preferences

---

# Data Source

## Dataset Name

Brazilian E-Commerce Public Dataset by Olist

## Source

Kaggle

## Dataset URL

https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce

---

# Executive Summary

Following the successful completion of the Orders, Customers, and Product & Seller investigations, the DeTLeng Operation Theatre proceeded to examine the Payments ecosystem.

If Orders represent marketplace activity and Customers represent marketplace demand, then Payments represent the financial bloodstream of the business.

Every transaction ultimately culminates in a payment event. Understanding how customers pay, how revenue is realized, and how financing behavior influences purchasing decisions is critical for both operational management and executive decision-making.

This investigation focuses on answering several high-value business questions:

* How much revenue has been realized?
* Which payment methods dominate customer behavior?
* To what extent do customers rely on installment financing?
* Which payment channels contribute most to revenue?
* Are there indications of payment-related operational risks?
* What insights can support future revenue growth and financial planning?

The Payments dataset provides direct visibility into customer purchasing power, financing preferences, transaction behavior, and cash-flow dynamics.

---

# Diagnostic Query 1

## Total Payments Processed

### SQL

```sql
SELECT
COUNT(*) AS total_payments
FROM `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_payments`;
```

### Result

103,886 Payment Transactions

### Business Insight

The marketplace processed more than 103 thousand payment records.

The payment count exceeds total order count because certain orders contain multiple payment records.

### Executive Observation

This confirms that the marketplace supports flexible payment arrangements, enabling customers to combine payment methods or payment events for a single purchase.

### Strategic Value

Understanding payment volume helps:

* Estimate transaction processing costs
* Assess payment gateway workload
* Evaluate financial system scalability

---

# Diagnostic Query 2

## Total Revenue Realized

### SQL

```sql
SELECT
ROUND(SUM(payment_value),2) AS total_payment_value
FROM `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_payments`;
```

### Result

16,008,872.12

### Business Insight

Customers paid more than 16 million through the marketplace.

### Executive Observation

This represents one of the most important commercial indicators available within the dataset.

Revenue realization serves as the foundation for:

* Executive reporting
* Business valuation
* Financial forecasting
* Profitability analysis
* Growth measurement

### Strategic Interpretation

The marketplace demonstrates substantial commercial activity and a healthy transaction volume capable of supporting large-scale analytical initiatives.

---

# Diagnostic Query 3

## Average Payment Value

### SQL

```sql
SELECT
ROUND(AVG(payment_value),2) AS avg_payment_value
FROM `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_payments`;
```

### Result

154.10

### Business Insight

The average customer payment is approximately 154.

### Executive Observation

This value exceeds the average item price observed during the Product Postmortem investigation.

### Strategic Interpretation

Customers frequently purchase multiple items within a single order, increasing overall order value and improving marketplace revenue efficiency.

---

# Diagnostic Query 4

## Payment Method Distribution

### SQL

```sql
SELECT
payment_type,
COUNT(*) AS total_transactions
FROM `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_payments`
GROUP BY payment_type
ORDER BY total_transactions DESC;
```

### Result

| Payment Type | Transactions |
| ------------ | -----------: |
| Credit Card  |       76,795 |
| Boleto       |       19,784 |
| Voucher      |        5,775 |
| Debit Card   |        1,529 |
| Not Defined  |            3 |

### Business Insight

Credit cards overwhelmingly dominate customer payment behavior.

### Executive Observation

Approximately 74% of all payment transactions utilize credit cards.

### Strategic Interpretation

The marketplace exhibits strong consumer financing behavior, which typically supports:

* Higher order values
* Increased conversion rates
* Improved customer purchasing flexibility

### Risk Consideration

Heavy dependence on a single payment channel may create exposure to:

* Payment processor disruptions
* Credit market fluctuations
* Regulatory changes

---

# Diagnostic Query 5

## Payment Method Revenue Contribution

### SQL

```sql
SELECT
payment_type,
ROUND(SUM(payment_value),2) AS total_revenue
FROM `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_payments`
GROUP BY payment_type
ORDER BY total_revenue DESC;
```

### Result

| Payment Type |       Revenue |
| ------------ | ------------: |
| Credit Card  | 12,542,084.19 |
| Boleto       |  2,869,361.27 |
| Voucher      |    379,436.87 |
| Debit Card   |    217,989.79 |

### Business Insight

Credit cards generate the overwhelming majority of marketplace revenue.

### Executive Observation

Nearly 78% of all revenue originates from credit card transactions.

### Strategic Interpretation

Credit card financing appears to be one of the primary drivers of marketplace growth.

### Executive Recommendation

Future analytics should investigate:

* Credit-card customer lifetime value
* Credit-card customer retention
* Revenue contribution by installment segment

---

# Diagnostic Query 6

## Installment Usage Analysis

### SQL

```sql
SELECT
payment_installments,
COUNT(*) AS transactions
FROM `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_payments`
GROUP BY payment_installments
ORDER BY payment_installments;
```

### Result Highlights

| Installments | Transactions |
| ------------ | -----------: |
| 1            |       52,546 |
| 2            |       12,413 |
| 3            |       10,461 |
| 4            |        7,098 |
| 5            |        5,239 |
| 10           |        5,328 |

### Business Insight

Single-payment transactions remain dominant, but installment purchasing is heavily utilized throughout the marketplace.

### Executive Observation

The significant volume of installment transactions indicates that customers actively leverage financing options to support purchasing decisions.

### Strategic Interpretation

Installments likely contribute directly to:

* Increased conversion rates
* Higher order values
* Expanded purchasing accessibility

---

# Diagnostic Query 7

## Average Installments Used

### SQL

```sql
SELECT
ROUND(AVG(payment_installments),2) AS avg_installments
FROM `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_payments`;
```

### Result

2.85 Installments

### Business Insight

The average customer transaction utilizes nearly three installments.

### Executive Observation

This reflects a mature consumer financing environment where installment-based purchasing is normalized.

### Strategic Interpretation

The marketplace benefits from financial flexibility that supports customer acquisition and sales growth.

---

# Diagnostic Query 8

## High Installment Orders

### SQL

```sql
SELECT
COUNT(*) AS high_installment_orders
FROM `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_payments`
WHERE payment_installments >= 10;
```

### Result

5,669 High-Installment Transactions

### Business Insight

More than five thousand transactions utilize long-term financing structures.

### Executive Observation

This confirms strong customer demand for payment flexibility.

### Strategic Interpretation

Customers purchasing higher-value products appear willing to extend payment periods in exchange for affordability.

---

# Diagnostic Query 9

## Largest Single Payment

### SQL

```sql
SELECT
MAX(payment_value) AS highest_payment
FROM `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_payments`;
```

### Result

13,664.08

### Business Insight

The largest recorded transaction exceeded 13,600.

### Executive Observation

High-value purchases demonstrate the marketplace's ability to support premium product transactions in addition to standard consumer purchases.

---

# Diagnostic Query 10

## Payment Method vs Average Order Value

### SQL

```sql
SELECT
payment_type,
ROUND(AVG(payment_value),2) AS avg_payment
FROM `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_payments`
GROUP BY payment_type
ORDER BY avg_payment DESC;
```

### Result

| Payment Type | Average Payment |
| ------------ | --------------: |
| Credit Card  |          163.32 |
| Boleto       |          145.03 |
| Debit Card   |          142.57 |
| Voucher      |           65.70 |

### Business Insight

Credit card users consistently generate the highest-value transactions.

### Executive Observation

Customers utilizing financing mechanisms appear more willing to make larger purchases.

### Strategic Interpretation

Credit card customers represent a high-value segment that warrants dedicated monitoring and targeted retention strategies.

---

# Strategic Business Conclusions

The Payments investigation reveals a financially healthy and commercially mature marketplace.

## Marketplace Financial Scale

* 103,886 payment transactions processed
* 16 million revenue realized
* 154 average payment value

## Customer Payment Behavior

* Credit cards dominate transaction volume
* Credit cards dominate revenue contribution
* Installment financing is widely accepted

## Financing Dynamics

* Average installment count: 2.85
* 5,669 transactions use 10 or more installments
* Flexible financing appears to drive purchasing activity

## Revenue Drivers

Most valuable customer segment:

* Credit Card Users

Highest average transaction values:

* Credit Card Customers

---

# DeTLeng Executive Diagnosis

The marketplace demonstrates a strong and stable payment ecosystem supported primarily by credit-card financing.

The combination of substantial revenue volume, high transaction counts, and widespread installment adoption suggests a commercially mature environment where financing directly supports customer purchasing power.

From a Business Intelligence perspective, payment behavior appears highly predictable, scalable, and suitable for advanced analytical modeling.

Future investigations should focus on:

* Payment behavior by customer segment
* Revenue realization by geography
* Installment behavior by product category
* Customer lifetime value by payment method
* Profitability impact of financing structures

---

# DeTLeng Operation Theatre Status

✅ Orders Postmortem Complete

✅ Customers Postmortem Complete

✅ Product & Seller Postmortem Complete

✅ Payments Postmortem Complete

🎯 Next Investigation

Reviews Table Postmortem

Focus Areas:

* Customer Satisfaction
* Review Scores
* Service Quality
* Product Experience
* Marketplace Reputation Analytics

---

By Muhammad Naveed

Founder of DeTLeng — Data Engineering, ETL & Analytics Solutions

[www.detleng.com](http://www.detleng.com)
