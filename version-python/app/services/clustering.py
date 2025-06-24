from sklearn.cluster import KMeans
import numpy as np

def agrupar_organizaciones():
    # Coordenadas de ejemplo en Ecuador
    coordenadas = np.array([
        [-0.2295, -78.5243],  # Quito
        [-0.2200, -78.5120],  # Quito (otro punto)
        [-2.1709, -79.9224],  # Guayaquil
        [-2.1800, -79.9000],  # Guayaquil (otro punto)
        [-3.9931, -79.2042],  # Loja
        [-4.0000, -79.2000]   # Loja (otro punto)
    ])

    modelo = KMeans(n_clusters=3, random_state=0)
    modelo.fit(coordenadas)

    resultados = []
    for i, etiqueta in enumerate(modelo.labels_):
        resultados.append({
            "organizacion_id": i + 1,
            "latitud": coordenadas[i][0],
            "longitud": coordenadas[i][1],
            "cluster": int(etiqueta)
        })

    centros = modelo.cluster_centers_.tolist()

    return {
        "agrupaciones": resultados,
        "centros_de_cluster": centros
    }
