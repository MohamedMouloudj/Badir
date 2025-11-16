"use client";
import React, { useState, useTransition } from "react";
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
  ArrowUpRight,
} from "lucide-react";
import { AdminInitiativeCard, AdminService } from "@/services/admin";
import { PaginatedResponse } from "@/types/Pagination";
import PaginationControls from "@/components/PaginationControls";
import { formatDate } from "@/lib/utils";
import { AdminInitiativeStatusBadge } from "../AdminStatusBadge";
import SearchInput from "@/components/SearchInput";
import FilterSelect from "@/components/FilterSelect";
import Link from "next/link";
import { updateInitiativeStatusAction } from "@/actions/admin";
import { toast } from "sonner";

type PaginationData = PaginatedResponse<AdminInitiativeCard[]>["pagination"];

interface InitiativesManagementProps {
  initialData: Awaited<ReturnType<typeof AdminService.getUserInitiatives>>;
}

const InitiativesManagement = ({ initialData }: InitiativesManagementProps) => {
  const [initiatives, setInitiatives] = useState<AdminInitiativeCard[]>(
    initialData.data,
  );
  const [pagination, setPagination] = useState<PaginationData>(
    initialData.pagination,
  );
  const [filters, setFilters] = useState({
    status: "all",
    search: "",
    categoryId: "",
  });
  const [selectedInitiative, setSelectedInitiative] =
    useState<AdminInitiativeCard | null>(null);
  const [isPending, startTransition] = useTransition();
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectionForm, setShowRejectionForm] = useState(false);

  const handleStatusUpdate = async (
    id: string,
    status: "published" | "cancelled",
  ) => {
    if (status === "cancelled" && !rejectionReason.trim()) {
      setShowRejectionForm(true);
      return;
    }

    try {
      startTransition(async () => {
        const result = await updateInitiativeStatusAction(id, status);

        if (result.success) {
          setInitiatives((prev) =>
            prev.map((init) => (init.id === id ? { ...init, status } : init)),
          );
          toast.success(
            `تم ${status === "published" ? "نشر" : "إلغاء"} المبادرة بنجاح`,
          );
          setSelectedInitiative((prev) =>
            prev && prev.id === id ? { ...prev, status } : prev,
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

  const handleSearch = (searchTerm: string) => {};

  const handlePageChange = (page: number) => {};

  return (
    <div className="mx-auto max-w-7xl p-6" dir="rtl">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
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

      <Card className="gap-2 border-none bg-transparent pt-0 shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            المبادرات ({pagination.total})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="flex-center-column mt-6 mb-6 flex-wrap gap-4 sm:justify-between"
            dir="rtl"
          >
            <div className="flex-center max-w-full gap-4 max-sm:flex-wrap sm:justify-center">
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
              <div className="py-12 text-center">
                <FileText className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                <h3 className="mb-2 text-lg font-medium text-gray-900">
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
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex-1">
                        <Link
                          href={`/admin/initiatives/${initiative.id}`}
                          target="_blank"
                          className="flex items-center"
                        >
                          <ArrowUpRight className="ml-1 inline-block h-4 w-4 text-gray-500" />
                          <h3 className="text-lg font-semibold text-gray-900 hover:underline">
                            {initiative.titleAr}
                          </h3>
                        </Link>
                        {initiative.titleEn && (
                          <p className="text-sm text-gray-600">
                            {initiative.titleEn}
                          </p>
                        )}
                        {initiative.shortDescriptionAr && (
                          <p className="mt-1 line-clamp-2 text-sm text-gray-700">
                            {initiative.shortDescriptionAr}
                          </p>
                        )}
                        <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
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
                              <Eye className="ml-1 h-4 w-4" />
                              عرض التفاصيل
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
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
                                    <p className="mt-1 rounded-lg bg-gray-50 p-3">
                                      {selectedInitiative.shortDescriptionAr}
                                    </p>
                                  </div>
                                )}

                                <div>
                                  <Label className="font-medium">
                                    معلومات المنظم:
                                  </Label>
                                  <div className="mt-1 rounded bg-gray-50 p-3">
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
                                            "cancelled",
                                          )
                                        }
                                        disabled={
                                          isPending || !rejectionReason.trim()
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
                                    <div className="flex justify-center gap-4 border-t pt-4">
                                      <Button
                                        onClick={() =>
                                          handleStatusUpdate(
                                            selectedInitiative.id,
                                            "published",
                                          )
                                        }
                                        disabled={isPending}
                                        className="bg-green-600 hover:bg-green-700"
                                      >
                                        <CheckCircle className="ml-1 h-4 w-4" />
                                        نشر المبادرة
                                      </Button>
                                      <Button
                                        onClick={() =>
                                          setShowRejectionForm(true)
                                        }
                                        disabled={isPending}
                                        variant="destructive"
                                      >
                                        <XCircle className="ml-1 h-4 w-4" />
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
                              disabled={isPending}
                              className="bg-green-600 px-2 text-xs hover:bg-green-700"
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
                              disabled={isPending}
                              className="px-2 text-xs"
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
    </div>
  );
};

export default InitiativesManagement;
