import { Module } from '@nestjs/common';
import { DistribucionService } from './distribucion.service';
import { DistribucionController } from './distribucion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Distribucion } from './entities/distribucion.entity';
import { Organizacion } from 'src/organizacion/entities/organizacion.entity';

@Module({
  controllers: [DistribucionController],
  providers: [DistribucionService],
  imports: [TypeOrmModule.forFeature([Distribucion, Organizacion])],
  exports: [TypeOrmModule],
})
export class DistribucionModule {}
