"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  registrationSchema,
  type RegistrationFormData,
} from "@/schemas/signupSchema";
import { Decimal } from "@prisma/client/runtime/library";
import z from "zod";
import { AUTHORIZED_REDIRECTION } from "@/data/routes";

export type ProfileState = {
  success?: boolean;
  message?: string;
  error?: string;
  errors?: Partial<Record<keyof RegistrationFormData, string[]>>;
};

export async function updateProfile(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/login");
  }

  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const phone = formData.get("phone") as string;

  await prisma.user.update({
    where: { id: session.user.id },
    data: { firstName, lastName, phone, profileCompleted: true },
  });

  redirect(AUTHORIZED_REDIRECTION);
}

export async function completeProfileAction(
  data: RegistrationFormData
): Promise<ProfileState> {
  try {
    // Get current session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        success: false,
        error: "يجب تسجيل الدخول أولاً",
      };
    }

    // Server-side validation with Zod
    const validatedData = registrationSchema.parse(data);

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        // Personal Information (Step 1)
        dateOfBirth: new Date(validatedData.dateOfBirth),
        sex: validatedData.sex,
        phone: validatedData.phone,
        city: validatedData.city,
        state: validatedData.state,
        country: validatedData.country,
        latitude: validatedData.latitude
          ? new Decimal(validatedData.latitude)
          : null,
        longitude: validatedData.longitude
          ? new Decimal(validatedData.longitude)
          : null,

        // Bio and user type
        bio: validatedData.bio,
        userType: validatedData.userType,

        // Profile completion flag
        profileCompleted: true,
        updatedAt: new Date(),
      },
    });

    // Create or update UserQualification record
    const existingQualification = await prisma.userQualification.findFirst({
      where: { userId: session.user.id },
    });

    if (existingQualification) {
      await prisma.userQualification.update({
        where: { id: existingQualification.id },
        data: {
          specification: validatedData.specification,
          educationalLevel: validatedData.educationalLevel,
          currentJob: validatedData.currentJob || "",
          updatedAt: new Date(),
        },
      });
    } else {
      await prisma.userQualification.create({
        data: {
          userId: session.user.id,
          specification: validatedData.specification,
          educationalLevel: validatedData.educationalLevel,
          currentJob: validatedData.currentJob || "",
        },
      });
    }

    // Success response - no redirect here, let the component handle it
    return {
      success: true,
      message: "تم إكمال الملف الشخصي بنجاح",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const treeError = z.treeifyError(error);
      // Convert the tree structure to field errors format
      const fieldErrors: Partial<Record<keyof RegistrationFormData, string[]>> =
        {};

      // Extract field-specific errors from the tree structure
      if (typeof treeError === "object" && treeError !== null) {
        for (const [field, fieldError] of Object.entries(treeError)) {
          if (
            field !== "formErrors" &&
            typeof fieldError === "object" &&
            fieldError !== null &&
            "errors" in fieldError
          ) {
            fieldErrors[field as keyof RegistrationFormData] = (
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

    console.error("Profile completion error:", error);
    return {
      success: false,
      error: "حدث خطأ أثناء حفظ البيانات. يرجى المحاولة مرة أخرى",
    };
  }
}
