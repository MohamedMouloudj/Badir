"use client";

import { useState, useTransition, useEffect } from "react";
import {
  subscribeToNewsletter,
  unsubscribeFromNewsletter,
  getNewsletterStatus,
} from "@/actions/newsletter";
import { toast } from "sonner";
import { Loader2, Mail, CheckCircle2 } from "lucide-react";
import AppButton from "@/components/AppButton";

/**
 * Newsletter Subscription Component
 *
 * This component should be placed in authenticated areas only (e.g., profile, settings)
 */
export default function NewsletterSubscription() {
  const [isPending, startTransition] = useTransition();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribedAt, setSubscribedAt] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial subscription status
  useEffect(() => {
    loadStatus();
  }, []);

  const loadStatus = async () => {
    try {
      const status = await getNewsletterStatus();
      setIsSubscribed(status.subscribed);
      setSubscribedAt(status.subscribedAt);
    } catch (error) {
      console.error("Failed to load newsletter status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscribe = () => {
    startTransition(async () => {
      // Optimistic update
      const previousState = isSubscribed;

      setIsSubscribed(true);

      const result = await subscribeToNewsletter();

      if (result.success) {
        toast.success(result.message);
        setSubscribedAt(new Date());
      } else {
        // Rollback on error
        setIsSubscribed(previousState);
        toast.error(result.error);
      }
    });
  };

  const handleUnsubscribe = () => {
    startTransition(async () => {
      const previousState = isSubscribed;

      setIsSubscribed(false);

      const result = await unsubscribeFromNewsletter();

      if (result.success) {
        toast.success(result.message);
        setSubscribedAt(null);
      } else {
        setIsSubscribed(previousState);
        toast.error(result.error);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex-center py-4" dir="rtl">
        <Loader2 className="text-primary-500 h-5 w-5 animate-spin" />
      </div>
    );
  }

  return (
    <div
      id="newsletter"
      className="bg-neutrals-50 border-neutrals-200 rounded-lg border p-6"
      dir="rtl"
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
            isSubscribed ? "bg-primary-100" : "bg-neutrals-100"
          }`}
        >
          {isSubscribed ? (
            <CheckCircle2 className="text-primary-600 h-6 w-6" />
          ) : (
            <Mail className="text-neutrals-600 h-6 w-6" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-neutrals-900 mb-2 text-lg font-bold">
            النشرة البريدية
          </h3>

          {isSubscribed ? (
            <div className="space-y-3">
              <p className="text-neutrals-600 text-sm">
                أنت مشترك في النشرة البريدية. ستصلك آخر الأخبار والتحديثات عن
                المبادرات والفرص التطوعية.
              </p>

              {subscribedAt && (
                <p className="text-neutrals-500 text-xs">
                  تاريخ الاشتراك:{" "}
                  {new Date(subscribedAt).toLocaleDateString("ar-DZ")}
                </p>
              )}

              <AppButton
                type="outline"
                size="sm"
                onClick={handleUnsubscribe}
                disabled={isPending}
                icon={
                  isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : undefined
                }
              >
                {isPending ? "جاري الإلغاء..." : "إلغاء الاشتراك"}
              </AppButton>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-neutrals-600 text-sm">
                اشترك في النشرة البريدية لتصلك آخر الأخبار والتحديثات عن
                المبادرات والفرص التطوعية.
              </p>

              <AppButton
                type="primary"
                size="sm"
                onClick={handleSubscribe}
                disabled={isPending}
                icon={
                  isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Mail className="h-4 w-4" />
                  )
                }
              >
                {isPending ? "جاري الاشتراك..." : "اشترك الآن"}
              </AppButton>
            </div>
          )}
        </div>
      </div>

      {/* Security & Privacy Note */}
      <div className="bg-neutrals-100 mt-4 rounded-md p-3">
        <p className="text-neutrals-600 text-xs leading-relaxed">
          <strong>ملاحظة:</strong> بياناتك محمية ولن يتم مشاركتها مع أطراف
          خارجية. يمكنك إلغاء الاشتراك في أي وقت من خلال الرابط الموجود في كل
          رسالة بريدية.
        </p>
      </div>
    </div>
  );
}
