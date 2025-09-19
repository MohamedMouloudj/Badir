import { UserService } from "@/services/user";
import { toPlainUser } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  Mail,
  MapPin,
  User,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { ParticipationService } from "@/services/participations";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ParticipationCard from "@/components/pages/ParticipationCard";
import { getPublicStorageUrl } from "@/actions/supabaseHelpers";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = await params;
  const user = await UserService.getUser(id);

  if (!user) {
    return {
      title: "المستخدم غير موجود",
    };
  }

  return {
    title: `${user.firstName} ${user.lastName} - بادر`,
    description:
      user.bio || `الملف الشخصي لـ ${user.firstName} ${user.lastName}`,
  };
}

export default async function UserProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const user = await UserService.getUser(id);

  if (!user) {
    notFound();
  }

  const userData = toPlainUser(user, user.qualifications?.[0]);

  const participations = (
    await ParticipationService.getUserParticipations(id)
  ).filter((p) => p.status === "approved");

  const imagePath = user.image;
  let imageUrl = null;
  if (imagePath) {
    imageUrl = await getPublicStorageUrl("avatars", imagePath);
  }

  return (
    <div className="min-h-screen bg-neutrals-100 p-6" dir="rtl">
      <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-sm border-2 border-neutrals-300">
        <div className="flex-center gap-4 mb-8">
          <Avatar className="h-24 w-24">
            <AvatarImage src={imageUrl || ""} alt={userData.firstName} />
            <AvatarFallback className="border-2 border-primary-500 text-primary-500 font-semibold">
              <User className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-center-column items-start gap-2">
            <h1 className="text-2xl font-bold text-neutrals-700">
              {userData.firstName} {userData.lastName}
            </h1>
            <p className="text-neutrals-500">
              {userData.qualifications?.currentJob || ""}
            </p>
          </div>
        </div>

        <div className="flex-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex-center justify-baseline gap-4 flex-wrap flex-1">
            <span className="text-caption text-neutrals-500">
              <Calendar className="inline mx-1 mb-0.5 size-5" />
              انضم في:{" "}
              {userData.createdAt
                ? new Date(userData.createdAt).toLocaleDateString("ar", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : ""}
            </span>
            <span className="text-caption text-neutrals-500">
              <MapPin className="inline mx-1 mb-0.5 size-5" />
              {userData.country} - {userData.state}
              {userData.city ? ` - ${userData.city}` : ""}
            </span>
            <span className="text-caption text-neutrals-500">
              <Mail className="inline mx-1 mb-0.5 size-5" />
              {userData.email}
            </span>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-neutrals-100 p-6 rounded-lg mb-6">
          <h2 className="text-lg font-semibold text-neutrals-700 mb-4">
            نبذة عني
          </h2>
          <p className="text-neutrals-600">
            {userData.bio || "المستخدم لم يضف نبذة شخصية بعد."}
          </p>
        </div>

        {/* Education and Professional Information */}
        <div className="bg-neutrals-100 p-6 rounded-lg mb-6">
          <h2 className="text-lg font-semibold text-neutrals-700 mb-4">
            المعلومات التعليمية والمهنية
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-3">
              <GraduationCap className="h-5 w-5 text-primary-600" />
              <div>
                <p className="text-sm text-neutrals-500">المستوى التعليمي</p>
                <p className="font-medium text-neutrals-700">
                  {userData.qualifications?.educationalLevel || "غير محدد"}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Briefcase className="h-5 w-5 text-primary-600" />
              <div>
                <p className="text-sm text-neutrals-500">التخصص</p>
                <p className="font-medium text-neutrals-700">
                  {userData.qualifications?.specification || "غير محدد"}
                </p>
              </div>
            </div>

            {userData.qualifications?.currentJob && (
              <div className="flex gap-3 col-span-1 md:col-span-2">
                <Briefcase className="h-5 w-5 text-primary-600" />
                <div>
                  <p className="text-sm text-neutrals-500">الوظيفة الحالية</p>
                  <p className="font-medium text-neutrals-700">
                    {userData.qualifications?.currentJob}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Participations */}
        {participations.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">المشاركات</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {participations.map((participation) => (
                <ParticipationCard
                  key={participation.initiative.id}
                  participation={participation}
                  isInspecting={true}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
