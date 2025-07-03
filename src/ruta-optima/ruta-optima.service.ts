import { Injectable } from '@nestjs/common';
import { CreateRutaOptimaDto } from './dto/create-ruta-optima.dto';
import { UpdateRutaOptimaDto } from './dto/update-ruta-optima.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RutaOptima } from './entities/ruta-optima.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RutaOptimaService {
  constructor(
    @InjectRepository(RutaOptima)
    private readonly rutaOptimaRepository: Repository<RutaOptima>,
  ) {}

  create(createRutaOptimaDto: CreateRutaOptimaDto) {
    const rutaOptima = this.rutaOptimaRepository.create(createRutaOptimaDto);
    return this.rutaOptimaRepository.save(rutaOptima);
  }

  findAll() {
    return this.rutaOptimaRepository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  findOne(id: number) {
    return this.rutaOptimaRepository.findOneBy({ id });
  }

  async update(id: number, updateRutaOptimaDto: UpdateRutaOptimaDto) {
    await this.rutaOptimaRepository.update(id, updateRutaOptimaDto);
    return this.findOne(id);
  } 

  remove(id: number) {
    return this.rutaOptimaRepository.delete(id);
  }
}
