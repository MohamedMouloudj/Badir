"use client";

import React, { useState } from "react";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";

const FormInputDemo = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
    newsletter: false,
    notifications: true,
    gender: "",
    country: "",
    city: "",
    skills: [] as string[], // New field for multiple skills
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange =
    (name: string) => (value: string | boolean | string[]) => {
      setFormData((prev) => ({ ...prev, [name]: value }));
      // Clear error when user starts typing
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "الاسم مطلوب";
    }

    if (!formData.email.trim()) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "البريد الإلكتروني غير صحيح";
    }

    if (!formData.password) {
      newErrors.password = "كلمة المرور مطلوبة";
    } else if (formData.password.length < 6) {
      newErrors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
    }

    if (!formData.gender) {
      newErrors.gender = "الجنس مطلوب";
    }

    if (!formData.country) {
      newErrors.country = "البلد مطلوب";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form data:", formData);
      alert("تم إرسال النموذج بنجاح!");
    }
  };

  const countryOptions = [
    { value: "sa", label: "المملكة العربية السعودية" },
    { value: "ae", label: "الإمارات العربية المتحدة" },
    { value: "eg", label: "مصر" },
    { value: "jo", label: "الأردن" },
    { value: "lb", label: "لبنان" },
  ];

  const cityOptions = [
    { value: "riyadh", label: "الرياض" },
    { value: "jeddah", label: "جدة" },
    { value: "dammam", label: "الدمام" },
    { value: "mecca", label: "مكة المكرمة" },
    { value: "medina", label: "المدينة المنورة" },
    { value: "dubai", label: "دبي" },
    { value: "abu-dhabi", label: "أبو ظبي" },
    { value: "cairo", label: "القاهرة" },
    { value: "alexandria", label: "الإسكندرية" },
  ];

  const genderOptions = [
    { value: "male", label: "ذكر" },
    { value: "female", label: "أنثى" },
  ];

  const skillsOptions = [
    { value: "programming", label: "البرمجة" },
    { value: "design", label: "التصميم" },
    { value: "marketing", label: "التسويق" },
    { value: "writing", label: "الكتابة" },
    { value: "management", label: "الإدارة" },
    { value: "analysis", label: "التحليل" },
    { value: "teaching", label: "التدريس" },
    { value: "consulting", label: "الاستشارات" },
  ];

  return (
    <div className="min-h-screen bg-neutrals-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-neutrals-700 mb-8 text-center">
              نموذج تسجيل المستخدم
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Text Input */}
              <FormInput
                type="text"
                label="الاسم الكامل"
                name="name"
                placeholder="أدخل اسمك الكامل"
                value={formData.name}
                onChange={handleInputChange("name")}
                error={errors.name}
              />

              {/* Email Input */}
              <FormInput
                type="email"
                label="البريد الإلكتروني"
                name="email"
                placeholder="example@domain.com"
                value={formData.email}
                onChange={handleInputChange("email")}
                error={errors.email}
              />

              {/* Password Input */}
              <FormInput
                type="password"
                label="كلمة المرور"
                name="password"
                placeholder="أدخل كلمة مرور قوية"
                value={formData.password}
                onChange={handleInputChange("password")}
                error={errors.password}
              />

              {/* Textarea */}
              <FormInput
                type="textarea"
                label="نبذة عنك"
                name="bio"
                placeholder="اكتب نبذة مختصرة عنك..."
                value={formData.bio}
                onChange={handleInputChange("bio")}
                rows={4}
                isOptional={true}
              />

              {/* Radio Group */}
              <FormInput
                type="radio"
                label="الجنس"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange("gender")}
                options={genderOptions}
                error={errors.gender}
              />

              {/* Select Dropdown */}
              <FormInput
                type="select"
                label="البلد"
                name="country"
                placeholder="اختر بلدك"
                value={formData.country}
                onChange={handleInputChange("country")}
                options={countryOptions}
                error={errors.country}
              />

              {/* Combobox with Search */}
              <FormInput
                type="combobox"
                label="المدينة"
                name="city"
                placeholder="اختر المدينة أو ابحث عنها"
                value={formData.city}
                onChange={handleInputChange("city")}
                options={cityOptions}
                isOptional={true}
              />

              {/* Multiple Choice Combobox */}
              <FormInput
                type="combobox"
                label="المهارات"
                name="skills"
                placeholder="اختر المهارات المتعددة"
                value={formData.skills}
                onChange={handleInputChange("skills")}
                options={skillsOptions}
                multiple={true}
                isOptional={true}
              />

              {/* Checkbox */}
              <FormInput
                type="checkbox"
                label="الاشتراك في النشرة الإخبارية"
                name="newsletter"
                placeholder="أريد تلقي النشرة الإخبارية"
                value={formData.newsletter}
                onChange={handleInputChange("newsletter")}
                isOptional={true}
              />

              {/* Switch */}
              <FormInput
                type="switch"
                label="إشعارات التطبيق"
                name="notifications"
                placeholder="تفعيل الإشعارات"
                value={formData.notifications}
                onChange={handleInputChange("notifications")}
                isOptional={true}
              />

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  className="w-full bg-secondary-500 hover:bg-secondary-600 text-white"
                >
                  إرسال النموذج
                </Button>
              </div>
            </form>

            {/* Form Data Preview */}
            <div className="mt-8 p-4 bg-neutrals-50 rounded-lg">
              <h3 className="text-lg font-semibold text-neutrals-700 mb-4">
                بيانات النموذج (للمراجعة):
              </h3>
              <pre className="text-sm text-neutrals-600 whitespace-pre-wrap">
                {JSON.stringify(formData, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormInputDemo;
