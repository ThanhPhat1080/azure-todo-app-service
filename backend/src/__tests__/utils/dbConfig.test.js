import { describe, it, expect, beforeEach } from 'vitest';
import { buildConnectionString } from '../../utils/dbConfig';

describe('dbConfig', () => {
  beforeEach(() => {
    process.env.DB_SERVER = 'test-server';
    process.env.DB_USER = 'test-user';
    process.env.DB_PASSWORD = 'test-password';
    process.env.DB_NAME = 'test-db';
  });

  it('should build connection string correctly', () => {
    const connectionString = buildConnectionString();
    expect(connectionString).toBe(
      'sqlserver://test-server:1433;database=test-db;user=test-user;password=test-password;encrypt=true;trustServerCertificate=false;connectionTimeout=30'
    );
  });
});