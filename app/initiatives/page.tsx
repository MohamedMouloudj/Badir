import getSessionWithCheckProfile from "@/hooks/getSessionWithCheckProfile";
import { InitiativeService } from "@/services/initiatives";
import { CategoryService } from "@/services/categories";
import InitiativesList from "@/components/pages/initiatives/InitiativesList";

export default async function Page() {
  await getSessionWithCheckProfile();

  try {
    // Fetch initial data for the page
    const [initialInitiatives, categories] = await Promise.all([
      InitiativeService.getMany({}, { page: 1, limit: 12 }),
      CategoryService.getAll(),
    ]);

    return (
      <InitiativesList
        initialData={initialInitiatives}
        categories={categories}
      />
    );
  } catch (error) {
    console.error("Error loading initiatives page:", error);
    return (
      <div className="min-h-screen bg-neutrals-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutrals-700 mb-4">
            حدث خطأ أثناء تحميل المبادرات
          </h1>
          <p className="text-neutrals-500">يرجى المحاولة مرة أخرى لاحقاً</p>
        </div>
      </div>
    );
  }
}
