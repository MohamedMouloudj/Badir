/*
  Warnings:

  - The `is_verified` column on the `organizations` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."OrganizationStatus" AS ENUM ('pending', 'approved', 'rejected');

-- AlterTable
ALTER TABLE "public"."organizations" DROP COLUMN "is_verified",
ADD COLUMN     "is_verified" "public"."OrganizationStatus" NOT NULL DEFAULT 'pending';
