"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { NewInitiativeFormData } from "@/schemas/newInitiativeSchema";
import { StorageHelpers } from "@/services/supabase-storage";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { mimeTypeToExtension } from "@/lib/utils";
import { InitiativeStatus, OrganizerType, UserType } from "@prisma/client";
import { OrganizationService } from "@/services/organizations";
import { ActionResponse } from "@/types/Statics";

export async function createInitiativeAction(
  data: NewInitiativeFormData
): Promise<ActionResponse<NewInitiativeFormData, { initiativeId?: string }>> {
  console.log("createInitiativeAction data:", data);

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return {
        success: false,
        error: "يجب تسجيل الدخول لإنشاء مبادرة",
      };
    }

    let organizerUserId: string | undefined;
    let organizerOrgId: string | undefined;
    if (session.user.userType === OrganizerType.organization) {
      const orgData = await OrganizationService.getOrganizationByUserId(
        session.user.id
      );
      organizerOrgId = orgData?.id;
      organizerUserId = undefined;
    } else {
      organizerUserId = session.user.id;
      organizerOrgId = undefined;
    }

    const initiative = await prisma.initiative.create({
      data: {
        organizerType:
          session.user.userType === UserType.organization
            ? OrganizerType.organization
            : OrganizerType.user,
        organizerUserId: organizerUserId,
        organizerOrgId: organizerOrgId,
        categoryId: data.categoryId,
        titleAr: data.titleAr,
        titleEn: data.titleEn,
        descriptionAr: data.descriptionAr,
        descriptionEn: data.descriptionEn,
        shortDescriptionAr: data.shortDescriptionAr,
        shortDescriptionEn: data.shortDescriptionEn,
        location: data.location,
        city: data.city,
        state: data.state,
        country: data.country,
        startDate: data.startDate,
        endDate: data.endDate,
        registrationDeadline: data.registrationDeadline,
        maxParticipants: data.maxParticipants,
        isOpenParticipation: !data.requiresForm,
        targetAudience: data.targetAudience,
        participationQstForm: data.requiresForm
          ? data.participationQstForm
          : [],
        status: data.status,
      },
    });

    let coverImagePath: string | null = null;

    if (
      data.coverImage &&
      typeof data.coverImage === "string" &&
      data.coverImage.length > 0
    ) {
      try {
        const { base64, name, type } = JSON.parse(data.coverImage);
        const fileBuffer = Buffer.from(base64, "base64");

        let ext = path.extname(name);
        if (!ext && type) {
          ext = mimeTypeToExtension(type) || ".bin";
        }

        const fileName = `${uuidv4()}.${name
          .replace(/\s+/g, "-")
          .replace(ext, "")}${ext}`;
        const filePath = `${session.user.id}/${initiative.id}/${fileName}`;

        const storage = new StorageHelpers();
        const result = await storage.uploadFile(
          "post-images",
          filePath,
          fileBuffer,
          type
        );

        coverImagePath = result.path;
      } catch (error) {
        console.error("Error uploading cover image:", error);
        return {
          success: false,
          error: "فشل تحميل صورة الغلاف",
        };
      }
    }

    if (coverImagePath) {
      await prisma.initiative.update({
        where: { id: initiative.id },
        data: { coverImage: coverImagePath },
      });
    }

    revalidatePath("/initiatives");

    return {
      success: true,
      message:
        data.status === InitiativeStatus.published
          ? "تم نشر المبادرة بنجاح"
          : "تم حفظ المبادرة كمسودة",
      data: { initiativeId: initiative.id },
    };
  } catch (error) {
    console.error("Error creating initiative:", error);
    return {
      success: false,
      error: "حدث خطأ أثناء إنشاء المبادرة",
    };
  }
}
