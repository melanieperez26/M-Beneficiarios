// Load environment variables
import { config } from 'dotenv';
import path from 'path';

// Load test environment variables
config({ path: path.resolve(process.cwd(), '.env.test') });

// Set test environment
process.env.NODE_ENV = 'test';

// Increase timeout for tests
jest.setTimeout(30000);

// Global test setup
beforeAll(async () => {
  // Any global test setup can go here
});

afterAll(async () => {
  // Cleanup after all tests
});
