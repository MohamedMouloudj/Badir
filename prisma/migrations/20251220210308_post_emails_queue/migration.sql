-- CreateTable
CREATE TABLE "post_email_queue" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "initiative_id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "post_email_queue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "post_email_queue_created_at_idx" ON "post_email_queue"("created_at");
