import { Injectable } from '@nestjs/common';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { UpdateSolicitudDto } from './dto/update-solicitud.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Solicitud } from './entities/solicitud.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SolicitudService {
  constructor(
    @InjectRepository(Solicitud)
    private readonly solicitudRepository: Repository<Solicitud>,
  ) {}
  create(createSolicitudDto: CreateSolicitudDto) {
    const solicitud = this.solicitudRepository.create(createSolicitudDto);
    return this.solicitudRepository.save(solicitud);
  }

  findAll() {
    return this.solicitudRepository.find();
  }

  findOne(id: number) {
    return this.solicitudRepository.findOneBy({ id });
  }

  async update(id: number, updateSolicitudDto: UpdateSolicitudDto) {
    await this.solicitudRepository.update(id, updateSolicitudDto);
    return this.solicitudRepository.findOne({ where: { id } });
  }

  remove(id: number) {
    return this.solicitudRepository.delete(id);
  }
}
