# DeTLeng Case Studies — unified site + Analytics AI

The **original bright static website** stays at the repository root and is still published with the existing GitHub Pages custom domain (`CNAME`). Case studies 001–003, article pages, evidence assets, common shell and 100 AI Task cards stay at their original URLs. The `backend/` directory is a **single FastAPI Python web service** for Render.

## Architecture

```
GitHub Pages / casestudy.detleng.com
       | HTML + assets + chat-widget.js
       | POST /chat or /chat-v2 (with optional allow-listed tool name)
       v
ONE Render FastAPI: casestudy-ai-backend
       |  local Python function calls
       v
backend/analytics/registry.py -> executor.py -> fixed SQL tools
       |                                   |
       |                            BigQuery read-only service account
       v
OpenAI (text explanation only, using verified tool results)
```

**No second public MCP service, remote SSE or remote MCP session is called**. The older MCP source's verification registry, 100 tool functions, SQL templates, KPI definitions, prompts and knowledge are copied to `backend/analytics/`. FastMCP's HTTP adapter is intentionally not included in the runtime: it is not needed by this website and would increase complexity.

## Frontend cold start

Only after a visitor submits a question does the widget wake `/warmup`. One progress indicator/timer stays visible while automatic retries run for **up to 95 seconds**. The original prompt and optional exact tool name are preserved and then sent to `/chat`. A temporary chatbot HTTP error can be retried once; cancel stops the browser operation, and a Retry button appears if recovery fails. This does not prevent the Render Free instance from sleeping after inactivity: the first call may take roughly one minute. For employer demos, an **always-on paid Render instance** is preferred. No third-party keepalive is required or configured.

## Files added and changed

See [`docs/CHANGE_MANIFEST.md`](docs/CHANGE_MANIFEST.md) for an exact path-by-path manifest. Notable changes: `chat-widget.js`, `ai-tasks.js`, `site.css`, CS-001's favicon link; added `backend/`, `render.yaml`, `.gitignore`, tests and a GitHub Actions verification workflow. No supplied ZIP was modified. All other existing website files and case study assets were retained without redesign.

## Requirements / Render environment

| Variable | Meaning |
|---|---|
| `OPENAI_API_KEY` | Required secret for generated explanations and general questions |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | Required secret containing full Google service-account JSON, **or** use `GOOGLE_APPLICATION_CREDENTIALS` pointing to a secret file |
| `PROJECT_ID` | Existing GCP project; defaults to `detleng-case-studies` |
| `DATASET_ID` | Existing verified dataset; defaults to `cs003_olist_analytics` |
| `LOCATION` | BigQuery job location, default `EU` |
| `OPENAI_MODEL` | Defaults to `gpt-4o-mini` |
| `CORS_ORIGINS` | Comma-separated production and localhost origins, no wildcard |
| `LOG_LEVEL` | Optional, default `INFO` |

See `backend/.env.example`. Do not commit credentials, token files or an `.env`.

## Local PowerShell review and test

```powershell
# From D:\DETLENG2\detleng-case-studies after taking a backup:
# Expand-Archive -Path "D:\Downloads\detleng-case-studies-unified.zip" -DestinationPath "D:\DETLENG2\detleng-case-studies" -Force
cd D:\DETLENG2\detleng-case-studies
py -3.12 -m venv backend\.venv
.\backend\.venv\Scripts\Activate.ps1
python -m pip install -r backend\requirements.txt
$env:PYTHONPATH = (Resolve-Path backend).Path
python -m compileall -q backend
python -m pytest -q backend\tests
node --check chat-widget.js
node --check ai-tasks.js
# Local static website in another terminal:
py -3.12 -m http.server 8001
# Backend in this terminal:
cd backend
Copy-Item .env.example .env
# Fill secrets in .env; do not commit it.
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

The website's configured API address is the **existing production** `https://casestudy-ai-backend.onrender.com` until you explicitly edit `const API` in `chat-widget.js` for local testing. To test localhost safely, temporarily replace that constant with `http://127.0.0.1:8000` in your local working tree only, then restore it before committing. `/health` can be inspected with `Invoke-RestMethod http://127.0.0.1:8000/health`.

## GitHub replacement (only after owner review)

Backup your working directory and verify Git status first. Extract ZIP contents **directly** into `D:\DETLENG2\detleng-case-studies` without adding a parent directory. The ZIP intentionally contains no `.git` directory.

```powershell
cd D:\DETLENG2\detleng-case-studies
git status --short
git diff --stat
git add -A
git diff --cached --stat
git commit -m "Unify CS-003 analytics backend and cold-start recovery"
git push origin main
```

Run those last commands **yourself** only once reviewed; none were performed for this deliverable. If your branch differs, substitute its name. GitHub Pages should keep its existing Pages settings, CNAME and domain.

## Render migration (manual, no changes performed)

1. Keep the existing `casestudy-ai-backend` Render web service and its **same public URL**. Take a snapshot of its current settings and record the currently working commit. Do not create another public MCP-dependent backend.
2. In Render Dashboard → existing backend → **Settings**: set **Root Directory** to `backend`; **Build Command** to `pip install -r requirements.txt`; **Start Command** to `uvicorn main:app --host 0.0.0.0 --port $PORT --workers 1`; **Health Check Path** to `/health`. Select Python, `3.12` and compatible instance plan. `render.yaml` documents the equivalent **one-service** Blueprint; the simplest migration reconfigures the existing service, rather than trying to create an identically named second service.
3. In **Environment**, configure the variables above. Populate `OPENAI_API_KEY` and `GOOGLE_SERVICE_ACCOUNT_JSON` as secrets; use the existing verified project/dataset and `EU` location. Use a **read-only** service account and the correct project/dataset permissions. If credentials are stored in Render Secret Files instead, set `GOOGLE_APPLICATION_CREDENTIALS` to the file's absolute path.
4. After GitHub review/push, confirm the existing Render backend is connected to the unified repository and branch; enable your chosen auto-deploy setting (or deploy manually as an owner). Avoid making the old standalone MCP service a dependency.
5. Check `/health`, `/warmup`, `/chat` and `/chat-v2` on the existing backend URL; verify all 100 tasks and CS-003 architecture questions with real credentials. Test the browser after Render Free has been inactive long enough to sleep. Only when the unified service is verified should you suspend or delete the old `detleng-bigquery-mcp` service.

**Important:** Render Free sleeps after inactivity, and a normal first wake can take approximately 60–90 seconds. This implementation retries the wake automatically without manual redeploy. A paid always-on Render instance is strongly recommended for professional demonstration reliability. It is not possible to guarantee success if Render is down or the configured credentials/BigQuery/OpenAI are unavailable.

## Rollback

1. Keep the old backend/MCP services unchanged until migration validation finishes.
2. If the unified backend fails, restore the previously recorded backend Git commit, Root Directory, Build/Start commands, environment settings and deploy that prior revision from Render Dashboard. Re-enable the prior MCP service if it was paused.
3. For the static website, revert the relevant commit with `git revert <commit>` and push the revert. Check CNAME and cached pages. Do not delete snapshots or old credentials before verifying rollback.

## Production cold-start checklist

- [ ] Render shows **one active production Python backend** and no backend-to-MCP HTTP call.
- [ ] `GET /health` returns HTTP 200 without opening database/LLM sessions.
- [ ] `GET /warmup` returns `ready`; if `unavailable`, check secrets without publishing their values.
- [ ] Wait for Render Free to sleep; submit exactly one AI Task question and observe the timer through cold start.
- [ ] Original question is answered automatically; no repeated visitor clicks and no repeated busy chat messages.
- [ ] Try two browser tabs simultaneously; no session storm or duplicate submission in a tab.
- [ ] Verify one known revenue KPI and one other tool directly against current BigQuery totals.
- [ ] Test unknown tool, free-form CS-003 context, `/chat-v2`, cancellation, final Retry button, and malformed SQL requests.
- [ ] Check AI Tasks with panel open at 1440/1280/1024; check overlay and no overflow at 768/390.
- [ ] Verify Pages custom domain, all CS-001/002/003 pages, Automation Desk links, articles, diagrams and markdown answers.
- [ ] Confirm CORS on production origin, and rejection of untrusted external origins.
- [ ] Check Render logs for request IDs and ensure no credentials appear.

## What remains unverified

Offline tests verify local routing and mocked analytics. This delivery **cannot verify live BigQuery values, OpenAI output, Render configuration/cold starts, external links or browser calls to Render**, because credentials and operational access were not supplied. Browser layout was tested locally in headless Chromium using inline page assets; test results are not a substitute for live device testing. The existing natural-language heuristic router is preserved and may require additional phrase-specific tuning; exact AI Task card calls do not depend on that heuristic.
