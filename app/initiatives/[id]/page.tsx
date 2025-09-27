import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import parse from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";
import {
  InitiativeStatus,
  ParticipantRole,
  ParticipationStatus,
} from "@prisma/client";
import InitiativeJoinForm from "@/components/pages/initiatives/InitiativeJoinForm";
import InitiativeDetails from "@/components/pages/initiatives/InitiativeDetails";
import ParticipationStatusBadge from "@/components/pages/ParticipationStatusBadge";
import AvailabilityBadge from "@/components/pages/AvailabilityBadge";
import getSessionWithCheckProfile from "@/hooks/getSessionWithCheckProfile";
import { InitiativeService } from "@/services/initiatives";
import BackButton from "@/components/BackButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// panels
import PostsPanel from "@/components/pages/initiatives/PostsPanel";
import MembersPanel from "@/components/pages/initiatives/MembersPanel";
import RequestsPanel from "@/components/pages/initiatives/RequestsPanel";
import InitiativeHeader from "@/components/pages/InitiativeHeader";
import AppButton from "@/components/AppButton";

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

  const isDeadlinePassed =
    initiative.registrationDeadline &&
    initiative.registrationDeadline < new Date();
  const isAvailable =
    initiative.status === InitiativeStatus.published &&
    (!initiative.maxParticipants ||
      initiative.currentParticipants < initiative.maxParticipants);
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

  // Role resolution
  const isApprovedParticipant =
    !!userParticipation &&
    userParticipation.status === ParticipationStatus.approved;

  const isHelperApproved =
    !!userParticipation &&
    userParticipation.participantRole === ParticipantRole.helper &&
    userParticipation.status === ParticipationStatus.approved;

  const isManager =
    !!session?.user?.id &&
    (initiative.organizerUserId === session.user.id ||
      initiative.organizerOrg?.userId === session.user.id);

  const canViewPosts = isManager || isApprovedParticipant;
  const canWritePosts = isManager || isHelperApproved;

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

  if (canViewPosts) {
    if (
      isManager &&
      initiative.status !== InitiativeStatus.published &&
      session?.user.userType === "user"
    ) {
      return (
        <div className="min-h-screen bg-neutrals-100 p-6" dir="rtl">
          <div className="mb-4 flex justify-end">
            <BackButton />
          </div>

          <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-sm border-2 border-neutrals-300 text-center">
            <h2 className="text-xl font-semibold text-primary-600 mb-2">
              المبادرة قيد المراجعة
            </h2>
            <p className="text-neutrals-700">
              مبادرتك ما زالت قيد المراجعة من قبل فريق بادر. ستتم مراجعتها
              قريبًا وقد يستغرق ظهورها للمشاركين بعض الوقت.
            </p>
          </div>
          <div className="flex justify-end mb-4">
            <AppButton
              type="primary"
              size="sm"
              border="default"
              url={`/initiatives/${initiative.id}/edit`}
            >
              تعديل المبادرة
            </AppButton>
          </div>
        </div>
      );
    }
    return (
      <div className="min-h-screen bg-neutrals-100" dir="rtl">
        <InitiativeHeader
          title={initiative.titleAr}
          shortDescription={initiative.shortDescriptionAr}
          startDate={
            initiative.startDate?.toISOString?.() ?? initiative.startDate
          }
          endDate={initiative.endDate?.toISOString?.() ?? initiative.endDate}
          coverImage={initiative.coverImage}
        />
        <div className="p-6">
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="posts">المنشورات</TabsTrigger>
              {isManager && <TabsTrigger value="members">الأعضاء</TabsTrigger>}
              {isManager && <TabsTrigger value="requests">الطلبات</TabsTrigger>}
              {!isManager && canWritePosts && (
                <TabsTrigger value="your-posts">منشوراتك</TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="posts">
              <PostsPanel
                initiativeId={initiative.id}
                canWrite={canWritePosts}
                isManager={isManager}
                managerId={
                  initiative.organizerOrgId || initiative.organizerUserId || ""
                }
                currentUserId={session?.user?.id}
              />
            </TabsContent>

            {isManager && (
              <TabsContent value="members">
                <MembersPanel initiativeId={initiative.id} />
              </TabsContent>
            )}

            {isManager && (
              <TabsContent value="requests">
                <RequestsPanel initiativeId={initiative.id} />
              </TabsContent>
            )}

            {!isManager && canWritePosts && (
              <TabsContent value="your-posts">
                <PostsPanel
                  initiativeId={initiative.id}
                  canWrite={true}
                  isManager={false}
                  managerId={initiative.organizerUserId || ""}
                  currentUserId={session?.user?.id}
                  onlyMine
                />
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutrals-100 p-6" dir="rtl">
      <div className="mb-4 flex justify-end">
        <BackButton />
      </div>
      <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-sm border-2 border-neutrals-300">
        {/* Initiative Header */}
        <div className="relative mb-6">
          {initiative.coverImage && (
            <div className="w-full h-64 relative rounded-lg overflow-hidden mb-4">
              <Image
                src={initiative.coverImage || ""}
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
                isAvailable={isAvailable && !isDeadlinePassed}
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
