import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function testLogin() {
  try {
    console.log('Testing login functionality...')
    
    const email = 'admin@lawscan.com'
    const password = 'admin123'
    
    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    })
    
    if (!user) {
      console.log('❌ User not found')
      return
    }
    
    console.log('✅ User found:', user.email)
    console.log('  Role:', user.role)
    console.log('  Email Verified:', user.emailVerified)
    
    // Test password
    if (!user.password) {
      console.log('❌ User has no password')
      return
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password)
    
    if (isPasswordValid) {
      console.log('✅ Password is valid')
      console.log('✅ Login should work!')
      
      // Return user data that would be in the session
      const userData = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      }
      
      console.log('\nSession data would be:', userData)
    } else {
      console.log('❌ Password is invalid')
    }
    
  } catch (error) {
    console.error('Error testing login:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testLogin() 