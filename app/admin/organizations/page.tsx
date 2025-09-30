import React from "react";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import getSessionWithCheckProfile from "@/hooks/getSessionWithCheckProfile";
import { getOrganizationsAction } from "@/actions/admin";
import OrganizationsManagement from "@/components/pages/admin/OrganizationsManagement";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface SearchParams {
  page?: string;
  status?: string;
  search?: string;
  organizationType?: string;
}

interface OrganizationsPageProps {
  searchParams: SearchParams;
}

function OrganizationsLoading() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="border rounded-lg p-4">
                <Skeleton className="h-6 w-64 mb-2" />
                <Skeleton className="h-4 w-48 mb-4" />
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

async function OrganizationsContent({ searchParams }: OrganizationsPageProps) {
  const { page, status, search, organizationType } = searchParams;
  const filters = {
    status: status as any,
    search: search || "",
    organizationType: organizationType || "",
  };

  const result = await getOrganizationsAction(
    filters,
    parseInt(page || "1", 10),
    10
  );

  if (!result.success) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">
            خطأ في تحميل المنظمات
          </h2>
          <p className="text-gray-600">{result.error}</p>
        </div>
      </div>
    );
  }

  if (!result.data) return <div className="p-6">لا توجد منظمات</div>;

  return <OrganizationsManagement initialData={result.data} />;
}

export default async function OrganizationsPage({
  searchParams,
}: OrganizationsPageProps) {
  const awaitedSearchParams = await searchParams;
  const session = await getSessionWithCheckProfile();

  // Check if user has admin permissions
  const isAdmin = session?.user?.email === process.env.ADMIN_EMAIL;

  if (!isAdmin) {
    redirect("/");
  }

  return (
    <Suspense fallback={<OrganizationsLoading />}>
      <OrganizationsContent searchParams={awaitedSearchParams} />
    </Suspense>
  );
}
