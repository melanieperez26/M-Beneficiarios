import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const testDatabaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.TEST_DB_HOST || 'localhost',
  port: parseInt(process.env.TEST_DB_PORT || '5432', 10),
  username: process.env.TEST_DB_USER || 'postgres',
  password: process.env.TEST_DB_PASSWORD || 'postgres',
  database: process.env.TEST_DB_NAME || 'test_db',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  dropSchema: true, // Drops the schema on each connection - only for testing!
  logging: false,
  retryAttempts: 1,
  retryDelay: 1000,
};
