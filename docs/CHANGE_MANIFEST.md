# Exact unified repository change manifest

## Changed existing website files

- `README.md`
- `chat-widget.js`
- `ai-tasks.js`
- `site.css`
- `01-retail-sales-performance-dashboard/cs-001.html`

## Added paths

- `.github/workflows/verify.yml`
- `.gitignore`
- `backend/.env.example`
- `backend/README.md`
- `backend/analytics/__init__.py`
- `backend/analytics/bigquery_client.py`
- `backend/analytics/config.py`
- `backend/analytics/executor.py`
- `backend/analytics/knowledge/01_BUSINESS_MODEL.md`
- `backend/analytics/knowledge/02_RELATIONSHIPS.md`
- `backend/analytics/knowledge/03_TABLE_GRAIN.md`
- `backend/analytics/knowledge/04_KPI_DICTIONARY.md`
- `backend/analytics/knowledge/05_NEW_TOOLS.md`
- `backend/analytics/knowledge/06_QUERY_SAFETY_RULES.md`
- `backend/analytics/knowledge/cs003_olist_analytics_schema.pdf`
- `backend/analytics/prompts/system_prompt.md`
- `backend/analytics/registry.py`
- `backend/analytics/tools/__init__.py`
- `backend/analytics/tools/common.py`
- `backend/analytics/tools/customer_tools.py`
- `backend/analytics/tools/delivery_tools.py`
- `backend/analytics/tools/executive_tools.py`
- `backend/analytics/tools/geography_tools.py`
- `backend/analytics/tools/order_tools.py`
- `backend/analytics/tools/payment_tools.py`
- `backend/analytics/tools/product_tools.py`
- `backend/analytics/tools/revenue_tools.py`
- `backend/analytics/tools/review_tools.py`
- `backend/analytics/tools/sales_tools.py`
- `backend/analytics/tools/seller_tools.py`
- `backend/analytics/tools/time_tools.py`
- `backend/executor.py`
- `backend/knowledge/detleng_knowledge.txt`
- `backend/main.py`
- `backend/registry.py`
- `backend/requirements.txt`
- `backend/tests/conftest.py`
- `backend/tests/test_unified.py`
- `render.yaml`

- `docs/CHANGE_MANIFEST.md`

## Moved/copied from original projects

- `casestudy-ai-backend-main/registry.py` → `backend/registry.py` (unchanged intent and keyword routing).
- `casestudy-ai-backend-main/knowledge/` → `backend/knowledge/`.
- `detleng-bigquery-mcp-main/{registry.py,executor.py,bigquery_client.py,config.py}` → `backend/analytics/` (updated imports, read-only guard, timeouts).
- `detleng-bigquery-mcp-main/{tools/,knowledge/,prompts/}` → `backend/analytics/` (tools retain their KPI SQL and names; updated package imports).
- Original FastAPI `main.py` reimplemented as `backend/main.py`, preserving `/chat`, `/chat-v2` response convention, CS-003 knowledge prompts, and the router.

## Deliberately omitted legacy runtime files

- `casestudy-ai-backend-main/mcp_client.py`: eliminated network MCP hop.
- `detleng-bigquery-mcp-main/server.py`: no second public MCP web service.
- Repository-local compiled Python bytecode, virtual environments and secrets are excluded.

## Preserved

- All other files from the original website ZIP, including all case-study assets and CNAME, are preserved.
- No website project file was removed.
