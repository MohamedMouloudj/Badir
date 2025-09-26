"use client";

import { useActionState, useEffect, useState } from "react";
import { signupAction, type SignupState } from "@/actions/signup";
import FormInput from "@/components/FormInput";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import AppButton from "@/components/AppButton";
import { ChevronLeft, Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";

export function SignupForm() {
  const pathname = usePathname();
  const isUserSigningUp = pathname.includes("user");
  const [state, formAction, isPending] = useActionState<
    SignupState | null,
    FormData
  >(signupAction, null);
  const [isRegisterSuccessful, setIsRegisterSuccessful] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: isUserSigningUp ? "both" : "organization",
  });

  useEffect(() => {
    if (state?.error) {
      setIsRegisterSuccessful(false);
      toast.error(state.error);
    } else if (state?.success && state?.message) {
      setIsRegisterSuccessful(true);
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
    <div className="w-full h-full">
      <Card className="w-full bg-transparent border-none shadow-none">
        <CardContent>
          <form action={formAction} className="space-y-4">
            {/* Hidden inputs for server action */}
            <input type="hidden" name="firstName" value={formData.firstName} />
            <input type="hidden" name="lastName" value={formData.lastName} />
            <input type="hidden" name="email" value={formData.email} />
            <input type="hidden" name="password" value={formData.password} />
            <input
              type="hidden"
              name="confirmPassword"
              value={formData.confirmPassword}
            />
            <input type="hidden" name="userType" value={formData.userType} />

            {/* Form Inputs */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <FormInput
                label="الاسم الأول"
                type="text"
                name="firstName"
                placeholder="أدخل اسمك الأول"
                value={formData.firstName}
                onChange={(value) => handleInputChange("firstName", value)}
              />
              <FormInput
                label="اسم العائلة"
                type="text"
                name="lastName"
                placeholder="أدخل اسم العائلة"
                value={formData.lastName}
                onChange={(value) => handleInputChange("lastName", value)}
              />
            </div>

            <FormInput
              label="البريد الإلكتروني"
              type="email"
              name="email"
              placeholder="example@domain.com"
              value={formData.email}
              onChange={(value) => handleInputChange("email", value)}
            />

            <FormInput
              label="كلمة المرور"
              type="password"
              name="password"
              placeholder="أدخل كلمة مرور قوية"
              value={formData.password}
              onChange={(value) => handleInputChange("password", value)}
            />

            <FormInput
              label="تأكيد كلمة المرور"
              type="password"
              name="confirmPassword"
              placeholder="أعد إدخال كلمة المرور"
              value={formData.confirmPassword}
              onChange={(value) => handleInputChange("confirmPassword", value)}
            />

            <div className="flex-center justify-center mt-8">
              <AppButton
                type="submit"
                border="rounded"
                disabled={isPending || isRegisterSuccessful}
                icon={
                  isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                  )
                }
              >
                {isPending ? "جاري إنشاء الحساب..." : "أنشئ حسابك"}
              </AppButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
