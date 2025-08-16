"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  ContactFormData,
  contactSchema,
  inquiryTypes,
} from "@/schemas/contactSchema";
import AppButton from "@/components/AppButton";
import FormInput from "@/components/FormInput";
import { Loader2 } from "lucide-react";
import api from "@/services/api";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (formData: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const response = await api.post("/api/contact", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = response.data;

      if (data.success) {
        toast.success(data.message || "تم إرسال رسالتك بنجاح!");
        reset();
      } else {
        toast.error(data.error || "حدث خطأ أثناء إرسال الرسالة");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("حدث خطأ غير متوقع");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="size-full flex-2/3 mx-auto" dir="rtl">
      <div className="h-full bg-neutrals-50 border-2 border-neutrals-300 rounded-3xl p-6 md:p-8 lg:p-10 shadow-sm flex-center-column">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-primary-md font-bold text-primary-500 mb-4">
            تواصل معنا
          </h2>
          <p className="text-neutrals-600 text-secondary-md font-semibold">
            نحن هنا للاستماع إليك ومساعدتك. لا تتردد في التواصل معنا
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* First Row - Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <FormInput
                  type="text"
                  name="fullName"
                  label="الاسم الكامل"
                  placeholder="الاسم الكامل"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={errors.fullName?.message}
                  rtl={true}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <FormInput
                  type="email"
                  name="email"
                  label="البريد الإلكتروني"
                  placeholder="البريد الإلكتروني"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={errors.email?.message}
                  rtl={true}
                />
              )}
            />
          </div>

          {/* Second Row - Inquiry Type and Title */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Controller
              name="inquiryType"
              control={control}
              render={({ field }) => (
                <FormInput
                  type="select"
                  name="inquiryType"
                  label="نوع الاستفسار"
                  placeholder="نوع الاستفسار"
                  value={field.value}
                  onChange={field.onChange}
                  options={inquiryTypes.map((type) => ({
                    value: type,
                    label: type,
                  }))}
                  error={errors.inquiryType?.message}
                  rtl={true}
                />
              )}
            />

            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <FormInput
                  type="text"
                  name="title"
                  label="عنوان الرسالة"
                  placeholder="عنوان الرسالة"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={errors.title?.message}
                  rtl={true}
                  rows={3}
                />
              )}
            />
          </div>

          {/* Message */}
          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <FormInput
                type="textarea"
                name="message"
                label="الرسالة"
                placeholder="اكتب رسالتك هنا"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={errors.message?.message}
                rows={6}
                rtl={true}
              />
            )}
          />

          {/* Submit Button */}
          <div className="pt-4">
            <AppButton
              type="primary"
              size="lg"
              disabled={isSubmitting}
              onClick={handleSubmit(onSubmit)}
              className="w-full"
              corner="rounded"
              icon={
                isSubmitting ? (
                  <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                ) : null
              }
            >
              {isSubmitting ? "جاري الإرسال..." : "إرســال"}
            </AppButton>
          </div>
        </form>
      </div>
    </div>
  );
}
