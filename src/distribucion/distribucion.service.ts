import { Injectable } from '@nestjs/common';
import { CreateDistribucionDto } from './dto/create-distribucion.dto';
import { UpdateDistribucionDto } from './dto/update-distribucion.dto';
import { Distribucion } from './entities/distribucion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organizacion } from 'src/organizacion/entities/organizacion.entity';
import kmeans from 'kmeans-ts';
import { map } from 'rxjs';
 
@Injectable()
export class DistribucionService {
  constructor(
    @InjectRepository(Distribucion)
    private readonly distribucionRepository: Repository<Distribucion>,

    @InjectRepository(Organizacion)
    private readonly organizacionRepository: Repository<Organizacion>,
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

  async optimizeRoute(maxClusters: number = 3) {
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
  
    // Ejecutar K-means para obtener la asignación de cluster para cada punto
    const { indexes } = kmeans(puntos, maxClusters, 'kmeans');
  
    // Obtener los clusters únicos (valores únicos en indexes)
    const uniqueClusters = Array.from(new Set(indexes));
  
    // Agrupar puntos por cluster
    const clusters = uniqueClusters.map(clusterIndex => 
      puntos.filter((_, i) => indexes[i] === clusterIndex)
    );
  
    // Construir resultado legible con nombres de organizaciones
    const resultado = clusters.map((cluster, i) => {
      const secuencia = cluster.map(([lat, lng]) => {
        const org = organizaciones.find(o => o.lat === lat && o.lng === lng);
        return org?.nombre ?? 'Org Desconocida';
      });
      return {
        cluster: i + 1,
        secuencia,
        cantidad: cluster.length,
      };
    });
  
    return {
      mensaje: 'Rutas optimizadas - Optimización por IA completada',
      resultado,
    };
  }
}
