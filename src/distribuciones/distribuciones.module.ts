import { Module } from '@nestjs/common';
import { DistribucionesService } from './distribuciones.service';
import { DistribucionesResolver } from './distribuciones.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Distribucione } from './entities/distribucione.entity';
import { Organizacione } from 'src/organizaciones/entities/organizacione.entity';
import { RutasOptima } from 'src/rutas-optimas/entities/rutas-optima.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Distribucione, Organizacione, RutasOptima])],
  providers: [DistribucionesResolver, DistribucionesService],
  exports: [TypeOrmModule],
})
export class DistribucionesModule {}
 