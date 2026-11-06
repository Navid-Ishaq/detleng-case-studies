# Unified analytics API

One Render Python web service handles the CS-003 chatbot and the full, verified 100-tool BigQuery analytics registry. No separate MCP transport is needed or called. The old intent registry is preserved for free-form questions, and AI Tasks pass an exact `tool` name subject to the allow-list.

## Endpoints

- `GET /`: service identity.
- `GET /health`: instant process-level health; does not open BigQuery, OpenAI or MCP connections.
- `GET|POST /warmup`: process-local, single-flight check of required configuration and the 100-tool in-process registry; caches ready state for 120 seconds. This **does not verify live Google/OpenAI connectivity**.
- `POST /chat` and `POST /chat-v2`: `{"message":"Show total revenue","history":[],"tool":"total_revenue"}`. `tool` is optional; old clients can use `message` and `history` only. Responses continue to include `status`, `answer`, and success `source`; failures include a safe `code`.

## Security

The only callable analytics functions are the named entries in `analytics.registry.TOOL_REGISTRY`. Visitors cannot supply SQL. All trusted query templates are validated as single, read-only SELECT/WITH statements before execution. Use a Google service account with **BigQuery Job User** on the project and **BigQuery Data Viewer** only on the permitted dataset. Never give this account dataset editing, admin or write privileges. Avoid logging raw responses, exceptions or credentials. Secrets come from Render environment variables only.

## Reliability

`/health` and `/warmup` make no upstream network calls. BigQuery and OpenAI clients are lazy; OpenAI calls have a 22-second timeout and up to 3 attempts with backoff+jitter on transient errors. BigQuery queries use a 15-second submission timeout, 45-second result timeout and retry only selected transient transport/server errors at most once. The browser checks `/warmup` for up to 95 seconds before submitting the preserved question; it displays elapsed time, a cancel button and a final retry action. An additional chat operation can take up to 65 seconds per attempt. This is deliberately not an external keepalive.

## Local development

From the `backend` directory in PowerShell:

```powershell
py -3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
Copy-Item .env.example .env
# Edit .env locally and use a read-only Google service account; never commit .env.
python -m pytest -q tests
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

Missing live credentials prevent authenticated chat and are intentionally not included in the repository. Local tests use controlled fixtures and SDK stubs when dependencies are not installed. For normal execution install requirements into the virtual environment.
