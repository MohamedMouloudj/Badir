/*
  Warnings:

  - You are about to drop the column `requires_org_membership` on the `initiatives` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."initiatives" DROP COLUMN "requires_org_membership";
