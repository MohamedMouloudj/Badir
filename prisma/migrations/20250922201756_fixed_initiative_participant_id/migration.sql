/*
  Warnings:

  - The primary key for the `initiative_participants` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "public"."initiative_participants" DROP CONSTRAINT "initiative_participants_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "initiative_participants_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "initiative_participants_id_seq";
