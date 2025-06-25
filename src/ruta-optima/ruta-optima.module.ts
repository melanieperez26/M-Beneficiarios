import { Module } from '@nestjs/common';
import { RutaOptimaService } from './ruta-optima.service';
import { RutaOptimaController } from './ruta-optima.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RutaOptima } from './entities/ruta-optima.entity';

@Module({
  controllers: [RutaOptimaController],
  providers: [RutaOptimaService],
  imports: [TypeOrmModule.forFeature([RutaOptima])],
  exports: [TypeOrmModule],
})
export class RutaOptimaModule {}
