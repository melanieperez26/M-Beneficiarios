import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { GraphQLClient } from 'graphql-request';
import { AppModule } from './../src/app.module';

describe('App (e2e)', () => {
  let app: INestApplication;
  let client: GraphQLClient;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    await app.listen(0); // Use random available port
    
    // Create GraphQL client
    const url = `http://localhost:${app.getHttpServer().address().port}/graphql`;
    client = new GraphQLClient(url);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to query the GraphQL server', async () => {
    // Consulta simple para verificar que el servidor GraphQL está funcionando
    const query = `
      query {
        __schema {
          types {
            name
          }
        }
      }
    `;
    
    try {
      interface SchemaResponse {
        __schema: {
          types: Array<{ name: string }>;
        };
      }
      
      const response = await client.request<SchemaResponse>(query);
      expect(response).toHaveProperty('__schema');
      expect(Array.isArray(response.__schema.types)).toBe(true);
    } catch (error) {
      console.error('GraphQL Schema Error:', error);
      throw error;
    }
  });
});
