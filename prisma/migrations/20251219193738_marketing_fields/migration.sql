-- AlterTable
ALTER TABLE "users" ADD COLUMN     "mailerlite_id" VARCHAR(100),
ADD COLUMN     "newsletter_subscribed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "newsletter_subscribed_at" TIMESTAMP(3);
