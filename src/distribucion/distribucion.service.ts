import { Injectable } from '@nestjs/common';
import { CreateDistribucionDto } from './dto/create-distribucion.dto';
import { UpdateDistribucionDto } from './dto/update-distribucion.dto';
import { Distribucion } from './entities/distribucion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organizacion } from 'src/organizacion/entities/organizacion.entity';
import { RutaOptima } from 'src/ruta-optima/entities/ruta-optima.entity';
import kmeans from 'kmeans-ts';

function calcularDistancia(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371; // Radio de la Tierra en km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distancia = R * c;
  return distancia;
}
  
 
@Injectable()
export class DistribucionService {
  constructor(
    @InjectRepository(Distribucion)
    private readonly distribucionRepository: Repository<Distribucion>,

    @InjectRepository(Organizacion)
    private readonly organizacionRepository: Repository<Organizacion>,

    @InjectRepository(RutaOptima)
    private readonly rutaOptimaRepository: Repository<RutaOptima>,
  ) {}

  create(createDistribucionDto: CreateDistribucionDto) {
    const distribucion = this.distribucionRepository.create(createDistribucionDto);
    return this.distribucionRepository.save(distribucion);
  }

  findAll() {
    return this.distribucionRepository.find();
  }

  findOne(id: number) {
    return this.distribucionRepository.findOne({ where: { id } });
  }

  async update(id: number, updateDistribucionDto: UpdateDistribucionDto) {
    await this.distribucionRepository.update(id, updateDistribucionDto);
    return this.distribucionRepository.findOne({ where: { id } }); 
  }

  remove(id: number) {
    return this.distribucionRepository.delete(id);
  }

  //IA para optimizar rutas agrupando organizaciones por proximidad

  async optimizeRoute(maxClusters: number = 3, distribucionId: number) {
    const organizaciones = await this.organizacionRepository.find();
  
    // Filtrar organizaciones con coordenadas válidas
    const puntos = organizaciones
      .filter((o) => o.lat !== null && o.lng !== null)
      .map((o) => [o.lat, o.lng]);
  
    if (puntos.length < maxClusters) {
      return {
        message: 'No hay suficientes organizaciones para agrupar',
        total: puntos.length,
      };
    }

    await this.rutaOptimaRepository.delete({ distribucionId });
  
    // Ejecutar K-means para obtener la asignación de cluster para cada punto
    const { indexes } = kmeans(puntos, maxClusters, 'kmeans');

    const clusters: number[][][] = Array.from({ length: maxClusters }, () => []);
    puntos.forEach((p, i) => {
      const clusterIndex = indexes[i];
      clusters[clusterIndex].push(p);
    });

    const resultado: Array<{ cluster: number; secuencia: string[]; distancia: number }> = [];

  
    for (let i = 0; i < clusters.length; i++) {
      const cluster = clusters[i];
  
      const secuencia = cluster.map(([lat, lng]) => {
        const org = organizaciones.find((o) => o.lat === lat && o.lng === lng);
        return org?.nombre ?? 'Org. desconocida';
      });
      
      let distanciaTotal = 0;
      for (let j = 0; j < cluster.length - 1; j++) {
        const [lat1, lng1] = cluster[j];
        const [lat2, lng2] = cluster[j + 1];
        distanciaTotal += calcularDistancia(lat1, lng1, lat2, lng2);
      }

      //Guardar en la tabla RutaOptima
      const nuevaRuta = this.rutaOptimaRepository.create({
        secuencia,
        distancia: distanciaTotal,
        distribucionId,
      });

      await this.rutaOptimaRepository.save(nuevaRuta);
      resultado.push({
        cluster: i + 1,
        secuencia,
        distancia: distanciaTotal,
      });
    }
  
    return {
      mensaje: 'Rutas optimizadas - Optimización por IA completada',
      resultado,
    };
  }

  async getRutasOptimas(distribucionId: number) {
    return this.rutaOptimaRepository.find({ 
      where: { distribucionId },
      order: {id: 'ASC'},
    });
  }
}
