# CS-003 Enterprise Data Model & Entity Relationship Architecture

## Designing the Foundational Data Structure for ETL, Analytics, Business Intelligence, and Decision-Making

---

# Step 1 — Identify Primary Keys

Sab se pehle har table ki primary key likho.

| Table                | Primary Key                 |
| -------------------- | --------------------------- |
| customers            | customer_id                 |
| orders               | order_id                    |
| order_items          | order_id + order_item_id    |
| products             | product_id                  |
| sellers              | seller_id                   |
| payments             | order_id                    |
| reviews              | review_id                   |
| geolocation          | geolocation_zip_code_prefix |
| category_translation | product_category_name       |

---

# Step 2 — Identify Foreign Keys

Ab dekho kaun si table kis table ko reference kar rahi hai.

## Customers → Orders

```text
customers.customer_id
        |
        |
orders.customer_id
```

Relationship:

```text
1 Customer
      ↓
Many Orders
```

---

## Orders → Order Items

```text
orders.order_id
      |
      |
order_items.order_id
```

Relationship:

```text
1 Order
      ↓
Many Order Items
```

---

## Products → Order Items

```text
products.product_id
      |
      |
order_items.product_id
```

Relationship:

```text
1 Product
      ↓
Many Order Items
```

---

## Sellers → Order Items

```text
sellers.seller_id
      |
      |
order_items.seller_id
```

Relationship:

```text
1 Seller
      ↓
Many Order Items
```

---

## Orders → Payments

```text
orders.order_id
      |
      |
payments.order_id
```

Relationship:

```text
1 Order
      ↓
Many Payments
```

(Olist mein kuch orders multiple payments rakh sakte hain)

---

## Orders → Reviews

```text
orders.order_id
      |
      |
reviews.order_id
```

Relationship:

```text
1 Order
      ↓
1 Review
```

(Practically mostly 1-to-1)

---

## Products → Category Translation

```text
products.product_category_name
            |
            |
category_translation.product_category_name
```

Relationship:

```text
Many Products
      ↓
One Category Name
```

---

# Step 3 — First Official ERD

Ye DeTLeng CS-003 ka pehla official ERD hoga:

```text
CUSTOMERS
(customer_id)
      |
      |
      ▼
ORDERS
(order_id)
      |
      |
      ▼
ORDER_ITEMS
(order_id, order_item_id)
      |
      +------------------+
      |                  |
      ▼                  ▼
PRODUCTS             SELLERS
(product_id)         (seller_id)
      |
      ▼
CATEGORY_TRANSLATION


ORDERS
   |
   +---------> PAYMENTS
   |
   +---------> REVIEWS
```

---

# Step 4 — Professional Documentation

Aap ki next file:

```text
09-erd-data-model.md
```

Structure:

```markdown
# CS-003 Entity Relationship Diagram (ERD)

## Purpose

The purpose of this ERD is to formally document the relationships
between customers, orders, products, sellers, payments,
reviews, and supporting reference tables.

---

## Core Business Flow

Customer
→ Order
→ Order Item
→ Product
→ Seller

---

## Relationship Matrix

| Parent Table | Child Table | Relationship |
|-------------|-------------|-------------|
| customers | orders | 1:M |
| orders | order_items | 1:M |
| products | order_items | 1:M |
| sellers | order_items | 1:M |
| orders | payments | 1:M |
| orders | reviews | 1:1 |
| category_translation | products | 1:M |

---

## Business Interpretation

The Olist marketplace follows a transactional e-commerce model
where customers place orders, orders contain multiple products,
products are fulfilled by sellers, payments record financial
transactions, and reviews capture customer satisfaction.
```

---

# Step 5 — What Comes After ERD?

ERD complete hote hi:

```text
RAW LAYER
    ↓
STAGING LAYER
    ↓
ANALYTICS LAYER
```

design karenge.

Yani:

```text
cs003_olist_raw      ✅ Completed

cs003_olist_stg      🎯 Next

cs003_olist_analytics
```

---

