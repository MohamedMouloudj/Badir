-- CreateEnum
CREATE TYPE "public"."UserType" AS ENUM ('helper', 'participant', 'both');

-- CreateEnum
CREATE TYPE "public"."Sex" AS ENUM ('male', 'female');

-- CreateEnum
CREATE TYPE "public"."CertificateType" AS ENUM ('pdf', 'image');

-- CreateEnum
CREATE TYPE "public"."OrganizerType" AS ENUM ('user', 'organization');

-- CreateEnum
CREATE TYPE "public"."InitiativeStatus" AS ENUM ('draft', 'published', 'ongoing', 'completed', 'cancelled');

-- CreateEnum
CREATE TYPE "public"."PostStatus" AS ENUM ('draft', 'published', 'archived');

-- CreateEnum
CREATE TYPE "public"."TargetAudience" AS ENUM ('helpers', 'participants', 'both');

-- CreateEnum
CREATE TYPE "public"."ParticipationStatus" AS ENUM ('registered', 'approved', 'rejected', 'cancelled');

-- CreateEnum
CREATE TYPE "public"."ParticipantRole" AS ENUM ('manager', 'helper', 'participant');

-- CreateEnum
CREATE TYPE "public"."PostType" AS ENUM ('announcement', 'update', 'instruction');

-- CreateEnum
CREATE TYPE "public"."SupportType" AS ENUM ('logistical', 'media', 'human_resources', 'technical', 'financial', 'other');

-- CreateEnum
CREATE TYPE "public"."SupportUrgency" AS ENUM ('low', 'medium', 'high', 'urgent');

-- CreateEnum
CREATE TYPE "public"."SupportStatus" AS ENUM ('active', 'closed');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL,
    "first_name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(20),
    "date_of_birth" DATE,
    "sex" "public"."Sex" NOT NULL DEFAULT 'male',
    "bio" TEXT,
    "user_type" "public"."UserType" NOT NULL,
    "latitude" DECIMAL(10,8),
    "longitude" DECIMAL(11,8),
    "city" VARCHAR(100),
    "state" VARCHAR(100),
    "country" VARCHAR(100) DEFAULT 'Algeria',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "profile_completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."organizations" (
    "id" TEXT NOT NULL,
    "user_id" VARCHAR(255) NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "description" TEXT,
    "logo" VARCHAR(500),
    "contact_email" VARCHAR(255),
    "contact_phone" VARCHAR(20),
    "website" VARCHAR(255),
    "address" TEXT,
    "city" VARCHAR(100),
    "state" VARCHAR(100),
    "country" VARCHAR(100) DEFAULT 'Algeria',
    "latitude" DECIMAL(10,8),
    "longitude" DECIMAL(11,8),
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_qualifications" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "specification" VARCHAR(100) NOT NULL,
    "educational_level" VARCHAR(100) NOT NULL,
    "current_job" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_qualifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."initiative_categories" (
    "id" TEXT NOT NULL,
    "name_ar" VARCHAR(100) NOT NULL,
    "name_en" VARCHAR(100),
    "description_ar" TEXT,
    "description_en" TEXT,
    "icon" VARCHAR(100),
    "bgColor" VARCHAR(7),
    "textColor" VARCHAR(7),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "initiative_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."initiatives" (
    "id" TEXT NOT NULL,
    "organizer_type" "public"."OrganizerType" NOT NULL,
    "organizer_user_id" TEXT,
    "organizer_org_id" VARCHAR(255),
    "category_id" VARCHAR(255) NOT NULL,
    "title_ar" VARCHAR(200) NOT NULL,
    "title_en" VARCHAR(200),
    "description_ar" TEXT NOT NULL,
    "description_en" TEXT,
    "short_description_ar" VARCHAR(500),
    "short_description_en" VARCHAR(500),
    "location" VARCHAR(255) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "state" VARCHAR(100),
    "country" VARCHAR(100) DEFAULT 'Algeria',
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "registration_deadline" TIMESTAMP(3),
    "max_participants" INTEGER,
    "current_participants" INTEGER NOT NULL DEFAULT 0,
    "is_open_participation" BOOLEAN NOT NULL DEFAULT true,
    "target_audience" "public"."TargetAudience" NOT NULL DEFAULT 'both',
    "required_qualifications" JSONB,
    "requires_org_membership" BOOLEAN NOT NULL DEFAULT false,
    "allow_temporary_membership" BOOLEAN NOT NULL DEFAULT false,
    "membership_form_fields" JSONB,
    "status" "public"."InitiativeStatus" NOT NULL DEFAULT 'draft',
    "cover_image" VARCHAR(500),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "initiatives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."initiative_participants" (
    "id" BIGSERIAL NOT NULL,
    "initiative_id" VARCHAR(255) NOT NULL,
    "user_id" TEXT NOT NULL,
    "participant_role" "public"."ParticipantRole" NOT NULL,
    "participation_form" JSONB,
    "status" "public"."ParticipationStatus" NOT NULL DEFAULT 'registered',
    "check_in_time" TIMESTAMP(3),
    "is_checked_in" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "initiative_participants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."initiative_posts" (
    "id" TEXT NOT NULL,
    "initiative_id" VARCHAR(255) NOT NULL,
    "author_id" TEXT NOT NULL,
    "title" VARCHAR(200),
    "content" TEXT NOT NULL,
    "post_type" "public"."PostType" NOT NULL DEFAULT 'announcement',
    "is_pinned" BOOLEAN NOT NULL DEFAULT false,
    "status" "public"."PostStatus" NOT NULL DEFAULT 'published',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "initiative_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."post_attachments" (
    "id" TEXT NOT NULL,
    "initiative_post_id" VARCHAR(255) NOT NULL,
    "image_url" VARCHAR(255) NOT NULL,

    CONSTRAINT "post_attachments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."support_requests" (
    "id" TEXT NOT NULL,
    "organization_id" VARCHAR(255) NOT NULL,
    "support_type" "public"."SupportType" NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "description" TEXT NOT NULL,
    "urgency" "public"."SupportUrgency" NOT NULL DEFAULT 'medium',
    "status" "public"."SupportStatus" NOT NULL DEFAULT 'active',
    "requested_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "support_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_initiative_ratings" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "initiative_id" VARCHAR(255) NOT NULL,
    "rating" INTEGER,
    "comment" TEXT,

    CONSTRAINT "user_initiative_ratings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."platform_ratings" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "ease_of_use" TEXT NOT NULL,
    "information_clarity" TEXT NOT NULL,
    "content_diversity" TEXT NOT NULL,
    "performance_speed" TEXT NOT NULL,
    "general_satisfaction" TEXT NOT NULL,
    "useful_sections" TEXT[],
    "encountered_difficulties" TEXT NOT NULL,
    "difficulties_details" TEXT,
    "improvement_suggestions" TEXT,
    "would_recommend" TEXT NOT NULL,
    "app_rating" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "platform_ratings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "public"."users"("email");

-- CreateIndex
CREATE INDEX "users_created_at_idx" ON "public"."users"("created_at");

-- CreateIndex
CREATE INDEX "initiatives_status_idx" ON "public"."initiatives"("status");

-- CreateIndex
CREATE INDEX "initiatives_start_date_idx" ON "public"."initiatives"("start_date");

-- CreateIndex
CREATE INDEX "initiatives_category_id_idx" ON "public"."initiatives"("category_id");

-- CreateIndex
CREATE UNIQUE INDEX "initiative_participants_initiative_id_user_id_key" ON "public"."initiative_participants"("initiative_id", "user_id");

-- CreateIndex
CREATE INDEX "platform_ratings_user_id_idx" ON "public"."platform_ratings"("user_id");

-- CreateIndex
CREATE INDEX "platform_ratings_created_at_idx" ON "public"."platform_ratings"("created_at");

-- CreateIndex
CREATE INDEX "platform_ratings_would_recommend_idx" ON "public"."platform_ratings"("would_recommend");

-- CreateIndex
CREATE INDEX "platform_ratings_app_rating_idx" ON "public"."platform_ratings"("app_rating");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "public"."session"("token");

-- AddForeignKey
ALTER TABLE "public"."organizations" ADD CONSTRAINT "organizations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_qualifications" ADD CONSTRAINT "user_qualifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."initiatives" ADD CONSTRAINT "initiatives_organizer_user_id_fkey" FOREIGN KEY ("organizer_user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."initiatives" ADD CONSTRAINT "initiatives_organizer_org_id_fkey" FOREIGN KEY ("organizer_org_id") REFERENCES "public"."organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."initiatives" ADD CONSTRAINT "initiatives_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."initiative_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."initiative_participants" ADD CONSTRAINT "initiative_participants_initiative_id_fkey" FOREIGN KEY ("initiative_id") REFERENCES "public"."initiatives"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."initiative_participants" ADD CONSTRAINT "initiative_participants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."initiative_posts" ADD CONSTRAINT "initiative_posts_initiative_id_fkey" FOREIGN KEY ("initiative_id") REFERENCES "public"."initiatives"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."initiative_posts" ADD CONSTRAINT "initiative_posts_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."post_attachments" ADD CONSTRAINT "post_attachments_initiative_post_id_fkey" FOREIGN KEY ("initiative_post_id") REFERENCES "public"."initiative_posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."support_requests" ADD CONSTRAINT "support_requests_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_initiative_ratings" ADD CONSTRAINT "user_initiative_ratings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_initiative_ratings" ADD CONSTRAINT "user_initiative_ratings_initiative_id_fkey" FOREIGN KEY ("initiative_id") REFERENCES "public"."initiatives"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."platform_ratings" ADD CONSTRAINT "platform_ratings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
