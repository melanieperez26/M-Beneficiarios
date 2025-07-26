import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { gql } from 'graphql-tag';
import { SolicitudesModule } from '../../src/solicitudes/solicitudes.module';
import { Solicitude } from '../../src/solicitudes/entities/solicitude.entity';
import { GraphQLClient } from 'graphql-request';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';

declare const global: any;

describe('SolicitudesResolver (e2e)', () => {
  let app: INestApplication;
  let client: GraphQLClient;
  let solicitudesRepository: Repository<Solicitude>;
  let testSolicitude: Solicitude;

  beforeAll(async () => {
    // Create test database connection with proper typing
    const testDbConfig: any = {
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'test_db',
      entities: [Solicitude],
      synchronize: true,
      dropSchema: true, // Be careful with this in production!
      logging: process.env.TYPEORM_LOGGING === 'true',
      migrationsRun: true,
      migrations: [join(__dirname, '../../src/migrations/*{.ts,.js}')],
      migrationsTableName: 'migrations',
    };

    const dataSource = new DataSource(testDbConfig);
    await dataSource.initialize();

    const moduleBuilder = Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env.test',
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          sortSchema: true,
          playground: false,
        }),
        TypeOrmModule.forRoot(testDbConfig),
        SolicitudesModule,
      ],
    });

    const moduleFixture = await moduleBuilder.compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    await app.listen(0); // Use random available port
    
    // Create GraphQL client
    const url = `http://localhost:${app.getHttpServer().address().port}/graphql`;
    client = new GraphQLClient(url);
    
    // Get the repository for test data setup
    solicitudesRepository = moduleFixture.get<Repository<Solicitude>>(
      getRepositoryToken(Solicitude),
    );

    // Clear any existing data
    await solicitudesRepository.clear();

    // Create test data with all required fields and a valid UUID
    testSolicitude = await solicitudesRepository.save({
      id: '123e4567-e89b-12d3-a456-426614174000', // Valid UUID format
      productos_necesitados: 'Alimentos no perecederos, agua embotellada',
      urgencia: 'Alta',
      organizacionId: 1
    } as any); // Type assertion to bypass type checking
  });

  afterAll(async () => {
    if (solicitudesRepository) {
      try {
        await solicitudesRepository.clear();
      } catch (error) {
        console.error('Error cleaning up test data:', error);
      }
    }
    if (app) {
      await app.close();
    }
  });

  describe('Solicitudes Queries', () => {
    it('should return an array of solicitudes', async () => {
      const query = gql`
        query GetSolicitudes {
          solicitudes {
            id
            productos_necesitados
            urgencia
            organizacionId
          }
        }
      `;

      interface Solicitud {
        id: string;
        productos_necesitados: string;
        urgencia: string;
        organizacionId: number;
      }

      interface ResponseData {
        solicitudes: Solicitud[];
      }
      
      try {
        const response = await client.request<ResponseData>(query);
        expect(response).toHaveProperty('solicitudes');
        expect(Array.isArray(response.solicitudes)).toBe(true);
      } catch (error) {
        console.error('GraphQL Error:', error.response?.errors || error);
        throw error;
      }
    });
  });

  describe('Solicitudes Mutations', () => {
    it('should create a new solicitud', async () => {
      const createSolicitud = gql`
        mutation CreateSolicitud($input: CreateSolicitudeInput!) {
          createSolicitude(createSolicitudeInput: $input) {
            id
            productos_necesitados
            urgencia
            organizacionId
          }
        }
      `;

      const variables = {
        input: {
          productos_necesitados: 'Alimentos no perecederos, agua embotellada',
          urgencia: 'Alta',
          organizacionId: 1
        }
      };

      interface CreateSolicitudResponse {
        createSolicitude: {
          id: string;
          productos_necesitados: string;
          urgencia: string;
          organizacionId: number;
        };
      }

      try {
        const response = await client.request<{ createSolicitude: CreateSolicitudResponse }>({
          document: createSolicitud,
          variables
        });

        expect(response).toHaveProperty('createSolicitude');
        expect(response.createSolicitude).toMatchObject({
          productos_necesitados: 'Alimentos no perecederos, agua embotellada',
          urgencia: 'Alta',
          organizacionId: 1
        });
      } catch (error) {
        console.error('GraphQL Error:', error.response?.errors || error);
        throw error;
      }
    });
  });
});
