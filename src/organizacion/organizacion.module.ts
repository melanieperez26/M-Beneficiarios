import { Module } from '@nestjs/common';
import { OrganizacionService } from './organizacion.service';
import { OrganizacionController } from './organizacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organizacion } from './entities/organizacion.entity';

@Module({
  controllers: [OrganizacionController],
  providers: [OrganizacionService],
  imports: [TypeOrmModule.forFeature([Organizacion])],
  exports: [TypeOrmModule],
})
export class OrganizacionModule {}
