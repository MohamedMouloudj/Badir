import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";
import { AdminService } from "@/services/admin";
import { formatDate } from "@/lib/utils";
import { AdminOrganizationStatusBadge } from "../AdminStatusBadge";

interface OrganizationDetailsProps {
  organization: Awaited<ReturnType<typeof AdminService.getOrganizationById>>;
}

const OrganizationDetails = ({ organization }: OrganizationDetailsProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectionForm, setShowRejectionForm] = useState(false);

  if (!organization) {
    return (
      <div className="p-6 max-w-6xl mx-auto" dir="rtl">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>المنظمة غير موجودة</AlertDescription>
        </Alert>
      </div>
    );
  }

  const handleStatusUpdate = async (status: "approved" | "rejected") => {
    if (status === "rejected" && !rejectionReason.trim()) {
      setShowRejectionForm(true);
      return;
    }

    setIsUpdating(true);
    try {
      // Replace with actual server action call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log(`Updating organization ${organization.id} to ${status}`, {
        rejectionReason,
      });
      // Handle success (show notification, redirect, etc.)
    } catch (error) {
      console.error("Error updating organization status:", error);
    } finally {
      setIsUpdating(false);
      setShowRejectionForm(false);
      setRejectionReason("");
    }
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
            {organization.name}
          </h1>
          <p className="text-gray-600">تفاصيل المنظمة</p>
        </div>
        <AdminOrganizationStatusBadge status={organization.isVerified} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                معلومات المنظمة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    اسم المنظمة
                  </Label>
                  <p className="mt-1 text-gray-900">{organization.name}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    الاسم المختصر
                  </Label>
                  <p className="mt-1 text-gray-900">
                    {organization.shortName || "غير متوفر"}
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    نوع المنظمة
                  </Label>
                  <p className="mt-1 text-gray-900">
                    {organization.organizationType}
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    تاريخ التأسيس
                  </Label>
                  <p className="mt-1 text-gray-900">
                    {formatDate(organization.foundingDate!)}
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    عدد الأعضاء
                  </Label>
                  <p className="mt-1 text-gray-900">
                    {organization.membersCount || "غير محدد"}
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    المقر الرئيسي
                  </Label>
                  <p className="mt-1 text-gray-900">
                    {organization.headquarters || "غير متوفر"}
                  </p>
                </div>
              </div>

              {organization.description && (
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    وصف المنظمة
                  </Label>
                  <p className="mt-1 text-gray-900 bg-gray-50 p-3 rounded-lg">
                    {organization.description}
                  </p>
                </div>
              )}

              <div>
                <Label className="text-sm font-medium text-gray-700">
                  مجالات العمل
                </Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {organization.workAreas.map((area, index) => (
                    <Badge key={index} variant="outline">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>معلومات التواصل</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      البريد الإلكتروني
                    </Label>
                    <p className="text-gray-900">{organization.contactEmail}</p>
                  </div>
                </div>

                {organization.contactPhone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        رقم الهاتف
                      </Label>
                      <p className="text-gray-900">
                        {organization.contactPhone}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      الموقع
                    </Label>
                    <p className="text-gray-900">
                      {organization.city}, {organization.state},{" "}
                      {organization.country}
                    </p>
                  </div>
                </div>

                {organization.website && (
                  <div className="flex items-center gap-3">
                    <ExternalLink className="w-5 h-5 text-gray-500" />
                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        الموقع الإلكتروني
                      </Label>
                      <a
                        href={organization.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {organization.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Owner Information */}
          <Card>
            <CardHeader>
              <CardTitle>معلومات المالك</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-gray-500" />
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      الاسم
                    </Label>
                    <p className="text-gray-900">{organization.owner.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      البريد الإلكتروني
                    </Label>
                    <p className="text-gray-900">{organization.owner.email}</p>
                  </div>
                </div>

                {organization.owner.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        رقم الهاتف
                      </Label>
                      <p className="text-gray-900">
                        {organization.owner.phone}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      تاريخ التسجيل
                    </Label>
                    <p className="text-gray-900">
                      {formatDate(organization.owner.createdAt)}
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
          {organization.isVerified === "pending" && (
            <Card>
              <CardHeader>
                <CardTitle>إجراءات المراجعة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {showRejectionForm ? (
                  <div className="space-y-3">
                    <Label htmlFor="rejectionReason">سبب الرفض</Label>
                    <Textarea
                      id="rejectionReason"
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      placeholder="اكتب سبب رفض المنظمة..."
                      rows={3}
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleStatusUpdate("rejected")}
                        disabled={isUpdating || !rejectionReason.trim()}
                        variant="destructive"
                        size="sm"
                      >
                        تأكيد الرفض
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
                      onClick={() => handleStatusUpdate("approved")}
                      disabled={isUpdating}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4 ml-1" />
                      قبول المنظمة
                    </Button>
                    <Button
                      onClick={() => setShowRejectionForm(true)}
                      disabled={isUpdating}
                      variant="destructive"
                      className="w-full"
                    >
                      <XCircle className="w-4 h-4 ml-1" />
                      رفض المنظمة
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          )}

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>إحصائيات المنظمة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">إجمالي المبادرات</span>
                <span className="font-medium">
                  {organization._count.initiatives}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">تاريخ التسجيل</span>
                <span className="font-medium">
                  {formatDate(organization.createdAt)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Recent Initiatives */}
          <Card>
            <CardHeader>
              <CardTitle>المبادرات الأخيرة</CardTitle>
            </CardHeader>
            <CardContent>
              {organization.initiatives &&
              organization.initiatives.length > 0 ? (
                <div className="space-y-3">
                  {organization.initiatives.map((initiative) => (
                    <div
                      key={initiative.id}
                      className="border-b border-gray-100 pb-2 last:border-b-0"
                    >
                      <p className="text-sm font-medium text-gray-900">
                        {initiative.titleAr}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <Badge variant="outline" className="text-xs">
                          {initiative.status === "published"
                            ? "منشورة"
                            : initiative.status === "draft"
                            ? "مسودة"
                            : "ملغية"}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {formatDate(initiative.createdAt)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">
                  لا توجد مبادرات
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {isUpdating && (
        <Alert className="fixed bottom-4 right-4 w-auto">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>جاري تحديث حالة المنظمة...</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default OrganizationDetails;
