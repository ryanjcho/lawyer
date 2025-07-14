import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function createTestUser() {
  try {
    // Check if test admin user already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@test.com' }
    })

    if (existingAdmin) {
      console.log('Test admin user already exists')
    } else {
      // Create test admin user
      const hashedPassword = await bcrypt.hash('password123', 10)
      const user = await prisma.user.create({
        data: {
          name: 'Test Admin',
          email: 'admin@test.com',
          password: hashedPassword,
          role: 'ADMIN',
          company: 'Test Company',
          phone: '010-1234-5678'
        }
      })
      console.log('Test admin user created successfully:', user.email)
    }

    // Check if test client user already exists
    const existingClient = await prisma.user.findUnique({
      where: { email: 'client@test.com' }
    })

    if (existingClient) {
      console.log('Test client user already exists')
    } else {
      // Create test client user
      const hashedPassword = await bcrypt.hash('password123', 10)
      const user = await prisma.user.create({
        data: {
          name: 'Test Client',
          email: 'client@test.com',
          password: hashedPassword,
          role: 'USER',
          company: 'Test Client Company',
          phone: '010-5678-1234'
        }
      })
      console.log('Test client user created successfully:', user.email)
    }
  } catch (error) {
    console.error('Error creating test users:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createTestUser() 