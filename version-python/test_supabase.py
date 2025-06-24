from supabase import create_client
from dotenv import load_dotenv
import os

load_dotenv()

# Obtener credenciales de Supabase
supabase_url = os.getenv('SUPABASE_URL')
supabase_key = os.getenv('SUPABASE_KEY')

if not supabase_url or not supabase_key:
    raise ValueError("SUPABASE_URL y SUPABASE_KEY deben estar configuradas en las variables de entorno")

print(f"URL: {supabase_url}")
print(f"Key: {supabase_key[:5]}...")

# Crear cliente Supabase
client = create_client(supabase_url, supabase_key)
print("Cliente creado")

# Verificar conexión
try:
    # Intentar obtener datos de una tabla
    response = client.table('organizaciones').select('*').limit(1).execute()
    print("Consulta exitosa")
    print(f"Respuesta: {response}")
    print(f"Datos: {response.data}")
    if response.data:
        print(f"Primer registro: {response.data[0]}")
except Exception as e:
    print(f"Error: {str(e)}")
    print(f"Tipo de error: {type(e)}")
    if hasattr(e, 'response'):
        print(f"Response: {e.response}")
    if hasattr(e, 'request'):
        print(f"Request: {e.request}")
