# DeTLeng ProofSQL — Independent Browser SQL Verification (pilot-1)

**Aim:** Let visitors reproduce approved CS-003 KPI calculations independently in their browser from a static, integrity-checked snapshot. The existing FastAPI/BigQuery/OpenAI chatbot remains responsible for the original live answer.

**The verifier is an additional evidence layer, not a correctness certificate for the AI's prose.** It does not execute visitor-provided SQL or contact BigQuery on the Verify click.

## How it works

1. A visitor selects one of the existing 100 AI Tasks (no auto-submit).
2. The unchanged chatbot sends `/chat` with `message`, `history`, and the approved `tool` name.
3. The existing BI tool queries the **live BigQuery analytics layer**, then OpenAI explains it.
4. The response still includes `status`, `source`, and `answer`, but for supported tools it also includes a small **optional structured** `verification` object containing allowlisted numeric metrics, tool and UTC query time.
5. The chatbot renders the original explanation without changing it. For supported successful answers, it adds **Verify with SQL** under that specific answer.
6. A responsive accessible popup opens automatically showing the task/card number (if known), the exact original answer and a progress indicator.
7. On demand, **DuckDB-Wasm 1.30.0** loads in the visitor's browser. Only the CSVs needed by that tool are fetched from the existing GitHub Pages origin. Files are SHA-256 verified against `manifest.json`; changed files are rejected.
8. An approved, read-only SQL statement under `proofsql/queries/` executes against local CSV views and returns numeric KPIs. **No additional BigQuery, OpenAI or Render request** is used for the verification itself.
9. The JavaScript comparator shows the live structured value, independent browser-SQL value, difference and MATCH / MISMATCH / NOT VERIFIABLE for each supported KPI, with provenance and limitations.

### Currently supported tools

| Tool | What ProofSQL checks | Scope |
| --- | --- | --- |
| `total_revenue` | Total revenue | Complete one-KPI answer |
| `total_orders` | All orders from `fact_orders` | Complete one-KPI answer |
| `total_products`, `product_count` | Total products | Complete one-KPI answer |
| `average_order_value` | Revenue per sale-bearing order | Complete one-KPI answer |
| `delivery_success_rate` | On-time percentage | Complete one-KPI answer |
| `on_time_deliveries` | On-time delivery count | Complete one-KPI answer |
| `executive_dashboard` | Revenue, orders, products, on-time rate | **Partial:** 4 of 9 KPIs only |
| `business_summary` | Revenue, orders, products | **Partial:** 3 of 5 KPIs only |
| `sales_summary` | Revenue, sale-bearing orders, AOV | **Partial:** 3 of 6 KPIs only |
| `delivery_summary` | Delivery order count, on-time count and rate | **Partial:** 3 of 6 KPIs only |

Other tasks **do not** get a Verify button. New tools must be explicitly added to both the backend allowlist and the query registry, with matching `.sql` and tests. Never present unknown tasks as verified.

**Crucial definition:** `total_orders` counts **99,441** rows in `fact_orders`. The `sales_summary.total_orders` KPI counts **98,666** distinct order IDs in `fact_sales`. These answer different business questions. ProofSQL intentionally mirrors each underlying SQL definition.

## Pilot snapshot

- Source: processed `detleng-case-studies.cs003_olist_analytics`, exported 2026-11-06 from the public Brazilian Olist E-Commerce Dataset.
- Folder: `proofsql/data/public/pilot/`.
- Files: `fact_sales.csv`, `fact_orders.csv`, `fact_delivery.csv`, `dim_products.csv`.
- Contents: only KPI-required columns, with HMAC-pseudonymized IDs. The secret HMAC key **is not present**.
- Published snapshot is static, not continually synchronized to live BigQuery.
- `manifest.json` contains SHA-256 of the **actual GitHub-served LF byte sequence**. Original export checksums were different due to Windows CRLF → Git LF normalization; repaired in this deliverable. `.gitattributes` prevents future automatic line-ending conversions.
- Olist attribution / redistribution conditions: see `data/public/pilot/README.md` (CC BY-NC-SA 4.0).
- These public snapshots are pseudonymized **but not guaranteed anonymous**. Do not add raw/staging data or customer-level private fields.

## Exact KPI validation values for the existing snapshot

| KPI | Expected value |
| --- | ---: |
| Total revenue | 15,843,553.24 BRL |
| Total orders (`fact_orders`) | 99,441 |
| Total products | 32,951 |
| Average order value | 160.58 BRL |
| On-time delivery rate | 89.15% |
| Orders with sale items (`fact_sales`) | 98,666 |

Comparison tolerance: integer counts **exact**; two-decimal monetary amounts and percentages **±0.005**. Differences may also reflect live BigQuery data changes, not hallucination. Matching SQL does not prove the original KPI is correctly defined; matching numbers do not validate subjective insights.

## Folder map

```text
proofsql/
  README.md
  package.json
  data/public/pilot/      # public, integrity-checked reduced CSVs + manifest
  queries/*.sql           # approved DuckDB query definitions, with Python sources
  engine/
    query-registry.js     # strict tool→SQL/table/KPI allowlist
    duckdb-loader.js      # pinned Wasm runtime, CSV downloads and SHA-256 checks
    kpi-comparator.js     # numeric comparison and tolerances
    proofsql-verifier.js  # lazy-loaded accessible modal
  ui/proofsql.css
  tests/pilot.test.mjs
backend/proofsql_metadata.py         # optional structured BigQuery KPI metadata only
```

## Run local tests

From repository root (Python environment with `backend/requirements.txt`):

```powershell
$env:PYTHONPATH="backend"
python -m pytest -q backend/tests
node --test proofsql/tests/*.test.mjs
node --check chat-widget.js
node --check ai-tasks.js
```

On GitHub Actions, `verify.yml` runs the Python and JS tests. For a local browser preview **serve** the root with an HTTP server (opening `file:///.../ai-tasks.html` directly does not work with fetch/ES modules):

```powershell
python -m http.server 8001
# Then open http://localhost:8001/ai-tasks.html
```

The original chatbot will still contact the existing Render endpoint when you submit an actual task. DuckDB-Wasm assets are loaded **only after clicking Verify** and fetched from pinned jsDelivr version 1.30.0; a network connection to that CDN is required for the first verification. On mobile, some devices may have low memory for the larger snapshots. The UI reports errors as NOT VERIFIABLE, never MATCH.

## Deployment and rollout

1. Preserve the existing local Git repository (`.git`); **do not replace it with the downloaded GitHub ZIP's root**.
2. Copy this updated repository's contents into the existing working tree, preserving `.git` and not copying local secrets.
3. Run tests and inspect `git status` / staged changes. Only intentional files should change.
4. Commit and push to `main` using normal `git push origin main` — never force push.
5. GitHub Pages publishes the static ProofSQL JS/CSS/SQL/manifest. Render must separately finish the GitHub-triggered backend redeploy to expose `verification` in `/chat` responses; old backend instances will still answer normally but without the new button.
6. Open `/ai-tasks.html`, choose `Total Revenue` (task #15), submit. Click Verify under the returned answer. Confirm MATCH and snapshot metadata. Then check `Total Orders` (#14), `Average Order Value` (#8), `Total Products` (#12), `Delivery Success Rate` and partial `Executive Dashboard` (#1). Test mobile viewport.
7. If CDN/CSV loading fails, show NOT VERIFIABLE and investigate (do **not** roll back the working chatbot).

### Limitations and next stages

This version is a 5-core-KPI pilot, **not 100-task coverage**. Every underlying SQL query shown in the modal runs against the static snapshot; browser and live BigQuery may diverge if data changes. Browser results are independent executions of equivalent **business formulas**, not independent verification of the source data's accuracy. Implementing all 100 requires a per-tool source-column and privacy audit, additional snapshots, SQL porting, coverage and mobile performance tests. There is no visitor SQL editor.

The hosted version avoids a new Render service or verification-time BigQuery/OpenAI fees, but GitHub Pages traffic, browser CPU and CDN requests consume resources and are subject to provider limits.
