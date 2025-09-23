"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { InitiativeStatus, ParticipationStatus } from "@prisma/client";
import { ActionResponse } from "@/types/Statics";
import DOMPurify from "isomorphic-dompurify";
import { FormResponseType, JoinInitiativeParams } from "@/schemas";
import { ParticipationService } from "@/services/participations";

export async function joinInitiativeAction(
  params: JoinInitiativeParams
): Promise<ActionResponse<JoinInitiativeParams, { participationId: string }>> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return {
        success: false,
        error: "يجب تسجيل الدخول للانضمام إلى المبادرة",
      };
    }

    const initiative = await prisma.initiative.findUnique({
      where: {
        id: params.initiativeId,
        status: InitiativeStatus.published,
      },
    });

    if (!initiative) {
      return {
        success: false,
        error: "المبادرة غير موجودة أو غير متاحة للانضمام",
      };
    }

    if (
      initiative.registrationDeadline &&
      initiative.registrationDeadline < new Date()
    ) {
      return {
        success: false,
        error: "انتهت فترة التسجيل لهذه المبادرة",
      };
    }

    if (
      initiative.maxParticipants &&
      initiative.currentParticipants >= initiative.maxParticipants
    ) {
      return {
        success: false,
        error: "المبادرة مكتملة العدد",
      };
    }

    // Check if user is already participating
    const existingParticipation = await prisma.initiativeParticipant.findFirst({
      where: {
        initiativeId: params.initiativeId,
        userId: session.user.id,
      },
    });

    if (existingParticipation) {
      return {
        success: false,
        error: "أنت مسجل بالفعل في هذه المبادرة",
      };
    }

    const sanitizedFormResponses: FormResponseType = {};
    if (params.formResponses) {
      // Sanitize each response value
      Object.keys(params.formResponses).forEach((key) => {
        const value = params.formResponses![key];
        if (Array.isArray(value)) {
          sanitizedFormResponses[key] = value.map((item) =>
            DOMPurify.sanitize(item)
          );
        } else {
          sanitizedFormResponses[key] = DOMPurify.sanitize(value);
        }
      });
    }

    const participation = await ParticipationService.createParticipant(
      params.initiativeId,
      session.user.id,
      params.role,
      initiative.isOpenParticipation
        ? ParticipationStatus.approved
        : ParticipationStatus.registered,
      sanitizedFormResponses
    );

    if (initiative.isOpenParticipation) {
      await prisma.initiative.update({
        where: { id: params.initiativeId },
        data: {
          currentParticipants: {
            increment: 1,
          },
        },
      });
    }

    revalidatePath(`/initiatives/${params.initiativeId}`);

    return {
      success: true,
      message: initiative.isOpenParticipation
        ? "تم الانضمام إلى المبادرة بنجاح"
        : "تم تسجيل طلب الانضمام بنجاح",
      data: { participationId: participation.id },
    };
  } catch (error) {
    console.error("Error joining initiative:", error);
    return {
      success: false,
      error: "حدث خطأ أثناء الانضمام إلى المبادرة",
    };
  }
}
