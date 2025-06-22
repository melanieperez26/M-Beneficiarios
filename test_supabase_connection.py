from supabase import create_client
import os
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_KEY')

if not SUPABASE_URL or not SUPABASE_KEY:
    print("Error: Las variables de entorno no están configuradas")
    print(f"SUPABASE_URL: {SUPABASE_URL}")
    print(f"SUPABASE_KEY: {SUPABASE_KEY}")
    exit(1)

print(f"Intentando conectar a Supabase con URL: {SUPABASE_URL}")

try:
    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
    print("Conexión exitosa a Supabase!")
    
    # Intentar una consulta simple para verificar que funciona
    try:
        response = supabase.table("beneficiary_organizations").select("*").limit(1).execute()
        print("Consulta exitosa!")
        if response.data:
            print("Datos encontrados:")
            print(response.data)
        else:
            print("No se encontraron datos en la tabla")
    except Exception as e:
        print(f"Error al ejecutar consulta: {str(e)}")
        
except Exception as e:
    print(f"Error al conectar a Supabase: {str(e)}")
