# Data Warehouse Setup and Data Ingestion

Following the initial review of the Online Retail II dataset, the next phase focused on establishing a cloud-based data warehouse using Google BigQuery.

The objective was to move beyond spreadsheet-based analysis and create a scalable environment capable of supporting data transformation, validation, reporting, and business intelligence.

### Solution Architecture

The project followed a layered data engineering architecture designed to separate raw source data from transformed analytical datasets.

```text
Excel Files
     ↓
BigQuery Raw Tables
     ↓
Staging Layer
     ↓
Analytics Layer
     ↓
SQL Reporting
     ↓
Looker Studio
```

This structure provides a clear separation between data ingestion, transformation, and reporting activities while supporting future scalability.

### BigQuery Dataset Creation

A dedicated dataset was created within Google BigQuery to host all retail-related assets.

```text
Dataset Name:
detleng_retail
```

This dataset became the central repository for raw tables, staging tables, validation processes, and analytics-ready datasets.

### Source File Preparation

The original Online Retail II workbook contained two worksheets representing separate reporting periods.

```text
Year 2009–2010
Year 2010–2011
```

To ensure compatibility with BigQuery, both worksheets were exported to CSV format.

```text
retail_2009_2010.csv
retail_2010_2011.csv
```

The conversion process enabled structured ingestion into the cloud data warehouse environment.

### Raw Data Layer

Two raw tables were created to preserve the original source data.

```text
retail_raw_2009_2010
retail_raw_2010_2011
```

The raw layer was intentionally designed to retain source records without applying business transformations. This approach ensures traceability and allows future validation against the original files whenever required.

### Handling Source Data Types

During the initial import process, a schema validation issue was encountered with the `InvoiceDate` field.

The source files stored dates using the following format:

```text
13/12/2009 09:58
```

BigQuery attempted to interpret these values as native timestamps, which resulted in loading errors because the source format did not match BigQuery's default timestamp expectations.

To preserve data integrity and simplify the ETL workflow, the date field was initially imported as a string.

```text
Invoice:STRING
StockCode:STRING
Description:STRING
Quantity:INTEGER
InvoiceDate:STRING
Price:FLOAT
CustomerID:STRING
Country:STRING
```

This approach allowed date parsing and standardization to be handled later within the transformation layer using SQL.

### Data Loading and Validation

After both CSV files were successfully loaded into BigQuery, row-count validation was performed to verify ingestion completeness.

```text
2009–2010 Dataset: 525K+ Records
2010–2011 Dataset: 541K+ Records
```

The validation confirmed that all source records were successfully imported into the raw layer.

### Staging Layer Development

Once the raw tables had been validated, both datasets were consolidated into a single staging table.

This process replicated the append operation commonly performed in Power Query but executed directly within BigQuery using SQL.

```sql
CREATE OR REPLACE TABLE
detleng_retail.retail_staging AS

SELECT *
FROM detleng_retail.retail_raw_2009_2010

UNION ALL

SELECT *
FROM detleng_retail.retail_raw_2010_2011;
```

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/d3600fff-7751-45ff-8104-b041b9fd6cc6" />

The successful execution of the query created a unified staging table containing all retail transactions from both reporting periods.

This staging layer became the foundation for data transformation, quality validation, KPI development, and reporting activities performed later in the project.

### Outcome

At the completion of this phase, the project had successfully established:

* A centralized BigQuery dataset
* A structured raw data layer
* Source data validation procedures
* A consolidated staging table
* A scalable foundation for analytics engineering

With the data warehouse environment fully operational, the project was ready to move into data transformation, quality validation, and KPI development.

---
## Initial Data Validation and Staging Verification

Following the successful creation of the staging table, the next phase focused on validating the consolidated dataset before proceeding with analytics development.

A staging layer should never be assumed to be correct simply because the SQL execution completed successfully. Record counts, data structures, and sample transactions must be reviewed to verify that the ETL process has preserved the source data accurately.

### Record Count Validation

The first validation step was to confirm that both source datasets had been successfully merged into the staging table.

The following query was executed:

```sql
SELECT COUNT(*) AS TotalRows
FROM detleng_retail.retail_staging;
```

The result returned approximately 1.06 million records, confirming that the staging layer contained the complete transaction history from both reporting periods.

```text
Total Records:
~1,067,371
```

This validation confirmed that the `UNION ALL` operation successfully consolidated the two source tables without data loss.

### Sample Data Verification

After validating row counts, a sample of records was reviewed to verify data quality and field consistency.

```sql
SELECT *
FROM detleng_retail.retail_staging
LIMIT 10;
```

<img width="1479" height="739" alt="image" src="https://github.com/user-attachments/assets/a4f79784-6f5f-4d62-9c2e-75572f876190" />

The sample records confirmed that transaction data had been loaded correctly and that all expected business fields were available within the staging layer.

Key fields included:

* Invoice Number
* Product Code
* Product Description
* Quantity
* Transaction Date
* Unit Price
* Customer Identifier
* Country

### Business Data Observations

The sample records revealed several transaction types commonly found in real-world retail environments.

Examples included:

```text
AMAZON FEE
POSTAGE
Manual Adjustments
Bad Debt Adjustments
```

In addition, negative quantity values were present within the dataset.

```text
-1
-2
```

These records are important because they represent legitimate business activities such as:

* Product returns
* Customer refunds
* Shipping adjustments
* Fee allocations
* Financial corrections
* Order cancellations

Rather than treating these records as errors, they were preserved within the dataset to maintain an accurate representation of business operations.

### ETL Validation Outcome

The validation process confirmed that:

* The staging table was successfully created.
* Source records were consolidated correctly.
* Date fields were parsed successfully.
* Business transaction history was preserved.
* Returns, refunds, fees, and adjustments remained available for analysis.
* The dataset was suitable for further transformation and KPI development.

### Data Engineering Progress

At this stage of the project, the following components had been completed:

✅ BigQuery Environment Setup

✅ Dataset Creation

✅ CSV Data Ingestion

✅ Raw Data Layer

✅ Schema Configuration

✅ ETL Consolidation Process

✅ Staging Layer Development

✅ Record Count Validation

✅ Sample Data Verification

The project had now progressed beyond simple data loading and entered the data validation phase, providing a trusted foundation for analytics engineering, KPI development, and business intelligence reporting.


---

## Data Quality Validation

After confirming that the staging table contained the complete transaction history, a series of data quality validation checks were performed to assess the reliability of the dataset before KPI development and analytics modeling.

The objective of this phase was not to remove records, but to understand the characteristics of the data and identify business scenarios that could influence reporting results.

### Record Count Validation

The first validation step confirmed the total number of records available in the staging layer.

```sql
SELECT COUNT(*) AS TotalRows
FROM detleng_retail.retail_staging;
```

<img width="1830" height="715" alt="image" src="https://github.com/user-attachments/assets/485cd14a-b29d-4a9a-8a3c-d18f3ec6aef2" />

Result:

```text
Total Rows: 1,067,371
```

This result confirmed that the complete transaction history from both source datasets had been successfully consolidated into the staging layer.

### Date Range Validation

The next step was to verify the reporting period covered by the dataset.

```sql
SELECT
  MIN(InvoiceDate) AS StartDate,
  MAX(InvoiceDate) AS EndDate
FROM detleng_retail.retail_staging;
```

<img width="1846" height="730" alt="image" src="https://github.com/user-attachments/assets/7b7d8c0e-9f94-4607-95bc-ddd1c7222751" />

Result:

```text
Start Date: 2009-12-01
End Date: 2011-12-09
```

The validation confirmed that the dataset covered approximately two years of retail activity, matching the expected reporting period of the Online Retail II dataset.

### Customer Data Completeness

Customer identifiers were reviewed to determine the presence of missing customer records.

```sql
SELECT COUNT(*) AS NullCustomerID
FROM detleng_retail.retail_staging
WHERE CustomerID IS NULL;
```

<img width="1472" height="577" alt="image" src="https://github.com/user-attachments/assets/d5d93cd5-1c98-401f-b4b1-d366a529f912" />

Result:

```text
Null Customer IDs: 243,007
```

#### Business Interpretation

This is a known characteristic of the Online Retail II dataset and does not necessarily indicate poor data quality.

These records may represent:

* Guest purchases
* Anonymous transactions
* Customers without registered accounts
* Incomplete customer registration data

The records were retained because they still contribute to revenue and transaction analysis.

### Negative Quantity Analysis

Retail datasets commonly contain return and cancellation transactions. To validate their presence, quantity values were analyzed.

```sql
SELECT COUNT(*) AS NegativeQuantity
FROM detleng_retail.retail_staging
WHERE Quantity < 0;
```

<img width="1474" height="572" alt="image" src="https://github.com/user-attachments/assets/e69cd262-36cc-40f8-91be-369594534c63" />

Result:

```text
Negative Quantity Records: 22,950
```

#### Business Interpretation

Negative quantities typically represent:

* Product returns
* Refund transactions
* Order cancellations
* Inventory corrections

These records were preserved because they reflect legitimate business activity and are essential for accurate revenue reporting.

### Negative Revenue Analysis

Revenue validation was performed to identify transactions generating negative sales values.

```sql
SELECT COUNT(*) AS NegativeRevenue
FROM detleng_retail.retail_staging
WHERE Revenue < 0;
```

<img width="1480" height="577" alt="image" src="https://github.com/user-attachments/assets/c07216b2-ab13-4902-91e6-7cd4412d94ef" />

Result:

```text
Negative Revenue Records: 19,498
```

#### Business Interpretation

Revenue was calculated using:

```text
Revenue = Quantity × Price
```

When quantity values are negative, revenue values also become negative.

These records primarily represent:

* Customer refunds
* Product returns
* Cancelled orders
* Financial adjustments

The presence of negative revenue confirms that the dataset captures both sales activity and post-sale business events.

### Validation Summary

The data quality assessment confirmed that the dataset accurately represents real-world retail operations.

| Validation Check          | Result                   |
| ------------------------- | ------------------------ |
| Total Rows                | 1,067,371                |
| Date Range                | 2009-12-01 to 2011-12-09 |
| Null Customer IDs         | 243,007                  |
| Negative Quantity Records | 22,950                   |
| Negative Revenue Records  | 19,498                   |

### Outcome

The validation process confirmed that the staging layer was complete, consistent, and suitable for analytics development.

Rather than treating every anomaly as an error, the project focused on understanding the business meaning behind each data pattern. This approach ensured that returns, refunds, anonymous purchases, and other real-world retail events remained available for analysis.

With data quality validation completed, the project moved to the next phase: developing an analytics-ready dataset and building business KPIs using SQL.

---

## Analytics Layer Development

With data ingestion, transformation, and validation successfully completed, the project moved into the analytics layer.

The objective of this phase was to transform validated transaction data into business-ready KPIs that could support executive reporting, dashboard development, and decision-making.

Unlike traditional dashboard-first approaches, the KPI logic was developed directly within BigQuery, ensuring that business calculations remained centralized, reusable, and consistent across reporting platforms.

### Core Business KPIs

Several foundational business metrics were created using SQL.

#### Total Revenue

```sql
SELECT
ROUND(SUM(Revenue),2) AS TotalRevenue
FROM detleng_retail.retail_staging
WHERE Revenue > 0;
```

#### Total Orders

```sql
SELECT
COUNT(DISTINCT Invoice) AS TotalOrders
FROM detleng_retail.retail_staging;
```

#### Total Customers

```sql
SELECT
COUNT(DISTINCT CustomerID) AS TotalCustomers
FROM detleng_retail.retail_staging
WHERE CustomerID IS NOT NULL;
```

#### Total Products

```sql
SELECT
COUNT(DISTINCT StockCode) AS TotalProducts
FROM detleng_retail.retail_staging;
```

### KPI Results

The resulting metrics provided an executive-level summary of the retail business.

| KPI             | Result         |
| --------------- | -------------- |
| Total Revenue   | €20,972,968.14 |
| Total Orders    | 53,628         |
| Total Customers | 5,942          |
| Total Products  | 5,305          |

These results closely aligned with the previously developed Power BI solution, confirming the consistency and reliability of the BigQuery implementation.

### Analytics Data Mart Structure

To support future reporting requirements, KPI outputs and analytical datasets were organized within the BigQuery environment.

<img width="1920" height="1080" alt="cs-011-gcp-07" src="https://github.com/user-attachments/assets/906f2f09-88bd-475e-a0f9-29c1f4f5c6a7" />

The final structure contained:

```text
detleng_retail
│
├── retail_raw_2009_2010
├── retail_raw_2010_2011
├── retail_staging
│
├── Total Revenue
├── Total Orders
├── Total Customers
├── Total Products
│
├── Revenue by Country
├── Revenue by Month
└── Revenue by Year
```

This structure separated source data from business reporting datasets and provided a clean foundation for analytics consumption.

### Revenue Analysis by Country

To understand geographical sales performance, revenue was aggregated at the country level.

```sql
SELECT
Country,
ROUND(SUM(Revenue),2) AS Revenue
FROM detleng_retail.retail_staging
WHERE Revenue > 0
GROUP BY Country
ORDER BY Revenue DESC;
```

This analysis identified the highest-performing markets and highlighted revenue concentration across countries.

### Revenue Analysis by Year

Annual revenue trends were calculated to evaluate overall business growth across the reporting period.

```sql
SELECT
EXTRACT(YEAR FROM InvoiceDate) AS Year,
ROUND(SUM(Revenue),2) AS Revenue
FROM detleng_retail.retail_staging
WHERE Revenue > 0
GROUP BY Year
ORDER BY Year;
```

The resulting dataset provided a year-over-year revenue view suitable for executive reporting and trend analysis.

### Revenue Analysis by Month

Monthly revenue aggregation was developed to identify seasonality and purchasing patterns.

```sql
SELECT
FORMAT_DATE('%B', DATE(InvoiceDate)) AS MonthName,
ROUND(SUM(Revenue),2) AS Revenue
FROM detleng_retail.retail_staging
WHERE Revenue > 0
GROUP BY MonthName
ORDER BY Revenue DESC;
```

<img width="1473" height="737" alt="image" src="https://github.com/user-attachments/assets/38b894a0-e090-4f3f-bfd2-25c5bd14c1a2" />

The analysis revealed clear seasonal trends, with November, December, and October generating the highest revenue levels across the dataset.

### Business Insights

The analytics layer produced several valuable business observations:

* More than €20.9 million in positive revenue was generated across the reporting period.
* Over 53,000 unique orders were processed.
* Nearly 6,000 customers contributed to sales activity.
* More than 5,300 unique products were sold.
* Revenue demonstrated strong seasonal behavior during the final quarter of the year.
* Country-level analysis revealed significant revenue concentration within key markets.

### Outcome

The analytics layer successfully transformed raw transaction data into business-ready metrics that could be consumed by reporting platforms such as Power BI and Looker Studio.

At this stage, the project had completed:

✅ Data Warehouse Setup

✅ Raw Data Layer

✅ ETL Processing

✅ Data Quality Validation

✅ KPI Development

✅ Revenue Analysis

✅ Customer Analysis

✅ Product Analysis

✅ Geographic Analysis

✅ Time-Series Analysis

The project had now evolved from a simple retail dataset into a fully operational analytics-ready data platform built on Google BigQuery.

---
## Business Insights

After developing the core KPIs and analytical datasets, the final phase focused on identifying meaningful business insights from the retail transaction data.

The objective was not only to calculate metrics but also to understand customer behavior, product performance, geographic trends, and seasonal sales patterns.

### Top Revenue-Generating Countries

The following query was used to identify the highest-performing markets.

```sql
SELECT
    Country,
    ROUND(SUM(Revenue),2) AS Revenue
FROM detleng_retail.retail_staging
WHERE Revenue > 0
GROUP BY Country
ORDER BY Revenue DESC
LIMIT 10;
```

<img width="1837" height="923" alt="image" src="https://github.com/user-attachments/assets/5005da33-c2ce-49f7-97f0-721ca38bf4fa" />

#### Top Countries by Revenue

| Rank | Country | Revenue |
|--------|---------|----------:|
| 1 | United Kingdom | €17.87M |
| 2 | EIRE | €664K |
| 3 | Netherlands | €554K |
| 4 | Germany | €431K |
| 5 | France | €357K |

### Geographic Insights

Several important patterns emerged from the country-level analysis:

- The United Kingdom generated more than 85% of total revenue.
- Sales activity was highly concentrated within the domestic market.
- EIRE and the Netherlands represented the strongest international markets.
- Germany and France contributed consistent revenue despite significantly smaller customer bases.
- The data suggests potential opportunities for expanding sales across additional European markets.

These findings demonstrate the importance of geographic segmentation when evaluating business growth opportunities.

---

### Top Revenue-Generating Products

To identify the most valuable products within the catalog, revenue was aggregated at the product level.

```sql
SELECT
    Description,
    ROUND(SUM(Revenue),2) AS Revenue
FROM detleng_retail.retail_staging
WHERE Revenue > 0
GROUP BY Description
ORDER BY Revenue DESC
LIMIT 10;
```

<img width="1600" height="796" alt="image" src="https://github.com/user-attachments/assets/a6bc2191-3f83-4e72-b511-66b6c3768fe1" />

<img width="1464" height="737" alt="image" src="https://github.com/user-attachments/assets/a5199f2c-33a1-44f9-a40b-4c27f892cae8" />

#### Top Products by Revenue

| Rank | Product | Revenue |
|--------|---------|----------:|
| 1 | REGENCY CAKESTAND 3 TIER | €344K |
| 2 | Manual | €341K |
| 3 | DOTCOM POSTAGE | €323K |
| 4 | WHITE HANGING HEART T-LIGHT HOLDER | €267K |
| 5 | PAPER CRAFT, LITTLE BIRDIE | €168K |

### Product Performance Insights

The product-level analysis highlighted several interesting trends:

- REGENCY CAKESTAND 3 TIER generated the highest revenue across the entire product catalog.
- Home décor and gift-related products consistently appeared among the top-performing items.
- Shipping-related entries such as DOTCOM POSTAGE and POSTAGE contributed significant revenue.
- Revenue was concentrated among a relatively small group of products, indicating the presence of key revenue drivers.
- Seasonal and gift-oriented products played a major role in overall business performance.

These findings provide valuable input for merchandising, inventory planning, and product portfolio optimization.

---

### Seasonal Revenue Trends

Monthly revenue analysis revealed strong seasonal behavior across the reporting period.

| Month | Revenue |
|---------|-----------:|
| November | €2.98M |
| December | €2.73M |
| October | €2.32M |
| September | €1.98M |
| March | €1.55M |

### Seasonal Insights

The monthly analysis identified clear purchasing patterns:

- Q4 generated the highest overall revenue.
- November was the strongest month across the entire dataset.
- October, November, and December consistently outperformed other periods.
- Holiday shopping activity had a significant impact on revenue growth.
- The business demonstrated strong year-end seasonality driven by gift purchases and festive demand.

Understanding these seasonal patterns can support future forecasting, inventory management, and marketing campaign planning.

---

## Business Value Delivered

This project transformed more than 1.06 million retail transactions into a structured, analytics-ready dataset using Google BigQuery.

The solution established a complete data engineering workflow covering:

- Data ingestion
- Data transformation
- Data quality validation
- KPI development
- Business analytics
- Reporting dataset preparation

Key business outcomes included:

- Centralized cloud-based data warehouse
- Standardized KPI calculations
- Improved reporting readiness
- Reusable SQL transformation logic
- Support for Power BI and Looker Studio integration
- Scalable analytics architecture for future growth

Most importantly, the project demonstrated how properly engineered data foundations create more reliable reporting and decision-making environments.

This aligns directly with DeTLeng's core philosophy:

> We don't just build dashboards. We engineer the data that makes dashboards trustworthy.

---




---



