import { prisma } from "@/lib/db";
import { Prisma, User, UserQualification } from "@prisma/client";

export class UserService {
  static async getUser(
    userId: string,
  ): Promise<(User & { qualifications: UserQualification[] }) | null> {
    return await prisma.user.findUnique({
      where: { id: userId },
      include: { qualifications: true },
    });
  }

  static async updateUser(userId: string, data: Prisma.UserUpdateInput) {
    return await prisma.user.update({
      where: { id: userId },
      data,
    });
  }

  static async deleteUser(userId?: string, email?: string) {
    return await prisma.user.delete({
      where: { id: userId, email },
    });
  }

  static async getUserQualifications(userId: string) {
    return await prisma.userQualification.findMany({
      where: { userId },
    });
  }

  static async getUserImage(id: string) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
      select: { image: true },
    });
  }

  static async getUsersCount() {
    return await prisma.user.count({
      where: { isActive: true },
    });
  }
}
