"use server";

import { auth } from "@/lib/auth";

interface ActionResult {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Request password reset - sends email with reset link
 */
export async function requestPasswordResetAction(
  email: string,
): Promise<ActionResult> {
  try {
    await auth.api.requestPasswordReset({
      body: {
        email,
        redirectTo: `${process.env.BETTER_AUTH_URL}/reset-password`,
      },
    });

    return {
      success: true,
      message: "تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني",
    };
  } catch {
    return {
      success: false,
      error: "حدث خطأ أثناء معالجة طلبك، يرجى المحاولة مرة أخرى",
    };
  }
}

/**
 * Reset password using token
 */
export async function resetPasswordAction(
  token: string,
  newPassword: string,
): Promise<ActionResult> {
  try {
    await auth.api.resetPassword({
      body: {
        token,
        newPassword,
      },
    });

    return {
      success: true,
      message: "تم تغيير كلمة المرور بنجاح",
    };
  } catch {
    return {
      success: false,
      error: "رابط إعادة التعيين غير صالح أو منتهي الصلاحية",
    };
  }
}
