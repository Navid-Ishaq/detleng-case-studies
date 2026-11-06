"""Direct in-process analytics executor, preserving the backend's answer format."""
from typing import Any
from analytics.executor import execute_tool
from analytics.registry import list_tools
from analytics.config import PROJECT_ID, DATASET_ID
from registry import group_registered_tools

KPI_NOT_AVAILABLE_MESSAGE = "This KPI is currently not available through the Business Intelligence layer."

async def execute_mcp_tool(_unused, route) -> Any:
    return execute_tool(route.tool_name, route.arguments or {})

async def get_tool_catalog(_unused=None):
    return group_registered_tools(list_tools())

async def get_dataset_information(_unused=None):
    return {"project": PROJECT_ID, "dataset": DATASET_ID, "application": "DeTLeng Verified Analytics", "server": "running"}

def build_tool_catalog_answer(catalog):
    return "Available Business Intelligence tools:\n" + "\n".join(f"\n{category}:\n" + "\n".join(f"- {n}" for n in names) for category,names in catalog.items())

def build_dataset_answer(info):
    return "Dataset Information\n\nApplication: {application}\nStatus: {server}\nProject: {project}\nAnalytics Dataset: {dataset}".format(**info)
