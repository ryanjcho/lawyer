import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function deleteContractData() {
  console.log('Deleting contract data from database...');
  
  try {
    // Delete in order to respect foreign key constraints
    await prisma.$transaction([
      // Delete related records first
      prisma.comment.deleteMany(),
      prisma.calendarEvent.deleteMany(),
      prisma.approvalWorkflowStep.deleteMany(),
      prisma.approvalWorkflow.deleteMany(),
      prisma.documentSync.deleteMany(),
      prisma.collaborationSessionParticipant.deleteMany(),
      prisma.collaborationSession.deleteMany(),
      
      // Finally delete the contracts
      prisma.contract.deleteMany(),
    ]);

    console.log('Successfully deleted all contract data from database');
  } catch (error) {
    console.error('Error deleting contract data:', error);
    throw error;
  }
}

async function main() {
  try {
    console.log('Starting contract data deletion...');
    await deleteContractData();
    console.log('Successfully deleted all contract data from database');
  } catch (error) {
    console.error('Error during deletion:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 