import ForgotPasswordForm from "@/components/pages/forgot-password/ForgotPasswordForm";
import BackButton from "@/components/BackButton";

export default function page() {
  return (
    <div className="bg-neutrals-50 flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center" dir="rtl">
          <h1 className="text-neutrals-900 text-3xl font-bold">
            نسيت كلمة المرور؟
          </h1>
          <p className="text-neutrals-600 mt-2 text-sm">
            أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-lg bg-white p-8 shadow-md">
          <ForgotPasswordForm />
        </div>

        <BackButton url="/login" />
      </div>
    </div>
  );
}
