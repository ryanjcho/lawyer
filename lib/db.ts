import { PrismaClient, Prisma } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

// Prevent multiple instances of Prisma Client in development
export const prisma = global.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}

// Export Prisma types
export type { Prisma }

// Database error handling
export class DatabaseError extends Error {
  constructor(message: string, public code?: string) {
    super(message)
    this.name = 'DatabaseError'
  }
}

// Helper function to handle database errors
export function handleDatabaseError(error: unknown): never {
  if (error instanceof Error) {
    if (error.name === 'PrismaClientKnownRequestError') {
      throw new DatabaseError(error.message, (error as any).code)
    }
    if (error.name === 'PrismaClientValidationError') {
      throw new DatabaseError('Invalid data provided')
    }
  }
  throw error
}

export interface PaymentRecord {
  id: string
  userId: string
  planId: string
  amount: number
  status: 'pending' | 'completed' | 'failed'
  impUid: string
  merchantUid: string
  createdAt: Date
  updatedAt: Date
}

export interface SubscriptionRecord {
  id: string
  userId: string
  planId: string
  status: 'active' | 'cancelled' | 'expired'
  startDate: Date
  endDate: Date
  createdAt: Date
  updatedAt: Date
} 