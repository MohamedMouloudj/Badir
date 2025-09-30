"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useForm, FormProvider } from "react-hook-form";
import {
  profileDefaultValues,
  registrationSchema,
  validateStep,
  type RegistrationFormData,
} from "@/schemas/signupUserSchema";
import AppButton from "@/components/AppButton";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { completeProfileAction } from "@/actions/user-profile";
import Image from "next/image";

// Import step components
import Step1PersonalInfo from "./form-steps/user/Step1PersonalInfo";
import Step2Qualifications from "./form-steps/user/Step2Qualifications";
import Step3TemsAndConditions from "./form-steps/user/Step3TemsAndConditions";
import { AUTHORIZED_REDIRECTION } from "@/data/routes";

const asideImage1 = "/images/auth-form-aside.png";
const asideImage2 = "/images/auth-form-aside2.png";

const TOTAL_STEPS = 3;
const stepConfig = [
  {
    component: Step1PersonalInfo,
  },
  {
    component: Step2Qualifications,
  },
  {
    component: Step3TemsAndConditions,
  },
];

export default function CompleteProfileForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  const methods = useForm<RegistrationFormData>({
    mode: "onChange",
    defaultValues: profileDefaultValues,
  });
  const { handleSubmit, getValues, setError, clearErrors } = methods;

  const validateCurrentStep = async () => {
    const currentData = getValues();

    // Clear previous errors for current step
    clearErrors();

    const validationResult = validateStep(currentStep, currentData);

    if (validationResult.success) {
      return true;
    } else {
      validationResult.error.issues.forEach((issue) => {
        if (issue.path && issue.path.length > 0) {
          setError(issue.path[0] as keyof RegistrationFormData, {
            type: "validation",
            message: issue.message,
          });
        }
      });

      return false;
    }
  };

  const handleNext = async (e: React.MouseEvent) => {
    e.preventDefault();

    const isStepValid = await validateCurrentStep();

    if (isStepValid) {
      setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
      // Only show success toast for completing the final step before submission
      if (currentStep === TOTAL_STEPS - 1) {
        toast.success("تم التحقق من البيانات بنجاح! يمكنك الآن إتمام التسجيل");
      }
    } else {
      toast.error("يرجى إصلاح الأخطاء قبل المتابعة");
    }
  };

  const handlePrevious = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      setIsSubmitting(true);

      const finalValidation = registrationSchema.safeParse(data);
      if (!finalValidation.success) {
        toast.error("يرجى التحقق من جميع البيانات");
        return;
      }

      const result = await completeProfileAction(data);

      if (result.success && result.data) {
        setIsProfileComplete(true);
        toast.success("تم إكمال الملف الشخصي بنجاح!");
        window.location.href = result.data.redirectTo;
      } else {
        setIsProfileComplete(false);
        toast.error(result.error || "حدث خطأ أثناء حفظ البيانات");
      }
    } catch (error) {
      console.error("Profile completion error:", error);
      toast.error("حدث خطأ غير متوقع");
    } finally {
      setIsSubmitting(false);
    }
  };

  const CurrentStepComponent = stepConfig[currentStep - 1].component;

  return (
    <div className="w-full max-w-7xl flex flex-col lg:flex-row bg-neutrals-100 rounded-xl shadow-2xl overflow-hidden min-h-[600px]">
      <div className="flex-1 relative h-64 lg:h-auto">
        <Image
          src={currentStep % 2 === 0 ? asideImage2 : asideImage1}
          alt="Volunteer"
          fill
          className="object-cover md:rounded-r-4xl"
          priority
          style={{
            boxShadow: "3px 0 5px 0 rgba(0, 0, 0, 0.1)",
          }}
        />
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-4xl mx-auto md:p-6" dir="rtl">
          <Card className="bg-transparent shadow-none border-0 ">
            <CardContent className="px-0 py-0">
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="min-h-[400px]">
                    <CurrentStepComponent />
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between items-center pt-4 md:pt-6 border-t border-neutrals-200 w-full">
                    <AppButton
                      type="outline"
                      size="md"
                      onClick={handlePrevious}
                      disabled={currentStep === 1}
                      className="flex items-center gap-2"
                      border="rounded"
                      icon={<ChevronRight className="w-4 h-4 md:w-6 md:h-6" />}
                      dir="rtl"
                    >
                      السابق
                    </AppButton>

                    <div className="text-center">
                      <span className="text-sm text-neutrals-500">
                        الخطوة {currentStep} من {TOTAL_STEPS}
                      </span>
                    </div>

                    {currentStep < TOTAL_STEPS ? (
                      <AppButton
                        type="primary"
                        size="md"
                        onClick={handleNext}
                        className="flex items-center gap-2"
                        border="rounded"
                        icon={<ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />}
                      >
                        التالي
                      </AppButton>
                    ) : (
                      <AppButton
                        type="submit"
                        size="md"
                        disabled={isSubmitting || isProfileComplete}
                        className="flex items-center gap-2"
                        border="rounded"
                        icon={
                          isSubmitting ? (
                            <Loader2 className="w-4 h-4 md:w-6 md:h-6" />
                          ) : (
                            ""
                          )
                        }
                      >
                        {isSubmitting ? "جاري الحفظ..." : "إكمال التسجيل"}
                      </AppButton>
                    )}
                  </div>
                </form>
              </FormProvider>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
