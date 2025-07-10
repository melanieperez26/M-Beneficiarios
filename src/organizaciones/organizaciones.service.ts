import { Injectable } from '@nestjs/common';
import { CreateOrganizacioneInput } from './dto/create-organizacione.input';
import { UpdateOrganizacioneInput } from './dto/update-organizacione.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Organizacione } from './entities/organizacione.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrganizacionesService {
  constructor(
    @InjectRepository(Organizacione)
    private readonly organizacioneRepository: Repository<Organizacione>,
  ) {}

  async create(createOrganizacioneInput: CreateOrganizacioneInput): Promise<Organizacione> {
    const organizacione = this.organizacioneRepository.create(createOrganizacioneInput);
    return this.organizacioneRepository.save(organizacione);
  }

  async findAll(): Promise<Organizacione[]> {
    return this.organizacioneRepository.find();
  }

  async findOne(id: string): Promise<Organizacione | null> {
    return this.organizacioneRepository.findOneBy({ id });
  }

  async update(id: string, updateOrganizacioneInput: UpdateOrganizacioneInput): Promise<Organizacione | null> {
    const organizacione = await this.organizacioneRepository.preload(updateOrganizacioneInput );
    if (!organizacione) {
      throw new Error(`Organizacione no encontrada`);
    }
    return this.organizacioneRepository.save(organizacione);
  }

  async remove(id: string): Promise<Organizacione | null> {
    const organizacione = await this.organizacioneRepository.findOne({ where: { id } });
    if (!organizacione) {
      throw new Error(`Organizacione no encontrada`);
    }
    await this.organizacioneRepository.remove(organizacione);
    return {...organizacione, id};
  }
}
