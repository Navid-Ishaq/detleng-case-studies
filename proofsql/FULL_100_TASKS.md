# DeTLeng ProofSQL — All 100 Analytics Tasks (staged rollout)

## Aim

Every existing CS-003 AI Task should offer a **genuine, on-demand, browser-executed SQL verification** against a static, approved dataset snapshot. No additional BigQuery or OpenAI request happens when the visitor clicks Verify.

## What is built in this package

- **100/100** fixed BigQuery analytics tools captured from the existing Python tool registry; independent DuckDB-compatible SQL statements under `queries/full-v2/*.sql`.
- **100/100** matching response field mappings in `engine/full-registry.js`; allowlisted snapshot tables, original Python source and privacy-sensitive ID omissions included.
- Additive, sanitized structured data in the FastAPI `/chat` response for all approved tools, in addition to the existing AI answer. Internal order, customer, seller and product identifiers are **not** sent in the new comparison payload.
- The existing `pilot-1` verifier remains functional until **full-v2** nine-table data is published. When the complete `full-v2` manifest is present, the full verifier takes priority.
- Browser DuckDB-Wasm fetches **only the tables required by the clicked task**, verifies SHA-256 hashes and executes approved, read-only SQL.
- Numeric and public categorical comparison by **row** without trusting AI prose. For results containing hidden identifiers, display **PARTIAL MATCH** rather than falsely verifying the identity-to-value mapping. Never return MATCH when a table, field, SQL execution or snapshot is missing.
- Popup shows original answer, actual numeric evidence, match/mismatch status, original SQL query, version and data provenance.

## Essential dependency — not in this ZIP

**The nine full-v2 CSV snapshots are NOT included in this package.** They are on the owner's PC under `D:\DeTLeng-Private-Exports`, not accessible to ChatGPT. The current public ZIP contains only the original four compact `pilot-1` files. Until the additional 9-table snapshot is created and approved, new tasks correctly show **NOT VERIFIABLE**, and the already-live 5-KPI pilot stays fully operational.

The source dataset has 10 processed tables, but **`dim_geography` is not referenced by the existing 100 SQL tools** and is excluded. The full verifier needs: `dim_customers`, `dim_dates`, `dim_products`, `dim_sellers`, `fact_orders`, `fact_sales`, `fact_delivery`, `fact_payments`, `fact_reviews`.

Crucial: The original `pilot-1` compact snapshots were generated using a one-off HMAC key. You cannot simply add five more sanitized tables using a different key; order/customer/product/seller joins would fail. **Regenerate all nine** with the same new private HMAC key using the supplied script. Do not touch the original `pilot-1` folder.

## On the owner's Windows PC — private preparation

From PowerShell in `D:\DETLENG2\detleng-case-studies`:

```powershell
$python = "D:\DETLENG2\detleng-case-studies\backend\.venv\Scripts\python.exe"
& $python "proofsql\tools\prepare_full_snapshot.py"
& $python "proofsql\tools\audit_full_snapshot.py"
```

Expected terminal messages: `FULL SNAPSHOT CREATED LOCALLY` and `NINE-TABLE CHECKSUMS, JOIN KEYS AND FIVE KPI BASELINES PASS`.

**Privacy/licensing review and explicit owner approval required before publication**: although Olist is publicly available and the IDs are pseudonymized with a private HMAC key, row-level customer location and purchasing/payment/review data may remain linkable. Recheck CC BY-NC-SA 4.0 terms and that the actual site use qualifies as non-commercial. Review all generated headers and file sizes. If you cannot approve public republication, **do not push the CSVs**; use aggregated public-safe alternatives instead, which require adapting the affected SQL definitions.

After reviewing and approving release, copy ALL approved `*.csv`, `manifest.json` and attribution `README.md` to `proofsql/data/public/full-v2/`. Verify SHA-256 matches the manifest *after copying*. The `.gitattributes` rule prevents line-ending conversion on GitHub and Windows. Do not publish the HMAC secret, raw exports, or private staging folder.

## Integration and validation

1. Install the expanded source code into the existing local repository preserving `.git` and all local secrets.
2. Run `python -m pytest -q backend/tests` and `node --test proofsql/tests/*.test.mjs`. Unit tests cover 100 tool registry entries, read-only SQL, metadata filtering, and comparison rules. The generated 100 SQL queries have been executed against an offline synthetic SQLite schema, with no syntax/unmapped-column errors. This is **not** a real full dataset execution test.
3. Prepare and locally audit the nine-table snapshot.
4. Confirm the full snapshot's files are under GitHub's file-size limits; consider Parquet when performance/memory become problems.
5. Review staged files, then commit and `git push origin main`. No force push. Render will update the backend and GitHub Pages will publish the static files.
6. Live-test one scalar per area, a temporal trend, a category ranking, an ID-suppressed ranking and a composite dashboard. Do not declare all 100 production-verified until each is observed against actual published snapshots.
7. Browser tests: desktop, mobile, network failure, retry, snapshot checksum fail, exact/decimal comparisons, static/live divergence and slow device memory.

**No guarantee of zero hosting/bandwidth or unlimited browser RAM.** Only SQL verification is browser-only. Existing ChatGPT/OpenAI/BigQuery-backed answers remain unchanged.

## Definitions and limitations

- `MATCH`: all displayed structured numeric KPI values and allowed dimension keys compared successfully for the selected tool.
- `PARTIAL MATCH`: numeric values match but private identifiers are deliberately hidden, so entity identity-to-value associations were **not** verified.
- `MISMATCH`: compared rows, grouping labels or numerical values differ beyond tolerance.
- `NOT VERIFIABLE`: missing/invalid data, missing source fields, error, zero numeric evidence, or unverifiable snapshot.
- Counts are exact; other decimal KPI values use ±0.005 tolerance. Multirow results are aligned by public dimensions and numeric values to avoid incidental query ordering differences. Tied top-N rankings may still be ambiguous; interpret with care.
- The snapshot is **static**, not a claim about current BigQuery rows. A match is not an AI prose factuality guarantee, nor a proof that the KPI's SQL business definition is right.

## Original milestone preserved

The current five-KPI pilot successfully matched **Total Revenue 15,843,553.24**, **Total Orders 99,441**, **Total Products 32,951**, **AOV 160.58** and **On-Time Delivery 89.15%**. Those results must continue to work after all later changes.
