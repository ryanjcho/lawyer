-- CreateEnum
CREATE TYPE "ContractStatus" AS ENUM ('UPLOADED', 'PROCESSING', 'REVIEW', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "RiskLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateTable
CREATE TABLE "Contract" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "status" "ContractStatus" NOT NULL DEFAULT 'UPLOADED',
    "riskLevel" "RiskLevel",
    "assignedLawyerId" TEXT,
    "analysisResult" JSONB,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_assignedLawyerId_fkey" FOREIGN KEY ("assignedLawyerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
