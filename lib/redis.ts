import Redis from 'ioredis';
import { envConfig } from '@/config/env.config';

let redis: Redis | null = null;

export function getRedisClient(): Redis {
  if (!redis) {
    redis = new Redis(envConfig.redis.url, {
      maxRetriesPerRequest: 3,
      lazyConnect: true,
      keepAlive: 30000,
    });

    redis.on('error', (error) => {
      // console.error('Redis connection error:', error);
    });

    redis.on('connect', () => {
      // console.log('✅ Redis connected successfully');
    });

    redis.on('ready', () => {
      // console.log('✅ Redis is ready');
    });
  }

  return redis;
}

export async function closeRedisConnection(): Promise<void> {
  if (redis) {
    await redis.quit();
    redis = null;
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  await closeRedisConnection();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await closeRedisConnection();
  process.exit(0);
}); 