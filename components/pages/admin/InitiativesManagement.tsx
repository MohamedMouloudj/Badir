"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Eye,
  MapPin,
  Calendar,
  CheckCircle,
  XCircle,
  FileText,
  AlertCircle,
} from "lucide-react";
import { AdminInitiativeCard, AdminService } from "@/services/admin";
import { PaginatedResponse } from "@/types/Pagination";
import PaginationControls from "@/components/PaginationControls";
import { formatDate } from "@/lib/utils";
import { AdminInitiativeStatusBadge } from "../AdminStatusBadge";
import SearchInput from "@/components/SearchInput";
import FilterSelect from "@/components/FilterSelect";

type PaginationData = PaginatedResponse<AdminInitiativeCard[]>["pagination"];

interface InitiativesManagementProps {
  initialData: Awaited<ReturnType<typeof AdminService.getUserInitiatives>>;
}

const InitiativesManagement = ({ initialData }: InitiativesManagementProps) => {
  const [initiatives, setInitiatives] = useState<AdminInitiativeCard[]>(
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
    useState<AdminInitiativeCard | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectionForm, setShowRejectionForm] = useState(false);

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

  const handleSearch = (searchTerm: string) => {};

  const handlePageChange = (page: number) => {};

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

      <Card className="bg-transparent shadow-none border-none gap-2 pt-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            المبادرات ({pagination.total})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="flex-center-column sm:justify-between gap-4 mb-6 flex-wrap mt-6"
            dir="rtl"
          >
            <div className="max-w-full flex-center sm:justify-center gap-4 max-sm:flex-wrap">
              <SearchInput
                value={filters.search}
                onChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    search: value,
                  }))
                }
                placeholder="البحث عن مبادرة..."
                className="w-full"
              />
            </div>
            <FilterSelect
              value={filters.status}
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, status: value }))
              }
              options={[
                { value: "all", label: "جميع الحالات" },
                { value: "draft", label: "مسودة" },
                { value: "published", label: "منشورة" },
                { value: "cancelled", label: "ملغية" },
              ]}
              placeholder="الحالة"
              className="w-40"
            />
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
                        <AdminInitiativeStatusBadge
                          status={initiative.status}
                        />
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
            <PaginationControls
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              hasNext={pagination.hasNext}
              hasPrev={pagination.hasPrev}
              onPageChange={handlePageChange}
              className="mt-8"
            />
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
