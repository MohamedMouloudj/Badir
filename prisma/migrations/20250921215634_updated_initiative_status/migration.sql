/*
  Warnings:

  - The values [ongoing,completed] on the enum `InitiativeStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."InitiativeStatus_new" AS ENUM ('draft', 'published', 'cancelled');
ALTER TABLE "public"."initiatives" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."initiatives" ALTER COLUMN "status" TYPE "public"."InitiativeStatus_new" USING ("status"::text::"public"."InitiativeStatus_new");
ALTER TYPE "public"."InitiativeStatus" RENAME TO "InitiativeStatus_old";
ALTER TYPE "public"."InitiativeStatus_new" RENAME TO "InitiativeStatus";
DROP TYPE "public"."InitiativeStatus_old";
ALTER TABLE "public"."initiatives" ALTER COLUMN "status" SET DEFAULT 'draft';
COMMIT;
