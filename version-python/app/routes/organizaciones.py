from fastapi import APIRouter, HTTPException
from typing import List, Optional
from uuid import UUID
from app.services.organizaciones import OrganizacionesService
from app.models.organizacion import Organizacion

router = APIRouter()

@router.get("/search", response_model=List[Organizacion], tags=["Buscar"])
def buscar_organizaciones_por_ubicacion(
    ciudad: Optional[str] = None,
    colonia: Optional[str] = None
):
    """
    Busca organizaciones por ciudad o colonia
    
    Parámetros:
    - ciudad: Nombre de la ciudad (opcional)
    - colonia: Nombre de la colonia (opcional)
    
    Ejemplo de uso:
    - /organizaciones/search?ciudad=Ciudad%20de%20M%C3%A9xico
    - /organizaciones/search?colonia=Polanco
    """
    try:
        print(f"Buscando organizaciones en ciudad: {ciudad}, colonia: {colonia}")
        service = OrganizacionesService()
        return service.buscar_organizaciones_por_ubicacion(ciudad, colonia)
    except Exception as e:
        print(f"Error detallado: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error al buscar organizaciones: {str(e)}")

@router.get("/", response_model=List[Organizacion], tags=["Listar"])
def listar_organizaciones(
    skip: int = 0, 
    limit: int = 100
):
    """Lista todas las organizaciones con paginación"""
    try:
        print(f"Listando organizaciones (skip: {skip}, limit: {limit})...")
        service = OrganizacionesService()
        organizaciones = service.obtener_organizaciones(skip, limit)
        print(f"Organizaciones obtenidas: {len(organizaciones)}")
        return organizaciones
    except Exception as e:
        print(f"Error detallado: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/", response_model=Organizacion, tags=["Crear"])
def crear_organizacion(
    organizacion: Organizacion
):
    """Crea una nueva organización"""
    try:
        print(f"Creando organización: {organizacion}")
        service = OrganizacionesService()
        return service.crear_organizacion(organizacion)
    except Exception as e:
        print(f"Error detallado: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/{organizacion_id}", response_model=Organizacion, tags=["Obtener"])
def obtener_organizacion(
    organizacion_id: UUID
):
    """Obtiene una organización por ID"""
    try:
        print(f"Obteniendo organización con ID: {organizacion_id}")
        service = OrganizacionesService()
        return service.obtener_organizacion(organizacion_id)
    except Exception as e:
        print(f"Error detallado: {str(e)}")
        raise HTTPException(status_code=404, detail=str(e))

@router.put("/{organizacion_id}", response_model=Organizacion, tags=["Actualizar"])
def actualizar_organizacion(
    organizacion_id: UUID, 
    organizacion: Organizacion
):
    """Actualiza una organización existente"""
    try:
        print(f"Actualizando organización con ID: {organizacion_id}")
        service = OrganizacionesService()
        return service.actualizar_organizacion(organizacion_id, organizacion)
    except Exception as e:
        print(f"Error detallado: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))


