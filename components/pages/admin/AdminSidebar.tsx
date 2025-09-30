"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Building2, Users, Home } from "lucide-react";
import Logout from "@/components/Logout";
import { usePathname } from "next/navigation";
const navigation = [
  {
    name: "الإحصائيات",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "إدارة المنظمات",
    href: "/admin/organizations",
    icon: Building2,
  },
  {
    name: "إدارة المبادرات",
    href: "/admin/initiatives",
    icon: Users,
  },
];
const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <div
      className="flex flex-col w-64 bg-white shadow-md border-l border-gray-200"
      style={{
        paddingBottom: "calc(var(--navbar-height))",
      }}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">لوحة تحكم المسؤول</h2>
        <p className="text-sm text-gray-600 mt-1">إدارة المنصة</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-gray-50",
                pathname === item.href
                  ? "bg-primary-50 text-primary-700 border border-primary-200"
                  : "text-gray-700 hover:text-gray-900"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5",
                  pathname === item.href ? "text-primary-600" : "text-gray-500"
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <Link
          href="/initiatives"
          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:text-gray-900"
        >
          <Home className="w-5 h-5 text-gray-500" />
          العودة للموقع
        </Link>
        <Logout />
      </div>
    </div>
  );
};

export default AdminSidebar;
