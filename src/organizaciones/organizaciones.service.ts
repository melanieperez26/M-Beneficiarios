import { Injectable } from '@nestjs/common';
import { CreateOrganizacioneInput } from './dto/create-organizacione.input';
import { UpdateOrganizacioneInput } from './dto/update-organizacione.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Organizacione } from './entities/organizacione.entity';
import { Repository } from 'typeorm';
import { WebSocketClientService } from 'src/websocket-client.service';

@Injectable()
export class OrganizacionesService {
  constructor(
    @InjectRepository(Organizacione)
    private readonly organizacioneRepository: Repository<Organizacione>,
    private readonly wsClient: WebSocketClientService,
  ) {}

  async create(createOrganizacioneInput: CreateOrganizacioneInput): Promise<Organizacione> {
    const organizacione = this.organizacioneRepository.create(createOrganizacioneInput);
    const saved = await this.organizacioneRepository.save(organizacione);

    this.wsClient.emitirEvento('nueva-organizacion', saved);

    return saved;
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
    const updated = await this.organizacioneRepository.save(organizacione);

    this.wsClient.emitirEvento('organizacion-actualizada', updated); // ✅ nuevo evento

    return updated;
  }

  async remove(id: string): Promise<Organizacione | null> {
    const organizacione = await this.organizacioneRepository.findOne({ where: { id } });
    if (!organizacione) {
      throw new Error(`Organizacione no encontrada`);
    }
    await this.organizacioneRepository.remove(organizacione);

    this.wsClient.emitirEvento('organizacion-eliminada', { id }); // ✅ nuevo evento

    return { ...organizacione, id };
  }
}
