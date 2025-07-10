import { Module } from '@nestjs/common';
import { OrganizacionesService } from './organizaciones.service';
import { OrganizacionesResolver } from './organizaciones.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organizacione } from './entities/organizacione.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Organizacione])],
  providers: [OrganizacionesResolver, OrganizacionesService],
  exports: [TypeOrmModule]
})
export class OrganizacionesModule {}
