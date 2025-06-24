from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime

class ProductoDistribucion(BaseModel):
    product_id: UUID
    quantity: float
    unit_of_measure: str
    estimated_value: Optional[float] = None
    expiration_date: Optional[datetime] = None

    class Config:
        from_attributes = True
