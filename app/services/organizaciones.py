from supabase import create_client
from typing import List
from uuid import UUID, uuid4
import logging
from supabase import create_client
from pydantic import BaseModel
from typing import Optional, List
from uuid import UUID
import os
from dotenv import load_dotenv
import math

load_dotenv()

# Configuración de Supabase
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_KEY')

class Organizacion(BaseModel):
    id: Optional[UUID] = None
    user_id: Optional[UUID] = None
    name: str
    description: Optional[str] = None
    tax_id: Optional[str] = None
    address: str
    latitude: float
    longitude: float
    service_area: Optional[str] = None
    beneficiary_types: Optional[List[str]] = None
    capacity: Optional[int] = None
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

class OrganizacionesService:
    def __init__(self):
        print("Inicializando servicio de organizaciones...")
        if not SUPABASE_URL or not SUPABASE_KEY:
            raise ValueError("SUPABASE_URL y SUPABASE_KEY deben estar configuradas en las variables de entorno")
        print(f"URL: {SUPABASE_URL}")
        print(f"Key: {SUPABASE_KEY[:5]}...")
        self.client = create_client(SUPABASE_URL, SUPABASE_KEY)
        print("Cliente inicializado")

    def obtener_organizaciones(self, skip: int = 0, limit: int = 100) -> List[Organizacion]:
        """Obtiene una lista de organizaciones con paginación"""
        print(f"Obteniendo organizaciones (skip: {skip}, limit: {limit})...")
        try:
            table = self.client.table("beneficiary_organizations")
            print("Tabla obtenida")
            response = table.select("*").range(skip, skip + limit).execute()
            print(f"Respuesta: {response}")
            
            if response.data and isinstance(response.data, list):
                return [Organizacion(**org) for org in response.data]
            return []
        except Exception as e:
            print(f"Error detallado: {str(e)}")
            raise

    def crear_organizacion(self, organizacion: Organizacion) -> Organizacion:
        """Crea una nueva organización beneficiaria"""
        print(f"Creando organización: {organizacion}")
        try:
            table = self.client.table("beneficiary_organizations")
            print("Tabla obtenida")
            data = organizacion.dict(exclude_none=True)
            print(f"Datos: {data}")
            response = table.insert(data).execute()
            print(f"Respuesta: {response}")
            
            if response.data and isinstance(response.data, list) and len(response.data) > 0:
                return Organizacion(**response.data[0])
            raise ValueError("No se pudo crear la organización")
        except Exception as e:
            print(f"Error detallado: {str(e)}")
            raise

    def obtener_organizacion(self, organizacion_id: UUID) -> Organizacion:
        """Obtiene una organización por ID"""
        print(f"Obteniendo organización con ID: {organizacion_id}")
        try:
            table = self.client.table("beneficiary_organizations")
            print("Tabla obtenida")
            response = table.select("*").eq("id", organizacion_id).single().execute()
            print(f"Respuesta: {response}")
            
            if response.data:
                return Organizacion(**response.data)
            raise ValueError(f"Organización no encontrada: {organizacion_id}")
        except Exception as e:
            print(f"Error detallado: {str(e)}")
            raise

    def actualizar_organizacion(self, organizacion_id: UUID, organizacion: Organizacion) -> Organizacion:
        """Actualiza una organización existente"""
        print(f"Actualizando organización con ID: {organizacion_id}")
        try:
            table = self.client.table("beneficiary_organizations")
            print("Tabla obtenida")
            data = organizacion.dict(exclude_none=True)
            print(f"Datos: {data}")
            response = table.update(data).eq("id", organizacion_id).execute()
            print(f"Respuesta: {response}")
            
            if response.data and isinstance(response.data, list) and len(response.data) > 0:
                return Organizacion(**response.data[0])
            raise ValueError(f"No se pudo actualizar la organización: {organizacion_id}")
        except Exception as e:
            print(f"Error detallado: {str(e)}")
            raise

    def buscar_organizaciones_por_ubicacion(self, ciudad: Optional[str] = None, colonia: Optional[str] = None) -> List[Organizacion]:
        """Busca organizaciones por ciudad o colonia"""
        print(f"Buscando organizaciones en ciudad: {ciudad}, colonia: {colonia}")
        try:
            table = self.client.table("beneficiary_organizations")
            print("Tabla obtenida")
            
            # Consulta base
            query = table.select("*")
            
            # Agregar filtros según los parámetros proporcionados
            if ciudad:
                query = query.filter("address", "like", f"{ciudad}%").filter("service_area", "like", f"{ciudad}%")
            if colonia:
                query = query.filter("address", "like", f"{colonia}%")
            
            response = query.execute()
            print(f"Respuesta: {response}")
            
            if response.data and isinstance(response.data, list):
                return [Organizacion(**org) for org in response.data]
            return []
        except Exception as e:
            print(f"Error detallado: {str(e)}")
            raise
