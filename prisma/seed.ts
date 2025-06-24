import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Hash passwords
  const adminPassword = await bcrypt.hash('admin123', 10)
  const testPassword = await bcrypt.hash('test123', 10)

  // Seed only users or other necessary data for the quote-based model
  // Example: create an admin user
  await prisma.user.upsert({
    where: { email: 'admin@lawscan.com' },
    update: { password: adminPassword },
    create: {
      email: 'admin@lawscan.com',
      name: 'Admin User',
      password: adminPassword,
      emailVerified: new Date(),
      role: 'ADMIN',
    },
  });

  // Test client user
  await prisma.user.upsert({
    where: { email: 'test@lawscan.com' },
    update: { password: testPassword },
    create: {
      email: 'test@lawscan.com',
      name: 'Test Client',
      password: testPassword,
      emailVerified: new Date(),
      role: 'USER',
    },
  });

  console.log('Database has been seeded.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 