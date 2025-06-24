from supabase import create_client, Client
from typing import List, Optional
from datetime import datetime
from uuid import UUID
from ..models.inventario import Inventario
from ..services.base import BaseService

class InventarioService(BaseService):
    def __init__(self):
        super().__init__()
        self.table_name = "beneficiary_inventory"

    async def get_inventario(self, beneficiary_id: UUID) -> List[Inventario]:
        """Obtiene el inventario completo de una organización beneficiaria"""
        try:
            response = await self.get_supabase_client().table(self.table_name)\
                .select("*")\
                .eq("beneficiary_id", beneficiary_id)\
                .execute()
            
            return [Inventario(**item) for item in response.data]
        except Exception as e:
            print(f"Error al obtener inventario: {str(e)}")
            raise

    async def update_inventario(self, inventario: Inventario) -> Inventario:
        """Actualiza un item de inventario"""
        try:
            data = inventario.dict(exclude_none=True)
            response = await self.get_supabase_client().table(self.table_name)\
                .update(data)\
                .eq("id", inventario.id)\
                .execute()
            
            return Inventario(**response.data[0])
        except Exception as e:
            print(f"Error al actualizar inventario: {str(e)}")
            raise

    async def get_items_bajo_stock(self, beneficiary_id: UUID) -> List[Inventario]:
        """Obtiene items que están por debajo del stock mínimo"""
        try:
            response = await self.get_supabase_client().table(self.table_name)\
                .select("*")\
                .eq("beneficiary_id", beneficiary_id)\
                .lt("quantity", "minimum_required")\
                .execute()
            
            return [Inventario(**item) for item in response.data]
        except Exception as e:
            print(f"Error al obtener items bajo stock: {str(e)}")
            raise

    async def registrar_reabastecimiento(self, inventario_id: UUID, cantidad: float) -> Inventario:
        """Registra un reabastecimiento de inventario"""
        try:
            response = await self.get_supabase_client().table(self.table_name)\
                .update({
                    "quantity": cantidad,
                    "last_restocked": datetime.utcnow().isoformat()
                })\
                .eq("id", inventario_id)\
                .execute()
            
            return Inventario(**response.data[0])
        except Exception as e:
            print(f"Error al registrar reabastecimiento: {str(e)}")
            raise
