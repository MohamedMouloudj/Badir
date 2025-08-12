"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export type LoginState = {
  success?: boolean;
  message?: string;
  error?: string;
};

export async function loginAction(
  prevState: LoginState | null,
  formData: FormData
): Promise<LoginState> {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    console.log("Login action called with email:", email);

    if (!email || !password) {
      return {
        success: false,
        error: "يرجى إدخال البريد الإلكتروني وكلمة المرور",
      };
    }

    const response = await auth.api.signInEmail({
      body: { email, password },
      headers: await headers(),
      asResponse: true,
    });

    if (!response.ok) {
      // Simple error handling based on status code
      if (response.status === 401) {
        return {
          success: false,
          error: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
        };
      } else if (response.status === 400) {
        return {
          success: false,
          error: "البيانات المدخلة غير صحيحة",
        };
      } else {
        return {
          success: false,
          error: "حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى",
        };
      }
    }

    // Success—redirect to dashboard or home
    redirect("/");
  } catch (error) {
    console.error("Login error:", error);

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

    return {
      success: false,
      error: "حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى",
    };
  }
}

// Keep the old function for backward compatibility if needed
export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const response = await auth.api.signInEmail({
    body: { email, password },
    headers: await headers(),
    asResponse: true,
  });

  if (!response.ok) {
    return { error: "Sign-in failed" };
  }

  return { success: true };
}
