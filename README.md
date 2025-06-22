# Módulo Beneficiarios - Banco de Alimentos

Este módulo forma parte de un sistema de banco de alimentos inspirado en el modelo de [BAMX - Banco de Alimentos de México](https://bamx.org.mx/). Permite gestionar organizaciones beneficiarias y su inventario, con soporte para análisis geoespacial y distribución óptima.

## Tecnologías
- FastAPI (Python)
- Supabase (para base de datos compartida)
- Scikit-learn (para clustering)
- OR-Tools (para optimizacion logistica)

## Integracion de IA
Este módulo aplica clustering geográfico (KMeans) para agrupar organizaciones beneficiarias por proximidad. Esto permite optimizar la distribución de alimentos mediante agrupación regional, inspirado en el modelo logístico del Banco de Alimentos de México (BAMX), pero adaptado a zonas del Ecuador.

## Estructura del Proyecto
main.py: Punto de entrada de la aplicación FastAPI.

routers/: Rutas para beneficiarios, organizaciones, inventarios, etc.

models/: Definición de esquemas y validaciones Pydantic.

database/: Configuración y conexión con Supabase.

clustering/: Código para análisis y agrupamiento geográfico.

tests/: Pruebas automáticas.

## Instalación y Ejecución
Clona el repositorio:

git clone https://github.com/melanieperez26/M-Beneficiarios.git

Crea y activa un entorno virtual:

python -m venv venv
Windows

.\venv\Scripts\activate
Linux/Mac

source venv/bin/activate

Instala las dependencias:

pip install -r requirements.txt


Configura las variables de entorno para Supabase:

SUPABASE_URL=https://tusupabase.supabase.co
SUPABASE_KEY=tu_api_key_secreta

Ejecuta la aplicación:r

uvicorn main:app --reload

Abre la documentación interactiva en tu navegador:

http://127.0.0.1:8000/docs

## Uso: 

Gestiona organizaciones beneficiarias y su inventario con endpoints CRUD.

Visualiza y utiliza agrupamientos geográficos para optimizar la distribución.

Ejecuta pruebas con:

python -m pytest