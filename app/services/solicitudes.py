from supabase import create_client, Client
from typing import List, Optional
from datetime import datetime
from uuid import UUID
from ..models.solicitud import Solicitud
from ..services.base import BaseService

class SolicitudesService(BaseService):
    def __init__(self):
        super().__init__()
        self.table_name = "food_requests"

    async def crear_solicitud(self, solicitud: Solicitud) -> Solicitud:
        """Crea una nueva solicitud de alimentos"""
        try:
            data = solicitud.dict(exclude_none=True)
            response = await self.get_supabase_client().table(self.table_name)\
                .insert(data)\
                .execute()
            
            return Solicitud(**response.data[0])
        except Exception as e:
            print(f"Error al crear solicitud: {str(e)}")
            raise

    async def aprobar_solicitud(self, solicitud_id: UUID, approved_by: UUID) -> Solicitud:
        """Aprueba una solicitud de alimentos"""
        try:
            response = await self.get_supabase_client().table(self.table_name)\
                .update({
                    "status": "approved",
                    "approved_by": approved_by,
                    "updated_at": datetime.utcnow().isoformat()
                })\
                .eq("id", solicitud_id)\
                .execute()
            
            return Solicitud(**response.data[0])
        except Exception as e:
            print(f"Error al aprobar solicitud: {str(e)}")
            raise

    async def obtener_solicitudes_pendientes(self, beneficiary_id: UUID) -> List[Solicitud]:
        """Obtiene las solicitudes pendientes de una organización"""
        try:
            response = await self.get_supabase_client().table(self.table_name)\
                .select("*")\
                .eq("beneficiary_id", beneficiary_id)\
                .eq("status", "pending")\
                .execute()
            
            return [Solicitud(**item) for item in response.data]
        except Exception as e:
            print(f"Error al obtener solicitudes pendientes: {str(e)}")
            raise

    async def asignar_solicitud_a_distribucion(self, solicitud_id: UUID, distribution_id: UUID) -> Solicitud:
        """Asigna una solicitud a una distribución"""
        try:
            response = await self.get_supabase_client().table(self.table_name)\
                .update({
                    "status": "fulfilled",
                    "distribution_id": distribution_id,
                    "updated_at": datetime.utcnow().isoformat()
                })\
                .eq("id", solicitud_id)\
                .execute()
            
            return Solicitud(**response.data[0])
        except Exception as e:
            print(f"Error al asignar solicitud a distribución: {str(e)}")
            raise
