import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { SubscriberPayload } from "@/types/MailerLiteWebhook";

/**
 * MailerLite Webhook Handler (FAST)
 *
 * This endpoint MUST respond quickly (<3s) to avoid MailerLite retries.
 * It only validates and enqueues events to the database.
 * Processing happens in the background cron worker.
 *
 * Available Events:
 * - subscriber.created
 * - subscriber.updated
 * - subscriber.unsubscribed
 * - subscriber.deleted
 * - subscriber.bounced
 * - subscriber.spam_reported
 *
 * Documentation: https://developers.mailerlite.com/docs/webhooks.html
 */

interface MailerLiteWebhookPayload {
  events: Array<{
    type: string;
    timestamp: string;
    data: SubscriberPayload;
  }>;
}

/**
 * Verify webhook signature
 * MailerLite sends X-MailerLite-Signature header with HMAC-SHA256 signature
 */
function verifyWebhookSignature(
  payload: string,
  signature: string | null,
  secret: string,
): boolean {
  if (!signature) return false;

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature),
  );
}

export async function POST(request: NextRequest) {
  try {
    const webhookSecret = process.env.MAILERLITE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error("MAILERLITE_WEBHOOK_SECRET is not configured");
      return NextResponse.json(
        { error: "Webhook not configured" },
        { status: 500 },
      );
    }

    const rawBody = await request.text();
    const signature = request.headers.get("x-mailerlite-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 401 });
    }

    if (!verifyWebhookSignature(rawBody, signature, webhookSecret)) {
      console.error("Invalid webhook signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const payload: MailerLiteWebhookPayload = JSON.parse(rawBody);

    // ENQUEUE ONLY. No processing here
    const enqueuePromises = payload.events.map((event) =>
      prisma.webhookEvent.create({
        data: {
          provider: "mailerlite",
          type: event.type,
          payload: event,
        },
      }),
    );

    // May this take a while if there are many events ?
    await Promise.all(enqueuePromises);

    console.log(`Enqueued ${payload.events.length} MailerLite webhook events`);

    return NextResponse.json(
      { success: true, enqueued: payload.events.length },
      { status: 200 },
    );
  } catch (error) {
    console.error("MailerLite webhook enqueue error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
