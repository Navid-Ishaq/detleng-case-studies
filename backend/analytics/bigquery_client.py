import json
import re
import os

from google.cloud import bigquery
from google.oauth2 import service_account

from .config import (
    GOOGLE_APPLICATION_CREDENTIALS,
    GOOGLE_SERVICE_ACCOUNT_JSON,
    PROJECT_ID,
)


class BigQueryClient:

    def __init__(self):

        credentials = self._load_credentials()

        self.client = bigquery.Client(
            project=PROJECT_ID,
            credentials=credentials
        )

    def _load_credentials(self):

        if GOOGLE_SERVICE_ACCOUNT_JSON:
            service_account_info = json.loads(GOOGLE_SERVICE_ACCOUNT_JSON)

            return service_account.Credentials.from_service_account_info(
                service_account_info
            )

        return service_account.Credentials.from_service_account_file(
            GOOGLE_APPLICATION_CREDENTIALS
        )

    def execute_query(self, sql: str):

        validate_readonly_sql(sql)
        job_config = bigquery.QueryJobConfig(use_legacy_sql=False)
        job_config.labels = {"application": "detleng_verified_analytics"}
        query_job = self.client.query(sql, job_config=job_config, location=os.getenv("LOCATION", "EU"), timeout=15)

        return query_job.result(timeout=45)


def validate_readonly_sql(sql: str) -> None:
    """Defense in depth; visitors can only select an allow-listed tool, never submit SQL."""
    cleaned = re.sub(r"/\*.*?\*/|--[^\n]*", " ", sql, flags=re.S).strip()
    if not re.match(r"^(SELECT|WITH)\b", cleaned, re.I):
        raise ValueError("Only read-only analytics queries are permitted")
    if ";" in cleaned or re.search(r"\b(INSERT|UPDATE|DELETE|MERGE|DROP|ALTER|CREATE|TRUNCATE|GRANT|REVOKE|EXPORT|LOAD|CALL|EXECUTE|ASSERT)\b", cleaned, re.I):
        raise ValueError("Only read-only analytics queries are permitted")
