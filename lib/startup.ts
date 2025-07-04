import { validateEnvironment } from '@/config/env.config';
import { getRedisClient } from './redis';
import { prisma } from './prisma';

export async function initializeServices(): Promise<void> {
  try {
    // Validate environment variables
    validateEnvironment();

    // Test database connection
    await prisma.$connect();

    // Test Redis connection
    const redis = getRedisClient();
    await redis.ping();

    console.log('🎉 All services initialized successfully');
  } catch (error) {
    console.error('❌ Service initialization failed:', error);
    process.exit(1);
  }
}

export async function cleanupServices(): Promise<void> {
  try {
    await prisma.$disconnect();

    const redis = getRedisClient();
    await redis.quit();

    console.log('🎉 All services cleaned up successfully');
  } catch (error) {
    console.error('❌ Service cleanup failed:', error);
  }
} 