from supabase import Client, create_client
from typing import Optional, Any
from dotenv import load_dotenv
import os

load_dotenv()  # Cargar variables de entorno

class BaseService:
    def __init__(self):
        self.supabase_url = os.getenv('SUPABASE_URL')
        self.supabase_key = os.getenv('SUPABASE_KEY')
        if not self.supabase_url or not self.supabase_key:
            raise ValueError("SUPABASE_URL y SUPABASE_KEY deben estar configuradas en las variables de entorno")
        print(f"Inicializando BaseService con URL: {self.supabase_url} y key: {self.supabase_key[:5]}...")
        print("Creando cliente Supabase...")
        self.supabase = create_client(self.supabase_url, self.supabase_key)
        print(f"Cliente creado: {self.supabase}")
        
    def get_table(self, table_name: str):
        """Obtiene una referencia a una tabla"""
        print(f"Obteniendo tabla {table_name}...")
        return self.supabase.table(table_name)

    def query_table(self, table_name: str):
        """Ejecuta una consulta en una tabla específica"""
        print(f"Ejecutando consulta en tabla {table_name}")
        table = self.get_table(table_name)
        return table.select("*").execute()
