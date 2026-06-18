Janab, ab hum Gold Layer ke us table par aa gaye hain jo business ki sab se valuable asset ko represent karti hai:

```text id="7wlv5e"
🗣 Customer Voice
```

Agar:

```text id="d1m1l9"
fact_orders   = Operational Intelligence

fact_sales    = Commercial Intelligence

fact_payments = Financial Intelligence
```

to:

```text id="3g2qzj"
🏆 fact_reviews = Customer Experience Intelligence
```

Ye table batayegi:

```text id="l2xxh3"
Customer Satisfaction
Customer Sentiment
Service Quality
Delivery Impact
Review Trends
Negative Feedback Drivers
```

Aur Geographic Intelligence aur Delivery Analytics mein jo insights nikle thay:

```text id="0jlwm0"
Late Delivery
↓
Negative Reviews
↓
Customer Dissatisfaction
```

un sab ka analytical foundation yehi table banegi.

---

# 🏆 DeTLeng Analytics Layer Implementation

# fact_reviews

## Building the Customer Experience Fact Table for Review Analytics, Customer Satisfaction Monitoring, Sentiment Intelligence, and Executive Service Quality Reporting

---

# Executive Purpose

The Reviews Fact Table represents the customer feedback intelligence layer of the marketplace ecosystem.

While orders represent transactions, sales represent revenue, and payments represent financial realization, reviews represent the customer's perception of the entire buying experience.

This table transforms customer feedback into measurable business intelligence.

The purpose of `fact_reviews` is to centralize review activity, customer sentiment, and service quality indicators into a reusable analytical structure that supports customer experience analytics, operational diagnostics, and executive decision-making.

---

# Business Problem

Customer reviews are often stored as isolated records.

Without a dedicated Reviews Fact Table:

* Customer satisfaction analysis becomes fragmented.
* Review trends become difficult to monitor.
* Sentiment analysis requires repeated calculations.
* Service quality reporting becomes inconsistent.
* Executive dashboards become difficult to maintain.

A dedicated Reviews Fact Table solves these challenges by creating a centralized customer experience intelligence layer.

---

# Source Tables

```text id="s4ecmn"
cs003_olist_stg.stg_reviews

cs003_olist_stg.stg_orders

cs003_olist_analytics.dim_dates
```

---

# Target Table

```text id="z4t3iw"
cs003_olist_analytics.fact_reviews
```

---

# Analytics Layer Objectives

The Reviews Fact Table performs several critical analytical functions.

### Customer Satisfaction Intelligence

Supports:

```text id="v2a7vf"
Customer Satisfaction
Review Monitoring
Service Quality Analysis
```

---

### Sentiment Intelligence

Supports:

```text id="fx4xye"
Positive Reviews
Neutral Reviews
Negative Reviews
```

---

### Operational Diagnostics

Supports:

```text id="r71vnl"
Delivery Impact Analysis
Service Performance Analysis
Customer Experience Monitoring
```

---

### Executive KPI Reporting

Supports:

```text id="p9v5zb"
Review KPIs
Customer Satisfaction KPIs
Service Quality KPIs
```

---

### Customer Experience Intelligence

Supports:

```text id="ch4duw"
Voice of Customer Analytics
Customer Feedback Monitoring
```

---

# Transformation SQL

```sql id="c9s3c0"
CREATE OR REPLACE TABLE
`detleng-case-studies.cs003_olist_analytics.fact_reviews`
AS

SELECT

    r.review_id,

    r.order_id,

    d.date_key,

    r.review_score,

    CASE

        WHEN r.review_score >= 4
        THEN 'Positive'

        WHEN r.review_score = 3
        THEN 'Neutral'

        ELSE 'Negative'

    END AS sentiment_category,

    CASE

        WHEN r.review_comment_message IS NOT NULL
             AND LENGTH(TRIM(r.review_comment_message)) > 0
        THEN 'Comment Provided'

        ELSE 'No Comment'

    END AS comment_status,

    LENGTH(
        IFNULL(
            r.review_comment_message,
            ''
        )
    ) AS comment_length,

    r.review_creation_date,

    r.review_answer_timestamp,

    r.etl_load_timestamp

FROM
`detleng-case-studies.cs003_olist_stg.stg_reviews` r

LEFT JOIN
`detleng-case-studies.cs003_olist_stg.stg_orders` o
ON r.order_id = o.order_id

LEFT JOIN
`detleng-case-studies.cs003_olist_analytics.dim_dates` d
ON r.review_creation_date = d.calendar_date;
```

---

# SQL Transformation Breakdown

## Review Identifier

Preserves:

```text id="lwobk9"
review_id
```

Supporting complete traceability.

---

## Order Reference

Preserves:

```text id="owk7ow"
order_id
```

allowing reviews to connect back to transactions.

---

## Time Intelligence Integration

Links reviews to:

```text id="7sz9y9"
dim_dates
```

through:

```text id="b1xg36"
date_key
```

Supporting:

* Monthly Review Trends
* Quarterly Satisfaction Analysis
* Customer Sentiment Trends

---

## Sentiment Classification

Creates:

```text id="3kk1wq"
sentiment_category
```

Rules:

```text id="p40x4q"
4-5 Stars = Positive

3 Stars = Neutral

1-2 Stars = Negative
```

This converts raw review scores into business-friendly sentiment categories.

---

## Comment Intelligence

Creates:

```text id="wtt5d5"
comment_status
```

Values:

```text id="7gdngl"
Comment Provided

No Comment
```

Supporting qualitative feedback analysis.

---

## Comment Length Analysis

Creates:

```text id="1ln7hz"
comment_length
```

Supporting:

* Customer Engagement Analysis
* Feedback Depth Analysis
* Complaint Investigation

---

## ETL Auditability

Retains:

```text id="6m1c8e"
etl_load_timestamp
```

for governance, lineage, and monitoring.

---

# Validation Query

After creating the table:

```sql id="4kmyh5"
SELECT *
FROM `detleng-case-studies.cs003_olist_analytics.fact_reviews`
LIMIT 20;
```

---

# Expected Output Structure

| Column                  | Purpose                  |
| ----------------------- | ------------------------ |
| review_id               | Review Identifier        |
| order_id                | Order Reference          |
| date_key                | Date Dimension Key       |
| review_score            | Customer Rating          |
| sentiment_category      | Sentiment Classification |
| comment_status          | Comment Availability     |
| comment_length          | Feedback Length          |
| review_creation_date    | Review Date              |
| review_answer_timestamp | Response Timestamp       |
| etl_load_timestamp      | ETL Audit Timestamp      |

---

# Star Schema Relationship

```text id="1gbwsi"
                 dim_dates
                     |
                  date_key
                     |
                     |
               fact_reviews
```

This structure enables scalable customer experience reporting.

---

# Business Value

The Reviews Fact Table enables organizations to answer strategic questions such as:

### Customer Satisfaction

```text id="g6h2i2"
How satisfied are customers?
```

---

### Sentiment Analysis

```text id="sop1ll"
What percentage of reviews are positive?
```

---

### Service Quality

```text id="vg2x66"
Which business processes generate negative feedback?
```

---

### Customer Voice

```text id="m9c8vw"
What are customers saying about their experience?
```

---

### Operational Impact

```text id="f5nm9u"
Do delivery delays reduce customer satisfaction?
```

---

# Future Analytics Usage

The Reviews Fact Table will directly support:

## Review Analytics

```text id="1k1u6s"
CS-008 Review Analytics
```

---

## Customer Analytics

```text id="4q0k0l"
Customer Satisfaction Analysis
```

---

## Delivery Analytics

```text id="krv4li"
Delivery vs Review Score Analysis
```

---

## Executive Dashboards

```text id="qexb1n"
Customer Experience Dashboard
Review Dashboard
Service Quality Dashboard
```

---

# DeTLeng Engineering Observation

Many organizations collect customer reviews but fail to transform them into actionable intelligence.

In reality, reviews often provide the earliest warning signs of:

* Delivery problems
* Service failures
* Product issues
* Customer dissatisfaction

A dedicated Reviews Fact Table ensures that customer feedback becomes a measurable business asset rather than unused operational data.

---

# DeTLeng Executive Takeaway

The `fact_reviews` table transforms raw customer feedback into a structured customer experience intelligence layer that supports sentiment analysis, service quality monitoring, customer satisfaction measurement, and executive decision-making.

This table enables organizations to understand not only what customers purchased, but also how customers felt about the entire marketplace experience.

---

### By Muhammad Naveed

Founder of DeTLeng — Data Engineering, ETL & Analytics Solutions

[www.detleng.com](http://www.detleng.com)

[https://insights.detleng.com/](https://insights.detleng.com/)

[https://casestudy.detleng.com/](https://casestudy.detleng.com/)

---

# 🏆 Analytics Layer Status

```text id="o6bvcq"
✅ dim_customers
✅ dim_products
✅ dim_sellers
✅ dim_dates
✅ dim_geography

✅ fact_orders
✅ fact_sales
✅ fact_payments
✅ fact_reviews

⏳ fact_delivery
```

🎯 Customer Experience Intelligence Layer Activated

Next Object:

```text id="0gtv3s"
🏆 fact_delivery
```

Ye Gold Layer ki Logistics Intelligence Table hogi — jahan delivery performance, delays, on-time delivery KPIs, logistics efficiency, customer impact, aur operational excellence ko measurable business intelligence mein convert kiya jayega. 🚚🏆📦
