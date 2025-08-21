import { prisma } from "@/lib/db";
import {
  Prisma,
  InitiativeStatus,
  OrganizerType,
  TargetAudience,
} from "@prisma/client";

// Simplified types to match Prisma output
export interface InitiativeCard {
  id: string;
  titleAr: string;
  titleEn?: string | null;
  shortDescriptionAr?: string | null;
  shortDescriptionEn?: string | null;
  city: string;
  startDate: Date | string;
  endDate: Date | string;
  maxParticipants?: number | null;
  currentParticipants: number;
  targetAudience: TargetAudience;
  status: InitiativeStatus;
  category: {
    nameAr: string;
    nameEn?: string | null;
    icon?: string | null;
    bgColor?: string | null;
    textColor?: string | null;
  };
  organizer: {
    type: OrganizerType;
    name: string;
    image?: string | null;
  };
}

export interface InitiativeFilters {
  search?: string;
  categoryId?: string;
  city?: string;
  status?: InitiativeStatus;
  targetAudience?: TargetAudience;
  organizerType?: OrganizerType;
  hasAvailableSpots?: boolean;
  startDateFrom?: Date;
  startDateTo?: Date;
  endDateFrom?: Date;
  endDateTo?: Date;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Initiative CRUD Operations
export class InitiativeService {
  static API_PATH = "/initiatives";
  // Get paginated initiatives with filters
  static async getMany(
    filters: InitiativeFilters = {},
    pagination: PaginationParams = { page: 1, limit: 12 }
  ): Promise<PaginatedResponse<InitiativeCard>> {
    try {
      const { page, limit } = pagination;
      const skip = (page - 1) * limit;

      // Build where clause based on filters
      const where: Prisma.InitiativeWhereInput = {
        status: filters.status || "published",
      };

      // Search filter
      if (filters.search) {
        where.OR = [
          { titleAr: { contains: filters.search, mode: "insensitive" } },
          { titleEn: { contains: filters.search, mode: "insensitive" } },
          {
            shortDescriptionAr: {
              contains: filters.search,
              mode: "insensitive",
            },
          },
          {
            shortDescriptionEn: {
              contains: filters.search,
              mode: "insensitive",
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

      // Target audience filter
      if (filters.targetAudience) {
        where.targetAudience = filters.targetAudience;
      }

      // Organizer type filter
      if (filters.organizerType) {
        where.organizerType = filters.organizerType;
      }

      // Available spots filter
      if (filters.hasAvailableSpots) {
        const initiativesWithSpots = await prisma.$queryRaw<{ id: string }[]>`
          SELECT id FROM "initiatives" 
          WHERE "max_participants" IS NULL 
          OR "current_participants" < "max_participants"
        `;

        const availableIds = initiativesWithSpots.map((item) => item.id);
        where.id = { in: availableIds };
      }

      // Date filters
      if (filters.startDateFrom || filters.startDateTo) {
        where.startDate = {};
        if (filters.startDateFrom) {
          where.startDate.gte = filters.startDateFrom;
        }
        if (filters.startDateTo) {
          where.startDate.lte = filters.startDateTo;
        }
      }

      if (filters.endDateFrom || filters.endDateTo) {
        where.endDate = {};
        if (filters.endDateFrom) {
          where.endDate.gte = filters.endDateFrom;
        }
        if (filters.endDateTo) {
          where.endDate.lte = filters.endDateTo;
        }
      }

      // Get total count for pagination
      const total = await prisma.initiative.count({ where });

      // Get initiatives with related data
      const initiatives = await prisma.initiative.findMany({
        where,
        include: {
          category: {
            select: {
              nameAr: true,
              nameEn: true,
              icon: true,
              bgColor: true,
              textColor: true,
            },
          },
          organizerUser: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          organizerOrg: {
            select: {
              id: true,
              name: true,
              logo: true,
            },
          },
        },
        orderBy: [{ createdAt: "desc" }],
        skip,
        take: limit,
      });

      // Transform to InitiativeCard format
      const data: InitiativeCard[] = initiatives.map((initiative) => ({
        id: initiative.id.toString(),
        titleAr: initiative.titleAr,
        titleEn: initiative.titleEn,
        shortDescriptionAr: initiative.shortDescriptionAr,
        shortDescriptionEn: initiative.shortDescriptionEn,
        city: initiative.city,
        startDate: initiative.startDate,
        endDate: initiative.endDate,
        maxParticipants: initiative.maxParticipants,
        currentParticipants: initiative.currentParticipants,
        targetAudience: initiative.targetAudience,
        status: initiative.status,
        category: {
          nameAr: initiative.category.nameAr,
          nameEn: initiative.category.nameEn,
          icon: initiative.category.icon,
          bgColor: initiative.category.bgColor,
          textColor: initiative.category.textColor,
        },
        organizer: {
          type: initiative.organizerType,
          name:
            initiative.organizerUser?.name ||
            initiative.organizerOrg?.name ||
            "غير محدد",
          image:
            initiative.organizerUser?.image || initiative.organizerOrg?.logo,
        },
      }));

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
    } catch (error) {
      console.error("Error fetching initiatives:", error);
      throw new Error("Failed to fetch initiatives");
    }
  }

  // Get single initiative by ID
  static async getById(id: string) {
    try {
      const initiative = await prisma.initiative.findUnique({
        where: { id: id },
        include: {
          category: true,
          organizerUser: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          organizerOrg: {
            select: {
              id: true,
              name: true,
              logo: true,
            },
          },
          _count: {
            select: {
              participants: true,
            },
          },
        },
      });

      return initiative;
    } catch (error) {
      console.error("Error fetching initiative:", error);
      throw new Error("Failed to fetch initiative");
    }
  }
}
