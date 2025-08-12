"use client";

import React, { useActionState, useEffect, useState } from "react";
import FormInput from "@/components/FormInput";
import { loginAction, type LoginState } from "@/actions/login";
import { ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { authRoutes } from "@/data/routes";
import AppButton from "@/components/AppButton";
import { toast } from "sonner";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState<
    LoginState | null,
    FormData
  >(loginAction, null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Effect to show toast based on the server action's result
  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    } else if (state?.success && state?.message) {
      toast.success(state.message);
    }
  }, [state]);

  const handleInputChange = (
    name: string,
    value: string | boolean | string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value as string,
    }));
  };

  return (
    <div className="w-full" dir="rtl">
      {/* Form */}
      <form action={formAction} className="space-y-6">
        {/* Hidden inputs for server action */}
        <input type="hidden" name="email" value={formData.email} />
        <input type="hidden" name="password" value={formData.password} />

        <FormInput
          type="email"
          name="email"
          label="البريد الإلكتروني"
          placeholder="أدخل بريدك الإلكتروني"
          value={formData.email}
          onChange={(value) => handleInputChange("email", value)}
          disabled={isPending}
        />

        <div className="space-y-2">
          <FormInput
            type="password"
            name="password"
            label="كلمة المرور"
            placeholder="أدخل كلمة المرور"
            value={formData.password}
            onChange={(value) => handleInputChange("password", value)}
            disabled={isPending}
          />

          {/* Forgot Password Link */}
          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-primary-400 hover:text-primary-500 text-sm font-medium underline transition-colors duration-200"
            >
              نسيت كلمة المرور؟
            </Link>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex-center justify-center">
          <AppButton
            type="submit"
            disabled={isPending}
            corner="rounded"
            className="justify-center"
            icon={
              isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )
            }
          >
            {isPending ? <>جاري تسجيل الدخول...</> : <>تسجيل الدخول</>}
          </AppButton>
        </div>
      </form>
    </div>
  );
}
