import { Module } from '@nestjs/common';
import { OrganizacionModule } from './organizacion/organizacion.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventarioModule } from './inventario/inventario.module';
import { DistribucionModule } from './distribucion/distribucion.module';
import { SolicitudModule } from './solicitud/solicitud.module';
import { RutaOptimaModule } from './ruta-optima/ruta-optima.module';
import { OrganizacionesModule } from './organizaciones/organizaciones.module';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { DistribucionesModule } from './distribuciones/distribuciones.module';
import { InventariosModule } from './inventarios/inventarios.module';
import { RutasOptimasModule } from './rutas-optimas/rutas-optimas.module';
import { SolicitudesModule } from './solicitudes/solicitudes.module';


@Module({
  imports: [OrganizacionModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      autoLoadEntities: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    InventarioModule,
    DistribucionModule,
    SolicitudModule,
    RutaOptimaModule,
    //Graphql 
    OrganizacionesModule,
    DistribucionesModule,
    InventariosModule,
    RutasOptimasModule,
    SolicitudesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
