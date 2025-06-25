import { Module } from '@nestjs/common';
import { DistribucionService } from './distribucion.service';
import { DistribucionController } from './distribucion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Distribucion } from './entities/distribucion.entity';

@Module({
  controllers: [DistribucionController],
  providers: [DistribucionService],
  imports: [TypeOrmModule.forFeature([Distribucion])],
  exports: [TypeOrmModule],
})
export class DistribucionModule {}
