# Módulo Beneficiarios - Banco de Alimentos

Este módulo forma parte de un sistema de banco de alimentos inspirado en el modelo de [BAMX - Banco de Alimentos de México](https://bamx.org.mx/). Permite gestionar organizaciones beneficiarias y su inventario, con soporte para análisis geoespacial y distribución óptima.

## Tecnologías
- FastAPI (Python)
- Supabase (para base de datos compartida)
- Scikit-learn / OR-Tools (IA - no incluido en esta versión base)

## Integracion de IA
Este módulo aplica clustering geográfico (KMeans) para agrupar organizaciones beneficiarias por proximidad. Esto permite optimizar la distribución de alimentos mediante agrupación regional, inspirado en el modelo logístico del Banco de Alimentos de México (BAMX), pero adaptado a zonas del Ecuador.