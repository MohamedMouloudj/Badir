"use server";

import {
  AdminService,
  OrganizationFilters,
  InitiativeFilters,
} from "@/services/admin";
import { OrganizationStatus, InitiativeStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { ActionResponse } from "@/types/Statics";
import { checkAdminPermission } from "./helpers";

/**
 * Get paginated organizations for admin review
 */
export async function getOrganizationsAction(
  filters: OrganizationFilters = {},
  page: number = 1,
  limit: number = 10
) {
  try {
    await checkAdminPermission();

    const result = await AdminService.getOrganizations(filters, {
      page,
      limit,
    });
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Error fetching organizations:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "حدث خطأ أثناء جلب المنظمات",
    };
  }
}

/**
 * Get user initiatives for admin review
 */
export async function getUserInitiativesAction(
  filters: InitiativeFilters = {},
  page: number = 1,
  limit: number = 10
) {
  try {
    await checkAdminPermission();

    const result = await AdminService.getUserInitiatives(filters, {
      page,
      limit,
    });
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Error fetching user initiatives:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "حدث خطأ أثناء جلب المبادرات",
    };
  }
}

/**
 * Update organization approval status
 */
export async function updateOrganizationStatusAction(
  organizationId: string,
  status: OrganizationStatus,
  rejectionReason?: string
): Promise<ActionResponse<{}, {}>> {
  try {
    const adminUserId = await checkAdminPermission();

    const result = await AdminService.updateOrganizationStatus(
      organizationId,
      status,
      adminUserId,
      rejectionReason
    );

    revalidatePath("/admin/organizations");
    revalidatePath(`/admin/organizations/${organizationId}`);

    return {
      success: true,
      message: result.message,
      data: {},
    };
  } catch (error) {
    console.error("Error updating organization status:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "حدث خطأ أثناء تحديث حالة المنظمة",
    };
  }
}

/**
 * Update initiative approval status
 */
export async function updateInitiativeStatusAction(
  initiativeId: string,
  status: InitiativeStatus,
  rejectionReason?: string
): Promise<ActionResponse<{}, {}>> {
  try {
    const adminUserId = await checkAdminPermission();

    const result = await AdminService.updateInitiativeStatus(
      initiativeId,
      status,
      adminUserId,
      rejectionReason
    );

    revalidatePath("/admin/initiatives");
    revalidatePath(`/admin/initiatives/${initiativeId}`);
    revalidatePath("/initiatives"); // Also revalidate public initiatives page

    return {
      success: true,
      message: result.message,
    };
  } catch (error) {
    console.error("Error updating initiative status:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "حدث خطأ أثناء تحديث حالة المبادرة",
    };
  }
}

/**
 * Get organization details for admin review
 */
export async function getOrganizationDetailsAction(organizationId: string) {
  try {
    await checkAdminPermission();

    const organization = await AdminService.getOrganizationById(organizationId);

    if (!organization) {
      return {
        success: false,
        error: "المنظمة غير موجودة",
      };
    }

    return {
      success: true,
      data: organization,
    };
  } catch (error) {
    console.error("Error fetching organization details:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "حدث خطأ أثناء جلب تفاصيل المنظمة",
    };
  }
}

/**
 * Get initiative details for admin review
 */
export async function getInitiativeDetailsAction(initiativeId: string) {
  try {
    await checkAdminPermission();

    const initiative = await AdminService.getInitiativeById(initiativeId);

    if (!initiative) {
      return {
        success: false,
        error: "المبادرة غير موجودة",
      };
    }

    return {
      success: true,
      data: initiative,
    };
  } catch (error) {
    console.error("Error fetching initiative details:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "حدث خطأ أثناء جلب تفاصيل المبادرة",
    };
  }
}

/**
 * Get admin dashboard statistics
 */
export async function getAdminStatsAction() {
  try {
    await checkAdminPermission();

    const stats = await AdminService.getAdminStats();

    return {
      success: true,
      data: stats,
    };
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "حدث خطأ أثناء جلب الإحصائيات",
    };
  }
}
