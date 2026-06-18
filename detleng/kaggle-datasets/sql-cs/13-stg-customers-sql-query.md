Janab, agar aap **same `CREATE OR REPLACE TABLE` query** dobara run karenge to koi masla nahi hoga.

BigQuery:

```sql
CREATE OR REPLACE TABLE
```

ka matlab hota hai:

```text
Agar table exist karti hai
→ purani table delete karo
→ nayi table create karo

Agar table exist nahi karti
→ seedha create karo
```

Yani:

```text
stg_customers
```

ko 100 baar bhi run kar dein, table overwrite hoti rahegi.

---

# stg_customers Query

```sql
CREATE OR REPLACE TABLE
`detleng-case-studies.cs003_olist_stg.stg_customers`
AS

SELECT

    customer_id,

    customer_unique_id,

    UPPER(TRIM(customer_city))
        AS customer_city,

    UPPER(TRIM(customer_state))
        AS customer_state,

    CURRENT_TIMESTAMP()
        AS etl_load_timestamp

FROM
`detleng-case-studies.cs003_olist_raw.cs003_olist_raw_customers`;
```

---

# Is Query Mein Hum Ne Kya Kiya?

### Raw

```text
sao paulo
 Sao Paulo
SAO PAULO
```

---

### Staging

```text
SAO PAULO
```

---

### Data Quality Improvements

✅ Removed leading spaces

```sql
TRIM()
```

---

✅ Standardized city names

```sql
UPPER()
```

---

✅ Added ETL audit column

```sql
etl_load_timestamp
```

---

# Validation Query

Run karke verify kar lo:

```sql
SELECT *
FROM `detleng-case-studies.cs003_olist_stg.stg_customers`
LIMIT 20;
```

---

# Expected Columns

| Column             | Purpose           |
| ------------------ | ----------------- |
| customer_id        | Business Key      |
| customer_unique_id | Customer Identity |
| customer_city      | Standardized City |
| customer_state     | State Code        |
| etl_load_timestamp | ETL Audit Trail   |

---

# Enterprise Enhancement (Recommended)

Agar DeTLeng style mein aur professional banana hai to next version mein ye bhi add kar sakte hain:

```sql
customer_city_clean
customer_state_name
customer_region
```

Example:

```text
SP → Southeast
RJ → Southeast
PR → South
```

Ye Analytics Layer mein bahut kaam aayega.

Filhaal current `stg_customers` bilkul theek hai aur production-quality staging table count hoti hai. Ab next logical step:

```text
stg_orders   ⭐⭐⭐⭐⭐
```

hai, kyun ke saari business intelligence wahi se niklegi.
