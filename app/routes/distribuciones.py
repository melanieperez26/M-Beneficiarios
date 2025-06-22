from fastapi import APIRouter
from app.services.clustering import agrupar_organizaciones

router = APIRouter()

@router.post("/optimize")
def optimizar_distribucion():
    resultado = agrupar_organizaciones()
    return resultado
