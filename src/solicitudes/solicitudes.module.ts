import { Module } from '@nestjs/common';
import { SolicitudesService } from './solicitudes.service';
import { SolicitudesResolver } from './solicitudes.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Solicitude } from './entities/solicitude.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Solicitude])],
  providers: [SolicitudesResolver, SolicitudesService],
  exports: [TypeOrmModule],
})
export class SolicitudesModule {}
