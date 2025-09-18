import { getPublicStorageUrl } from "@/actions/supabaseHelpers";
import { prisma } from "@/lib/db";
import { PaginatedResponse, PaginationParams } from "@/types/Pagination";
import { Organization, OrganizationStatus, Prisma } from "@prisma/client";

export interface OrganizationCard {
  id: string;
  shortName?: string | null;
  name: string;
  logo?: string | null;
  description?: string | null;
  headquarters?: string | null;
  city?: string | null;
  country?: string | null;
  foundingDate?: Date | string | null;
  membersCount?: number | null;
  isApproved?: OrganizationStatus | null;
}

export interface OrganizationFilters {
  search?: string;
}

export class OrganizationService {
  static API_PATH = "/organizations";
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
    return await prisma.organization.findUnique({
      where: {
        userId: id,
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

  static async getMany(
    filters: OrganizationFilters = {},
    pagination: PaginationParams = { page: 1, limit: 12 }
  ): Promise<PaginatedResponse<OrganizationCard>> {
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;

    const where: Prisma.OrganizationWhereInput = {};
    if (filters.search) {
      where.OR = [
        { shortName: { contains: filters.search, mode: "insensitive" } },
        { name: { contains: filters.search, mode: "insensitive" } },
        { description: { contains: filters.search, mode: "insensitive" } },
      ];
    }

    const total = await prisma.organization.count({ where });
    const organizations = await prisma.organization.findMany({
      where,
      orderBy: [{ createdAt: "desc" }],
      skip,
      take: limit,
    });

    const data: OrganizationCard[] = await Promise.all(
      organizations.map(async (org) => ({
        id: org.id,
        shortName: org.shortName,
        name: org.name,
        logo: await getPublicStorageUrl("avatars", org.logo),
        description: org.description,
        headquarters: org.headquarters,
        city: org.city,
        country: org.country,
        foundingDate: org.foundingDate,
        membersCount: org.membersCount,
        isApproved: org.isVerified,
      }))
    );

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  static async getOrganizationByUserId(
    userId: string
  ): Promise<Organization | null> {
    return await prisma.organization.findFirst({
      where: {
        owner: { id: userId },
      },
    });
  }
}
