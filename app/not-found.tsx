import React from "react";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function NotFound() {
  return (
    <div
      className="bg-neutrals-100 flex min-h-screen flex-col items-center justify-center px-6"
      dir="rtl"
    >
      <div className="w-full max-w-md space-y-8 text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        {/* 404 Illustration */}
        <div className="relative">
          <div className="text-neutrals-300 text-9xl font-bold select-none">
            404
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h1 className="text-primary-lg text-neutrals-700 font-bold">
            الصفحة غير موجودة
          </h1>

          <p className="text-paragraph-md text-neutrals-500 leading-relaxed">
            عذراً، لا يمكننا العثور على الصفحة التي تبحث عنها. قد تكون قد تم
            حذفها أو تغيير رابطها أو أنها غير متاحة مؤقتاً.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            href="/"
            className="bg-primary-500 hover:bg-primary-400 text-button-lg inline-block w-full rounded-lg px-6 py-3 font-semibold text-white transition-colors duration-200"
          >
            العودة للصفحة الرئيسية
          </Link>

          <Link
            href="/contact"
            className="border-primary-500 text-primary-500 hover:bg-primary-50 text-button-lg inline-block w-full rounded-lg border-2 bg-transparent px-6 py-3 font-semibold transition-colors duration-200"
          >
            تواصل معنا
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="border-neutrals-300 border-t pt-8">
          <p className="text-paragraph-sm text-neutrals-400 mb-4">
            ربما تبحث عن:
          </p>
          <div className="text-caption-note flex flex-wrap justify-center gap-4">
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
