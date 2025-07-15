import { Module } from '@nestjs/common';
import { RutasOptimasService } from './rutas-optimas.service';
import { RutasOptimasResolver } from './rutas-optimas.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RutasOptima } from './entities/rutas-optima.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RutasOptima])],
  providers: [RutasOptimasResolver, RutasOptimasService],
  exports: [TypeOrmModule],
})
export class RutasOptimasModule {}
