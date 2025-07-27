import { Module } from '@nestjs/common';
import { OrganizacionesService } from './organizaciones.service';
import { OrganizacionesResolver } from './organizaciones.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organizacione } from './entities/organizacione.entity';
import { WebSocketClientService } from 'src/websocket-client.service';

@Module({
  imports: [TypeOrmModule.forFeature([Organizacione])],
  providers: [OrganizacionesResolver, OrganizacionesService, WebSocketClientService],
  exports: [TypeOrmModule]
})
export class OrganizacionesModule {}
