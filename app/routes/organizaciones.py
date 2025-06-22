from fastapi import APIRouter, HTTPException
from app.models.organizacion import Organizacion
from typing import List

router = APIRouter()

organizaciones_db = []

@router.post("/", response_model=Organizacion)
def crear_organizacion(org: Organizacion):
    organizaciones_db.append(org)
    return org

@router.get("/", response_model=List[Organizacion])
def listar_organizaciones():
    return organizaciones_db