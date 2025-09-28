import { Metadata } from "next";
import { redirect } from "next/navigation";
import getSessionWithCheckProfile from "@/hooks/getSessionWithCheckProfile";
import AdminSidebar from "@/components/pages/admin/AdminSidebar";

export const metadata: Metadata = {
  title: "لوحة تحكم المسؤول",
  description: "إدارة المنظمات والمبادرات",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSessionWithCheckProfile();

  // Check if user has admin permissions
  const isAdmin = session?.user?.email === process.env.ADMIN_EMAIL;

  if (!isAdmin) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen bg-gray-50" dir="rtl">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
