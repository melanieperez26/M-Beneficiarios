import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
import { WebSocketClientService } from './websocket-client.service';


@Module({
  imports: [
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
    //Graphql 
    OrganizacionesModule,
    DistribucionesModule,
    InventariosModule,
    RutasOptimasModule,
    SolicitudesModule
  ],
  controllers: [],
  providers: [WebSocketClientService],
  exports: [WebSocketClientService]
})
export class AppModule {}
