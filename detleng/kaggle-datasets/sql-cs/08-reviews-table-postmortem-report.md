# Reviews Table Postmortem Report

## Understanding Customer Satisfaction, Service Quality, Brand Reputation, and Customer Experience Performance

---

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/1ae981f2-fa05-4641-9773-2bb78820d275" />


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

Following the completion of Orders, Customers, Products, Sellers, and Payments investigations, the next phase of the DeTLeng Operation Theatre focused on customer sentiment and satisfaction analysis through the Reviews dataset.

While Orders reveal operational performance, Customers reveal market reach, Products reveal commercial activity, and Payments reveal revenue realization, Reviews provide the most direct measurement of customer perception.

Reviews represent the voice of the customer.

They reveal how customers experience the business after the transaction is completed.

For marketplace operators, review analytics often become one of the strongest leading indicators of long-term business health because customer satisfaction directly influences retention, repeat purchases, referrals, brand reputation, and future revenue growth.

This investigation aims to answer several critical business questions:

* Are customers generally satisfied?
* What percentage of customers report positive experiences?
* How significant is customer dissatisfaction?
* Are customers actively providing qualitative feedback?
* Is the marketplace building trust or creating friction?
* What operational risks are visible through customer sentiment?

The Reviews table functions as a Customer Experience Diagnostic System for the entire marketplace ecosystem.

---

# Diagnostic Query 1

## Total Reviews Processed

### SQL

```sql
SELECT
COUNT(*) AS total_reviews
FROM `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_reviews`;
```

### Result

99,224 Reviews

### Business Insight

The marketplace collected nearly one hundred thousand customer reviews.

This represents a substantial feedback repository capable of supporting advanced customer sentiment analysis and service quality measurement.

### Executive Observation

A review volume of this scale indicates:

* High marketplace activity
* Strong customer engagement
* Significant customer participation in feedback programs

Large review datasets increase confidence in customer satisfaction measurements and reduce statistical bias.

---

# Diagnostic Query 2

## Average Review Score

### SQL

```sql
SELECT
ROUND(AVG(review_score),2) AS avg_review_score
FROM `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_reviews`;
```

### Result

4.09 / 5.00

### Business Insight

The marketplace achieved an average customer satisfaction score above four stars.

### Executive Interpretation

A rating above 4.0 generally indicates positive customer perception across the majority of transactions.

This suggests:

* Strong customer experience
* Successful order fulfillment
* Effective marketplace operations
* Reasonably high trust levels

### Strategic Observation

Customer satisfaction above 4 stars is generally considered healthy within large-scale e-commerce marketplaces.

Source:

Google Customer Reviews Program

https://support.google.com/merchants

---

# Diagnostic Query 3

## Review Score Distribution

### SQL

```sql
SELECT
review_score,
COUNT(*) AS total_reviews
FROM `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_reviews`
GROUP BY review_score
ORDER BY review_score;
```

### Result

| Score   | Reviews |
| ------- | ------: |
| 1 Star  |  11,424 |
| 2 Stars |   3,151 |
| 3 Stars |   8,179 |
| 4 Stars |  19,142 |
| 5 Stars |  57,328 |

### Business Interpretation

Five-star reviews represent the overwhelming majority of customer feedback.

### Executive Observation

More than fifty-seven thousand customers reported the highest possible satisfaction score.

This suggests:

* Positive purchasing experiences
* Successful delivery execution
* Strong marketplace trust
* Effective product-market alignment

### Customer Sentiment Analysis

The review distribution demonstrates a strong positive skew.

This pattern is often associated with mature and stable marketplaces where customer expectations are generally being met or exceeded.

---

# Diagnostic Query 4

## Positive Reviews

### SQL

```sql
SELECT
COUNT(*) AS positive_reviews
FROM `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_reviews`
WHERE review_score >= 4;
```

### Result

76,470 Positive Reviews

### Business Insight

More than seventy-six thousand customers reported positive experiences.

### Executive Observation

Positive customer sentiment appears to be the dominant experience throughout the marketplace ecosystem.

Positive reviews directly support:

* Customer retention
* Organic referrals
* Marketplace reputation
* Seller credibility

---

# Diagnostic Query 5

## Negative Reviews

### SQL

```sql
SELECT
COUNT(*) AS negative_reviews
FROM `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_reviews`
WHERE review_score <= 2;
```

### Result

14,575 Negative Reviews

### Business Insight

Although overall sentiment is positive, nearly fifteen thousand customers experienced significant dissatisfaction.

### Executive Observation

This volume of negative reviews cannot be ignored.

Negative reviews often signal:

* Delivery delays
* Product quality issues
* Seller performance problems
* Customer service failures
* Expectation mismatches

### Strategic Recommendation

Future investigations should connect negative reviews with:

* Delivery lead times
* Product categories
* Sellers
* Geographic regions
* Payment methods

to identify root causes.

---

# Diagnostic Query 6

## Positive Review Percentage

### SQL

```sql
SELECT
ROUND(
100 * COUNTIF(review_score >= 4)
/ COUNT(*)
,2) AS positive_review_pct
FROM `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_reviews`;
```

### Result

77.07%

### Business Insight

More than three out of every four customers report a positive marketplace experience.

### Executive Interpretation

This is one of the strongest customer experience indicators observed throughout the investigation.

### Business Impact

A positive review ratio above 75% suggests:

* Strong marketplace credibility
* Effective operational execution
* Healthy customer relationships

### Strategic Note

Positive sentiment is a leading indicator of sustainable long-term revenue growth.

Source:

Bain & Company Customer Loyalty Research

https://www.bain.com

---

# Diagnostic Query 7

## Negative Review Percentage

### SQL

```sql
SELECT
ROUND(
100 * COUNTIF(review_score <= 2)
/ COUNT(*)
,2) AS negative_review_pct
FROM `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_reviews`;
```

### Result

14.69%

### Business Insight

Approximately fifteen percent of customer experiences result in significant dissatisfaction.

### Executive Observation

While overall sentiment remains positive, this percentage represents a meaningful improvement opportunity.

### Operational Risk Assessment

If recurring operational issues are responsible for these reviews, addressing them could significantly improve:

* Customer retention
* Marketplace ratings
* Seller performance
* Revenue growth

---

# Diagnostic Query 8

## Reviews With Comments

### SQL

```sql
SELECT
COUNT(*) AS reviews_with_comments
FROM `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_reviews`
WHERE review_comment_message IS NOT NULL;
```

### Result

40,977 Reviews

### Business Insight

More than forty thousand customers voluntarily provided written feedback.

### Executive Observation

This represents an extremely valuable source of Voice of Customer (VoC) data.

### Future Analytics Opportunity

Natural Language Processing (NLP) can be applied to:

* Detect recurring complaints
* Identify product issues
* Analyze sentiment
* Discover operational bottlenecks

---

# Diagnostic Query 9

## Reviews Without Comments

### SQL

```sql
SELECT
COUNT(*) AS reviews_without_comments
FROM `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_reviews`
WHERE review_comment_message IS NULL;
```

### Result

58,247 Reviews

### Business Insight

Most customers prefer providing ratings rather than detailed explanations.

### Executive Observation

This behavior aligns with broader e-commerce review patterns where rating participation significantly exceeds written feedback participation.

---

# Diagnostic Query 10

## Longest Review Comment

### SQL

```sql
SELECT
MAX(LENGTH(review_comment_message)) AS longest_review
FROM `detleng-case-studies.cs003_olist_raw.cs003_olist_raw_reviews`;
```

### Result

208 Characters

### Business Insight

Customers occasionally provide detailed descriptions of their experiences.

### Executive Observation

Long-form reviews often contain the most actionable business intelligence because they explain the reasons behind customer satisfaction or dissatisfaction.

---

# Strategic Business Conclusions

The Reviews investigation reveals a marketplace with generally strong customer satisfaction and positive brand perception.

Key findings include:

## Customer Satisfaction

* Average review score: 4.09 / 5
* Positive review rate: 77.07%
* Five-star reviews dominate customer feedback

## Customer Dissatisfaction

* Negative review rate: 14.69%
* 14,575 negative reviews identified
* Significant opportunity exists for root-cause analysis

## Customer Engagement

* 99,224 reviews collected
* 40,977 written comments submitted

## Customer Intelligence Potential

The review database contains a substantial volume of customer-generated content that can support advanced sentiment analytics and operational diagnostics.

---

# DeTLeng Executive Takeaway

The Reviews ecosystem confirms that the marketplace is operating from a position of customer trust and generally positive customer experience. With an average satisfaction score exceeding four stars and more than seventy-seven percent positive sentiment, the platform demonstrates strong operational effectiveness and customer acceptance.

However, nearly fifteen percent negative sentiment represents an important diagnostic signal. The next stage of analysis should focus on identifying the operational drivers behind customer dissatisfaction by linking review outcomes with delivery performance, seller behavior, product categories, and geographic regions.

From a Business Intelligence perspective, the Reviews table serves as the customer heartbeat monitor of the entire marketplace ecosystem. It provides direct visibility into customer experience quality and becomes one of the most powerful datasets available for retention analysis, service improvement, reputation management, and long-term growth planning.

---

## DeTLeng Operation Theatre Status

✅ Orders Postmortem Complete

✅ Customers Postmortem Complete

✅ Product & Seller Postmortem Complete

✅ Payments Postmortem Complete

✅ Reviews Postmortem Complete

🎯 Next Investigation:

Delivery Analytics Postmortem

Focus Areas:

* Delivery Performance
* Lead Time Analysis
* Late Delivery Investigation
* Logistics Efficiency
* Regional Delivery Patterns
* Customer Experience Impact

---

By Muhammad Naveed

Founder of DeTLeng — Data Engineering, ETL & Analytics Solutions

[www.detleng.com](http://www.detleng.com)
