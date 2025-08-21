import { OrganizationService } from "@/services/organizations";
import OrganizationsList from "@/components/pages/organizations/OrganizationsList";

export default async function Page() {
  const initialData = await OrganizationService.getMany(
    {},
    { page: 1, limit: 12 }
  );
  return <OrganizationsList initialData={initialData} />;
}
