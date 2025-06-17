import { z } from 'zod'

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url(),
  
  // I'mport
  IMP_KEY: z.string().min(1),
  IMP_SECRET: z.string().min(1),
  IMP_USER_CODE: z.string().min(1),
  IMP_ACCESS_TOKEN_URL: z.string().url().default('https://api.iamport.kr/users/getToken'),
  IMP_PAYMENT_VERIFY_URL: z.string().url().default('https://api.iamport.kr/payments/'),
  
  // Node Environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
})

// Parse and validate environment variables
const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.format())
  throw new Error('Invalid environment variables')
}

export const env = parsedEnv.data

// Type declaration for process.env
declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
} 