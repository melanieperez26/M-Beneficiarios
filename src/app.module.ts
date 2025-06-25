import { Module } from '@nestjs/common';
import { OrganizacionModule } from './organizacion/organizacion.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventarioModule } from './inventario/inventario.module';
import { DistribucionModule } from './distribucion/distribucion.module';
import { SolicitudModule } from './solicitud/solicitud.module';
import { RutaOptimaModule } from './ruta-optima/ruta-optima.module';

@Module({
  imports: [OrganizacionModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'melanie',
      database: 'beneficiarios_db',
      synchronize: true,
      autoLoadEntities: true,
    }),
    InventarioModule,
    DistribucionModule,
    SolicitudModule,
    RutaOptimaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
