from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer
from app.models.solicitud import Solicitud
from app.services.solicitudes import SolicitudesService
from uuid import UUID
from typing import List

router = APIRouter()

solicitudes_service = SolicitudesService()

@router.post("/", response_model=Solicitud)
async def crear_solicitud(solicitud: Solicitud):
    """Crea una nueva solicitud de alimentos"""
    try:
        return await solicitudes_service.crear_solicitud(solicitud)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/pendientes/{beneficiary_id}", response_model=List[Solicitud])
async def obtener_solicitudes_pendientes(beneficiary_id: UUID):
    """Obtiene las solicitudes pendientes de una organización"""
    try:
        return await solicitudes_service.obtener_solicitudes_pendientes(beneficiary_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{solicitud_id}/aprobar", response_model=Solicitud)
async def aprobar_solicitud(solicitud_id: UUID, approved_by: UUID):
    """Aprueba una solicitud de alimentos"""
    try:
        return await solicitudes_service.aprobar_solicitud(solicitud_id, approved_by)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{solicitud_id}/asignar", response_model=Solicitud)
async def asignar_a_distribucion(solicitud_id: UUID, distribution_id: UUID):
    """Asigna una solicitud a una distribución"""
    try:
        return await solicitudes_service.asignar_solicitud_a_distribucion(solicitud_id, distribution_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
