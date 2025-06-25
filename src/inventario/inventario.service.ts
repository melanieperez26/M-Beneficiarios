import { Injectable } from '@nestjs/common';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventario } from './entities/inventario.entity';

@Injectable()
export class InventarioService {
  constructor(
    @InjectRepository(Inventario) 
    private readonly inventarioRepository: Repository<Inventario>
  ) {}

  create(createInventarioDto: CreateInventarioDto) {
    const inventario = this.inventarioRepository.create(createInventarioDto);
    return this.inventarioRepository.save(inventario);
  }

  findAll() {
    return this.inventarioRepository.find();
  }

  findOne(id: number) {
    return this.inventarioRepository.findOne({ where: { id } });
  }

  async update(id: number, updateInventarioDto: UpdateInventarioDto) {
    await this.inventarioRepository.update(id, updateInventarioDto);
    return this.inventarioRepository.findOne({ where: { id } });
  }

  remove(id: number) {
    return this.inventarioRepository.delete(id);
  }
}
