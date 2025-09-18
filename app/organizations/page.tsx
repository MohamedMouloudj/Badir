import { OrganizationService } from "@/services/organizations";
import OrganizationsList from "@/components/pages/organizations/OrganizationsList";
import { OrganizationStatus } from "@prisma/client";

export default async function Page() {
  const initialData = await OrganizationService.getMany(
    {},
    { page: 1, limit: 12 }
  );
  const approvedOrgs = initialData.data.filter(
    (org) => org.isApproved === OrganizationStatus.approved
  );
  const data = { ...initialData, data: approvedOrgs };
  return <OrganizationsList initialData={data} />;
}
