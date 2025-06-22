from pydantic import BaseModel
from datetime import date

class Inventario(BaseModel):
    id: int
    organizacion_id: int
    producto_id: int
    cantidad: int
    ultimo_abastecimiento: date