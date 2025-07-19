import { Injectable } from '@nestjs/common';
import { CreateRutasOptimaInput } from './dto/create-rutas-optima.input';
import { UpdateRutasOptimaInput } from './dto/update-rutas-optima.input';
import { InjectRepository } from '@nestjs/typeorm';
import { RutasOptima } from './entities/rutas-optima.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RutasOptimasService {
  constructor(
    @InjectRepository(RutasOptima)
    private readonly rutasOptimaRepository: Repository<RutasOptima>,
  ) {}

   async create(createRutasOptimaInput: CreateRutasOptimaInput): Promise<RutasOptima> {
    const rutasOptima = this.rutasOptimaRepository.create({
      ...createRutasOptimaInput,
      secuencia: JSON.parse(createRutasOptimaInput.secuencia)
    });
    return this.rutasOptimaRepository.save(rutasOptima);
  }

  async findAll(): Promise<RutasOptima[]> {
    const rutas = await this.rutasOptimaRepository.find({
      order: {
        id: 'DESC',
      },
    });
    return rutas.map(ruta => ({
      ...ruta,
      secuencia: JSON.stringify(ruta.secuencia)
    }));
  }

  async findOne(id: string): Promise<RutasOptima | null> {
    const ruta = await this.rutasOptimaRepository.findOne({
      where: { id },
    });
    if (!ruta) return null;
    return {
      ...ruta,
      secuencia: JSON.stringify(ruta.secuencia)
    };
  }

  async update(id: string, updateRutasOptimaInput: UpdateRutasOptimaInput): Promise<RutasOptima | null> {
    const rutasOptima = await this.rutasOptimaRepository.preload({
      ...updateRutasOptimaInput,
      id,
      secuencia: updateRutasOptimaInput.secuencia ? JSON.parse(updateRutasOptimaInput.secuencia) : undefined
    });
    if (!rutasOptima) {
      throw new Error(`RutasOptima no encontrada`);
    }
    return this.rutasOptimaRepository.save(rutasOptima);
  }

  async remove(id: string): Promise<RutasOptima | null> {
    const rutasOptima = await this.rutasOptimaRepository.findOne({ where: { id } });
    if (!rutasOptima) {
      throw new Error(`RutasOptima no encontrada`);
    }
    await this.rutasOptimaRepository.remove(rutasOptima);
    return {...rutasOptima, id};
  }
}
