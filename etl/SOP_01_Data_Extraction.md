Yar ab tum **methodology** se aagay nikal gaye ho.

Ab tum jo maang rahe ho woh hai:

> **SOP (Standard Operating Procedure)**
>
> "Junior Data Engineer ko screen-by-screen kya karna hai?"

Ye DeTLeng ke liye zyada valuable document hai.

Methodology batati hai *kya karna hai*.

SOP batati hai *kaise karna hai*.

Example ke liye Shopify → BigQuery project lete hain.

# Step 1: Data Extraction SOP

## Example Project: Shopify Data Extraction into BigQuery

### Objective

Extract Shopify business data and load it into BigQuery Raw Layer for further processing.

---

# Task 1: Create BigQuery Project

## Step 1.1

Open Google Cloud Console.

Navigate to:

Home → Manage Resources

Click:

Create Project

---

## Step 1.2

Project Configuration

Project Name:

detleng-shopify-analytics

Project ID:

detleng-shopify-analytics

Organization:

Select client organization if available.

Billing Account:

Attach billing account.

Click:

Create

---

## Expected Result

New Google Cloud Project created successfully.

---

# Task 2: Enable Required Services

Navigate:

APIs & Services → Library

Enable:

* BigQuery API
* Cloud Storage API
* Cloud Run API
* Cloud Scheduler API
* Secret Manager API

---

## Expected Result

Required services available for data ingestion.

---

# Task 3: Create BigQuery Dataset

Navigate:

BigQuery Studio

Select Project:

detleng-shopify-analytics

Click:

Create Dataset

Dataset Name:

raw_shopify

Location:

US

Environment:

Production

Click:

Create Dataset

---

## Expected Result

Dataset created:

raw_shopify

Purpose:

Store source data exactly as received from Shopify.

No transformations allowed.

---

# Task 4: Identify Shopify Entities

Navigate:

Shopify Admin

Review required business entities.

For reporting projects collect:

* Orders
* Customers
* Products
* Product Variants
* Transactions
* Refunds
* Fulfillments

Document in:

/documentation/source_inventory.md

---

## Expected Result

Source inventory completed.

---

# Task 5: Create Service Account

Navigate:

IAM & Admin → Service Accounts

Click:

Create Service Account

Name:

shopify-etl-service

Description:

Service account for Shopify extraction workflows.

Grant:

BigQuery Data Editor

BigQuery Job User

Click:

Create

---

## Expected Result

Service Account available for pipeline execution.

---

# Task 6: Store API Credentials

Navigate:

Security → Secret Manager

Create Secret

Name:

shopify_api_token

Paste Shopify API Token.

Save.

---

## Expected Result

Credentials stored securely.

No credentials should exist inside source code.

---

# Task 7: Create Raw Tables

Inside dataset:

raw_shopify

Create destination tables:

orders

customers

products

transactions

refunds

fulfillments

Naming Convention:

raw_shopify.orders

raw_shopify.customers

raw_shopify.products

---

## Expected Result

Raw landing zone prepared.

---

# Task 8: Perform Historical Extraction

Objective:

Load historical Shopify data.

Period:

Last 24 Months

Execution:

Run extraction script.

Source:

Shopify API

Destination:

raw_shopify.orders

raw_shopify.customers

raw_shopify.products

---

## Validation Checklist

Verify:

Orders Loaded

SELECT COUNT(*)
FROM raw_shopify.orders;

Verify:

Customers Loaded

SELECT COUNT(*)
FROM raw_shopify.customers;

Verify:

Products Loaded

SELECT COUNT(*)
FROM raw_shopify.products;

---

## Expected Result

Historical business data available inside BigQuery.

---

# Task 9: Document Source Schema

For each table document:

Table Name

Business Purpose

Primary Key

Refresh Frequency

Owner

Example:

Table:
orders

Primary Key:
order_id

Refresh:
Daily

Owner:
E-Commerce Team

---

## Expected Result

Data dictionary initiated.

---

# Task 10: Configure Incremental Extraction

Incremental Field:

updated_at

Logic:

Load records where:

updated_at > last_successful_run

Schedule:

Every 4 Hours

---

## Expected Result

Future loads only process new or changed records.

---

# Task 11: Configure Automation

Create:

Cloud Run Job

Deploy extraction container.

Create:

Cloud Scheduler Job

Schedule:

Every 4 Hours

Trigger:

Cloud Run Endpoint

---

## Expected Result

Extraction process runs automatically.

---

# Task 12: Configure Monitoring

Create monitoring table:

etl_execution_log

Track:

* Start Time
* End Time
* Status
* Rows Processed
* Error Message

Create alert for:

Failed Execution

---

## Expected Result

Pipeline health visible at all times.

---

# Extraction Complete Criteria

The extraction phase is complete when:

✓ Shopify connected

✓ Historical data loaded

✓ Raw tables populated

✓ Incremental loading configured

✓ Automation active

✓ Monitoring active

✓ Documentation completed

Final Output:

raw_shopify.orders

raw_shopify.customers

raw_shopify.products

raw_shopify.transactions

raw_shopify.refunds

raw_shopify.fulfillments

These datasets are now ready for Step 2: Data Cleaning and Quality Engineering.

**Yahi difference hai:**

* Pehla document = Client-facing methodology.
* Yeh document = Internal DeTLeng Trainee SOP.

Meri recommendation: DeTLeng mein dono rakho.

`Methodology.md` → client ko dikhane ke liye.

`SOP_01_Data_Extraction.md` → junior engineer ko train karne ke liye.
