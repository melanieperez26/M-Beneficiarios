import { Injectable } from '@nestjs/common';
import { CreateInventarioInput } from './dto/create-inventario.input';
import { UpdateInventarioInput } from './dto/update-inventario.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventario } from './entities/inventario.entity';
import { Repository } from 'typeorm';
import { WebSocketClientService } from 'src/websocket-client.service';

@Injectable()
export class InventariosService {
  constructor(
    @InjectRepository(Inventario)
    private inventarioRepository: Repository<Inventario>,
    private readonly wsClient: WebSocketClientService,
  ) {}

  async create(createInventarioInput: CreateInventarioInput): Promise<Inventario> {
    const inevnatrio = this.inventarioRepository.create(createInventarioInput);
    const saved = await this.inventarioRepository.save(inevnatrio);

    this.wsClient.emitirEvento('nuevo-inventario', saved);

    return saved;
  }

  async findAll(): Promise<Inventario[]> {
    return this.inventarioRepository.find();
  }

  async findOne(id: string): Promise<Inventario | null> {
    return this.inventarioRepository.findOneBy({id});
  }

  async update(id: string, updateInventarioInput: UpdateInventarioInput): Promise<Inventario> {
    const inventario = await this.inventarioRepository.preload(updateInventarioInput);
    if (!inventario) {
      throw new Error('Inventario no encontrado');
    }
    const updated = await this.inventarioRepository.save(inventario);

    this.wsClient.emitirEvento('inventario-actualizado', updated); // ✅ nuevo evento

    return updated;
  }

  async remove(id: string): Promise<Inventario> {
    const inventario = await this.inventarioRepository.findOne({ where: { id } });
    if (!inventario) {
      throw new Error('Inventario no encontrado');
    }
    await this.inventarioRepository.remove(inventario);

    this.wsClient.emitirEvento('inventario-eliminado', { id }); // ✅ nuevo evento

    return { ...inventario, id };
  }
}
