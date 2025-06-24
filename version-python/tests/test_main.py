from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_crear_y_listar_organizacion():
    response = client.post("/organizaciones/", json={
        "id": 1,
        "nombre": "Banco Comedor",
        "ubicacion_lat": 19.4326,
        "ubicacion_long": -99.1332,
        "capacidad": 100
    })
    assert response.status_code == 200
    response = client.get("/organizaciones/")
    assert len(response.json()) == 1