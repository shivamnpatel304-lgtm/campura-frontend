from fastapi import FastAPI

app = FastAPI(
    title="CAMPURA AI",
    description="CAMPURA Multi-Agent AI System",
    version="1.0.0"
)

try:
    from app.api.agents import router as agent_router
except ModuleNotFoundError:
    agent_router = None

if agent_router is not None:
    app.include_router(agent_router)


@app.get("/")
def home():
    return {
        "application": "CAMPURA AI",
        "status": "running",
        "version": "1.0.0"
    }


@app.get("/health")
def health():
    return {"status": "ok"}