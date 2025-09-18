/*
  Warnings:

  - A unique constraint covering the columns `[name,contact_email]` on the table `organizations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "organizations_name_contact_email_key" ON "public"."organizations"("name", "contact_email");
