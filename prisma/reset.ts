import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function resetDatabase() {
  console.log("🗑️  Starting database reset...");

  try {
    // Delete in order respecting foreign key constraints
    console.log("Deleting post attachments...");
    await prisma.postAttachment.deleteMany({});

    console.log("Deleting initiative posts...");
    await prisma.initiativePost.deleteMany({});

    console.log("Deleting initiative participants...");
    await prisma.initiativeParticipant.deleteMany({});

    console.log("Deleting user initiative ratings...");
    await prisma.userInitiativeRating.deleteMany({});

    console.log("Deleting support requests...");
    await prisma.supportRequest.deleteMany({});

    console.log("Deleting initiatives...");
    await prisma.initiative.deleteMany({});

    console.log("Deleting initiative categories...");
    await prisma.initiativeCategory.deleteMany({});

    console.log("Deleting organizations...");
    await prisma.organization.deleteMany({});

    console.log("Deleting user qualifications...");
    await prisma.userQualification.deleteMany({});

    console.log("Deleting platform ratings...");
    await prisma.platformRating.deleteMany({});

    console.log("Deleting accounts...");
    await prisma.account.deleteMany({});

    console.log("Deleting sessions...");
    await prisma.session.deleteMany({});

    console.log("Deleting verifications...");
    await prisma.verification.deleteMany({});

    console.log("Deleting users...");
    await prisma.user.deleteMany({});

    console.log("✅ Database reset completed successfully!");
  } catch (error) {
    console.error("❌ Error during reset:", error);
    throw error;
  }
}

resetDatabase()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("🔌 Disconnected from database");
  });
