import { Injectable } from '@nestjs/common';
import { CreateOrganizacionDto } from './dto/create-organizacion.dto';
import { UpdateOrganizacionDto } from './dto/update-organizacion.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Organizacion } from './entities/organizacion.entity';

@Injectable()
export class OrganizacionService {

  constructor(
    @InjectRepository(Organizacion)
    private readonly organizacionRepository: Repository<Organizacion>,
  ) {}


  create(createOrganizacionDto: CreateOrganizacionDto) {
    const organizacion = this.organizacionRepository.create(createOrganizacionDto);
    return this.organizacionRepository.save(organizacion);
  }

  findAll() {
    return this.organizacionRepository.find();
  }

  findOne(id: number) {
    return this.organizacionRepository.findOne({ where: { id } });
  }

  async update(id: number, updateOrganizacionDto: UpdateOrganizacionDto) {
    await this.organizacionRepository.update(id, updateOrganizacionDto);
    return this.organizacionRepository.findOne({ where: { id } });
  }

  remove(id: number) {
    return this.organizacionRepository.delete(id);
  }
}
