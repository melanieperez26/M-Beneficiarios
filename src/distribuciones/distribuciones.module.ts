import { Module } from '@nestjs/common';
import { DistribucionesService } from './distribuciones.service';
import { DistribucionesResolver } from './distribuciones.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Distribucione } from './entities/distribucione.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Distribucione])],
  providers: [DistribucionesResolver, DistribucionesService],
  exports: [TypeOrmModule],
})
export class DistribucionesModule {}
 