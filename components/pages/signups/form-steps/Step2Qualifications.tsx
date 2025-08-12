"use client";

import { Controller, useFormContext } from "react-hook-form";
import FormInput from "@/components/FormInput";
import {
  educationalLevelOptions,
  Step2FormData,
  userTypeOptions,
} from "@/schemas/signupSchema";

export default function Step2Qualifications() {
  //? in future: we can fill form automatically based on locations

  const {
    control,
    formState: { errors },
  } = useFormContext<Step2FormData>();

  return (
    <div className="space-y-6" dir="rtl">
      <div className="text-right mb-8">
        <h2 className="text-primary-sm font-bold text-primary-500 mb-2">
          2. الخلفية التعليمية والمهنية
        </h2>
      </div>

      <Controller
        name="educationalLevel"
        control={control}
        render={({ field: { onChange, value } }) => (
          <FormInput
            type="radio"
            name="educationalLevel"
            label="المستوى التعليمي"
            placeholder="اختر المستوى التعليمي"
            value={value}
            onChange={onChange}
            options={educationalLevelOptions}
            error={errors.educationalLevel?.message}
          />
        )}
      />

      <Controller
        name="specification"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <FormInput
            type="text"
            name="specification"
            label="التخصص"
            placeholder="مثال: هندسة معمارية، طب، تكنولوجيا معلومات"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={errors.specification?.message}
          />
        )}
      />

      <Controller
        name="currentJob"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <FormInput
            type="text"
            name="currentJob"
            label="الوظيفة الحالية"
            placeholder="مثال: مهندس برمجيات، طبيب، طالب"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={errors.currentJob?.message}
            optionalText="إن وجدت"
            isOptional
          />
        )}
      />

      <Controller
        name="bio"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <FormInput
            type="textarea"
            name="bio"
            label="نبذة شخصية"
            placeholder="اكتب نبذة مختصرة عن نفسك وخبراتك..."
            value={value || ""}
            onChange={onChange}
            onBlur={onBlur}
            error={errors.bio?.message}
            isOptional
            rows={4}
          />
        )}
      />
      <Controller
        name="userType"
        control={control}
        render={({ field: { onChange, value } }) => (
          <FormInput
            type="radio"
            name="userType"
            label="نوع المستخدم"
            value={value}
            onChange={onChange}
            options={userTypeOptions}
            error={errors.userType?.message}
          />
        )}
      />
    </div>
  );
}
