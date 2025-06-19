import { PrismaClient, PlanType } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@lawscan.com' },
    update: {},
    create: {
      email: 'admin@lawscan.com',
      name: 'Admin User',
      password: adminPassword,
      emailVerified: new Date(),
      role: 'ADMIN',
    },
  });

  // Create subscription plans
  const plans = [
    {
      name: 'Basic',
      type: 'BASIC' as PlanType,
      price: 9900,
      features: [
        '기본 계약 검토',
        '월 5건 검토',
        '이메일 지원',
      ],
    },
    {
      name: 'Professional',
      type: 'PROFESSIONAL' as PlanType,
      price: 29900,
      features: [
        '전문 계약 검토',
        '월 20건 검토',
        '우선 지원',
        '전문가 상담',
      ],
    },
    {
      name: 'Enterprise',
      type: 'ENTERPRISE' as PlanType,
      price: 99000,
      features: [
        '프리미엄 계약 검토',
        '무제한 검토',
        '24/7 지원',
        '전담 매니저',
        '맞춤형 솔루션',
      ],
    },
  ];

  for (const plan of plans) {
    await prisma.plan.upsert({
      where: {
        name_type: {
          name: plan.name,
          type: plan.type,
        },
      },
      update: plan,
      create: plan,
    });
  }

  console.log('Database has been seeded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 