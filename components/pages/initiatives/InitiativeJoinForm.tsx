"use client";

import { useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { ParticipantRole, TargetAudience } from "@prisma/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { joinInitiativeAction } from "@/actions/participation";
import { FormFieldType } from "@/schemas";
import AppButton from "@/components/AppButton";

interface InitiativeJoinFormProps {
  initiativeId: string;
  hasForm: boolean;
  formQuestions: FormFieldType[];
  allowedRoles: TargetAudience;
}

interface BaseFormData {
  role: ParticipantRole;
}

// form type with question fields
type JoinFormData = BaseFormData & Record<string, string | string[]>;

export default function InitiativeJoinForm({
  initiativeId,
  hasForm,
  formQuestions,
  allowedRoles,
}: InitiativeJoinFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinFormData>({
    defaultValues: {
      role: ParticipantRole.participant,
      ...formQuestions.reduce((acc, q) => {
        acc[q.id] = q.type === "checkbox" ? [] : "";
        return acc;
      }, {} as Record<string, string | string[]>),
    },
  });

  const getAvailableRoles = () => {
    switch (allowedRoles) {
      case TargetAudience.helpers:
        return [{ value: ParticipantRole.helper, label: "متطوع" }];
      case TargetAudience.participants:
        return [{ value: ParticipantRole.participant, label: "مشارك" }];
      default:
        return [
          { value: ParticipantRole.participant, label: "مشارك" },
          { value: ParticipantRole.helper, label: "متطوع" },
        ];
    }
  };

  const onSubmit = async (data: any) => {
    try {
      const formResponses = hasForm
        ? formQuestions.reduce((acc, q) => {
            if (data[q.id] !== undefined && data[q.id] !== "") {
              acc[q.id] = data[q.id];
            }
            return acc;
          }, {} as Record<string, string | string[]>)
        : undefined;

      startTransition(async () => {
        const result = await joinInitiativeAction({
          initiativeId,
          role: data.role,
          formResponses,
        });

        if (result.success) {
          toast.success(result.message || "تم الانضمام بنجاح");
          router.refresh();
        } else {
          toast.error(result.error || "حدث خطأ أثناء الانضمام");
        }
      });
    } catch (error) {
      toast.error("حدث خطأ غير متوقع");
    }
  };

  const onError = (errors: any) => {
    console.error(errors);
    toast.error("يرجى التحقق من جميع الحقول المطلوبة");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
      {/* Role Selection */}
      <div className="bg-white p-4 rounded-lg shadow-xs border border-neutrals-300">
        <Controller
          name="role"
          control={control}
          rules={{ required: "اختر دورك في المبادرة" }}
          render={({ field }) => (
            <FormInput
              type="radio"
              label="دورك في المبادرة"
              name="role"
              value={field.value}
              onChange={field.onChange}
              options={getAvailableRoles()}
              error={errors.role?.message as string}
            />
          )}
        />
      </div>

      {/* Custom Form Questions */}
      {hasForm && formQuestions.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow-xs border border-neutrals-300">
          <h3 className="text-lg font-medium text-neutrals-700 mb-4">
            أسئلة المشاركة
          </h3>

          <div className="space-y-4">
            {formQuestions.map((question) => (
              <div key={question.id} className="p-3 bg-neutrals-100 rounded-lg">
                <Controller
                  name={question.id as keyof JoinFormData}
                  control={control}
                  rules={
                    question.required ? { required: "هذا الحقل مطلوب" } : {}
                  }
                  render={({ field }) => (
                    <FormInput
                      type={
                        question.type === "checkbox"
                          ? "checkbox-group"
                          : question.type === "radio"
                          ? "radio"
                          : "text"
                      }
                      label={question.question}
                      name={question.id}
                      value={field.value}
                      onChange={field.onChange}
                      options={question.options?.map((option) => ({
                        value: option,
                        label: option,
                      }))}
                      error={errors[question.id]?.message as string}
                      isOptional={!question.required}
                    />
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submit Button */}
      <AppButton
        type="submit"
        disabled={isPending}
        className="w-full"
        corner="default"
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            جاري الإرسال...
          </>
        ) : (
          "انضمام للمبادرة"
        )}
      </AppButton>
    </form>
  );
}
