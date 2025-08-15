import { createPrismaClient, PrismaClient } from '@steadystart/prisma';
import * as path from 'path';
import { v1, v4 } from 'uuid';
import { exec } from '../utils/exec';

export interface TestDatabaseOrchestratorOptions {
  host?: string;
  port?: string;
  user?: string;
  password?: string;
  databaseName?: string;
  serviceName?: string;
}

export class TestDatabaseOrchestrator {
  public host: string;
  public port: string;
  public user: string;
  public password: string;
  public name: string;
  private serviceName: string;

  constructor({
    host = 'localhost',
    port = '5454',
    user = 'postgres',
    password = 'mysecretpassword',
    databaseName,
    serviceName = 'test-db',
  }: TestDatabaseOrchestratorOptions = {}) {
    this.host = host;
    this.port = port;
    this.user = user;
    this.password = password;

    if (databaseName) {
      this.name = databaseName;
    } else {
      const uniqueString = v4() + v1();
      this.name = `a${uniqueString}`.split('-').join('');
    }

    this.serviceName = serviceName;
  }

  public getConnectionString(): string {
    return `postgresql://${this.user}:${this.password}@${this.host}:${this.port}/${this.name}`;
  }

  public getDirectConnectionString(): string {
    return this.getConnectionString();
  }

  public async getTestDatabaseWithPrismaClient(): Promise<PrismaClient> {
    // Check if the docker container exists
    const { stdout } = await exec(`docker ps -a --filter name=${this.serviceName} --format '{{.Names}}'`);

    if (stdout.trim()) {
      // Container exists, check if it's running
      const { stdout: runningStdout } = await exec(`docker ps --filter name=${this.serviceName} --format '{{.Names}}'`);
      if (!runningStdout.trim()) {
        // Container exists but is not running, start it
        await exec(`docker start ${this.serviceName}`);
        await this.waitForDatabase();
      }
    } else {
      // Container doesn't exist, create it
      await this.startDevDb();
    }

    try {
      await this.createDatabase();
    } catch (error) {
      // Database might already exist, which is fine
    }

    await this.loadDatabaseDump();

    const databaseUrl = this.getConnectionString();
    const prisma = createPrismaClient({ datasources: { db: { url: databaseUrl } } });

    return prisma;
  }

  public async createDatabase(): Promise<string> {
    await exec(
      `pnpm cross-env PGPASSWORD=${this.password} psql --command 'CREATE DATABASE "${this.name}"' --host=${this.host} --port=${this.port} --username=${this.user}`,
    );

    return `postgresql://${this.user}:${this.password}@${this.host}:${this.port}/${this.name}`;
  }

  public async loadDatabaseDump(): Promise<void> {
    const resolvedDumpFile = path.resolve(__dirname, '../../src/generated/', 'test.dump.sql');

    const connectionString = this.getConnectionString();

    await exec(`psql ${connectionString} < ${resolvedDumpFile}`);
  }

  public async dropDatabase(): Promise<void> {
    const baseConnectionString = `postgresql://${this.user}:${this.password}@${this.host}:${this.port}`;

    await exec(`psql ${baseConnectionString} -c "DROP DATABASE IF EXISTS ${this.name}"`);
  }

  public async waitForDatabase(): Promise<void> {
    const baseConnection = `postgresql://${this.user}:${this.password}@${this.host}:${this.port}`;

    const client = createPrismaClient({
      datasources: {
        db: {
          url: baseConnection,
        },
      },
    });

    while (true) {
      try {
        await client.$queryRaw`SELECT 1;`;
        break;
      } catch {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }

    await client.$disconnect();
  }

  public async startDevDb(): Promise<void> {
    await this.shutDevDb();

    await exec(
      `docker run --name ${this.serviceName} -p ${this.port}:5432 -e POSTGRES_PASSWORD=${this.password} -d --restart always postgres:12.4 -N 5000`,
    );

    await this.waitForDatabase();
  }

  public async shutDevDb(): Promise<void> {
    await exec(`docker stop ${this.serviceName} || true`);
    await exec(`docker rm ${this.serviceName} || true`);
  }

  public async restartDevDb(): Promise<void> {
    await exec(`docker restart ${this.serviceName} || true`);
    await this.waitForDatabase();
  }
}
