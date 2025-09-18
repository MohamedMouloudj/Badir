import { OrganizationService } from "@/services/organizations";
import { InitiativeService } from "@/services/initiatives";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  Mail,
  MapPin,
  Building,
  Users,
  Briefcase,
  Home,
} from "lucide-react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getPublicStorageUrl } from "@/actions/supabaseHelpers";
import { toPlainOrganization } from "@/lib/utils";
import OrgInitiative from "@/components/pages/OrgInitiative";
import { workAreaOptions } from "@/types/Profile";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = await params;
  const org = await OrganizationService.getOrganizationById(id);

  if (!org) {
    return {
      title: "المنظمة غير موجودة",
    };
  }

  return {
    title: `${org.name} - بادر`,
    description: org.description || `الملف التعريفي لمنظمة ${org.name}`,
  };
}

export default async function OrganizationProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const orgData = await OrganizationService.getOrganizationById(id);

  if (!orgData) {
    notFound();
  }

  const initiatives = await InitiativeService.getOrgInitiativesWithAvgRating(
    id
  );

  const logoPath = orgData.logo;
  let logoUrl = null;
  if (logoPath) {
    logoUrl = await getPublicStorageUrl("avatars", logoPath);
  }

  return (
    <div className="min-h-screen bg-neutrals-100 p-6" dir="rtl">
      <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-sm border-2 border-neutrals-300">
        <div className="flex-center gap-4 mb-8">
          <Avatar className="h-24 w-24">
            <AvatarImage src={logoUrl || ""} alt={orgData.name} />
            <AvatarFallback className="border-2 border-primary-500 text-primary-500 font-semibold">
              <Building className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-center-column items-start gap-2">
            <h1 className="text-2xl font-bold text-neutrals-700">
              {orgData.name}
              {orgData.shortName && ` (${orgData.shortName})`}
            </h1>
            <p className="text-neutrals-500">{orgData.organizationType}</p>
          </div>
        </div>

        <div className="flex-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex-center justify-baseline gap-4 flex-wrap flex-1">
            {orgData.foundingDate && (
              <span className="text-caption text-neutrals-500">
                <Calendar className="inline mx-1 mb-0.5 size-5" />
                تأسست في:{" "}
                {new Date(orgData.foundingDate).toLocaleDateString("ar", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
            <span className="text-caption text-neutrals-500">
              <MapPin className="inline mx-1 mb-0.5 size-5" />
              {orgData.country} - {orgData.state}
              {orgData.city ? ` - ${orgData.city}` : ""}
            </span>
            <span className="text-caption text-neutrals-500">
              <Mail className="inline mx-1 mb-0.5 size-5" />
              {orgData.contactEmail}
            </span>

            <span className="text-caption text-neutrals-500">
              <Users className="inline mx-1 mb-0.5 size-5" />
              {orgData.membersCount || 0} عضو
            </span>
          </div>
        </div>

        <div className="bg-neutrals-100 p-6 rounded-lg mb-6">
          <h2 className="text-lg font-semibold text-neutrals-700 mb-4">
            عن المنظمة
          </h2>
          <p className="text-neutrals-600">
            {orgData.description || "لا يوجد وصف للمنظمة."}
          </p>
        </div>

        <div className="bg-neutrals-100 p-6 rounded-lg mb-6">
          <h2 className="text-lg font-semibold text-neutrals-700 mb-4">
            مجالات العمل
          </h2>

          <div className="flex flex-wrap gap-2">
            {orgData.workAreas && orgData.workAreas.length > 0 ? (
              orgData.workAreas.map((area) => (
                <span
                  key={area}
                  className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm"
                >
                  {workAreaOptions.find((opt) => opt.value === area)?.label ||
                    area}
                </span>
              ))
            ) : (
              <p className="text-neutrals-500">لا توجد مجالات عمل محددة</p>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-neutrals-100 p-6 rounded-lg mb-6">
          <h2 className="text-lg font-semibold text-neutrals-700 mb-4">
            معلومات الاتصال
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-3">
              <Mail className="h-5 w-5 text-primary-600" />
              <div>
                <p className="text-sm text-neutrals-500">البريد الإلكتروني</p>
                <p className="font-medium text-neutrals-700 break-all">
                  {orgData.contactEmail}
                </p>
              </div>
            </div>

            {orgData.contactPhone && (
              <div className="flex gap-3">
                <Briefcase className="h-5 w-5 text-primary-600" />
                <div>
                  <p className="text-sm text-neutrals-500">رقم الهاتف</p>
                  <p dir="ltr" className="font-medium text-neutrals-700">
                    {orgData.contactPhone}
                  </p>
                </div>
              </div>
            )}

            {orgData.headquarters && (
              <div className="flex gap-3 col-span-1 md:col-span-2">
                <Home className="h-5 w-5 text-primary-600" />
                <div>
                  <p className="text-sm text-neutrals-500">المقر الرئيسي</p>
                  <p className="font-medium text-neutrals-700">
                    {orgData.headquarters}
                  </p>
                  <p className="font-medium text-neutrals-700 break-words">
                    {[
                      orgData.country && `${orgData.country}`,
                      orgData.state && `${orgData.state}`,
                      orgData.city && `${orgData.city}`,
                    ]
                      .filter(Boolean)
                      .join(" - ")}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Previous Initiatives */}
        {orgData.previousInitiatives && (
          <div className="bg-neutrals-100 p-6 rounded-lg mb-6">
            <h2 className="text-lg font-semibold text-neutrals-700 mb-4">
              المبادرات السابقة
            </h2>
            <p className="text-neutrals-600">{orgData.previousInitiatives}</p>
          </div>
        )}

        {/* Organization Initiatives */}
        {initiatives.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">المبادرات</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {initiatives.map((initiative) => (
                <OrgInitiative key={initiative.id} initiative={initiative} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
