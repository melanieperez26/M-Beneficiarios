from pydantic import BaseModel

class Organizacion(BaseModel):
    id: int
    nombre: str
    ubicacion_lat: float
    ubicacion_long: float
    capacidad: int