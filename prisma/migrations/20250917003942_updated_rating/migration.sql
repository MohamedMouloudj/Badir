/*
  Warnings:

  - You are about to drop the column `allow_temporary_membership` on the `initiatives` table. All the data in the column will be lost.
  - You are about to alter the column `rating` on the `user_initiative_ratings` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(3,1)`.

*/
-- AlterTable
ALTER TABLE "public"."initiatives" DROP COLUMN "allow_temporary_membership";

-- AlterTable
ALTER TABLE "public"."user_initiative_ratings" ALTER COLUMN "rating" SET DATA TYPE DECIMAL(3,1);
