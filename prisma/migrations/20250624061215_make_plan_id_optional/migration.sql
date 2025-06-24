-- CreateEnum
CREATE TYPE "FunnelStage" AS ENUM ('VISITED', 'UPLOADED', 'PREVIEW_VIEWED', 'PAYMENT_PAGE', 'PAYMENT_INITIATED', 'PAYMENT_COMPLETED');

-- CreateEnum
CREATE TYPE "EmailSequenceStatus" AS ENUM ('ACTIVE', 'PAUSED', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "EmailStatus" AS ENUM ('SCHEDULED', 'SENT', 'OPENED', 'CLICKED', 'FAILED');

-- CreateEnum
CREATE TYPE "ABTestStatus" AS ENUM ('DRAFT', 'ACTIVE', 'PAUSED', 'COMPLETED');

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_planId_fkey";

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "planId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "ConversionEvent" (
    "id" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "properties" JSONB,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "userEmail" TEXT,
    "userAgent" TEXT,
    "ipAddress" TEXT,
    "referrer" TEXT,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConversionEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFunnel" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "funnelStage" "FunnelStage" NOT NULL DEFAULT 'VISITED',
    "contractUploadedAt" TIMESTAMP(3),
    "previewViewedAt" TIMESTAMP(3),
    "paymentPageVisitedAt" TIMESTAMP(3),
    "paymentInitiatedAt" TIMESTAMP(3),
    "paymentCompletedAt" TIMESTAMP(3),
    "isConverted" BOOLEAN NOT NULL DEFAULT false,
    "lastEmailOpenedAt" TIMESTAMP(3),
    "lastEmailClickedAt" TIMESTAMP(3),
    "emailOpenCount" INTEGER NOT NULL DEFAULT 0,
    "emailClickCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserFunnel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventProperty" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "event" TEXT NOT NULL,
    "properties" JSONB NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventProperty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailSequence" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sequenceId" TEXT NOT NULL,
    "status" "EmailSequenceStatus" NOT NULL DEFAULT 'ACTIVE',
    "currentStep" INTEGER NOT NULL DEFAULT 0,
    "totalSteps" INTEGER NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "EmailSequence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailSequenceEmail" (
    "id" TEXT NOT NULL,
    "sequenceId" TEXT NOT NULL,
    "templateName" TEXT NOT NULL,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "sentAt" TIMESTAMP(3),
    "openedAt" TIMESTAMP(3),
    "clickedAt" TIMESTAMP(3),
    "status" "EmailStatus" NOT NULL DEFAULT 'SCHEDULED',
    "subject" TEXT,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailSequenceEmail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ABTest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "ABTestStatus" NOT NULL DEFAULT 'ACTIVE',
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ABTest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ABTestVariant" (
    "id" TEXT NOT NULL,
    "testId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "isControl" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ABTestVariant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ABTestAssignment" (
    "id" TEXT NOT NULL,
    "testId" TEXT NOT NULL,
    "variantId" TEXT NOT NULL,
    "userId" TEXT,
    "userEmail" TEXT,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ABTestAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ABTestConversion" (
    "id" TEXT NOT NULL,
    "assignmentId" TEXT NOT NULL,
    "conversionType" TEXT NOT NULL,
    "amount" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ABTestConversion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserFunnel_userId_key" ON "UserFunnel"("userId");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConversionEvent" ADD CONSTRAINT "ConversionEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFunnel" ADD CONSTRAINT "UserFunnel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventProperty" ADD CONSTRAINT "EventProperty_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailSequence" ADD CONSTRAINT "EmailSequence_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailSequenceEmail" ADD CONSTRAINT "EmailSequenceEmail_sequenceId_fkey" FOREIGN KEY ("sequenceId") REFERENCES "EmailSequence"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ABTestVariant" ADD CONSTRAINT "ABTestVariant_testId_fkey" FOREIGN KEY ("testId") REFERENCES "ABTest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ABTestAssignment" ADD CONSTRAINT "ABTestAssignment_testId_fkey" FOREIGN KEY ("testId") REFERENCES "ABTest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ABTestAssignment" ADD CONSTRAINT "ABTestAssignment_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "ABTestVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ABTestAssignment" ADD CONSTRAINT "ABTestAssignment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ABTestConversion" ADD CONSTRAINT "ABTestConversion_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "ABTestAssignment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
