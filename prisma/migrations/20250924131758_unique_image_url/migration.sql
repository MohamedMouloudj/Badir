/*
  Warnings:

  - A unique constraint covering the columns `[image_url]` on the table `post_attachments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "post_attachments_image_url_key" ON "public"."post_attachments"("image_url");
