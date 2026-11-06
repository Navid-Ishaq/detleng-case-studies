"""
=========================================================
DeTLeng BigQuery MCP Server
Configuration
=========================================================

Purpose:
    Central configuration for the DeTLeng BigQuery MCP Server.

Responsibilities:
    - Google Cloud Configuration
    - BigQuery Configuration
    - AI Configuration
    - MCP Configuration
    - Logging Configuration

Business logic should NEVER be added to this file.
=========================================================
"""

import os

# =========================================================
# Google Cloud Configuration
# =========================================================

PROJECT_ID = os.getenv(
    "PROJECT_ID",
    "detleng-case-studies"
)

LOCATION = os.getenv(
    "LOCATION",
    "EU"
)

# =========================================================
# BigQuery Configuration
# =========================================================

DATASET_ID = os.getenv(
    "DATASET_ID",
    "cs003_olist_analytics"
)

GOOGLE_APPLICATION_CREDENTIALS = os.getenv(
    "GOOGLE_APPLICATION_CREDENTIALS",
    "/etc/secrets/service-account.json"
)

GOOGLE_SERVICE_ACCOUNT_JSON = os.getenv(
    "GOOGLE_SERVICE_ACCOUNT_JSON"
)

# =========================================================
# AI Configuration
# =========================================================

MODEL = os.getenv(
    "MODEL",
    "gpt-5.5"
)

# =========================================================
# MCP Server Configuration
# =========================================================

SERVER_NAME = "DeTLeng Business Intelligence Server"

APP_NAME = "DeTLeng BigQuery MCP Server"

VERSION = "1.0.0"

HOST = os.getenv(
    "HOST",
    "0.0.0.0"
)

PORT = int(os.getenv(
    "PORT",
    "8000"
))

MCP_TRANSPORT = os.getenv(
    "MCP_TRANSPORT",
    "streamable-http"
)

# =========================================================
# Logging
# =========================================================

LOG_LEVEL = os.getenv(
    "LOG_LEVEL",
    "INFO"
)

# =========================================================
# Development
# =========================================================

DEBUG = os.getenv(
    "DEBUG",
    "False"
).lower() == "true"
