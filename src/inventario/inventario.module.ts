import { Module } from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { InventarioController } from './inventario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventario } from './entities/inventario.entity';

@Module({
  controllers: [InventarioController],
  providers: [InventarioService],
  imports: [TypeOrmModule.forFeature([Inventario])],
  exports: [TypeOrmModule],
})
export class InventarioModule {}
