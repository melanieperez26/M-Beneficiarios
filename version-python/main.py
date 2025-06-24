from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import organizaciones, inventario, distribuciones

app = FastAPI(
    title="Módulo Beneficiarios - Banco de Alimentos",
    description="API para gestión de organizaciones beneficiarias y distribución de alimentos",
    version="1.0.0",
    contact={
        "name": "Equipo de Desarrollo",
        "email": "soporte@bancoalimentos.com"
    },
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir rutas
app.include_router(
    organizaciones.router,
    prefix="/organizaciones",
    tags=["Organizaciones"],
    responses={404: {"description": "No encontrado"}}
)

app.include_router(
    inventario.router,
    prefix="/inventario",
    tags=["Inventario"],
    responses={404: {"description": "No encontrado"}}
)

app.include_router(
    distribuciones.router,
    prefix="/distribuciones",
    tags=["Distribuciones"],
    responses={404: {"description": "No encontrado"}}
)