"use client";
import { Controller, useFormContext } from "react-hook-form";
import FormInput from "@/components/FormInput";
import {
  OrgRegistrationFormData,
  organizationTypeOptions,
  workAreaOptions,
} from "@/schemas/signupOrgSchema";

export default function Step3OrgType() {
  const { control } = useFormContext<OrgRegistrationFormData>();

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-primary-500 mb-2">
          3. التصنيف والمجال
        </h2>
      </div>

      <div className="mb-8">
        <Controller
          name="organizationType"
          control={control}
          render={({ field, fieldState }) => (
            <FormInput
              type="radio"
              label="نوع المنظمة"
              name={field.name}
              options={organizationTypeOptions}
              value={field.value}
              onChange={field.onChange}
              error={fieldState.error?.message}
              rtl={true}
            />
          )}
        />
      </div>

      <div>
        <Controller
          name="workAreas"
          control={control}
          render={({ field, fieldState }) => (
            <FormInput
              type="checkbox-group"
              label="مجالات العمل"
              name={field.name}
              options={workAreaOptions}
              value={field.value || []}
              onChange={field.onChange}
              error={fieldState.error?.message}
              rtl={true}
            />
          )}
        />
      </div>
    </div>
  );
}
