from pydantic import BaseModel
from typing import Optional, List
from uuid import UUID
from datetime import datetime

class ProductoSolicitud(BaseModel):
    product_id: UUID
    quantity: float
    unit_of_measure: str

class Solicitud(BaseModel):
    id: Optional[UUID] = None
    beneficiary_id: UUID
    request_date: datetime
    required_date: Optional[datetime] = None
    products: List[ProductoSolicitud]
    urgency_level: str  # low, medium, high, critical
    status: str  # pending, approved, fulfilled, rejected
    approved_by: Optional[UUID] = None
    notes: Optional[str] = None
    created_at: Optional[str] = None
    updated_at: Optional[str] = None
