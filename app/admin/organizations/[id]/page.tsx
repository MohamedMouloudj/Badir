import React from "react";
import { redirect, notFound } from "next/navigation";
import getSessionWithCheckProfile from "@/hooks/getSessionWithCheckProfile";
import { getOrganizationDetailsAction } from "@/actions/admin";
import OrganizationDetails from "@/components/pages/admin/OrganizationDetails";

interface OrganizationDetailsPageProps {
  params: { id: string };
}

export default async function OrganizationDetailsPage({
  params,
}: OrganizationDetailsPageProps) {
  const session = await getSessionWithCheckProfile();

  // Check if user has admin permissions
  const isAdmin = session?.user?.email === process.env.ADMIN_EMAIL;

  if (!isAdmin) {
    redirect("/");
  }

  const result = await getOrganizationDetailsAction(params.id);

  if (!result.success) {
    if (result.error === "المنظمة غير موجودة") {
      notFound();
    }
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            خطأ في تحميل تفاصيل المنظمة
          </h1>
          <p className="text-gray-600">{result.error}</p>
        </div>
      </div>
    );
  }

  if (!result.data) return <div className="p-6">لا توجد منظمة</div>;
  return <OrganizationDetails organization={result.data} />;
}
