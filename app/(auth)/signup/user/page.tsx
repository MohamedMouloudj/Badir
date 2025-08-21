"use client";

import { SignupForm } from "@/components/pages/signups/SignupForm";
import Image from "next/image";
import Link from "next/link";

export default function UserSignupPage() {
  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-primary-600 p-4">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row bg-neutrals-100 rounded-xl shadow-2xl overflow-hidden min-h-[600px]">
        {/* Image Section */}
        <div className="flex-1 relative h-64 lg:h-auto">
          <Image
            src="/images/auth-form-aside2.png"
            alt="Volunteer"
            fill
            className="object-cover md:rounded-r-4xl"
            priority
            style={{
              boxShadow: "3px 0 5px 0 rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>

        {/* Form Section */}
        <div
          className="flex-1 flex flex-col justify-center max-md:justify-start items-start p-6 md:p-8 md:px-10"
          dir="rtl"
        >
          <div className="w-full flex-center-column gap-6 md:gap-10 h-full">
            {/* Logo */}
            <div className="flex justify-start mb-8 self-start max-md:hidden">
              <Image
                src="/images/logos/logo.svg"
                alt="Badir Logo"
                width={120}
                height={46}
                quality={80}
                className="w-auto h-12"
              />
            </div>

            {/* Right side - Form */}
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="text-center md:text-right space-y-2">
                <h1 className="text-3xl lg:text-4xl font-bold text-primary-500">
                  مرحباً بك في منصة العمل التطوعي
                </h1>
                <p className="text-gray-600 text-lg max-w-md">
                  ابدأ رحلتك في التطوع وساهم في بناء مجتمع أفضل
                </p>
              </div>

              <SignupForm />

              <div className="text-center text-sm text-gray-600">
                <p>
                  لديك حساب بالفعل؟{" "}
                  <Link
                    href="/login"
                    className="text-green-600 hover:text-green-700 font-medium hover:underline"
                  >
                    ادخل لحسابك
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
