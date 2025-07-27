import { Module } from '@nestjs/common';
import { InventariosService } from './inventarios.service';
import { InventariosResolver } from './inventarios.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventario } from './entities/inventario.entity';
import { WebSocketClientService } from 'src/websocket-client.service';

@Module({
  imports: [TypeOrmModule.forFeature([Inventario])],
  providers: [InventariosResolver, InventariosService, WebSocketClientService],
  exports: [TypeOrmModule],
})
export class InventariosModule {} 
