/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `organizations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `organization_type` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `short_name` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_role` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Made the column `contact_email` on table `organizations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `state` on table `organizations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country` on table `organizations` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
ALTER TYPE "public"."UserType" ADD VALUE 'organization';

-- AlterTable
ALTER TABLE "public"."organizations" ADD COLUMN     "founding_date" DATE,
ADD COLUMN     "headquarters" VARCHAR(255),
ADD COLUMN     "identification_card" VARCHAR(500),
ADD COLUMN     "members_count" INTEGER,
ADD COLUMN     "official_license" VARCHAR(500),
ADD COLUMN     "organization_type" VARCHAR(50) NOT NULL,
ADD COLUMN     "previous_initiatives" TEXT,
ADD COLUMN     "short_name" VARCHAR(100) NOT NULL,
ADD COLUMN     "social_links" JSONB,
ADD COLUMN     "user_role" VARCHAR(100) NOT NULL,
ADD COLUMN     "work_areas" TEXT[],
ALTER COLUMN "contact_email" SET NOT NULL,
ALTER COLUMN "state" SET NOT NULL,
ALTER COLUMN "country" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "organizations_user_id_key" ON "public"."organizations"("user_id");
