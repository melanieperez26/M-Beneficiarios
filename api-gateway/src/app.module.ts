import { Module } from '@nestjs/common';
import { GatewayModule } from './gateway/gateway.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { VoluntariadoModule } from './gateway/voluntariado.module';
import { DonantesModule } from './gateway/donantes.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    // Configuración del HttpModule global
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
      headers: {
        'Accept': 'application/json',
      },
    }),
    
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
      context: ({ req, res }) => ({ req, res }),
    }),
    
    GatewayModule,
    VoluntariadoModule,
    DonantesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
