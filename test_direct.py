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

# Verificar conexión y ejecutar consultas directas
try:
    # Intentar obtener datos
    print("\nObteniendo datos...")
    response = client.table('beneficiary_organizations').select('*').limit(1).execute()
    print(f"Respuesta: {response}")
    print(f"Datos: {response.data}")
    
    # Intentar insertar datos
    print("\nInsertando datos de prueba...")
    test_data = {
        'name': 'Test Organization',
        'address': 'Test Address',
        'latitude': 0.0,
        'longitude': 0.0
    }
    response = client.table('beneficiary_organizations').insert(test_data).execute()
    print(f"Respuesta insert: {response}")
    
    # Limpiar datos de prueba
    if response.data:
        org_id = response.data[0]['id']
        print(f"\nLimpando datos de prueba (ID: {org_id})...")
        response = client.table('beneficiary_organizations').delete().eq('id', org_id).execute()
        print(f"Respuesta delete: {response}")
        
except Exception as e:
    print(f"Error: {str(e)}")
    print(f"Tipo de error: {type(e)}")
    if hasattr(e, 'response'):
        print(f"Response: {e.response}")
    if hasattr(e, 'request'):
        print(f"Request: {e.request}")
