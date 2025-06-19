import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkDatabase() {
  try {
    console.log('Checking database...');
    
    // Check if admin user exists
    const adminUser = await prisma.user.findUnique({
      where: { email: 'admin@lawscan.com' }
    });
    
    if (adminUser) {
      console.log('✅ Admin user found:');
      console.log('  ID:', adminUser.id);
      console.log('  Email:', adminUser.email);
      console.log('  Name:', adminUser.name);
      console.log('  Role:', adminUser.role);
      console.log('  Email Verified:', adminUser.emailVerified);
      console.log('  Has Password:', !!adminUser.password);
    } else {
      console.log('❌ Admin user not found');
    }
    
    // Check total users
    const userCount = await prisma.user.count();
    console.log('\nTotal users in database:', userCount);
    
    // List all users
    const allUsers = await prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true }
    });
    
    console.log('\nAll users:');
    allUsers.forEach(user => {
      console.log(`  - ${user.email} (${user.name}) - ${user.role}`);
    });
    
  } catch (error) {
    console.error('Error checking database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase(); 