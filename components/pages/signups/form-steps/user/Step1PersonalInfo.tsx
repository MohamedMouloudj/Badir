"use client";

import { Controller, useFormContext } from "react-hook-form";
import FormInput from "@/components/FormInput";
import { sexOptions, Step1FormData } from "@/schemas/signupUserSchema";
import { useEffect, useMemo } from "react";
import country from "country-list-js";
import { toast } from "sonner";

export default function Step1PersonalInfo() {
  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<Step1FormData>();

  useEffect(() => {
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setValue("latitude", position.coords.latitude);
            setValue("longitude", position.coords.longitude);
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        toast.error("تعذر الحصول على الموقع الحالي");
      }
    };

    getCurrentLocation();
  }, [setValue]);

  const COUNTRIES = useMemo(() => {
    const countries = country.names();
    return countries.sort().map((countryName) => ({
      value: countryName,
      label: countryName,
    }));
  }, []);

  return (
    <div className="space-y-6" dir="rtl">
      <div className="text-right mb-8">
        <h2 className="text-primary-sm font-bold text-primary-500 mb-2">
          1.المعلومات الشخصية
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Controller
          name="dateOfBirth"
          control={control}
          render={({ field: { onChange, value, onBlur } }) => (
            <div className="space-y-1" dir="rtl">
              <label className="block text-sm font-medium text-neutrals-600 mb-2">
                تاريخ الميلاد
                <span className="text-state-error ml-1">*</span>
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                onBlur={onBlur}
                className="w-full border border-neutrals-300 rounded-full px-3 py-2 placeholder:text-neutrals-300 text-neutrals-700 focus:border-secondary-600 focus:ring-1 focus:ring-secondary-600 focus:outline-none"
                dir="rtl"
              />
              {errors.dateOfBirth && (
                <p className="text-state-error text-sm mt-1">
                  {errors.dateOfBirth.message}
                </p>
              )}
            </div>
          )}
        />

        <Controller
          name="sex"
          control={control}
          render={({ field: { onChange, value } }) => (
            <FormInput
              type="radio"
              name="sex"
              label="الجنس"
              placeholder="اختر الجنس"
              value={value}
              onChange={onChange}
              options={sexOptions}
              error={errors.sex?.message}
            />
          )}
        />

        <div className="flex gap-4">
          <Controller
            name="phoneCountryCode"
            control={control}
            render={({ field }) => <input type="hidden" {...field} />}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field: { onChange, value, onBlur } }) => {
              const countryCode = watch("phoneCountryCode") || "DZ";

              return (
                <FormInput
                  type="tel"
                  name="phone"
                  label="رقم الهاتف"
                  placeholder="5xxxxxxxx"
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  error={errors.phone?.message}
                  countryCode={countryCode}
                  onCountryChange={(code) => setValue("phoneCountryCode", code)}
                />
              );
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Controller
            name="city"
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <FormInput
                type="text"
                name="city"
                label="المدينة"
                placeholder="أدخل اسم المدينة"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={errors.city?.message}
                isOptional={true}
              />
            )}
          />

          <Controller
            name="state"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormInput
                type="text"
                name="state"
                label="الولاية"
                placeholder="اختر الولاية"
                value={value}
                onChange={onChange}
                error={errors.state?.message}
              />
            )}
          />
        </div>

        <Controller
          name="country"
          control={control}
          render={({ field: { onChange, value, onBlur } }) => (
            <FormInput
              type="select"
              options={COUNTRIES}
              name="country"
              label="البلد"
              placeholder="الجزائر"
              value={value || "Algeria"}
              onChange={onChange}
              onBlur={onBlur}
              error={errors.country?.message}
            />
          )}
        />
      </div>
    </div>
  );
}
