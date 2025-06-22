from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class PuntoRuta(BaseModel):
    organizacion_id: int
    latitud: float
    longitud: float
    secuencia: int
    tiempo_estimado: float  # en minutos

class RutaOptima(BaseModel):
    id: Optional[int] = None
    fecha_creacion: datetime
    puntos: List[PuntoRuta]
    distancia_total: float  # en kilómetros
    tiempo_total: float  # en minutos
    estado: str  # activa, completada, cancelada
    distribucion_id: Optional[int] = None
    vehiculo_id: Optional[int] = None
    conductor_id: Optional[str] = None
