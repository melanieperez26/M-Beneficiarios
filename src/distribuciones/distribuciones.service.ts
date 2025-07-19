import { Injectable } from '@nestjs/common';
import { CreateDistribucioneInput } from './dto/create-distribucione.input';
import { UpdateDistribucioneInput } from './dto/update-distribucione.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Distribucione } from './entities/distribucione.entity';
import { Repository } from 'typeorm';
import { Organizacione } from 'src/organizaciones/entities/organizacione.entity';
import { RutasOptima } from 'src/rutas-optimas/entities/rutas-optima.entity';
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
export class DistribucionesService {
  constructor(
    @InjectRepository(Distribucione)
    private readonly distribucioneRepository: Repository<Distribucione>,

    @InjectRepository(Organizacione)
    private readonly organizacioneRepository: Repository<Organizacione>,

    @InjectRepository(RutasOptima)
    private readonly rutasOptimaRepository: Repository<RutasOptima>,
  ) {}
  
  async create(createDistribucioneInput: CreateDistribucioneInput): Promise<Distribucione> {
    const distribucione = this.distribucioneRepository.create(createDistribucioneInput);
    return this.distribucioneRepository.save(distribucione);
  }

  async findAll(): Promise<Distribucione[]> {
    return this.distribucioneRepository.find();
  }

  async findOne(id: string): Promise<Distribucione | null> {
    return this.distribucioneRepository.findOneBy({ id });
  }

  async update(id: string, updateDistribucioneInput: UpdateDistribucioneInput): Promise<Distribucione> {
    const distribuciones = await this.distribucioneRepository.preload(updateDistribucioneInput);
    if (!distribuciones) {
      throw new Error('Distribuciones no encontrada');
    }
    return this.distribucioneRepository.save(distribuciones);
  }

  async remove(id: string): Promise<Distribucione> {
    const distribucione = await this.distribucioneRepository.findOne({ where: { id } });
    if (!distribucione) {
      throw new Error('Distribuciones no encontrada');
    }
    this.distribucioneRepository.remove(distribucione);
    return {...distribucione, id};

  }

  //IA para optimizar rutas agrupando organizaciones por proximidad
  async optimizeRoute(maxClusters: number = 3, distribucionId: string) {
    const organizacione = await this.organizacioneRepository.find();

    // Filtrar organizaciones con coordenadas válidas
    const puntos = organizacione
      .filter((o) => o.lat !== null && o.lng !== null)
      .map((o) => [o.lat, o.lng]);

    if (puntos.length < maxClusters) {
      return {
        mensaje: 'No hay suficientes organizaciones para agrupar',
        resultado: []
      };
    }

    await this.rutasOptimaRepository.delete({ distribucionId });

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
      const org = organizacione.find((o) => o.lat === lat && o.lng === lng);
      return org?.nombre ?? 'Org. desconocida';
    });

    let distanciaTotal = 0;
    for (let j = 0; j < cluster.length - 1; j++) {
      const [lat1, lng1] = cluster[j];
      const [lat2, lng2] = cluster[j + 1];
      distanciaTotal += calcularDistancia(lat1, lng1, lat2, lng2);
    }

    //Guardar en la tabla RutasOptima
    const nuevaRuta = this.rutasOptimaRepository.create({
      secuencia: JSON.stringify(secuencia),
      distancia: distanciaTotal,
      distribucionId,
    });

    await this.rutasOptimaRepository.save(nuevaRuta);
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

  async getRutasOptimas(distribucionId: string){
    return this.rutasOptimaRepository.find({ where: { distribucionId }, order: {id: 'ASC'} });
  } 
}
