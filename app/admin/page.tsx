import { redirect } from "next/navigation";
import getSessionWithCheckProfile from "@/hooks/getSessionWithCheckProfile";
import { getAdminStatsAction } from "@/actions/admin";
import AdminDashboard from "@/components/pages/admin/Dashboard";

export default async function AdminPage() {
  const session = await getSessionWithCheckProfile();

  // TODO: Change admin permission check logic
  const isAdmin = session?.user?.email === process.env.ADMIN_EMAIL;

  if (!isAdmin) {
    redirect("/");
  }

  const statsResult = await getAdminStatsAction();

  if (!statsResult.success) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            خطأ في تحميل البيانات
          </h1>
          <p className="text-gray-600">{statsResult.error}</p>
        </div>
      </div>
    );
  }

  return <AdminDashboard initialStats={statsResult.data} />;
}
