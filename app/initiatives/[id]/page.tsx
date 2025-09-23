import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import parse from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";
import { InitiativeStatus, ParticipantRole } from "@prisma/client";
import InitiativeJoinForm from "@/components/pages/initiatives/InitiativeJoinForm";
import InitiativeDetails from "@/components/pages/initiatives/InitiativeDetails";
import ParticipationStatusBadge from "@/components/pages/ParticipationStatusBadge";
import AvailabilityBadge from "@/components/pages/AvailabilityBadge";
import getSessionWithCheckProfile from "@/hooks/getSessionWithCheckProfile";
import { InitiativeService } from "@/services/initiatives";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = await params;
  const initiative = await InitiativeService.getById(id);

  if (!initiative) {
    return {
      title: "المبادرة غير موجودة - بادر",
      description: "المبادرة المطلوبة غير موجودة",
    };
  }

  return {
    title: `${initiative.titleAr} - بادر`,
    description: initiative.shortDescriptionAr || "مبادرة على منصة بادر",
  };
}

export default async function InitiativeDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const session = await getSessionWithCheckProfile();

  const initiative = await InitiativeService.getById(id, session?.user.id);
  if (!initiative) {
    notFound();
  }

  const userParticipation = initiative.participants[0] || null;

  const isAvailable = initiative.status === InitiativeStatus.published;
  const now = new Date();
  const isCompleted = now > initiative.endDate;
  const isOngoing = now >= initiative.startDate && now <= initiative.endDate;

  const registrationClosed =
    initiative.registrationDeadline && initiative.registrationDeadline < now;
  const isFull =
    initiative.maxParticipants !== null &&
    initiative.currentParticipants >= initiative.maxParticipants;

  const canJoin =
    isAvailable &&
    !isCompleted &&
    !registrationClosed &&
    !isFull &&
    !userParticipation;

  // Format the participation form questions if they exist
  const formQuestions = initiative.participationQstForm
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (initiative.participationQstForm as any[]).map((q) => ({
        id: q.id,
        question: DOMPurify.sanitize(q.question),
        type: q.type,
        required: q.required,
        options: q.options?.map(DOMPurify.sanitize) || [],
      }))
    : [];

  return (
    <div className="min-h-screen bg-neutrals-100 p-6" dir="rtl">
      <div className="mb-4 flex justify-end">
        <Link
          href="/initiatives"
          className="flex items-center gap-2 text-primary-600 hover:text-primary-800 transition-colors py-2 px-3 rounded-md hover:bg-neutrals-200"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>العودة</span>
        </Link>
      </div>
      <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-sm border-2 border-neutrals-300">
        {/* Initiative Header */}
        <div className="relative mb-6">
          {initiative.coverImage && (
            <div className="w-full h-64 relative rounded-lg overflow-hidden mb-4">
              <Image
                src={initiative.coverImage}
                alt={initiative.titleAr}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="flex justify-between items-center">
            <h1 className="text-primary-600 text-3xl font-bold">
              {parse(DOMPurify.sanitize(initiative.titleAr))}
            </h1>

            <div className="flex gap-2">
              <AvailabilityBadge
                initiativeStatus={initiative.status}
                isAvailable={isAvailable}
                isCompleted={isCompleted}
                isOngoing={isOngoing}
              />

              {userParticipation && (
                <ParticipationStatusBadge status={userParticipation.status} />
              )}
            </div>
          </div>

          <div className="flex items-center text-neutrals-500 text-sm mt-2">
            <span className="font-medium ml-1">التصنيف:</span>
            <span>{initiative.category.nameAr}</span>
          </div>
        </div>

        {/* Initiative Details */}
        <InitiativeDetails initiative={initiative} />

        {/* Join Form Section */}
        {canJoin && (
          <div className="bg-neutrals-100 p-6 rounded-lg mt-8">
            <h2 className="text-xl font-semibold text-primary-600 mb-4">
              الانضمام إلى المبادرة
            </h2>

            {session?.user ? (
              <InitiativeJoinForm
                initiativeId={initiative.id}
                hasForm={formQuestions.length > 0}
                formQuestions={formQuestions}
                allowedRoles={initiative.targetAudience}
              />
            ) : (
              <div className="p-4 bg-neutrals-200 rounded-lg text-center">
                <p className="text-neutrals-700">
                  يجب تسجيل الدخول للانضمام إلى المبادرة
                </p>
                <a
                  href={`/login?callbackUrl=/initiatives/${initiative.id}`}
                  className="text-primary-600 font-semibold hover:underline mt-2 inline-block"
                >
                  تسجيل الدخول
                </a>
              </div>
            )}
          </div>
        )}

        {/* Registration Closed Message */}
        {isAvailable && registrationClosed && (
          <div className="bg-neutrals-100 p-6 rounded-lg mt-8 text-center">
            <p className="text-neutrals-700 font-semibold">
              انتهت فترة التسجيل لهذه المبادرة
            </p>
          </div>
        )}

        {/* Initiative Full Message */}
        {isAvailable && isFull && (
          <div className="bg-neutrals-100 p-6 rounded-lg mt-8 text-center">
            <p className="text-neutrals-700 font-semibold">
              المبادرة مكتملة العدد
            </p>
          </div>
        )}

        {/* Already Registered Message */}
        {userParticipation && (
          <div className="bg-neutrals-100 p-6 rounded-lg mt-8">
            <h2 className="text-xl font-semibold text-primary-600 mb-4">
              حالة مشاركتك
            </h2>
            <div className="p-4 bg-white rounded-lg shadow-sm border border-neutrals-300">
              <p className="text-neutrals-700 mb-2">
                أنت مسجل في هذه المبادرة بدور:
                <span className="font-semibold mx-1">
                  {userParticipation.participantRole ===
                  ParticipantRole.participant
                    ? "مشارك"
                    : userParticipation.participantRole ===
                      ParticipantRole.helper
                    ? "مساعد"
                    : "منظم"}
                </span>
              </p>
              <p className="text-neutrals-700">
                حالة طلبك:
                <ParticipationStatusBadge
                  status={userParticipation.status}
                  className="mr-2"
                />
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
