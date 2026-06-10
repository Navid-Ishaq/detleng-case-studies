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


