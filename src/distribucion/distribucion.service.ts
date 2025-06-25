import { Injectable } from '@nestjs/common';
import { CreateDistribucionDto } from './dto/create-distribucion.dto';
import { UpdateDistribucionDto } from './dto/update-distribucion.dto';
import { Distribucion } from './entities/distribucion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DistribucionService {
  constructor(
    @InjectRepository(Distribucion)
    private readonly distribucionRepository: Repository<Distribucion>,
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
}
