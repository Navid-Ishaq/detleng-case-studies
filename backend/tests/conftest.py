"""Offline mocks only when the optional runtime SDKs are absent in the test machine."""
import importlib.util
import sys
import types

try:
    import openai as _openai
except ImportError:
    _openai = None
if _openai is None or not hasattr(_openai, 'OpenAI'):
    m=types.ModuleType('openai')
    for name in ('APIConnectionError','APITimeoutError','RateLimitError'):
        setattr(m,name,type(name,(Exception,),{}))
    m.OpenAI=lambda **kwargs: None
    sys.modules['openai']=m
try:
    from google.cloud import bigquery
except ImportError:
    google=types.ModuleType('google');google.__path__=[]
    cloud=types.ModuleType('google.cloud');cloud.__path__=[]
    bq=types.ModuleType('google.cloud.bigquery')
    class JobConfig:
        def __init__(self,**kw): self.labels={}
    bq.QueryJobConfig=JobConfig
    bq.Client=lambda **kw: None
    oauth=types.ModuleType('google.oauth2');oauth.__path__=[]
    sa=types.ModuleType('google.oauth2.service_account')
    class Creds:
        @staticmethod
        def from_service_account_info(v):return v
        @staticmethod
        def from_service_account_file(v):return v
    sa.Credentials=Creds
    google.cloud=cloud;cloud.bigquery=bq;google.oauth2=oauth;oauth.service_account=sa
    sys.modules.update({'google':google,'google.cloud':cloud,'google.cloud.bigquery':bq,'google.oauth2':oauth,'google.oauth2.service_account':sa})
