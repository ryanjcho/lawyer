import { getRedisClient } from './redis';
import { envConfig } from '@/config/env.config';

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  keyPrefix?: string;
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetTime: Date;
  retryAfter?: number;
}

export class RateLimitService {
  private static instance: RateLimitService;
  private config: RateLimitConfig;

  private constructor() {
    this.config = {
      windowMs: envConfig.security.rateLimit.windowMs,
      maxRequests: envConfig.security.rateLimit.maxRequests,
      keyPrefix: 'rate_limit:'
    };
  }

  public static getInstance(): RateLimitService {
    if (!RateLimitService.instance) {
      RateLimitService.instance = new RateLimitService();
    }
    return RateLimitService.instance;
  }

  /**
   * Check if a request is allowed based on rate limiting
   */
  async checkRateLimit(identifier: string, customConfig?: Partial<RateLimitConfig>): Promise<RateLimitResult> {
    const config = { ...this.config, ...customConfig };
    const redis = getRedisClient();
    
    try {
      const key = `${config.keyPrefix}${identifier}`;
      const now = Date.now();
      const windowStart = now - config.windowMs;

      // Use Redis pipeline for atomic operations
      const pipeline = redis.pipeline();
      
      // Remove old entries outside the window
      pipeline.zremrangebyscore(key, 0, windowStart);
      
      // Count current requests in the window
      pipeline.zcard(key);
      
      // Add current request timestamp
      pipeline.zadd(key, now, `${now}-${Math.random()}`);
      
      // Set expiration on the key
      pipeline.expire(key, Math.ceil(config.windowMs / 1000));
      
      const results = await pipeline.exec();
      
      if (!results) {
        throw new Error('Redis pipeline execution failed');
      }

      const currentCount = results[1][1] as number;
      const isAllowed = currentCount < config.maxRequests;
      
      const remaining = Math.max(0, config.maxRequests - currentCount);
      const resetTime = new Date(now + config.windowMs);

      if (!isAllowed) {
        // Calculate retry after time
        const oldestRequest = await redis.zrange(key, 0, 0, 'WITHSCORES');
        if (oldestRequest.length > 0) {
          const oldestTime = parseInt(oldestRequest[1]);
          const retryAfter = Math.ceil((oldestTime + config.windowMs - now) / 1000);
          return {
            success: false,
            remaining: 0,
            resetTime,
            retryAfter
          };
        }
      }

      return {
        success: isAllowed,
        remaining,
        resetTime
      };
    } catch (error) {
      console.error('Rate limit check error:', error);
      
      // If Redis is down, allow the request but log the error
      return {
        success: true,
        remaining: config.maxRequests - 1,
        resetTime: new Date(Date.now() + config.windowMs)
      };
    }
  }

  /**
   * Get rate limit info for an identifier
   */
  async getRateLimitInfo(identifier: string): Promise<RateLimitResult> {
    const redis = getRedisClient();
    const key = `${this.config.keyPrefix}${identifier}`;
    
    try {
      const now = Date.now();
      const windowStart = now - this.config.windowMs;
      
      // Remove old entries and count current ones
      await redis.zremrangebyscore(key, 0, windowStart);
      const currentCount = await redis.zcard(key);
      
      const remaining = Math.max(0, this.config.maxRequests - currentCount);
      const resetTime = new Date(now + this.config.windowMs);
      
      return {
        success: currentCount < this.config.maxRequests,
        remaining,
        resetTime
      };
    } catch (error) {
      console.error('Get rate limit info error:', error);
      return {
        success: true,
        remaining: this.config.maxRequests,
        resetTime: new Date(Date.now() + this.config.windowMs)
      };
    }
  }

  /**
   * Reset rate limit for an identifier
   */
  async resetRateLimit(identifier: string): Promise<void> {
    const redis = getRedisClient();
    const key = `${this.config.keyPrefix}${identifier}`;
    
    try {
      await redis.del(key);
    } catch (error) {
      console.error('Reset rate limit error:', error);
    }
  }

  /**
   * Get rate limit headers for HTTP response
   */
  getRateLimitHeaders(result: RateLimitResult): Record<string, string> {
    const headers: Record<string, string> = {
      'X-RateLimit-Limit': this.config.maxRequests.toString(),
      'X-RateLimit-Remaining': result.remaining.toString(),
      'X-RateLimit-Reset': Math.floor(result.resetTime.getTime() / 1000).toString(),
    };

    if (!result.success && result.retryAfter) {
      headers['Retry-After'] = result.retryAfter.toString();
    }

    return headers;
  }
} 