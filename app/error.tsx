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
      className="bg-neutrals-100 flex min-h-screen flex-col items-center justify-center px-6"
      dir="rtl"
    >
      <div className="w-full max-w-md space-y-8 text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        {/* Error Icon */}
        <div className="bg-state-error mx-auto flex h-24 w-24 items-center justify-center rounded-full">
          <svg
            className="h-12 w-12 text-white"
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
          <h1 className="text-primary-lg text-neutrals-700 font-bold">
            حدث خطأ غير متوقع
          </h1>

          <p className="text-paragraph-md text-neutrals-500 leading-relaxed">
            نعتذر، حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى أو الاتصال
            بنا إذا استمرت المشكلة.
          </p>

          {/* Error Details (only in development) */}
          {process.env.NODE_ENV === "development" && (
            <details className="bg-neutrals-200 mt-4 rounded-lg p-4 text-left">
              <summary className="text-neutrals-600 mb-2 cursor-pointer text-sm font-medium">
                تفاصيل الخطأ (للمطورين)
              </summary>
              <code className="text-state-error text-xs break-all">
                {error.message}
              </code>
            </details>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={reset}
            className="bg-primary-500 hover:bg-primary-400 text-button-lg w-full rounded-lg px-6 py-3 font-semibold text-white transition-colors duration-200"
          >
            المحاولة مرة أخرى
          </button>

          <Link
            href="/"
            className="border-primary-500 text-primary-500 hover:bg-primary-50 text-button-lg inline-block w-full rounded-lg border-2 bg-transparent px-6 py-3 font-semibold transition-colors duration-200"
          >
            العودة للصفحة الرئيسية
          </Link>
        </div>

        {/* Support Contact */}
        <div className="border-neutrals-300 border-t pt-8">
          <p className="text-paragraph-sm text-neutrals-400">
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
