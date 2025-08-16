/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {
  platformRatingSchema,
  PlatformRatingFormData,
} from "@/schemas/platformRatingSchema";
import { headers } from "next/headers";
import z from "zod";

export async function submitRating(formData: PlatformRatingFormData): Promise<{
  success: boolean;
  message?: string;
  error?: string;
  errors?: Partial<Record<keyof PlatformRatingFormData, string[]>>;
  criticalAlertSent?: Record<string, any>;
}> {
  const validationResult = platformRatingSchema.safeParse(formData);

  if (!validationResult.success) {
    const treeErrors = z.treeifyError(validationResult.error);

    const fieldErrors: Partial<Record<keyof PlatformRatingFormData, string[]>> =
      {};

    if (typeof treeErrors === "object" && treeErrors !== null) {
      for (const [field, fieldError] of Object.entries(treeErrors)) {
        if (
          typeof fieldError === "object" &&
          fieldError !== null &&
          "errors" in fieldError
        ) {
          fieldErrors[field as keyof PlatformRatingFormData] = (
            fieldError as { errors: string[] }
          ).errors;
        }
      }
    }
    return {
      success: false,
      errors: fieldErrors,
    };
  }

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return {
        success: false,
        error: "يجب تسجيل الدخول لإرسال التقييم",
      };
    }

    const poorRatings = [
      formData.easeOfUse,
      formData.informationClarity,
      formData.contentDiversity,
      formData.performanceSpeed,
      formData.generalSatisfaction,
    ].filter((rating) => rating === "ضعيف").length;

    // Save the rating to database
    await prisma.platformRating.create({
      data: {
        userId: session.user.id,
        easeOfUse: formData.easeOfUse,
        informationClarity: formData.informationClarity,
        contentDiversity: formData.contentDiversity,
        performanceSpeed: formData.performanceSpeed,
        generalSatisfaction: formData.generalSatisfaction,
        usefulSections: formData.usefulSections,
        encounteredDifficulties: formData.encounteredDifficulties,
        difficultiesDetails: formData.difficultiesDetails || "",
        improvementSuggestions: formData.improvementSuggestions || "",
        wouldRecommend: formData.wouldRecommend,
        appRating: formData.appRating,
      },
    });

    let criticalAlertSent: Record<string, any> | undefined;
    if (poorRatings >= 3) {
      criticalAlertSent = {
        userName: session.user.name || "مستخدم",
        userEmail: session.user.email || "",
        appRating: `${formData.appRating} / 5`,
        easeOfUse: formData.easeOfUse,
        informationClarity: formData.informationClarity,
        contentDiversity: formData.contentDiversity,
        performanceSpeed: formData.performanceSpeed,
        generalSatisfaction: formData.generalSatisfaction,
        difficultiesDetails: formData.difficultiesDetails || "لا توجد تفاصيل",
        improvementSuggestions:
          formData.improvementSuggestions || "لا توجد اقتراحات",
        submissionDate: new Date().toLocaleDateString("ar-DZ", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      };
    }

    return {
      success: true,
      message: "تم إرسال تقييمك بنجاح",
      criticalAlertSent: criticalAlertSent,
    };
  } catch (error) {
    console.error("Error submitting rating:", error);
    return {
      success: false,
      error: "حدث خطأ أثناء إرسال التقييم، يرجى المحاولة مرة أخرى",
    };
  }
}
