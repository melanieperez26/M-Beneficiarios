import { Module } from '@nestjs/common';
import { GatewayModule } from './gateway/gateway.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { GatewayResolver } from './gateway/gateway.resolver';
import { VoluntariadoModule } from './gateway/voluntariado.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
    }),
    GatewayModule,
    VoluntariadoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
