from fastapi import APIRouter, HTTPException, Depends
from app.models.inventario import Inventario
from app.services.inventario import InventarioService
from uuid import UUID
from typing import List, Optional

router = APIRouter()

def get_inventario_service() -> InventarioService:
    try:
        service = InventarioService()
        print("Servicio de inventario inicializado")
        return service
    except Exception as e:
        print(f"Error al inicializar servicio: {str(e)}")
        raise

@router.get("/", response_model=List[Inventario])
def listar_inventario(service: InventarioService = Depends(get_inventario_service)):
    """Lista todos los items del inventario"""
    try:
        return service.obtener_inventario()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/low-stock", response_model=List[Inventario])
def get_items_bajo_stock(
    beneficiary_id: UUID,
    service: InventarioService = Depends(get_inventario_service)
):
    """Obtiene items que están por debajo del stock mínimo"""
    try:
        return service.get_items_bajo_stock(beneficiary_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{beneficiary_id}", response_model=List[Inventario])
def get_inventario(
    beneficiary_id: UUID,
    service: InventarioService = Depends(get_inventario_service)
):
    """Obtiene el inventario completo de una organización"""
    try:
        return service.get_inventario(beneficiary_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{inventario_id}", response_model=Inventario)
def update_inventario(
    inventario_id: UUID,
    inventario: Inventario,
    service: InventarioService = Depends(get_inventario_service)
):
    """Actualiza un item de inventario"""
    try:
        return service.update_inventario(inventario)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/reabastecimiento/{inventario_id}", response_model=Inventario)
def registrar_reabastecimiento(
    inventario_id: UUID,
    cantidad: float,
    service: InventarioService = Depends(get_inventario_service)
):
    """Registra un reabastecimiento de inventario"""
    try:
        return service.registrar_reabastecimiento(inventario_id, cantidad)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))