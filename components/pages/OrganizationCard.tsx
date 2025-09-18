import Image from "next/image";
import { OrganizationCard as OrganizationCardType } from "@/services/organizations";
import { Building, MapPin, Calendar, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function OrganizationCard({
  org,
}: {
  org: OrganizationCardType;
}) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 bg-neutrals-100 rounded-lg shadow border hover:border-primary-300 transition-colors">
      <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 relative overflow-hidden rounded-full border bg-neutrals-100 mx-auto sm:mx-0">
        {org.logo ? (
          <Image
            src={org.logo}
            alt={org.shortName || org.name}
            fill
            sizes="(max-width: 640px) 56px, 64px"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Building className="w-8 h-8 text-neutrals-500" />
          </div>
        )}
      </div>

      <div className="flex-1 w-full">
        <Link href={`/organizations/${org.id}`}>
          <h3 className="font-bold text-lg text-primary-700 hover:underline hover:text-primary-500 text-center sm:text-right truncate">
            {org.shortName || org.name}
          </h3>
        </Link>
        {/* Description - Hide on very small screens */}
        {org.description && (
          <p className="text-label text-neutrals-500 line-clamp-1 hidden xs:block">
            {org.description}
          </p>
        )}

        <div className="grid grid-cols-1 gap-y-1 mt-2 text-xs text-neutrals-600">
          {org.membersCount && (
            <div className="flex items-center gap-1 justify-center sm:justify-start">
              <Users className="h-3 w-3 flex-shrink-0" />
              <span className="text-caption">
                <span className="font-semibold">عدد الأعضاء:</span>{" "}
                {org.membersCount}
              </span>
            </div>
          )}

          {(org.headquarters || org.city || org.country) && (
            <div className="flex items-center gap-1 justify-center sm:justify-start">
              <MapPin className="h-3 w-3 flex-shrink-0" />
              <span className="text-caption truncate">
                {[
                  org.headquarters && `المقر: ${org.headquarters}`,
                  org.city,
                  org.country,
                ]
                  .filter(Boolean)
                  .join(" - ")}
              </span>
            </div>
          )}

          {org.foundingDate && (
            <div
              className={cn(
                "flex items-center gap-1 justify-center sm:justify-start",
                org.headquarters || org.city || org.country
                  ? "col-span-1"
                  : "col-span-2"
              )}
            >
              <Calendar className="h-3 w-3 flex-shrink-0" />
              <span className="text-caption">
                <span className="font-semibold">تأسست:</span>{" "}
                {new Date(org.foundingDate).toLocaleDateString("ar-DZ")}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
