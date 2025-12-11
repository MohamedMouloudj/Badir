"use client";
import { useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle } from "lucide-react";
import { updateInitiativeStatusAction } from "@/actions/admin";
import { toast } from "sonner";

interface InitiativeActionsProps {
  initiativeId: string;
  currentStatus: string;
  onStatusUpdate?: () => void;
}

export function InitiativeActions({
  initiativeId,
  currentStatus,
  onStatusUpdate,
}: InitiativeActionsProps) {
  const [isPending, startTransition] = useTransition();
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectionForm, setShowRejectionForm] = useState(false);

  const handleStatusUpdate = async (status: "published" | "cancelled") => {
    if (status === "cancelled" && !rejectionReason.trim()) {
      setShowRejectionForm(true);
      return;
    }

    try {
      startTransition(async () => {
        const result = await updateInitiativeStatusAction(
          initiativeId,
          status,
          status === "cancelled" ? rejectionReason : undefined,
        );

        if (result.success) {
          toast.success(
            `تم ${status === "published" ? "نشر" : "إلغاء"} المبادرة بنجاح`,
          );
          onStatusUpdate?.();
        } else {
          toast.error(result.error || "حدث خطأ أثناء تحديث الحالة");
        }
      });
    } catch (error) {
      console.error("Error updating initiative status:", error);
      toast.error("حدث خطأ أثناء تحديث الحالة");
    } finally {
      setShowRejectionForm(false);
      setRejectionReason("");
    }
  };

  if (currentStatus !== "draft") {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>إجراءات المراجعة</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {showRejectionForm ? (
          <div className="space-y-3">
            <Label htmlFor="rejectionReason">سبب إلغاء المبادرة</Label>
            <Textarea
              id="rejectionReason"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="اكتب سبب إلغاء المبادرة..."
              rows={3}
            />
            <div className="flex gap-2">
              <Button
                onClick={() => handleStatusUpdate("cancelled")}
                disabled={isPending || !rejectionReason.trim()}
                variant="destructive"
                size="sm"
              >
                تأكيد الإلغاء
              </Button>
              <Button
                onClick={() => {
                  setShowRejectionForm(false);
                  setRejectionReason("");
                }}
                variant="outline"
                size="sm"
                disabled={isPending}
              >
                إلغاء
              </Button>
            </div>
          </div>
        ) : (
          <>
            <Button
              onClick={() => handleStatusUpdate("published")}
              disabled={isPending}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="ml-1 h-4 w-4" />
              نشر المبادرة
            </Button>
            <Button
              onClick={() => setShowRejectionForm(true)}
              disabled={isPending}
              variant="destructive"
              className="w-full"
            >
              <XCircle className="ml-1 h-4 w-4" />
              إلغاء المبادرة
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
