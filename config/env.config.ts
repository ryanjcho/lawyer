export const envConfig = {
  database: {
    url: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/lawyer',
  },
  nextAuth: {
    url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    secret: process.env.NEXTAUTH_SECRET || 'your-nextauth-secret',
  },
  oauth: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    },
    kakao: {
      clientId: process.env.KAKAO_CLIENT_ID || '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
    },
    naver: {
      clientId: process.env.NAVER_CLIENT_ID || '',
      clientSecret: process.env.NAVER_CLIENT_SECRET || '',
    },
  },
  email: {
    smtp: {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      user: process.env.SMTP_USER || '',
      password: process.env.SMTP_PASSWORD || '',
      from: process.env.SMTP_FROM || '',
    },
  },
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
  aws: {
    region: process.env.AWS_REGION || 'ap-northeast-2',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    s3Bucket: process.env.AWS_S3_BUCKET || '',
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
  },
  sentry: {
    dsn: process.env.SENTRY_DSN || '',
  },
  payment: {
    imp: {
      key: process.env.IMP_KEY || '',
      secret: process.env.IMP_SECRET || '',
      userCode: process.env.IMP_USER_CODE || '',
      accessTokenUrl: process.env.IMP_ACCESS_TOKEN_URL || 'https://api.iamport.kr/users/getToken',
      paymentVerifyUrl: process.env.IMP_PAYMENT_VERIFY_URL || 'https://api.iamport.kr/payments/',
    },
  },
  security: {
    rateLimit: {
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10), // 1 minute
      maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '30', 10),
    },
    virusScan: {
      enabled: process.env.VIRUS_SCAN_ENABLED === 'true',
      apiKey: process.env.VIRUS_SCAN_API_KEY || '',
      apiUrl: process.env.VIRUS_SCAN_API_URL || '',
    },
  },
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
  },
} as const;

export type EnvConfig = typeof envConfig;

// Environment validation function
export function validateEnvironment(): void {
  const requiredVars = [
    'DATABASE_URL',
    'NEXTAUTH_SECRET',
    'AWS_S3_BUCKET',
    'AWS_ACCESS_KEY_ID',
    'AWS_SECRET_ACCESS_KEY',
    'OPENAI_API_KEY',
  ];

  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:', missingVars);
    console.error('Please check your .env file and ensure all required variables are set.');
    process.exit(1);
  }

  console.log('✅ Environment variables validated successfully');
} 