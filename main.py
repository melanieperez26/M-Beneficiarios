from fastapi import FastAPI
from app.routes import organizaciones, inventario, distribuciones

app = FastAPI(title="Módulo Beneficiarios - Banco de Alimentos")

app.include_router(organizaciones.router, prefix="/organizaciones", tags=["Organizaciones"])
app.include_router(inventario.router, prefix="/inventario", tags=["Inventario"])
app.include_router(distribuciones.router, prefix="/distribuciones", tags=["Distribuciones"])