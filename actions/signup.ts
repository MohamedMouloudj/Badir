"use server";

import { initialSignupSchema, type InitialSignupFormData } from "@/schemas";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { UserType } from "@prisma/client";

export type SignupState = {
  success?: boolean;
  message?: string;
  error?: string;
};

export async function signupAction(
  _prevState: SignupState | null,
  formData: FormData
): Promise<SignupState> {
  let completeRoute = "";
  try {
    const data: InitialSignupFormData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      userType: formData.get("userType") as UserType,
    };

    const validatedData = initialSignupSchema.safeParse(data);

    if (!validatedData.success) {
      return {
        success: false,
        error: "البيانات المدخلة غير صحيحة. يرجى التحقق من جميع الحقول.",
      };
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: validatedData.data.email,
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
        firstName: validatedData.data.firstName,
        lastName: validatedData.data.lastName,
        email: validatedData.data.email,
        password: validatedData.data.password,
        name: `${validatedData.data.firstName} ${validatedData.data.lastName}`,
        userType:
          validatedData.data.userType === "both"
            ? undefined
            : validatedData.data.userType,
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

    if (validatedData.data.userType === "both") {
      completeRoute = "/complete-profile/user";
    } else {
      completeRoute = "/complete-profile/organization";
    }
  } catch (error) {
    console.error("Signup error:", error);

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

  redirect(completeRoute);
}
