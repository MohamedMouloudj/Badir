import React from "react";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function NotFound() {
  return (
    <div
      className="min-h-screen bg-neutrals-100 flex flex-col items-center justify-center px-6"
      dir="rtl"
    >
      <div className="max-w-md w-full text-center space-y-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo />
        </div>

        {/* 404 Illustration */}
        <div className="relative">
          <div className="text-9xl font-bold text-neutrals-300 select-none">
            404
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h1 className="text-heading-h2 font-bold text-neutrals-700">
            الصفحة غير موجودة
          </h1>

          <p className="text-body-regular text-neutrals-500 leading-relaxed">
            عذراً، لا يمكننا العثور على الصفحة التي تبحث عنها. قد تكون قد تم
            حذفها أو تغيير رابطها أو أنها غير متاحة مؤقتاً.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            href="/"
            className="w-full inline-block px-6 py-3 bg-primary-500 hover:bg-primary-400 text-white font-semibold rounded-lg transition-colors duration-200 text-button-primary"
          >
            العودة للصفحة الرئيسية
          </Link>

          <Link
            href="/contact"
            className="w-full inline-block px-6 py-3 bg-transparent border-2 border-primary-500 text-primary-500 hover:bg-primary-50 font-semibold rounded-lg transition-colors duration-200 text-button-primary"
          >
            تواصل معنا
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="pt-8 border-t border-neutrals-300">
          <p className="text-body-small text-neutrals-400 mb-4">
            ربما تبحث عن:
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-caption-note">
            <Link
              href="/about"
              className="text-primary-500 hover:text-primary-400 transition-colors"
            >
              عن المنصة
            </Link>
            <Link
              href="/organizations"
              className="text-primary-500 hover:text-primary-400 transition-colors"
            >
              المنظمات
            </Link>
            <Link
              href="/initiatives"
              className="text-primary-500 hover:text-primary-400 transition-colors"
            >
              المبادرات
            </Link>
            <Link
              href="/contact"
              className="text-primary-500 hover:text-primary-400 transition-colors"
            >
              تواصل معنا
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
