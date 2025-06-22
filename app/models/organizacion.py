from pydantic import BaseModel
from typing import Optional, List
from uuid import UUID

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
