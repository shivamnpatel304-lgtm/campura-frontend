from gmailagent import app


def test_app_loads():
    assert app is not None


def test_root_route():
    from fastapi.testclient import TestClient

    client = TestClient(app)
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["application"] == "CAMPURA AI"


def test_health_route():
    from fastapi.testclient import TestClient

    client = TestClient(app)
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"
