import { prisma } from "@/lib/db";
import { PaginatedResponse, PaginationParams } from "@/types/Pagination";
import {
  Organization,
  OrganizationStatus,
  Initiative,
  InitiativeStatus,
  Prisma,
} from "@prisma/client";

export interface AdminOrganizationCard extends Organization {
  owner: {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
  };
  _count: {
    initiatives: number;
  };
}

export interface AdminInitiativeCard extends Initiative {
  category: {
    nameAr: string;
    nameEn?: string | null;
  };
  organizerUser: {
    id: string;
    name: string;
    email: string;
  } | null;
  _count: {
    participants: number;
  };
}

export interface OrganizationFilters {
  status?: OrganizationStatus;
  search?: string;
  organizationType?: string;
  country?: string;
}

export interface InitiativeFilters {
  status?: InitiativeStatus;
  search?: string;
  categoryId?: string;
  city?: string;
}

export class AdminService {
  static API_PATH = "/admin";

  /**
   * Get paginated organizations for admin review
   */
  static async getOrganizations(
    filters: OrganizationFilters = {},
    pagination: PaginationParams = { page: 1, limit: 10 },
  ): Promise<PaginatedResponse<AdminOrganizationCard>> {
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;

    const where: Prisma.OrganizationWhereInput = {};

    // Status filter
    if (filters.status) {
      where.isVerified = filters.status;
    }

    // Search filter
    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: "insensitive" } },
        { shortName: { contains: filters.search, mode: "insensitive" } },
        { contactEmail: { contains: filters.search, mode: "insensitive" } },
        { owner: { name: { contains: filters.search, mode: "insensitive" } } },
        { owner: { email: { contains: filters.search, mode: "insensitive" } } },
      ];
    }

    // Organization type filter
    if (filters.organizationType) {
      where.organizationType = filters.organizationType;
    }

    // Country filter
    if (filters.country) {
      where.country = filters.country;
    }

    const total = await prisma.organization.count({ where });

    const organizations = await prisma.organization.findMany({
      where,
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        _count: {
          select: {
            initiatives: true,
          },
        },
      },
      orderBy: [
        { isVerified: "asc" }, // Pending first
        { createdAt: "desc" },
      ],
      skip,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      data: organizations as AdminOrganizationCard[],
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

  /**
   * Get user initiatives pending approval
   */
  static async getUserInitiatives(
    filters: InitiativeFilters = {},
    pagination: PaginationParams = { page: 1, limit: 10 },
  ): Promise<PaginatedResponse<AdminInitiativeCard>> {
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;

    const where: Prisma.InitiativeWhereInput = {
      organizerType: "user", // only user initiatives need approval
    };

    // Status filter
    if (filters.status) {
      where.status = filters.status;
    }

    // Search filter
    if (filters.search) {
      where.OR = [
        { titleAr: { contains: filters.search, mode: "insensitive" } },
        { titleEn: { contains: filters.search, mode: "insensitive" } },
        {
          organizerUser: {
            name: { contains: filters.search, mode: "insensitive" },
          },
        },
        {
          organizerUser: {
            email: { contains: filters.search, mode: "insensitive" },
          },
        },
      ];
    }

    // Category filter
    if (filters.categoryId) {
      where.categoryId = filters.categoryId;
    }

    // City filter
    if (filters.city) {
      where.city = { contains: filters.city, mode: "insensitive" };
    }

    const total = await prisma.initiative.count({ where });

    const initiatives = await prisma.initiative.findMany({
      where,
      include: {
        category: {
          select: {
            nameAr: true,
            nameEn: true,
          },
        },
        organizerUser: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            participants: true,
          },
        },
      },
      orderBy: [
        { status: "asc" }, // Draft first
        { createdAt: "desc" },
      ],
      skip,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      data: initiatives as AdminInitiativeCard[],
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

  /**
   * Approve or reject an organization
   */
  static async updateOrganizationStatus(
    organizationId: string,
    status: OrganizationStatus,
    adminUserId: string,
    rejectionReason?: string,
  ) {
    try {
      const organization = await prisma.organization.update({
        where: { id: organizationId },
        data: {
          isVerified: status,
          updatedAt: new Date(),
        },
        include: {
          owner: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });

      // TODO: Send notification email to organization owner
      //  implement email service here

      return {
        success: true,
        message:
          status === "approved" ? "تم قبول المنظمة بنجاح" : "تم رفض المنظمة",
        data: organization,
      };
    } catch (error) {
      console.error("Error updating organization status:", error);
      throw new Error("فشل في تحديث حالة المنظمة");
    }
  }

  /**
   * Approve or reject a user initiative
   */
  static async updateInitiativeStatus(
    initiativeId: string,
    status: InitiativeStatus,
    adminUserId: string,
    rejectionReason?: string,
  ) {
    try {
      const initiative = await prisma.initiative.update({
        where: { id: initiativeId },
        data: {
          status,
          updatedAt: new Date(),
        },
        include: {
          organizerUser: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });

      // TODO: Send notification email to initiative organizer
      // You can implement email service here

      return {
        success: true,
        message:
          status === "published"
            ? "تم نشر المبادرة بنجاح"
            : "تم إلغاء المبادرة",
        data: initiative,
      };
    } catch (error) {
      console.error("Error updating initiative status:", error);
      throw new Error("فشل في تحديث حالة المبادرة");
    }
  }

  /**
   * Get organization by ID with full details for admin review
   */
  static async getOrganizationById(organizationId: string) {
    return await prisma.organization.findUnique({
      where: { id: organizationId },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            createdAt: true,
          },
        },
        initiatives: {
          select: {
            id: true,
            titleAr: true,
            status: true,
            createdAt: true,
          },
          take: 5,
          orderBy: { createdAt: "desc" },
        },
        _count: {
          select: {
            initiatives: true,
          },
        },
      },
    });
  }

  /**
   * Get initiative by ID with full details for admin review
   */
  static async getInitiativeById(initiativeId: string) {
    return await prisma.initiative.findUnique({
      where: { id: initiativeId },
      include: {
        category: true,
        organizerUser: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            createdAt: true,
          },
        },
        participants: {
          select: {
            id: true,
            user: {
              select: {
                name: true,
                email: true,
              },
            },
            status: true,
            createdAt: true,
          },
          take: 10,
          orderBy: { createdAt: "desc" },
        },
        _count: {
          select: {
            participants: true,
          },
        },
      },
    });
  }

  /**
   * Get admin statistics
   */
  static async getAdminStats() {
    const [
      pendingOrgsCount,
      approvedOrgsCount,
      rejectedOrgsCount,
      draftInitiativesCount,
      publishedInitiativesCount,
      cancelledInitiativesCount,
    ] = await Promise.all([
      prisma.organization.count({ where: { isVerified: "pending" } }),
      prisma.organization.count({ where: { isVerified: "approved" } }),
      prisma.organization.count({ where: { isVerified: "rejected" } }),
      prisma.initiative.count({
        where: {
          status: "draft",
          organizerType: "user",
        },
      }),
      prisma.initiative.count({ where: { status: "published" } }),
      prisma.initiative.count({ where: { status: "cancelled" } }),
    ]);

    return {
      organizations: {
        pending: pendingOrgsCount,
        approved: approvedOrgsCount,
        rejected: rejectedOrgsCount,
        total: pendingOrgsCount + approvedOrgsCount + rejectedOrgsCount,
      },
      initiatives: {
        draft: draftInitiativesCount,
        published: publishedInitiativesCount,
        cancelled: cancelledInitiativesCount,
        total:
          draftInitiativesCount +
          publishedInitiativesCount +
          cancelledInitiativesCount,
      },
    };
  }
}
