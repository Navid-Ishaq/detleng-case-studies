import concurrent.futures
import re
import time
from pathlib import Path
from types import SimpleNamespace
import pytest
from fastapi.testclient import TestClient
import main
from analytics.registry import TOOL_REGISTRY
from analytics.bigquery_client import validate_readonly_sql
from analytics.tools import revenue_tools

client=TestClient(main.app)
ROOT=Path(__file__).resolve().parents[2]

def test_health_does_not_initialize(monkeypatch):
    monkeypatch.setattr(main,'openai_client',lambda: (_ for _ in ()).throw(AssertionError('OpenAI initialized')))
    monkeypatch.setattr(main,'execute_tool',lambda *a: (_ for _ in ()).throw(AssertionError('BigQuery initialized')))
    t=time.monotonic()
    assert client.get('/health').json()=={'status':'ready'}
    assert time.monotonic()-t < 1

def test_concurrent_warmup_single_flight(monkeypatch):
    monkeypatch.setenv('OPENAI_API_KEY','dummy')
    monkeypatch.setenv('GOOGLE_SERVICE_ACCOUNT_JSON','{}')
    main._warm_ok=0
    calls=[]
    original=main.config_status
    def slow():calls.append(1);time.sleep(.12);return []
    monkeypatch.setattr(main,'config_status',slow)
    with concurrent.futures.ThreadPoolExecutor(max_workers=12) as executor:
        result=list(executor.map(lambda _: client.get('/warmup').json()['status'],range(12)))
    assert calls==[1]
    assert set(result)<= {'ready','warming'}
    assert 'ready' in result
    assert client.get('/warmup').json()['status']=='ready'

def test_configuration_unavailable_no_secrets(monkeypatch):
    monkeypatch.delenv('OPENAI_API_KEY',raising=False)
    monkeypatch.delenv('GOOGLE_SERVICE_ACCOUNT_JSON',raising=False)
    main._warm_ok=0
    text=str(client.get('/warmup').json())
    assert 'unavailable' in text and 'PRIVATE KEY' not in text

def test_task_registry_100_exact_matches():
    script=(ROOT/'ai-tasks.js').read_text()
    pairs=script.split('const CATEGORIES = {',1)[1].split('};',1)[0]
    tools=re.findall(r'"([a-z_]+)"',pairs)
    assert len(tools)==len(set(tools))==100
    assert set(tools)==set(TOOL_REGISTRY)
    from registry import TOOL_ROUTES
    assert len(TOOL_ROUTES)==len(set(r.tool_name for r in TOOL_ROUTES))==100
    assert {r.tool_name for r in TOOL_ROUTES}==set(tools)

def test_kpi_fixture(monkeypatch):
    monkeypatch.setattr(revenue_tools,'execute_query',lambda sql:[SimpleNamespace(total_revenue=102.55)])
    assert revenue_tools.get_total_revenue()=={'total_revenue':102.55}

def test_arbitrary_sql_blocked():
    for sql in ('DROP TABLE x','SELECT 1; DELETE FROM x','WITH c AS (SELECT 1) INSERT INTO x SELECT * FROM c','SELECT * FROM t; SELECT * FROM x'):
        with pytest.raises(ValueError):validate_readonly_sql(sql)
    validate_readonly_sql('WITH counts AS (SELECT 1 AS n) SELECT n FROM counts')

def test_invalid_task_does_not_execute(monkeypatch):
    monkeypatch.setattr(main,'config_status',lambda:[])
    monkeypatch.setattr(main,'execute_tool',lambda *args: (_ for _ in ()).throw(AssertionError('Should not execute')))
    data=client.post('/chat',json={'message':'DROP TABLE fact_sales','tool':'sql'}).json()
    assert data['code']=='invalid_analytics_task'

def test_explicit_valid_tool_and_legacy_chat_v2(monkeypatch):
    monkeypatch.setattr(main,'config_status',lambda:[])
    called=[]
    monkeypatch.setattr(main,'execute_tool',lambda name,args: called.append(name) or {'total_revenue':100})
    monkeypatch.setattr(main,'llm',lambda msg:'Total revenue is 100.')
    for endpoint in ('/chat','/chat-v2'):
        data=client.post(endpoint,json={'message':'Show verified revenue','tool':'total_revenue'}).json()
        assert data['status']=='success' and data['answer']=='Total revenue is 100.'
    assert called==['total_revenue','total_revenue']

def test_bigquery_errors_are_sanitized(monkeypatch):
    monkeypatch.setattr(main,'config_status',lambda:[])
    monkeypatch.setattr(main,'execute_tool',lambda *args: (_ for _ in ()).throw(RuntimeError('private_key=SUPER_SECRET')))
    result=client.post('/chat',json={'message':'Show revenue','tool':'total_revenue'}).json()
    assert result['code']=='bigquery_error' and 'SUPER_SECRET' not in str(result)

def test_openai_retries_bounded(monkeypatch):
    attempts=[]
    class Transient(Exception): pass
    monkeypatch.setattr(main,'RateLimitError',Transient)
    def throw(**kw):
        attempts.append(1)
        raise main.RateLimitError('rate limited')
    c=SimpleNamespace(chat=SimpleNamespace(completions=SimpleNamespace(create=throw)))
    monkeypatch.setattr(main,'openai_client',lambda:c)
    monkeypatch.setattr(main.time,'sleep',lambda _:None)
    with pytest.raises(main.RateLimitError):main.llm([{'role':'user','content':'hello'}])
    assert len(attempts)==3

def test_frontend_contract_and_paths():
    js=(ROOT/'chat-widget.js').read_text()
    assert 'const COLD_START_MS = 95000' in js
    assert 'const question = input.value.trim(); if (!question || activeController) return;' in js
    assert 'await wake(controller.signal, started)' in js
    assert 'message:question,history,tool' in js
    assert 'controller.abort()' in js
    assert 'Retry original question' in js
    assert 'window.detlengAnalyticsAI.prefill(promptFor(button.dataset.tool), button.dataset.tool,' in (ROOT/'ai-tasks.js').read_text()
    for page in ('index.html','case-studies.html','articles.html','ai-tasks.html','cs/002.html','cs/003.html'):
        assert (ROOT/page).is_file()
    assert (ROOT/'CNAME').read_text().strip()
