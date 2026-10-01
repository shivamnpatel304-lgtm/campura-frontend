from fastapi import APIRouter

router = APIRouter(prefix="/api", tags=["agents"])


@router.get("/agents")
def list_agents():
    return {
        "agents": [
            "inventory",
            "sales",
            "forecast",
            "logistics",
            "email"
        ]
    }


@router.get("/agents/health")
def agents_health():
    return {"status": "ok"}
