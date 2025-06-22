from pydantic import BaseModel
from typing import Optional, List

class Organizacion(BaseModel):
    name: str
    description: Optional[str] = None
    tax_id: Optional[str] = None
    address: str
    latitude: float
    longitude: float
    service_area: Optional[str] = None
    beneficiary_types: Optional[List[str]] = None
    capacity: Optional[int] = None
    user_id: Optional[str] = None  
