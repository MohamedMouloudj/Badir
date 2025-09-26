-- DropForeignKey
ALTER TABLE "public"."organizations" DROP CONSTRAINT "organizations_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."post_attachments" DROP CONSTRAINT "post_attachments_initiative_post_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."support_requests" DROP CONSTRAINT "support_requests_organization_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."organizations" ADD CONSTRAINT "organizations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."post_attachments" ADD CONSTRAINT "post_attachments_initiative_post_id_fkey" FOREIGN KEY ("initiative_post_id") REFERENCES "public"."initiative_posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."support_requests" ADD CONSTRAINT "support_requests_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
