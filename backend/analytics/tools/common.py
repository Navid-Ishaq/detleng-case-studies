"""
=========================================================
Common Business Intelligence Tool Helpers
=========================================================
"""

from decimal import Decimal

from ..bigquery_client import BigQueryClient
import threading
from ..config import DATASET_ID, PROJECT_ID


_bq = None
_bq_lock = threading.Lock()


def get_bigquery_client() -> BigQueryClient:

    global _bq

    if _bq is None:
        with _bq_lock:
            if _bq is None:
                _bq = BigQueryClient()

    return _bq


def execute_query(sql: str):

    return get_bigquery_client().execute_query(sql)


def table(table_name: str) -> str:

    return f"`{PROJECT_ID}.{DATASET_ID}.{table_name}`"


def safe_limit(limit, maximum: int = 100) -> int:

    return max(1, min(int(limit), maximum))


def to_json_value(value):

    if isinstance(value, Decimal):
        return float(value)

    return value


def to_json_number(value):

    return to_json_value(value or 0)
