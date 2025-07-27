import { Injectable } from '@nestjs/common';
import { CreateSolicitudeInput } from './dto/create-solicitude.input';
import { UpdateSolicitudeInput } from './dto/update-solicitude.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Solicitude } from './entities/solicitude.entity';
import { Repository } from 'typeorm';
import { WebSocketClientService } from 'src/websocket-client.service';

@Injectable()
export class SolicitudesService {
  constructor(
    @InjectRepository(Solicitude)
    private readonly solicitudeRepository: Repository<Solicitude>,
    private readonly wsClient: WebSocketClientService,
  ) {}

  async create(createSolicitudeInput: CreateSolicitudeInput): Promise<Solicitude> {
    const solicitude = this.solicitudeRepository.create(createSolicitudeInput);
    const saved = await this.solicitudeRepository.save(solicitude);

    this.wsClient.emitirEvento('nueva-solicitude', saved);

    return saved;
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
    const updated = await this.solicitudeRepository.save(solicitude);

    this.wsClient.emitirEvento('solicitude-actualizada', updated); // ✅ nuevo evento

    return updated;
  }

  async remove(id: string): Promise<Solicitude | null> {
    const solicitude = await this.solicitudeRepository.findOne({ where: { id } });
    if (!solicitude) {
      throw new Error(`Solicitude no encontrada`);
    }
    await this.solicitudeRepository.remove(solicitude);

  this.wsClient.emitirEvento('solicitude-eliminada', { id }); // ✅ nuevo evento

  return { ...solicitude, id };
  }
}
