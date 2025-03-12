import { PrismaClient } from '@steadystart/prisma';
import { ConfigKeys } from '../types/ConfigKeys';
import { defaultValues } from './defaultValues';

export class Config {
  private prisma: PrismaClient;

  constructor(options: { prisma: PrismaClient }) {
    this.prisma = options.prisma;
  }

  async get<T extends keyof ConfigKeys>(key: T): Promise<ConfigKeys[T]> {
    const config = await this.prisma.config.findUnique({
      where: { key },
    });

    if (config) {
      return config.value as ConfigKeys[T];
    }

    const defaultValue = defaultValues[key] as ConfigKeys[T];

    if (defaultValue !== undefined) {
      await this.prisma.config.create({
        data: { key, value: defaultValue as any },
      });

      return defaultValue;
    }

    throw new Error(`No value or default found for key: ${key}`);
  }

  async getMany<T extends keyof ConfigKeys>(keys: T[]): Promise<{ [K in T]: ConfigKeys[K] }> {
    const result = {} as { [K in T]: ConfigKeys[K] };

    for (const key of keys) {
      result[key] = await this.get(key);
    }

    return result;
  }

  async getAll(): Promise<{ [K in keyof ConfigKeys]: ConfigKeys[K] }> {
    const configs = await this.prisma.config.findMany();
    const result = Object.fromEntries(configs.map((c) => [c.key, c.value])) as { [K in keyof ConfigKeys]: ConfigKeys[K] };

    return { ...defaultValues, ...result };
  }

  async update<T extends keyof ConfigKeys>(key: T, value: ConfigKeys[T]): Promise<ConfigKeys[T]> {
    const config = await this.prisma.config.upsert({
      where: { key },
      update: { value: value as any },
      create: { key, value: value as any },
    });

    return config.value as ConfigKeys[T];
  }
}
