import InitiativeForm from "@/components/pages/initiatives/InitiativeForm";
import { InitiativeService } from "@/services/initiatives";
import { CategoryService } from "@/services/categories";
import getSessionWithCheckProfile from "@/hooks/getSessionWithCheckProfile";
import { notFound, redirect } from "next/navigation";

export default async function EditInitiativePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const session = await getSessionWithCheckProfile();
  if (!session) redirect("/login");

  const initiative = await InitiativeService.getById(id, session.user.id);
  if (!initiative) notFound();

  // Only manager can edit
  const isManager =
    session.user.id === initiative.organizerUserId ||
    session.user.id === initiative.organizerOrg?.userId;
  if (!isManager) notFound();

  const categories = await CategoryService.getAll();
  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.nameAr,
  }));

  return (
    <div className="container py-8 max-w-4xl mx-auto" dir="rtl">
      <h1 className="text-3xl font-bold text-primary-600 mb-6 text-center">
        تعديل المبادرة
      </h1>
      <InitiativeForm
        categories={categoryOptions}
        initialData={initiative}
        isOrganization={session.user.userType === "organization"}
      />
    </div>
  );
}
