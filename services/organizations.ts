import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";

export class OrganizationService {
  static async createOrganization(data: Prisma.OrganizationCreateInput) {
    return await prisma.organization.create({
      data,
    });
  }

  static async getOrganizationById(id?: string, userId?: string) {
    return await prisma.organization.findFirst({
      where: {
        OR: [{ id }, { owner: { id: userId } }],
      },
    });
  }

  static async getOrganizationLogo(id: string) {
    return await prisma.organization.findFirst({
      where: {
        owner: { id },
      },
      select: { logo: true },
    });
  }

  static async updateOrganization(
    id: string,
    data: Prisma.OrganizationUpdateInput
  ) {
    return await prisma.organization.update({
      where: { id },
      data,
    });
  }

  static async deleteOrganization(id: string) {
    return await prisma.organization.delete({
      where: { id },
    });
  }
}
