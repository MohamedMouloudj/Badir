import { ShieldAlert } from "lucide-react";
import ResetPasswordForm from "@/components/pages/reset-password/ResetPasswordForm";
import BackButton from "@/components/BackButton";
import { redirect } from "next/navigation";

interface ResetPasswordPageProps {
  searchParams: Promise<{
    token?: string;
  }>;
}

export default async function page({ searchParams }: ResetPasswordPageProps) {
  const { token } = await searchParams;

  if (!token) {
    redirect("/forgot-password");
  }

  return (
    <div className="bg-neutrals-50 flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center" dir="rtl">
          <div className="bg-primary-100 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            <ShieldAlert className="text-primary-600 h-8 w-8" />
          </div>
          <h1 className="text-neutrals-900 text-3xl font-bold">
            إعادة تعيين كلمة المرور
          </h1>
          <p className="text-neutrals-600 mt-2 text-sm">
            أدخل كلمة المرور الجديدة لحسابك
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-lg bg-white p-8 shadow-md">
          <ResetPasswordForm token={token} />
        </div>

        <BackButton url="/login" />
      </div>
    </div>
  );
}
