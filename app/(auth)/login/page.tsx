import LoginForm from "@/components/pages/login/LoginForm";
import { authRoutes } from "@/data/routes";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-primary-600 p-4">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row bg-neutrals-100 rounded-xl shadow-2xl overflow-hidden min-h-[600px]">
        {/* Image Section */}
        <div className="flex-1 relative h-64 lg:h-auto">
          <Image
            src="/images/auth-form-aside.png"
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
          <div className="w-full max-w-md flex-center-column gap-6 md:gap-10 h-full">
            {/* Logo */}
            <div className="flex justify-start mb-4 md:mb-8 self-start max-md:hidden">
              <Image
                src="/images/logos/logo.svg"
                alt="Badir Logo"
                width={120}
                height={46}
                quality={80}
                className="w-auto h-12"
              />
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl text-primary-600 font-bold text-center md:text-right mb-4 md:mb-8">
              تسجيل الدخول
            </h1>

            {/* Form */}
            <LoginForm />

            {/* Sign up link */}
            <div className="text-center mt-2 pt-4">
              <p className="text-neutrals-600 text-sm">
                ليس لديك حساب؟{" "}
                <Link
                  href={authRoutes.signup.signupIndividual.url}
                  className="text-primary-400 hover:text-primary-500 font-semibold underline transition-colors duration-200"
                >
                  انضم الآن
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
