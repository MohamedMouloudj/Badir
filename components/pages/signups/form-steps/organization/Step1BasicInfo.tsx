"use client";

import { Controller, useFormContext } from "react-hook-form";
import FormInput from "@/components/FormInput";
import { SignupOrgStep1Data } from "@/schemas";

export default function Step1BasicInfoForm() {
  const { control } = useFormContext<SignupOrgStep1Data>();

  return (
    <div className="space-y-6" dir="rtl">
      <div className="text-right mb-8">
        <h2 className="text-primary-sm font-bold text-primary-500 mb-2">
          1. بيانات المنظمة
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          name="officialName"
          control={control}
          render={({ field, fieldState }) => (
            <FormInput
              type="text"
              label="الاسم الرسمي للمنظمة"
              name={field.name}
              placeholder="الاسم الرسمي"
              value={field.value}
              onChange={field.onChange}
              error={fieldState.error?.message}
              rtl={true}
            />
          )}
        />
        <Controller
          name="shortName"
          control={control}
          render={({ field, fieldState }) => (
            <FormInput
              type="text"
              label="الاسم المختصر"
              isOptional={true}
              name={field.name}
              placeholder="الاسم المختصر"
              value={field.value}
              onChange={field.onChange}
              error={fieldState.error?.message}
              rtl={true}
            />
          )}
        />
      </div>

      <Controller
        name="contactEmail"
        control={control}
        render={({ field, fieldState }) => (
          <FormInput
            type="email"
            label="البريد الإلكتروني"
            name={field.name}
            placeholder="البريد الإلكتروني"
            value={field.value}
            onChange={field.onChange}
            error={fieldState.error?.message}
            rtl={true}
          />
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          name="foundingDate"
          control={control}
          render={({ field, fieldState }) => (
            <FormInput
              type="date"
              label="تاريخ التأسيس"
              name={field.name}
              placeholder="ي ي / ش ش / س س س س"
              value={
                field.value
                  ? new Date(field.value).toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                field.onChange(e && typeof e === "string" ? new Date(e) : null)
              }
              error={fieldState.error?.message}
              rtl={true}
            />
          )}
        />

        <Controller
          name="membersCount"
          control={control}
          render={({ field, fieldState }) => (
            <FormInput
              type="number"
              label="عدد الأعضاء"
              name={field.name}
              placeholder="عدد الأعضاء"
              value={field.value?.toString() || ""}
              onChange={(e) => {
                const val = e ? parseInt(e.toString(), 10) : undefined;
                field.onChange(
                  val !== undefined && !isNaN(val) ? val : undefined
                );
              }}
              error={fieldState.error?.message}
              rtl={true}
            />
          )}
        />
      </div>

      <Controller
        name="headquarters"
        control={control}
        render={({ field, fieldState }) => (
          <FormInput
            type="text"
            label="المقر الرئيسي"
            name={field.name}
            placeholder="المقر الرئيسي"
            value={field.value || ""}
            onChange={field.onChange}
            error={fieldState.error?.message}
            rtl={true}
          />
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          name="state"
          control={control}
          render={({ field, fieldState }) => (
            <FormInput
              type="text"
              label="الولاية"
              name={field.name}
              placeholder="الولاية"
              value={field.value}
              onChange={field.onChange}
              error={fieldState.error?.message}
              rtl={true}
            />
          )}
        />

        <Controller
          name="country"
          control={control}
          render={({ field, fieldState }) => (
            <FormInput
              type="text"
              label="الدولة"
              name={field.name}
              placeholder="الدولة"
              value={field.value}
              onChange={field.onChange}
              error={fieldState.error?.message}
              rtl={true}
            />
          )}
        />
      </div>

      <Controller
        name="contactPhoneOrg"
        control={control}
        render={({ field, fieldState }) => (
          <FormInput
            type="tel"
            label="رقم الهاتف"
            name={field.name}
            placeholder="000000000"
            value={field.value || ""}
            onChange={field.onChange}
            error={fieldState.error?.message}
            rtl={true}
            countryCode={control._formValues.contactPhoneCountryCode || "DZ"}
            onCountryChange={(code) => {
              control._formValues.contactPhoneCountryCode = code;
            }}
          />
        )}
      />
    </div>
  );
}
