import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Building2,
  Users,
  Settings,
  LogOut,
  Home,
} from "lucide-react";
import { headers } from "next/headers";

const AdminSidebar = async () => {
  const pathname = (await headers()).get("x-pathname");

  const navigation = [
    {
      name: "الإحصائيات",
      href: "/admin",
      icon: LayoutDashboard,
      current: pathname === "/admin",
    },
    {
      name: "إدارة المنظمات",
      href: "/admin/organizations",
      icon: Building2,
      current: pathname?.startsWith("/admin/organizations"),
    },
    {
      name: "إدارة المبادرات",
      href: "/admin/initiatives",
      icon: Users,
      current: pathname?.startsWith("/admin/initiatives"),
    },
    {
      name: "الإعدادات",
      href: "/admin/settings",
      icon: Settings,
      current: pathname?.startsWith("/admin/settings"),
    },
  ];

  const bottomNavigation = [
    {
      name: "العودة للموقع",
      href: "/",
      icon: Home,
    },
    {
      name: "تسجيل الخروج",
      href: "/logout",
      icon: LogOut,
    },
  ];

  return (
    <div className="flex flex-col w-64 bg-white shadow-lg border-l border-gray-200">
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
                item.current
                  ? "bg-primary-50 text-primary-700 border border-primary-200"
                  : "text-gray-700 hover:text-gray-900"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5",
                  item.current ? "text-primary-600" : "text-gray-500"
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        {bottomNavigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:text-gray-900"
            >
              <Icon className="w-5 h-5 text-gray-500" />
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AdminSidebar;
