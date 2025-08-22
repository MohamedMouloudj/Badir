import Image from "next/image";
import { OrganizationCard as OrganizationCardType } from "@/services/organizations";
import { Building } from "lucide-react";

export default function OrganizationCard({
  org,
}: {
  org: OrganizationCardType;
}) {
  console.log(org);

  return (
    <div className="flex items-center gap-4 p-4 bg-neutrals-100 rounded-lg shadow border">
      <div className="flex-shrink-0 w-16 h-16 relative overflow-hidden rounded-full border bg-neutrals-100">
        {org.logo ? (
          <Image
            src={org.logo}
            alt={org.shortName || org.name}
            width={64}
            height={64}
            className="object-cover w-full h-full"
          />
        ) : (
          <Building className="w-full h-full p-2" />
        )}
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-lg text-primary-700">
          {org.shortName || org.name}
        </h3>
        <p className="text-label text-neutrals-500">{org.description}</p>
        <div className="flex flex-wrap gap-2 mt-2 text-xs text-neutrals-600">
          {org.membersCount && (
            <span className="text-caption">
              <span className="font-semibold">عدد الأعضاء:</span>{" "}
              {org.membersCount}
            </span>
          )}
          <div className="flex justify-start items-center gap-2 flex-wrap w-full">
            {org.headquarters && (
              <span className="text-caption">
                <span className="font-semibold">المقر:</span> {org.headquarters}
              </span>
            )}
            {org.city && (
              <span className="text-caption">
                <span className="font-semibold">المدينة:</span> {org.city}
              </span>
            )}
            {org.country && (
              <span className="text-caption">
                <span className="font-semibold">الدولة:</span> {org.country}
              </span>
            )}
          </div>
          {org.foundingDate && (
            <span className="text-caption">
              <span className="font-semibold">تأسست:</span>{" "}
              {new Date(org.foundingDate).toLocaleDateString("ar-DZ")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
