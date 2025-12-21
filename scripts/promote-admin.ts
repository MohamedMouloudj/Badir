import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function promoteToAdmin(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, name: true, role: true },
    });

    if (!user) {
      console.error(`User with email "${email}" not found`);
      process.exit(1);
    }

    if (user.role === UserRole.ADMIN) {
      console.log(`User "${user.name}" (${user.email}) is already an admin`);
      process.exit(0);
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { role: UserRole.ADMIN },
    });

    console.log(
      `Successfully promoted "${user.name}" (${user.email}) to ADMIN`,
    );
  } catch (error) {
    console.error("Error promoting user:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

const email = process.argv[2];

if (!email) {
  console.error("Usage: tsx scripts/promote-admin.ts <user-email>");
  process.exit(1);
}

promoteToAdmin(email);
