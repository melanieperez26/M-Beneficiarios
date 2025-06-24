from pydantic import BaseModel
from typing import Optional, List
from uuid import UUID
from datetime import datetime
from app.models.producto import ProductoDistribucion
from app.models.ruta_optima import PuntoRuta

class Distribucion(BaseModel):
    id: Optional[UUID] = None
    donation_id: UUID
    beneficiary_id: UUID
    distributed_by: Optional[UUID] = None
    distribution_date: datetime
    notes: Optional[str] = None
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

    # Relaciones
    productos: Optional[List[ProductoDistribucion]] = None
    ruta: Optional[PuntoRuta] = None
    voluntarios_asignados: Optional[List[str]] = None
