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





