import { PrismaClient, PlanType } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create plans
  const plans = [
    {
      name: 'Basic Plan',
      price: 10000,
      type: 'BASIC' as PlanType,
      features: ['5 contracts per month', 'Basic contract review', 'Email support'],
    },
    {
      name: 'Professional Plan',
      price: 50000,
      type: 'PROFESSIONAL' as PlanType,
      features: [
        '20 contracts per month',
        'Advanced contract review',
        'Priority support',
        'Custom templates',
      ],
    },
    {
      name: 'Enterprise Plan',
      price: 100000,
      type: 'ENTERPRISE' as PlanType,
      features: [
        'Unlimited contracts',
        'Premium contract review',
        '24/7 support',
        'Custom templates',
        'API access',
        'Dedicated account manager',
      ],
    },
    {
      name: 'Basic Plan (Yearly)',
      price: 100000,
      type: 'BASIC' as PlanType,
      features: ['5 contracts per month', 'Basic contract review', 'Email support'],
    },
    {
      name: 'Professional Plan (Yearly)',
      price: 500000,
      type: 'PROFESSIONAL' as PlanType,
      features: [
        '20 contracts per month',
        'Advanced contract review',
        'Priority support',
        'Custom templates',
      ],
    },
    {
      name: 'Enterprise Plan (Yearly)',
      price: 1000000,
      type: 'ENTERPRISE' as PlanType,
      features: [
        'Unlimited contracts',
        'Premium contract review',
        '24/7 support',
        'Custom templates',
        'API access',
        'Dedicated account manager',
      ],
    },
  ]

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
    })
  }

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