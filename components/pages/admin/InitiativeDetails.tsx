import React, { useState } from "react";
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

interface InitiativeDetailsProps {
  initiative: Awaited<ReturnType<typeof AdminService.getInitiativeById>>;
}

const InitiativeDetails = ({ initiative }: InitiativeDetailsProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectionForm, setShowRejectionForm] = useState(false);

  if (!initiative) {
    return (
      <div className="p-6 max-w-6xl mx-auto" dir="rtl">
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

    setIsUpdating(true);
    try {
      // Replace with actual server action call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log(`Updating initiative ${initiative.id} to ${status}`, {
        rejectionReason,
      });
      // Handle success (show notification, redirect, etc.)
    } catch (error) {
      console.error("Error updating initiative status:", error);
    } finally {
      setIsUpdating(false);
      setShowRejectionForm(false);
      setRejectionReason("");
    }
  };

  const formatDate = (date: Date | string | null | undefined) => {
    if (!date) return "غير متوفر";
    return new Date(date).toLocaleDateString("ar-DZ", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto" dir="rtl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" className="p-2">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">
            {initiative.titleAr}
          </h1>
          <p className="text-gray-600">تفاصيل المبادرة</p>
        </div>
        <AdminInitiativeStatusBadge status={initiative.status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                معلومات المبادرة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    {formatDate(initiative.registrationDeadline)}
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
                  <p className="mt-1 text-gray-900 bg-gray-50 p-3 rounded-lg">
                    {initiative.shortDescriptionAr}
                  </p>
                </div>
              )}

              {initiative.descriptionAr && (
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    وصف المبادرة
                  </Label>
                  <div className="mt-1 text-gray-900 bg-gray-50 p-3 rounded-lg max-h-48 overflow-y-auto">
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
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-gray-500" />
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
                  <Mail className="w-5 h-5 text-gray-500" />
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
                    <Phone className="w-5 h-5 text-gray-500" />
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
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      تاريخ انضمام المنظم
                    </Label>
                    <p className="text-gray-900">
                      {formatDate(initiative.organizerUser?.createdAt)}
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
                        disabled={isUpdating || !rejectionReason.trim()}
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
                      disabled={isUpdating}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4 ml-1" />
                      نشر المبادرة
                    </Button>
                    <Button
                      onClick={() => setShowRejectionForm(true)}
                      disabled={isUpdating}
                      variant="destructive"
                      className="w-full"
                    >
                      <XCircle className="w-4 ml-1" />
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
                      <div className="flex items-center justify-between mt-1">
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
                <p className="text-gray-500 text-center py-4">
                  لا توجد مشاركات
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {isUpdating && (
        <Alert className="fixed bottom-4 right-4 w-auto">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>جاري تحديث حالة المبادرة...</AlertDescription>
        </Alert>
      )}
    </div>
  );
};
export default InitiativeDetails;
