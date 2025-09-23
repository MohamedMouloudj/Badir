import { Metadata } from "next";
import InitiativeForm from "@/components/pages/initiatives/InitiativeForm";
import { CategoryService } from "@/services/categories";
import { redirect } from "next/navigation";
import getSessionWithCheckProfile from "@/hooks/getSessionWithCheckProfile";

export const metadata: Metadata = {
  title: "إنشاء مبادرة جديدة - بادر",
  description: "قم بإنشاء مبادرة جديدة على منصة بادر",
};

export default async function NewInitiativePage() {
  const session = await getSessionWithCheckProfile();
  if (!session) {
    redirect("/login");
  }

  const categories = await CategoryService.getAll();
  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.nameAr,
  }));

  return (
    <div className="container py-8 max-w-4xl mx-auto" dir="rtl">
      <h1 className="text-3xl font-bold text-primary-600 mb-6 text-center">
        إنشاء مبادرة جديدة
      </h1>

      <p className="text-neutrals-500 mb-8 text-center">
        قم بملء النموذج التالي لإنشاء مبادرة جديدة. يمكنك حفظها كمسودة للعودة
        إليها لاحقاً.
      </p>

      <InitiativeForm categories={categoryOptions} />
    </div>
  );
}
