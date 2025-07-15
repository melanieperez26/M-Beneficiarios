import { Injectable } from '@nestjs/common';
import { CreateSolicitudeInput } from './dto/create-solicitude.input';
import { UpdateSolicitudeInput } from './dto/update-solicitude.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Solicitude } from './entities/solicitude.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SolicitudesService {
  constructor(
    @InjectRepository(Solicitude)
    private readonly solicitudeRepository: Repository<Solicitude>,
  ) {}

  async create(createSolicitudeInput: CreateSolicitudeInput): Promise<Solicitude> {
    const solicitude = this.solicitudeRepository.create(createSolicitudeInput);
    return this.solicitudeRepository.save(solicitude);
  }

  async findAll(): Promise<Solicitude[]> {
    return this.solicitudeRepository.find();
  }

  async findOne(id: string): Promise<Solicitude | null> {
    return this.solicitudeRepository.findOneBy({ id });
  }

  async update(id: string, updateSolicitudeInput: UpdateSolicitudeInput): Promise<Solicitude | null> {
    const solicitude = await this.solicitudeRepository.preload(updateSolicitudeInput);
    if (!solicitude) {
      throw new Error(`Solicitude no encontrada`);
    }
    return this.solicitudeRepository.save(solicitude);
  }

  async remove(id: string): Promise<Solicitude | null> {
    const solicitude = await this.solicitudeRepository.findOne({ where: { id } });
    if (!solicitude) {
      throw new Error(`Solicitude no encontrada`);
    }
    await this.solicitudeRepository.remove(solicitude);
    return {...solicitude, id};
  }
}
