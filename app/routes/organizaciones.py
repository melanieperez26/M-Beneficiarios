from fastapi import APIRouter, HTTPException
from typing import List
from app.models.organizacion import Organizacion
from app.services.supabase import supabase

router = APIRouter()

# Ruta local simulada (en memoria)
organizaciones_db = []

@router.post("/", response_model=Organizacion)
def crear_organizacion_local(org: Organizacion):
    organizaciones_db.append(org)
    return org

@router.get("/", response_model=List[Organizacion])
def listar_organizaciones_local():
    return organizaciones_db

# Ruta real con Supabase
@router.get("/desde-bd", response_model=List[dict])
def obtener_organizaciones_supabase():
    try:
        response = supabase.table("beneficiary_organizations").select("*").execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al consultar Supabase: {str(e)}")
    
@router.post("/registrar")
def registrar_organizacion(org: Organizacion):
    try:
        nueva = supabase.table("beneficiary_organizations").insert(org.dict()).execute()
        return {"mensaje": "Organización registrada correctamente", "data": nueva.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al insertar en Supabase: {str(e)}")
