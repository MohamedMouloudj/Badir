"use client";

import React from "react";
import Link from "next/link";
import Logo from "@/components/Logo";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
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

        {/* Error Icon */}
        <div className="w-24 h-24 mx-auto bg-state-error rounded-full flex items-center justify-center">
          <svg
            className="w-12 h-12 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        {/* Error Content */}
        <div className="space-y-4">
          <h1 className="text-heading-h2 font-bold text-neutrals-700">
            حدث خطأ غير متوقع
          </h1>

          <p className="text-body-regular text-neutrals-500 leading-relaxed">
            نعتذر، حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى أو الاتصال
            بنا إذا استمرت المشكلة.
          </p>

          {/* Error Details (only in development) */}
          {process.env.NODE_ENV === "development" && (
            <details className="mt-4 p-4 bg-neutrals-200 rounded-lg text-left">
              <summary className="cursor-pointer text-sm font-medium text-neutrals-600 mb-2">
                تفاصيل الخطأ (للمطورين)
              </summary>
              <code className="text-xs text-state-error break-all">
                {error.message}
              </code>
            </details>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={reset}
            className="w-full px-6 py-3 bg-primary-500 hover:bg-primary-400 text-white font-semibold rounded-lg transition-colors duration-200 text-button-primary"
          >
            المحاولة مرة أخرى
          </button>

          <Link
            href="/"
            className="w-full inline-block px-6 py-3 bg-transparent border-2 border-primary-500 text-primary-500 hover:bg-primary-50 font-semibold rounded-lg transition-colors duration-200 text-button-primary"
          >
            العودة للصفحة الرئيسية
          </Link>
        </div>

        {/* Support Contact */}
        <div className="pt-8 border-t border-neutrals-300">
          <p className="text-body-small text-neutrals-400">
            هل تحتاج للمساعدة؟{" "}
            <Link
              href="/contact"
              className="text-primary-500 hover:text-primary-400 font-semibold"
            >
              تواصل معنا
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
