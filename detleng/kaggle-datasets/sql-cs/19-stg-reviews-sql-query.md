# 🏥 DeTLeng Staging Layer Implementation

# stg_reviews

## Transforming Raw Customer Feedback into Analytics-Ready Sentiment Intelligence

---

# Executive Purpose

The Reviews table represents the voice of the customer.

Orders tell us what happened.

Payments tell us how customers paid.

Deliveries tell us how efficiently orders were fulfilled.

Reviews tell us how customers felt about the entire experience.

Customer feedback is one of the most valuable business assets because it provides direct insight into customer satisfaction, service quality, delivery performance, product expectations, and overall marketplace health.

The purpose of the staging layer is to standardize review information, improve data quality, derive sentiment intelligence, and prepare customer feedback for future analytics and executive reporting.

This staging table will later support:

* Review Analytics
* Customer Experience Analytics
* Sentiment Analysis
* Delivery Impact Analysis
* Customer Satisfaction Monitoring
* Executive CX Dashboards

---

# Source Table

```text
cs003_olist_raw_reviews
```

---

# Target Table

```text
cs003_olist_stg.stg_reviews
```

---

# Data Engineering Objectives

The staging process performs the following transformations:

### Review Text Cleansing

Remove unnecessary spaces from:

```text
review_comment_title
review_comment_message
```

This ensures cleaner reporting and future text analysis.

---

### Date Standardization

Convert review creation dates into analytics-friendly format.

This enables:

* Review trend analysis
* Monthly satisfaction reporting
* Customer experience monitoring

---

### Sentiment Classification

Convert raw review scores into business-friendly sentiment categories.

Raw Data:

```text
1
2
3
4
5
```

Business-Friendly Output:

```text
1-2 = Negative

3 = Neutral

4-5 = Positive
```

This transformation allows executives to instantly understand customer sentiment without interpreting numerical scores.

---

### Comment Availability Flag

Create a flag identifying whether customers left written feedback.

Example:

```text
Yes
No
```

This helps measure customer engagement and feedback participation.

---

### Comment Length Analysis

Calculate comment length.

Future usage:

* Complaint analysis
* Review quality assessment
* Customer engagement measurement

---

### ETL Auditability

Add ETL timestamp for:

* Data lineage
* Data freshness monitoring
* ETL auditing
* Operational governance

---

# Transformation SQL

```sql
CREATE OR REPLACE TABLE
`detleng-case-studies.cs003_olist_stg.stg_reviews`
AS

SELECT

    review_id,

    order_id,

    review_score,

    TRIM(review_comment_title)
        AS review_comment_title,

    TRIM(review_comment_message)
        AS review_comment_message,

    DATE(review_creation_date)
        AS review_creation_date,

    review_answer_timestamp,

    CASE

        WHEN review_score IN (1,2)
        THEN 'Negative'

        WHEN review_score = 3
        THEN 'Neutral'

        WHEN review_score IN (4,5)
        THEN 'Positive'

        ELSE 'Unknown'

    END AS review_sentiment,

    CASE

        WHEN review_comment_message IS NULL
             OR review_comment_message = ''
        THEN 'No'

        ELSE 'Yes'

    END AS has_comment,

    LENGTH(
        IFNULL(review_comment_message,'')
    ) AS comment_length,

    CURRENT_TIMESTAMP()
        AS etl_load_timestamp

FROM
`detleng-case-studies.cs003_olist_raw.cs003_olist_raw_reviews`;
```

---

# Validation Query

After execution:

```sql
SELECT *
FROM `detleng-case-studies.cs003_olist_stg.stg_reviews`
LIMIT 20;
```

---

# Expected Output Columns

| Column                  | Purpose               |
| ----------------------- | --------------------- |
| review_id               | Review Business Key   |
| order_id                | Order Reference       |
| review_score            | Original Review Score |
| review_comment_title    | Cleaned Review Title  |
| review_comment_message  | Cleaned Review Text   |
| review_creation_date    | Review Date           |
| review_answer_timestamp | Response Timestamp    |
| review_sentiment        | Derived Sentiment     |
| has_comment             | Comment Availability  |
| comment_length          | Review Text Length    |
| etl_load_timestamp      | ETL Audit Trail       |

---

# Business Interpretation

This staging table transforms raw customer feedback into structured customer experience intelligence.

Instead of reporting:

```text
Average Review Score = 4.09
```

the business can now understand:

```text
Positive Reviews

Neutral Reviews

Negative Reviews
```

which is significantly more actionable.

---

# Customer Experience Intelligence

The table enables future analysis such as:

```text
Positive Review %

Negative Review %

Sentiment Trends

Customer Satisfaction Trends

Review Volume Trends
```

---

# Delivery Impact Analysis

One of the most powerful future use cases:

```text
Delivery Status
+
Review Sentiment
```

Example:

```text
Late Delivery
        ↓
Negative Review
```

This directly quantifies the business impact of logistics performance.

---

# Executive Reporting Use Cases

The staging table supports:

```text
Customer Satisfaction Scorecards

Review Monitoring Dashboards

Service Quality Reporting

Operational Excellence Programs
```

---

# Future Analytics Usage

This staging table will directly feed:

## Review Dimension

```text
dim_reviews
```

---

## Customer Experience Analytics

```text
CS-008 Review Analytics
```

---

## Executive Dashboards

```text
Positive Review %

Negative Review %

Average Review Score

Customer Sentiment Trends
```

---

# DeTLeng Engineering Observation

Most organizations collect customer reviews but fail to transform them into business intelligence.

Raw review scores provide limited value.

Sentiment intelligence provides actionable value.

A review score of:

```text
1
```

is data.

A classification of:

```text
Negative Customer Experience
```

is business intelligence.

The staging layer performs this critical transformation.

---

# DeTLeng Executive Takeaway

The `stg_reviews` table transforms raw customer feedback into a structured customer sentiment framework.

By converting review scores into business-friendly sentiment categories, organizations gain a clearer understanding of customer satisfaction, service quality, delivery performance, and operational effectiveness.

This table serves as the foundation for future Review Analytics, Customer Experience Intelligence, Sentiment Monitoring, and Executive Reporting initiatives within the CS-003 platform.

---

### By Muhammad Naveed

Founder of DeTLeng — Data Engineering, ETL & Analytics Solutions

[www.detleng.com](http://www.detleng.com)

[https://insights.detleng.com/](https://insights.detleng.com/)

[https://casestudy.detleng.com/](https://casestudy.detleng.com/)

---

📍 **DeTLeng Staging Layer Status**

```text
✅ stg_customers
✅ stg_orders
✅ stg_payments
✅ stg_order_items
✅ stg_products
✅ stg_sellers
✅ stg_reviews

⏳ stg_geolocation
⏳ stg_category_translation
```

🎯 **Next Investigation:**

```text
stg_geolocation
```

Yahan se hum raw location coordinates ko analytics-ready geographic intelligence mein transform karenge — aur phir marketplace expansion, mapping, regional performance, aur executive geo dashboards ki foundation tayar hogi. 🚀
