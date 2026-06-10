## Data Warehouse Setup and Data Ingestion

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









## Data Warehouse Setup and Data Ingestion

After reviewing the source files, the next objective was to establish a cloud-based data warehouse environment using Google BigQuery.

The solution architecture was designed to separate raw data, transformation logic, and reporting datasets into clearly defined layers.

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
Power BI / Looker Studio
```

### BigQuery Environment Configuration

A dedicated dataset was created within Google BigQuery to host all retail data assets.

```text
Dataset Name:
detleng_retail
```

The dataset served as the central repository for raw data ingestion, SQL transformations, validation processes, and analytics-ready datasets.

### Source File Preparation

The Online Retail II workbook contained two separate worksheets representing different reporting periods.

```text
Year 2009–2010
Year 2010–2011
```

To support BigQuery ingestion, both worksheets were exported to CSV format.

```text
retail_2009_2010.csv
retail_2010_2011.csv
```

This conversion step ensured compatibility with BigQuery's data loading process.

### Raw Data Layer

Two raw tables were created within the dataset:

```text
retail_raw_2009_2010
retail_raw_2010_2011
```

These tables preserved the original source records and acted as the foundation of the data warehouse architecture.

The raw layer was intentionally designed to retain source-level information before applying any business transformations.

### Handling Source Data Types

During the initial import process, a data type issue was identified with the transaction date field.

The source files stored dates in the following format:

```text
DD/MM/YYYY HH:MM
```

Example:

```text
13/12/2009 09:58
```

BigQuery attempted to interpret these values as native timestamps, resulting in import failures.

To preserve source integrity and simplify the ETL process, the `InvoiceDate` field was initially loaded as a string.

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

This approach allowed date standardization to be handled later within the transformation layer using SQL.

### Record Validation

After both CSV files were successfully loaded, record counts were validated to confirm data completeness.

```text
2009–2010 Dataset: 525K+ Records
2010–2011 Dataset: 541K+ Records
```

The validation confirmed that all source records had been successfully imported into BigQuery without loss.

### Creating the Staging Layer

Once the raw layer had been validated, both datasets were consolidated into a single staging table.

This process replicated the append operation commonly performed in Power Query, but executed directly within BigQuery using SQL.

```sql
CREATE OR REPLACE TABLE
detleng_retail.retail_staging AS

SELECT *
FROM detleng_retail.retail_raw_2009_2010

UNION ALL

SELECT *
FROM detleng_retail.retail_raw_2010_2011;
```

The resulting staging table became the primary transformation layer for subsequent data quality checks, KPI calculations, and analytics development.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/d3600fff-7751-45ff-8104-b041b9fd6cc6" />

The successful creation of the staging table confirmed that both source datasets had been consolidated into a unified analytical structure.

### Outcome

At the completion of this phase, the project had established:

* A centralized BigQuery dataset
* A raw data layer
* Source data validation procedures
* A consolidated staging table
* A scalable foundation for downstream analytics

This completed the data ingestion and warehouse setup phase of the project and prepared the dataset for transformation, validation, and KPI development.

