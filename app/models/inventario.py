from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime, date

class Inventario(BaseModel):
    id: Optional[UUID] = None
    beneficiary_id: UUID
    product_id: UUID
    quantity: float
    last_restocked: Optional[datetime] = None
    minimum_required: Optional[float] = None
    unit_of_measure: str
    created_at: Optional[str] = None
    updated_at: Optional[str] = None
    ultimo_abastecimiento: Optional[date] = None