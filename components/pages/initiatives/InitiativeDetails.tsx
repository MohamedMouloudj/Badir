"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  User,
  Building,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";
import { formatDate } from "@/lib/utils";
import { InitiativeService } from "@/services/initiatives";
import { getUserImage } from "@/actions/user-profile";
import { getPublicStorageUrl } from "@/actions/supabaseHelpers";
import { getOrganizationLogo } from "@/actions/organization-profile";

interface InitiativeDetailsProps {
  initiative: NonNullable<
    Awaited<ReturnType<typeof InitiativeService.getById>>
  >;
}

export default function InitiativeDetails({
  initiative,
}: InitiativeDetailsProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [organizerImage, setOrganizerImage] = useState<string | null>(null);

  const organizerName =
    initiative.organizerType === "user"
      ? initiative.organizerUser?.name || "منظم غير معروف"
      : initiative.organizerOrg?.name || "منظمة غير معروفة";

  useEffect(() => {
    async function fetchUserImage() {
      let imagePath: string | null = null;
      if (initiative.organizerType === "user") {
        imagePath = await getUserImage(initiative.organizerUser?.id || "");
      } else {
        imagePath = await getOrganizationLogo(
          initiative.organizerOrg?.id || ""
        );
      }

      if (imagePath) {
        const imageUrl = await getPublicStorageUrl("avatars", imagePath);
        setOrganizerImage(imageUrl || null);
      } else {
        setOrganizerImage(null);
      }
    }

    fetchUserImage();

    return () => {
      setOrganizerImage(null);
    };
  }, []);

  const organizerProfileLink =
    initiative.organizerType === "user"
      ? `/profile/${initiative.organizerUser?.id}`
      : `/organizations/${initiative.organizerOrg?.id}`;

  if (!initiative) {
    return <div>المبادرة غير موجودة</div>;
  }
  return (
    <>
      {/* Description */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-neutrals-700 mb-2">
          وصف المبادرة
        </h2>
        <div className="text-neutrals-600 prose max-w-none">
          <div className={showFullDescription ? "" : "line-clamp-4"}>
            {parse(DOMPurify.sanitize(initiative.descriptionAr))}
          </div>
          {initiative.descriptionAr &&
            initiative.descriptionAr.length > 300 && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-primary-600 font-medium flex items-center mt-2"
              >
                {showFullDescription ? (
                  <>
                    <ChevronUp className="h-4 w-4 ml-1" />
                    عرض أقل
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 ml-1" />
                    عرض المزيد
                  </>
                )}
              </button>
            )}
        </div>
      </div>

      {/* Initiative Meta */}
      <div className="bg-neutrals-100 p-6 rounded-lg mb-6">
        <h2 className="text-lg font-semibold text-neutrals-700 mb-4">
          معلومات المبادرة
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Date and Time */}
          <div className="flex gap-3">
            <CalendarDays className="h-5 w-5 text-primary-600" />
            <div>
              <p className="text-sm text-neutrals-500">التاريخ</p>
              <p className="font-medium text-neutrals-700">
                {formatDate(initiative.startDate)} -{" "}
                {formatDate(initiative.endDate)}
              </p>
            </div>
          </div>

          {/* Registration Deadline */}
          {initiative.registrationDeadline && (
            <div className="flex gap-3">
              <Clock className="h-5 w-5 text-primary-600" />
              <div>
                <p className="text-sm text-neutrals-500">آخر موعد للتسجيل</p>
                <p className="font-medium text-neutrals-700">
                  {formatDate(initiative.registrationDeadline)}
                </p>
              </div>
            </div>
          )}

          {/* Location */}
          <div className="flex gap-3">
            <MapPin className="h-5 w-5 text-primary-600" />
            <div>
              <p className="text-sm text-neutrals-500">الموقع</p>
              <p className="font-medium text-neutrals-700">
                {initiative.location}, {initiative.city}
                {initiative.state && `, ${initiative.state}`}
                {initiative.country && `, ${initiative.country}`}
              </p>
            </div>
          </div>

          {/* Participant Count */}
          <div className="flex gap-3">
            <Users className="h-5 w-5 text-primary-600" />
            <div>
              <p className="text-sm text-neutrals-500">المشاركون</p>
              <p className="font-medium text-neutrals-700">
                {initiative.currentParticipants}
                {initiative.maxParticipants
                  ? ` / ${initiative.maxParticipants}`
                  : ""}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Organizer Info */}
      <div className="bg-neutrals-100 p-6 rounded-lg mb-6">
        <h2 className="text-lg font-semibold text-neutrals-700 mb-4">
          منظم المبادرة
        </h2>

        <Link href={organizerProfileLink}>
          <div className="flex items-center gap-4 hover:bg-neutrals-200 p-3 rounded-lg transition-colors">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-neutrals-300">
              {organizerImage ? (
                <Image
                  src={organizerImage}
                  alt={organizerName}
                  fill
                  className="object-cover"
                />
              ) : initiative.organizerType === "user" ? (
                <User className="w-full h-full p-2 text-neutrals-500" />
              ) : (
                <Building className="w-full h-full p-2 text-neutrals-500" />
              )}
            </div>

            <div>
              <p className="font-medium text-neutrals-700">{organizerName}</p>
              <p className="text-sm text-neutrals-500">
                {initiative.organizerType === "user" ? "فرد" : "منظمة"}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
