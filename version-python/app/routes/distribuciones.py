from fastapi import APIRouter, HTTPException, Depends
from app.models.distribucion import Distribucion
from app.models.ruta_optima import RutaOptima
from app.services.distribuciones import DistribucionesService
from uuid import UUID
from typing import List, Optional

router = APIRouter()

def get_distribuciones_service() -> DistribucionesService:
    try:
        service = DistribucionesService()
        print("Servicio de distribuciones inicializado")
        return service
    except Exception as e:
        print(f"Error al inicializar servicio: {str(e)}")
        raise

@router.get("/", response_model=List[Distribucion])
def listar_distribuciones(service: DistribucionesService = Depends(get_distribuciones_service)):
    """Lista todas las distribuciones"""
    try:
        return service.obtener_distribuciones()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/", response_model=Distribucion)
def crear_distribucion(
    distribucion: Distribucion,
    service: DistribucionesService = Depends(get_distribuciones_service)
):
    """Crea una nueva distribución"""
    try:
        return service.crear_distribucion(distribucion)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{distribution_id}/voluntarios", response_model=Distribucion)
def asignar_voluntarios(
    distribution_id: UUID,
    voluntarios: List[str],
    service: DistribucionesService = Depends(get_distribuciones_service)
):
    """Asigna voluntarios a una distribución"""
    try:
        return service.asignar_voluntarios(distribution_id, voluntarios)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/optimize", response_model=RutaOptima)
def optimizar_ruta(
    distribution_ids: List[UUID],
    service: DistribucionesService = Depends(get_distribuciones_service)
):
    """Optimiza la ruta para múltiples distribuciones"""
    try:
        return service.optimizar_ruta(distribution_ids)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{distribution_id}/completada", response_model=Distribucion)
def marcar_completada(
    distribution_id: UUID,
    distributed_by: UUID,
    service: DistribucionesService = Depends(get_distribuciones_service)
):
    """Marca una distribución como completada"""
    try:
        return service.marcar_completada(distribution_id, distributed_by)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
