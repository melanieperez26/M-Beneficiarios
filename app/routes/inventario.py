from fastapi import APIRouter
from app.models.inventario import Inventario
from typing import List

router = APIRouter()

inventario_db = []

@router.get("/low-stock", response_model=List[Inventario])
def inventario_bajo():
    return [i for i in inventario_db if i.cantidad < 10]