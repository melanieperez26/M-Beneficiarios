import os
from supabase import create_client, Client
from typing import List, Optional
from datetime import datetime
from uuid import UUID
from ..models.distribucion import Distribucion
from ..models.ruta_optima import RutaOptima

class DistribucionesService:
    def __init__(self):
        print("Inicializando servicio de distribuciones...")
        # Cargar variables de entorno
        from dotenv import load_dotenv
        load_dotenv()
        
        # Verificar variables de entorno
        supabase_url = os.getenv('SUPABASE_URL')
        supabase_key = os.getenv('SUPABASE_KEY')
        
        if not supabase_url or not supabase_key:
            raise ValueError("SUPABASE_URL y SUPABASE_KEY deben estar configuradas en las variables de entorno")
        
        print(f"URL: {supabase_url}")
        print(f"Key: {supabase_key[:5]}...")
        
        # Crear cliente
        self.client = create_client(supabase_url, supabase_key)
        self.table_name = "distributions"
        self.route_table = "distribution_clusters"
        print("Cliente Supabase inicializado")

    def obtener_distribuciones(self, skip: int = 0, limit: int = 100) -> List[Distribucion]:
        """Obtiene todas las distribuciones con paginación"""
        try:
            print(f"Obteniendo distribuciones (skip: {skip}, limit: {limit})...")
            table = self.client.table(self.table_name)
            print("Tabla obtenida")
            response = table.select("*").range(skip, skip + limit).execute()
            print(f"Respuesta: {response}")
            
            if response.data and isinstance(response.data, list):
                return [Distribucion(**dist) for dist in response.data]
            return []
        except Exception as e:
            print(f"Error detallado: {str(e)}")
            raise

    def crear_distribucion(self, distribucion: Distribucion) -> Distribucion:
        """Crea una nueva distribución"""
        try:
            print(f"Creando distribución: {distribucion}")
            table = self.client.table(self.table_name)
            print("Tabla obtenida")
            data = distribucion.dict(exclude_none=True)
            print(f"Datos: {data}")
            response = table.insert(data).execute()
            print(f"Respuesta: {response}")
            
            if response.data and isinstance(response.data, list) and len(response.data) > 0:
                return Distribucion(**response.data[0])
            raise ValueError("No se pudo crear la distribución")
        except Exception as e:
            print(f"Error detallado: {str(e)}")
            raise

    def asignar_voluntarios(self, distribution_id: UUID, voluntarios: List[str]) -> Distribucion:
        """Asigna voluntarios a una distribución"""
        try:
            print(f"Asignando voluntarios a distribución {distribution_id}")
            table = self.client.table(self.table_name)
            print("Tabla obtenida")
            response = table.update({
                "volunteers": voluntarios,
                "updated_at": datetime.utcnow().isoformat()
            }).eq("id", distribution_id).execute()
            print(f"Respuesta: {response}")
            
            if response.data and isinstance(response.data, list) and len(response.data) > 0:
                return Distribucion(**response.data[0])
            raise ValueError(f"No se pudo actualizar la distribución: {distribution_id}")
        except Exception as e:
            print(f"Error detallado: {str(e)}")
            raise

    def optimizar_ruta(self, distribution_ids: List[UUID]) -> RutaOptima:
        """Optimiza la ruta para múltiples distribuciones"""
        try:
            print(f"Optimizando ruta para {len(distribution_ids)} distribuciones")
            table = self.client.table(self.table_name)
            print("Tabla obtenida")
            response = table.select("beneficiary_id").in_("id", distribution_ids).execute()
            print(f"Respuesta: {response}")
            
            beneficiary_ids = [item["beneficiary_id"] for item in response.data]
            print(f"Beneficiarios encontrados: {len(beneficiary_ids)}")
            
            cluster_data = {
                "beneficiaries": beneficiary_ids,
                "created_at": datetime.utcnow().isoformat()
            }
            
            route_table = self.client.table(self.route_table)
            print("Tabla de rutas obtenida")
            response = route_table.insert(cluster_data).execute()
            print(f"Respuesta: {response}")
            
            if response.data and isinstance(response.data, list) and len(response.data) > 0:
                return RutaOptima(**response.data[0])
            raise ValueError("No se pudo crear el cluster de rutas")
        except Exception as e:
            print(f"Error detallado: {str(e)}")
            raise

    def marcar_completada(self, distribution_id: UUID, distributed_by: UUID) -> Distribucion:
        """Marca una distribución como completada"""
        try:
            print(f"Marcando distribución {distribution_id} como completada")
            table = self.client.table(self.table_name)
            print("Tabla obtenida")
            response = table.update({
                "status": "completed",
                "distributed_by": distributed_by,
                "updated_at": datetime.utcnow().isoformat()
            }).eq("id", distribution_id).execute()
            print(f"Respuesta: {response}")
            
            if response.data and isinstance(response.data, list) and len(response.data) > 0:
                return Distribucion(**response.data[0])
            raise ValueError(f"No se pudo actualizar la distribución: {distribution_id}")
        except Exception as e:
            print(f"Error detallado: {str(e)}")
            raise
