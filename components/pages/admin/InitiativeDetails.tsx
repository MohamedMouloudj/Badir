"use client";
import { useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  Users,
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { AdminService } from "@/services/admin";
import { AdminInitiativeStatusBadge } from "../AdminStatusBadge";
import { formatDate } from "@/lib/utils";
import { updateInitiativeStatusAction } from "@/actions/admin";
import { toast } from "sonner";

interface InitiativeDetailsProps {
  initiative: Awaited<ReturnType<typeof AdminService.getInitiativeById>>;
}

const InitiativeDetails = ({ initiative }: InitiativeDetailsProps) => {
  const [isPending, startTransition] = useTransition();
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectionForm, setShowRejectionForm] = useState(false);

  if (!initiative) {
    return (
      <div className="mx-auto max-w-6xl p-6" dir="rtl">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>المبادرة غير موجودة</AlertDescription>
        </Alert>
      </div>
    );
  }

  const handleStatusUpdate = async (status: "published" | "cancelled") => {
    if (status === "cancelled" && !rejectionReason.trim()) {
      setShowRejectionForm(true);
      return;
    }

    try {
      startTransition(async () => {
        const result = await updateInitiativeStatusAction(
          initiative.id,
          status,
        );

        if (result.success) {
          toast.success(
            `تم ${status === "published" ? "نشر" : "إلغاء"} المبادرة بنجاح`,
          );
        } else {
          toast.error(result.error || "حدث خطأ أثناء تحديث الحالة");
        }
      });
    } catch (error) {
      console.error("Error updating initiative status:", error);
    } finally {
      setShowRejectionForm(false);
      setRejectionReason("");
    }
  };

  return (
    <div className="mx-auto max-w-6xl p-6" dir="rtl">
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">
            {initiative.titleAr}
          </h1>
          <p className="text-gray-600">تفاصيل المبادرة</p>
        </div>
        <AdminInitiativeStatusBadge status={initiative.status} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Details */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                معلومات المبادرة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    عنوان المبادرة
                  </Label>
                  <p className="mt-1 text-gray-900">{initiative.titleAr}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    العنوان بالإنجليزية
                  </Label>
                  <p className="mt-1 text-gray-900">
                    {initiative.titleEn || "غير متوفر"}
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    الفئة
                  </Label>
                  <p className="mt-1 text-gray-900">
                    {initiative.category.nameAr}
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    المدينة
                  </Label>
                  <p className="mt-1 text-gray-900">{initiative.city}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    تاريخ البدء
                  </Label>
                  <p className="mt-1 text-gray-900">
                    {formatDate(initiative.startDate)}
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    تاريخ الانتهاء
                  </Label>
                  <p className="mt-1 text-gray-900">
                    {formatDate(initiative.endDate)}
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    آخر موعد للتسجيل
                  </Label>
                  <p className="mt-1 text-gray-900">
                    {initiative.registrationDeadline
                      ? formatDate(initiative.registrationDeadline)
                      : "غير متوفر"}
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    العدد الأقصى للمشاركين
                  </Label>
                  <p className="mt-1 text-gray-900">
                    {initiative.maxParticipants || "غير محدود"}
                  </p>
                </div>
              </div>

              {initiative.shortDescriptionAr && (
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    الوصف المختصر
                  </Label>
                  <p className="mt-1 rounded-lg bg-gray-50 p-3 text-gray-900">
                    {initiative.shortDescriptionAr}
                  </p>
                </div>
              )}

              {initiative.descriptionAr && (
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    وصف المبادرة
                  </Label>
                  <div className="mt-1 max-h-48 overflow-y-auto rounded-lg bg-gray-50 p-3 text-gray-900">
                    {initiative.descriptionAr}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Organizer Information */}
          <Card>
            <CardHeader>
              <CardTitle>معلومات المنظم</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 rounded-lg bg-gray-50 p-4">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-gray-500" />
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      الاسم
                    </Label>
                    <p className="text-gray-900">
                      {initiative.organizerUser?.name || "غير محدد"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      البريد الإلكتروني
                    </Label>
                    <p className="text-gray-900">
                      {initiative.organizerUser?.email || "غير محدد"}
                    </p>
                  </div>
                </div>

                {initiative.organizerUser?.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-500" />
                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        رقم الهاتف
                      </Label>
                      <p className="text-gray-900">
                        {initiative.organizerUser.phone}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      تاريخ انضمام المنظم
                    </Label>
                    <p className="text-gray-900">
                      {initiative.organizerUser?.createdAt
                        ? formatDate(initiative.organizerUser.createdAt)
                        : "غير متوفر"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Actions */}
          {initiative.status === "draft" && (
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
                      <XCircle className="ml-1 w-4" />
                      إلغاء المبادرة
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          )}

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>إحصائيات المبادرة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">عدد المشاركين</span>
                <span className="font-medium">
                  {initiative._count.participants}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">تاريخ الإنشاء</span>
                <span className="font-medium">
                  {formatDate(initiative.createdAt)}
                </span>
              </div>
              {initiative.maxParticipants && (
                <div className="flex justify-between">
                  <span className="text-gray-600">الأماكن المتبقية</span>
                  <span className="font-medium">
                    {initiative.maxParticipants -
                      initiative.currentParticipants}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Participants */}
          <Card>
            <CardHeader>
              <CardTitle>المشاركون الأخيرون</CardTitle>
            </CardHeader>
            <CardContent>
              {initiative.participants && initiative.participants.length > 0 ? (
                <div className="space-y-3">
                  {initiative.participants.map((participant) => (
                    <div
                      key={participant.id}
                      className="border-b border-gray-100 pb-2 last:border-b-0"
                    >
                      <p className="text-sm font-medium text-gray-900">
                        {participant.user.name}
                      </p>
                      <div className="mt-1 flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {participant.status === "approved"
                            ? "مقبول"
                            : participant.status === "registered"
                              ? "مسجل"
                              : "مرفوض"}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {formatDate(participant.createdAt)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="py-4 text-center text-gray-500">
                  لا توجد مشاركات
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {isPending && (
        <Alert className="fixed right-4 bottom-4 w-auto">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>جاري تحديث حالة المبادرة...</AlertDescription>
        </Alert>
      )}
    </div>
  );
};
export default InitiativeDetails;
