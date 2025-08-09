"use client";

import React from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-neutrals-100 text-neutrals-500">
        <div className="min-h-screen flex flex-col items-center justify-center px-6">
          <div className="max-w-md w-full text-center space-y-8">
            {/* Critical Error Icon */}
            <div className="w-32 h-32 mx-auto bg-state-error rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="w-16 h-16 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            {/* Error Content */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-neutrals-700">
                خطأ نظام حرج
              </h1>

              <p className="text-lg text-neutrals-500 leading-relaxed">
                نعتذر بشدة، حدث خطأ خطير في النظام. يرجى إعادة تحميل الصفحة أو
                المحاولة لاحقاً.
              </p>

              {/* Error Details (only in development) */}
              {process.env.NODE_ENV === "development" && (
                <details className="mt-6 p-4 bg-neutrals-200 rounded-lg text-left">
                  <summary className="cursor-pointer text-sm font-medium text-neutrals-600 mb-2">
                    تفاصيل الخطأ النظام (للمطورين)
                  </summary>
                  <div className="mt-2 space-y-2">
                    <div className="text-xs text-state-error break-all">
                      <strong>رسالة الخطأ:</strong> {error.message}
                    </div>
                    {error.digest && (
                      <div className="text-xs text-neutrals-600">
                        <strong>معرف الخطأ:</strong> {error.digest}
                      </div>
                    )}
                    {error.stack && (
                      <div className="text-xs text-neutrals-600 mt-2">
                        <strong>مكدس الاستدعاء:</strong>
                        <pre className="mt-1 whitespace-pre-wrap text-xs">
                          {error.stack}
                        </pre>
                      </div>
                    )}
                  </div>
                </details>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={reset}
                className="w-full px-8 py-4 bg-primary-500 hover:bg-primary-400 text-white font-bold rounded-lg transition-colors duration-200 text-lg shadow-md"
              >
                إعادة المحاولة
              </button>

              <button
                onClick={() => (window.location.href = "/")}
                className="w-full px-8 py-4 bg-transparent border-2 border-primary-500 text-primary-500 hover:bg-primary-50 font-bold rounded-lg transition-colors duration-200 text-lg"
              >
                العودة للصفحة الرئيسية
              </button>

              <button
                onClick={() => window.location.reload()}
                className="w-full px-8 py-4 bg-transparent border-2 border-neutrals-400 text-neutrals-600 hover:bg-neutrals-200 font-semibold rounded-lg transition-colors duration-200"
              >
                إعادة تحميل الصفحة
              </button>
            </div>

            {/* Emergency Contact */}
            <div className="pt-8 border-t border-neutrals-300">
              <p className="text-sm text-neutrals-400 mb-4">
                في حالة استمرار المشكلة، يرجى الاتصال بالدعم الفني
              </p>
              <div className="space-y-2 text-sm">
                <p className="text-neutrals-500">
                  <strong>البريد الإلكتروني:</strong>{" "}
                  <a
                    href="mailto:support@badir.sa"
                    className="text-primary-500 hover:text-primary-400"
                  >
                    support@badir.sa
                  </a>
                </p>
                <p className="text-neutrals-400">
                  يرجى تضمين معرف الخطأ إن وجد في رسالتك
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-6">
              <p className="text-xs text-neutrals-400">
                © 2025 منصة بادر - جميع الحقوق محفوظة
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
