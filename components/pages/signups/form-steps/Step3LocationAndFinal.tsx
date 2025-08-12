"use client";

import { Controller, useFormContext } from "react-hook-form";
import FormInput from "@/components/FormInput";
import { Step3FormData } from "@/schemas/signupSchema";

export default function Step3LocationAndFinal() {
  const {
    control,
    formState: { errors },
  } = useFormContext<Step3FormData>();

  return (
    <div className="space-y-6" dir="rtl">
      <div className="text-right mb-8">
        <h2 className="text-primary-sm font-bold text-primary-500 mb-2">
          3. الموافقة والتعهد
        </h2>
      </div>

      <div className="flex items-start gap-3" dir="rtl">
        <Controller
          name="acceptConditions"
          control={control}
          render={({ field: { onChange, value } }) => (
            <FormInput
              type="checkbox"
              name="acceptConditions"
              label=""
              value={value}
              onChange={onChange}
              error={errors.acceptConditions?.message}
              className="w-fit md:w-max"
            />
          )}
        />

        <div className="bg-neutral-50 p-2 rounded-lg border border-neutral-200 ">
          <p className="w-full font-semibold text-secondary-md text-neutrals-700 leading-relaxed">
            أقر بأن جميع البيانات المقدمة صحيحة، وأتعهد بالالتزام بضوابط العمل
            التطوعي وقيم منصة بادر، والمحافظة على سمعتها أثناء مشاركتي في
            أنشطتها.
          </p>
        </div>
      </div>
    </div>
  );
}
