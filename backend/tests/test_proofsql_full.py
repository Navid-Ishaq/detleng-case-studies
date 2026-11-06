"""Ensure expanded structured evidence preserves privacy and existing answer contract."""
from fastapi.testclient import TestClient
import main
from proofsql_metadata import verification_for_tool
from analytics.registry import TOOL_REGISTRY

client=TestClient(main.app)


def test_all_registry_tools_have_safe_metadata():
    assert len(TOOL_REGISTRY)==100
    for name in TOOL_REGISTRY:
        obj=verification_for_tool(name,[{"customer_id":"PRIVATE", "order_id":"SECRET", "total_revenue":123.4,"product_category":"books"}])
        assert obj is not None
        assert obj["tool"]==name
        assert obj["records"]==[{"total_revenue":123.4,"product_category":"books"}]
        assert "PRIVATE" not in str(obj) and "SECRET" not in str(obj)


def test_full_metadata_is_additive_to_original_pilot():
    data=verification_for_tool("total_revenue",{"total_revenue":15843553.24,"customer_id":"PRIVATE"})
    assert data["metrics"]=={"total_revenue":15843553.24}
    assert data["records"]==[{"total_revenue":15843553.24}]
    assert "PRIVATE" not in str(data)


def test_other_tool_exposes_no_private_ids(monkeypatch):
    monkeypatch.setattr(main,"config_status",lambda: [])
    monkeypatch.setattr(main,"execute_tool",lambda *a:[{
        "product_id":"sensitive-original-id", "product_category":"toys", "total_revenue":88.5
    }])
    monkeypatch.setattr(main,"llm",lambda _: "The original AI prose remains unchanged.")
    result=client.post("/chat",json={"message":"Show best-selling products","tool":"best_selling_products"})
    assert result.status_code==200
    data=result.json()
    assert data["status"]=="success"
    assert data["answer"]=="The original AI prose remains unchanged."
    assert data["verification"]["records"]==[{"product_category":"toys","total_revenue":88.5}]
    assert "sensitive-original-id" not in str(data)
