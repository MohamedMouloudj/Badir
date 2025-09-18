"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { completeOrgProfileAction } from "@/actions/organization-profile";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AppButton from "@/components/AppButton";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import {
  organizationDefaultValues,
  OrgRegistrationFormData,
  orgRegistrationSchema,
  validateOrgStep,
} from "@/schemas";

import Step1BasicInfoForm from "./form-steps/organization/Step1BasicInfo";
import Step2SocialLinks from "./form-steps/organization/Step2SocialLinks";
import Step3OrgTypeForm from "./form-steps/organization/Step3OrgType";
import Step4DescriptionsForm from "./form-steps/organization/Step4Descriptions";
import Step5PersonalContactForm from "./form-steps/organization/Step5PersonalContact";
import Step6DocumentsForm from "./form-steps/organization/Step6Documents";
import Step7TermsForm from "./form-steps/organization/Step7TemsAndConditions";

import { AUTHORIZED_REDIRECTION } from "@/data/routes";

const asideImage1 = "/images/auth-form-aside.png";
const asideImage2 = "/images/auth-form-aside2.png";

const TOTAL_STEPS = 7;
const stepConfig = [
  {
    component: Step1BasicInfoForm,
  },
  {
    component: Step2SocialLinks,
  },
  {
    component: Step3OrgTypeForm,
  },
  {
    component: Step4DescriptionsForm,
  },
  {
    component: Step5PersonalContactForm,
  },
  {
    component: Step6DocumentsForm,
  },
  {
    component: Step7TermsForm,
  },
];

export default function CompleteOrganizationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const methods = useForm<OrgRegistrationFormData>({
    mode: "onChange",
    defaultValues: organizationDefaultValues,
  });
  const { handleSubmit, getValues, setError, clearErrors } = methods;

  const validateCurrentStep = async () => {
    const currentData = getValues();
    clearErrors();

    const validationResult = validateOrgStep(currentStep, currentData);

    if (validationResult.success) {
      return true;
    } else {
      validationResult.error.issues.forEach((issue) => {
        if (issue.path && issue.path.length > 0) {
          setError(issue.path[0] as keyof OrgRegistrationFormData, {
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

  const onSubmit = async (data: OrgRegistrationFormData) => {
    try {
      setIsSubmitting(true);

      const finalValidation = orgRegistrationSchema.safeParse(data);
      if (!finalValidation.success) {
        toast.error("يرجى التحقق من جميع البيانات");
        return;
      }

      const result = await completeOrgProfileAction(data);

      if (result.success) {
        toast.success("تم إكمال الملف الشخصي بنجاح!");
        router.replace(AUTHORIZED_REDIRECTION);
      } else {
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
          src={currentStep % 2 === 1 ? asideImage2 : asideImage1}
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
                      corner="rounded"
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
                        corner="rounded"
                        icon={<ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />}
                      >
                        التالي
                      </AppButton>
                    ) : (
                      <AppButton
                        type="submit"
                        size="md"
                        disabled={isSubmitting}
                        className="flex items-center gap-2"
                        corner="rounded"
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
