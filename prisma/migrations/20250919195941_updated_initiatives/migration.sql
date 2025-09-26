/*
  Warnings:

  - You are about to drop the column `membership_form_fields` on the `initiatives` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."initiatives" DROP COLUMN "membership_form_fields",
ADD COLUMN     "participation_qst_form" JSONB;
