"""
=========================================================
Business Intelligence Tool Executor
=========================================================
"""

from typing import Any


def execute_tool(tool_name: str, arguments: dict[str, Any] | None = None):
    """
    Execute a registered Business Intelligence tool.
    """

    from .registry import TOOL_REGISTRY

    if arguments is None:
        arguments = {}

    if tool_name not in TOOL_REGISTRY:
        raise ValueError(f"Unknown Business Intelligence tool: {tool_name}")

    tool = TOOL_REGISTRY[tool_name]

    return tool(**arguments)


def list_registered_tools() -> list[str]:
    """
    Return registered Business Intelligence tool names.
    """

    from .registry import list_tools

    return list_tools()
