import { Injectable } from '@nestjs/common';
import { CreateInventarioInput } from './dto/create-inventario.input';
import { UpdateInventarioInput } from './dto/update-inventario.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventario } from './entities/inventario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InventariosService {
  constructor(
    @InjectRepository(Inventario)
    private inventarioRepository: Repository<Inventario>,
  ) {}

  async create(createInventarioInput: CreateInventarioInput): Promise<Inventario> {
    const inevnatrio = this.inventarioRepository.create(createInventarioInput);
    return this.inventarioRepository.save(inevnatrio);
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
    return this.inventarioRepository.save(inventario);
  }

  async remove(id: string): Promise<Inventario> {
    const inventario = await this.inventarioRepository.findOne({ where: { id } });
    if (!inventario) {
      throw new Error('Inventario no encontrado');
    }
    await this.inventarioRepository.remove(inventario);
    return {...inventario, id};
  }
}
