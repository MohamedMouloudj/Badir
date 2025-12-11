import { Suspense } from "react";
import CategoriesManagement from "@/components/pages/admin/CategoriesManagement";
import { Loader2 } from "lucide-react";

export const metadata = {
  title: "إدارة الفئات - لوحة تحكم المسؤول",
  description: "إدارة فئات المبادرات",
};

export default function CategoriesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      }
    >
      <CategoriesManagement />
    </Suspense>
  );
}
