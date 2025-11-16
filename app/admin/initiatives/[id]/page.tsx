import React from "react";
import { redirect, notFound } from "next/navigation";
import getSessionWithCheckProfile from "@/hooks/getSessionWithCheckProfile";
import { getInitiativeDetailsAction } from "@/actions/admin";
import InitiativeDetails from "@/components/pages/admin/InitiativeDetails";

interface InitiativeDetailsPageProps {
  params: { id: string };
}

export default async function InitiativeDetailsPage({
  params,
}: InitiativeDetailsPageProps) {
  const session = await getSessionWithCheckProfile();

  // Check if user has admin permissions
  const isAdmin = session?.user?.email === process.env.ADMIN_EMAIL;

  if (!isAdmin) {
    redirect("/");
  }

  const result = await getInitiativeDetailsAction(params.id);

  if (!result.success) {
    if (result.error === "المبادرة غير موجودة") {
      notFound();
    }
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-red-600">
            خطأ في تحميل تفاصيل المبادرة
          </h1>
          <p className="text-gray-600">{result.error}</p>
        </div>
      </div>
    );
  }

  if (!result.data) return <div className="p-6">لا توجد مبادرات</div>;
  return <InitiativeDetails initiative={result.data} />;
}
