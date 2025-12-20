import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Rate limiter for post email notifications
 *
 * Limit: 50 emails per minute
 * Prevents overwhelming Resend API and ensures controlled delivery
 */
export const postEmailRateLimiter = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(50, "1 m"),
  prefix: "post-emails",
  analytics: true,
});

/**
 * Rate limiter for newsletter subscriptions
 *
 * Limit: 3 subscription/unsubscription actions per minute per user
 * Prevents abuse of newsletter subscription endpoints
 */
export const newsletterSubscriptionRateLimiter = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "1 m"),
  analytics: true,
  prefix: "newsletter",
});
