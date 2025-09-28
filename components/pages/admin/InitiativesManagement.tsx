"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Users,
  Search,
  Eye,
  MapPin,
  Calendar,
  CheckCircle,
  XCircle,
  FileText,
  AlertCircle,
  Clock,
} from "lucide-react";
import { AdminService } from "@/services/admin";

// AdminService types
interface InitiativeCard {
  id: string;
  titleAr: string;
  titleEn?: string | null;
  shortDescriptionAr?: string | null;
  shortDescriptionEn?: string | null;
  city: string;
  startDate: Date | string;
  endDate: Date | string;
  status: "draft" | "published" | "cancelled";
  createdAt: Date | string;
  category: {
    nameAr: string;
    nameEn?: string | null;
  };
  organizerUser: {
    id: string;
    name: string;
    email: string;
  } | null;
  _count: {
    participants: number;
  };
}

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

interface InitiativesManagementProps {
  initialData: Awaited<ReturnType<typeof AdminService.getUserInitiatives>>;
}

const InitiativesManagement = ({ initialData }: InitiativesManagementProps) => {
  const [initiatives, setInitiatives] = useState<InitiativeCard[]>(
    initialData.data
  );
  const [pagination, setPagination] = useState<PaginationData>(
    initialData.pagination
  );
  const [filters, setFilters] = useState({
    status: "all",
    search: "",
    categoryId: "",
  });
  const [selectedInitiative, setSelectedInitiative] =
    useState<InitiativeCard | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectionForm, setShowRejectionForm] = useState(false);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { label: "مسودة", variant: "secondary" as const, icon: Clock },
      published: {
        label: "منشور",
        variant: "default" as const,
        icon: CheckCircle,
      },
      cancelled: {
        label: "ملغي",
        variant: "destructive" as const,
        icon: XCircle,
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  const handleStatusUpdate = async (
    id: string,
    status: "published" | "cancelled"
  ) => {
    if (status === "cancelled" && !rejectionReason.trim()) {
      setShowRejectionForm(true);
      return;
    }

    setIsLoading(true);
    try {
      // Mock API call - replace with actual server action
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setInitiatives((prev) =>
        prev.map((init) => (init.id === id ? { ...init, status } : init))
      );

      setError(null);
    } catch (error) {
      setError("حدث خطأ أثناء تحديث حالة المبادرة");
    } finally {
      setIsLoading(false);
      setShowRejectionForm(false);
      setRejectionReason("");
    }
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("ar-DZ", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto" dir="rtl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          إدارة مبادرات المستخدمين
        </h1>
        <p className="text-gray-600">
          مراجعة وموافقة على المبادرات المقدمة من المستخدمين
        </p>
      </div>

      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          هذه الصفحة تعرض فقط المبادرات المنشأة من قبل المستخدمين العاديين والتي
          تحتاج لموافقة المسؤول قبل النشر.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            المبادرات ({pagination.total})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex gap-4 mb-6 flex-wrap">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <Input
                placeholder="البحث عن مبادرة..."
                value={filters.search}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, search: e.target.value }))
                }
                className="w-64"
              />
            </div>

            <Select
              value={filters.status}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="draft">مسودة</SelectItem>
                <SelectItem value="published">منشورة</SelectItem>
                <SelectItem value="cancelled">ملغية</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Initiatives List */}
          <div className="space-y-4">
            {initiatives.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  لا توجد مبادرات
                </h3>
                <p className="text-gray-500">
                  لا توجد مبادرات مطابقة للفلاتر المحددة
                </p>
              </div>
            ) : (
              initiatives.map((initiative) => (
                <Card
                  key={initiative.id}
                  className="border-l-4 border-l-green-500"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {initiative.titleAr}
                        </h3>
                        {initiative.titleEn && (
                          <p className="text-sm text-gray-600">
                            {initiative.titleEn}
                          </p>
                        )}
                        {initiative.shortDescriptionAr && (
                          <p className="text-sm text-gray-700 mt-1 line-clamp-2">
                            {initiative.shortDescriptionAr}
                          </p>
                        )}
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {initiative.city}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(initiative.startDate)} -{" "}
                            {formatDate(initiative.endDate)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {initiative._count.participants} مشارك
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {getStatusBadge(initiative.status)}
                        <Badge variant="outline" className="text-xs">
                          {initiative.category.nameAr}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">المنظم:</span>{" "}
                        {initiative.organizerUser?.name || "غير محدد"}
                        {initiative.organizerUser?.email && (
                          <span className="text-gray-500">
                            {" "}
                            ({initiative.organizerUser.email})
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedInitiative(initiative)}
                            >
                              <Eye className="h-4 w-4 ml-1" />
                              عرض التفاصيل
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>تفاصيل المبادرة</DialogTitle>
                            </DialogHeader>
                            {selectedInitiative && (
                              <div className="space-y-4" dir="rtl">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="font-medium">
                                      عنوان المبادرة:
                                    </Label>
                                    <p>{selectedInitiative.titleAr}</p>
                                  </div>
                                  <div>
                                    <Label className="font-medium">
                                      العنوان بالإنجليزية:
                                    </Label>
                                    <p>
                                      {selectedInitiative.titleEn ||
                                        "غير متوفر"}
                                    </p>
                                  </div>
                                  <div>
                                    <Label className="font-medium">
                                      الفئة:
                                    </Label>
                                    <p>{selectedInitiative.category.nameAr}</p>
                                  </div>
                                  <div>
                                    <Label className="font-medium">
                                      المدينة:
                                    </Label>
                                    <p>{selectedInitiative.city}</p>
                                  </div>
                                  <div>
                                    <Label className="font-medium">
                                      تاريخ البدء:
                                    </Label>
                                    <p>
                                      {formatDate(selectedInitiative.startDate)}
                                    </p>
                                  </div>
                                  <div>
                                    <Label className="font-medium">
                                      تاريخ الانتهاء:
                                    </Label>
                                    <p>
                                      {formatDate(selectedInitiative.endDate)}
                                    </p>
                                  </div>
                                </div>

                                {selectedInitiative.shortDescriptionAr && (
                                  <div>
                                    <Label className="font-medium">
                                      الوصف المختصر:
                                    </Label>
                                    <p className="mt-1 bg-gray-50 p-3 rounded-lg">
                                      {selectedInitiative.shortDescriptionAr}
                                    </p>
                                  </div>
                                )}

                                <div>
                                  <Label className="font-medium">
                                    معلومات المنظم:
                                  </Label>
                                  <div className="bg-gray-50 p-3 rounded mt-1">
                                    <p>
                                      <strong>الاسم:</strong>{" "}
                                      {selectedInitiative.organizerUser?.name ||
                                        "غير محدد"}
                                    </p>
                                    <p>
                                      <strong>البريد:</strong>{" "}
                                      {selectedInitiative.organizerUser
                                        ?.email || "غير محدد"}
                                    </p>
                                  </div>
                                </div>

                                {showRejectionForm && (
                                  <div className="space-y-3 border-t pt-4">
                                    <Label htmlFor="rejectionReason">
                                      سبب إلغاء المبادرة
                                    </Label>
                                    <Textarea
                                      id="rejectionReason"
                                      value={rejectionReason}
                                      onChange={(e) =>
                                        setRejectionReason(e.target.value)
                                      }
                                      placeholder="اكتب سبب إلغاء المبادرة..."
                                      rows={3}
                                    />
                                    <div className="flex gap-2">
                                      <Button
                                        onClick={() =>
                                          handleStatusUpdate(
                                            selectedInitiative.id,
                                            "cancelled"
                                          )
                                        }
                                        disabled={
                                          isLoading || !rejectionReason.trim()
                                        }
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
                                )}

                                {selectedInitiative.status === "draft" &&
                                  !showRejectionForm && (
                                    <div className="flex justify-center gap-4 pt-4 border-t">
                                      <Button
                                        onClick={() =>
                                          handleStatusUpdate(
                                            selectedInitiative.id,
                                            "published"
                                          )
                                        }
                                        disabled={isLoading}
                                        className="bg-green-600 hover:bg-green-700"
                                      >
                                        <CheckCircle className="h-4 w-4 ml-1" />
                                        نشر المبادرة
                                      </Button>
                                      <Button
                                        onClick={() =>
                                          setShowRejectionForm(true)
                                        }
                                        disabled={isLoading}
                                        variant="destructive"
                                      >
                                        <XCircle className="h-4 w-4 ml-1" />
                                        إلغاء المبادرة
                                      </Button>
                                    </div>
                                  )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        {initiative.status === "draft" && (
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              onClick={() =>
                                handleStatusUpdate(initiative.id, "published")
                              }
                              disabled={isLoading}
                              className="bg-green-600 hover:bg-green-700 text-xs px-2"
                            >
                              نشر
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => {
                                setSelectedInitiative(initiative);
                                setShowRejectionForm(true);
                              }}
                              disabled={isLoading}
                              className="text-xs px-2"
                            >
                              إلغاء
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <Button
                variant="outline"
                size="sm"
                disabled={!pagination.hasPrev || isLoading}
                onClick={() => {
                  /* Handle previous page */
                }}
              >
                السابق
              </Button>

              <span className="mx-4 text-sm text-gray-600">
                صفحة {pagination.page} من {pagination.totalPages}
              </span>

              <Button
                variant="outline"
                size="sm"
                disabled={!pagination.hasNext || isLoading}
                onClick={() => {
                  /* Handle next page */
                }}
              >
                التالي
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default InitiativesManagement;
