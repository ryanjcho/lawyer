import { validateEnvironment } from '@/config/env.config';
import { getRedisClient } from './redis';
import { prisma } from './prisma';

export async function initializeServices(): Promise<void> {
  console.log('🚀 Initializing services...');

  try {
    // Validate environment variables
    validateEnvironment();
    console.log('✅ Environment validation passed');

    // Test database connection
    await prisma.$connect();
    console.log('✅ Database connection established');

    // Test Redis connection
    const redis = getRedisClient();
    await redis.ping();
    console.log('✅ Redis connection established');

    console.log('🎉 All services initialized successfully');
  } catch (error) {
    console.error('❌ Service initialization failed:', error);
    process.exit(1);
  }
}

export async function cleanupServices(): Promise<void> {
  console.log('🧹 Cleaning up services...');

  try {
    await prisma.$disconnect();
    console.log('✅ Database connection closed');

    const redis = getRedisClient();
    await redis.quit();
    console.log('✅ Redis connection closed');

    console.log('🎉 All services cleaned up successfully');
  } catch (error) {
    console.error('❌ Service cleanup failed:', error);
  }
} 