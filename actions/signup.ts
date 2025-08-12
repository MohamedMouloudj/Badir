"use server";

import { initialSignupSchema, type InitialSignupFormData } from "@/schemas";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

export type SignupState = {
  success?: boolean;
  message?: string;
  error?: string;
};

export async function signupAction(
  prevState: SignupState | null,
  formData: FormData
): Promise<SignupState> {
  try {
    const data: InitialSignupFormData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
    };

    // Validate the form data
    const validatedData = initialSignupSchema.parse(data);

    // Check if user already exists in database
    const existingUser = await prisma.user.findUnique({
      where: {
        email: validatedData.email,
      },
    });

    if (existingUser) {
      return {
        success: false,
        error:
          "هذا البريد الإلكتروني مستخدم بالفعل. يرجى استخدام بريد إلكتروني آخر.",
      };
    }

    const res = await auth.api.signUpEmail({
      body: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        password: validatedData.password,
        name: `${validatedData.firstName} ${validatedData.lastName}`,
      },
      headers: await headers(),
      asResponse: true,
    });

    if (!res.ok) {
      // Simple error handling based on status code
      if (res.status === 409) {
        return {
          success: false,
          error:
            "هذا البريد الإلكتروني مستخدم بالفعل. يرجى استخدام بريد إلكتروني آخر.",
        };
      } else if (res.status === 400) {
        return {
          success: false,
          error: "البيانات المدخلة غير صحيحة. يرجى التحقق من جميع الحقول.",
        };
      } else {
        return {
          success: false,
          error: "حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.",
        };
      }
    }

    // If successful, redirect to complete profile or home
    redirect("/complete-profile");
  } catch (error) {
    console.error("Signup error:", error);

    // Re-throw redirect errors (this is normal Next.js behavior)
    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      typeof error.digest === "string" &&
      error.digest.includes("NEXT_REDIRECT")
    ) {
      throw error;
    }

    // Handle validation errors specifically
    if (error && typeof error === "object" && "errors" in error) {
      return {
        success: false,
        error: "البيانات المدخلة غير صحيحة. يرجى التحقق من جميع الحقول.",
      };
    }

    return {
      success: false,
      error: "حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.",
    };
  }
}
