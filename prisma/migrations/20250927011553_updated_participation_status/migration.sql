/*
  Warnings:

  - The values [cancelled] on the enum `ParticipationStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."ParticipationStatus_new" AS ENUM ('registered', 'approved', 'rejected', 'kicked');
ALTER TABLE "public"."initiative_participants" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."initiative_participants" ALTER COLUMN "status" TYPE "public"."ParticipationStatus_new" USING ("status"::text::"public"."ParticipationStatus_new");
ALTER TYPE "public"."ParticipationStatus" RENAME TO "ParticipationStatus_old";
ALTER TYPE "public"."ParticipationStatus_new" RENAME TO "ParticipationStatus";
DROP TYPE "public"."ParticipationStatus_old";
ALTER TABLE "public"."initiative_participants" ALTER COLUMN "status" SET DEFAULT 'registered';
COMMIT;
