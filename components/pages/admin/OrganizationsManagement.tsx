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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Building2,
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckCircle,
  XCircle,
  Users,
} from "lucide-react";
import { AdminOrganizationCard, AdminService } from "@/services/admin";
import { AdminOrganizationStatusBadge } from "../AdminStatusBadge";
import SearchInput from "@/components/SearchInput";
import FilterSelect from "@/components/FilterSelect";
import { organizationTypeOptions } from "@/types/Profile";
import PaginationControls from "@/components/PaginationControls";
import { formatDate } from "@/lib/utils";

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

interface OrganizationsManagementProps {
  initialData: Awaited<ReturnType<typeof AdminService.getOrganizations>>;
}

const OrganizationsManagement = ({
  initialData,
}: OrganizationsManagementProps) => {
  const [organizations, setOrganizations] = useState<AdminOrganizationCard[]>(
    initialData.data
  );
  const [pagination, setPagination] = useState<PaginationData>(
    initialData.pagination
  );
  const [filters, setFilters] = useState({
    status: "all",
    search: "",
    organizationType: "all",
  });
  const [selectedOrg, setSelectedOrg] = useState<AdminOrganizationCard | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectionForm, setShowRejectionForm] = useState(false);

  const handleStatusUpdate = async (
    id: string,
    status: "approved" | "rejected"
  ) => {
    if (status === "rejected" && !rejectionReason.trim()) {
      setShowRejectionForm(true);
      return;
    }

    setIsLoading(true);
    try {
      // Mock API call - replace with actual server action
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setOrganizations((prev) =>
        prev.map((org) =>
          org.id === id ? { ...org, isVerified: status } : org
        )
      );

      setError(null);
    } catch (error) {
      setError("حدث خطأ أثناء تحديث حالة المنظمة");
    } finally {
      setIsLoading(false);
      setShowRejectionForm(false);
      setRejectionReason("");
    }
  };

  const handlePageChange = (page: number) => {};

  return (
    <div className="p-6 max-w-7xl mx-auto" dir="rtl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          إدارة المنظمات
        </h1>
        <p className="text-gray-600">مراجعة وموافقة على طلبات المنظمات</p>
      </div>

      <Card className="bg-transparent shadow-none border-none gap-2 pt-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            المنظمات ({pagination.total})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex-center-column sm:justify-between gap-4 mb-6 flex-wrap mt-6">
            <div className="max-w-full flex-center sm:justify-center gap-4 max-sm:flex-wrap">
              <SearchInput
                value={filters.search}
                onChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    search: value,
                  }))
                }
                placeholder="البحث عن منظمة..."
                className="w-full"
              />
            </div>
            {/* Filters */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 w-fit"
              dir="rtl"
            >
              <FilterSelect
                value={filters.status}
                onChange={(value) =>
                  setFilters((prev) => ({ ...prev, status: value }))
                }
                options={[
                  { value: "all", label: "جميع الحالات" },
                  { value: "pending", label: "قيد المراجعة" },
                  { value: "approved", label: "مقبولة" },
                  { value: "rejected", label: "مرفوضة" },
                ]}
                placeholder="الحالة"
                className="w-40"
              />

              <FilterSelect
                value={filters.organizationType}
                onChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    organizationType: value,
                  }))
                }
                options={[
                  ...organizationTypeOptions,
                  { value: "all", label: "جميع الأنواع" },
                ]}
                placeholder="النوع"
                className="w-40"
              />
            </div>
          </div>

          {/* Organizations List */}
          <div className="space-y-4">
            {organizations.length === 0 ? (
              <div className="text-center py-12">
                <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  لا توجد منظمات
                </h3>
                <p className="text-gray-500">
                  لا توجد منظمات مطابقة للفلاتر المحددة
                </p>
              </div>
            ) : (
              organizations.map((org) => (
                <Card key={org.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {org.name}
                        </h3>
                        {org.shortName && (
                          <p className="text-sm text-gray-600">
                            {org.shortName}
                          </p>
                        )}
                        {org.description && (
                          <p className="text-sm text-gray-700 mt-1 line-clamp-2">
                            {org.description}
                          </p>
                        )}
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {org.contactEmail}
                          </span>
                          {org.contactPhone && (
                            <span className="flex items-center gap-1">
                              <Phone className="h-4 w-4" />
                              {org.contactPhone}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {org.city}, {org.country}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <AdminOrganizationStatusBadge status={org.isVerified} />
                        <Badge variant="outline" className="text-xs">
                          {org.organizationType}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {org._count.initiatives} مبادرة
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">المالك:</span>{" "}
                        {org.owner.name}
                        <span className="text-gray-500">
                          {" "}
                          ({org.owner.email})
                        </span>
                        <div className="text-xs text-gray-500 mt-1">
                          انضم في {formatDate(org.createdAt)}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedOrg(org)}
                            >
                              <Eye className="h-4 w-4 ml-1" />
                              عرض التفاصيل
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>
                                تفاصيل المنظمة - {selectedOrg?.name}
                              </DialogTitle>
                            </DialogHeader>
                            {selectedOrg && (
                              <div className="space-y-6" dir="rtl">
                                {/* Basic Information */}
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="font-medium text-gray-700">
                                      اسم المنظمة:
                                    </Label>
                                    <p className="mt-1">{selectedOrg.name}</p>
                                  </div>
                                  <div>
                                    <Label className="font-medium text-gray-700">
                                      الاسم المختصر:
                                    </Label>
                                    <p className="mt-1">
                                      {selectedOrg.shortName || "غير متوفر"}
                                    </p>
                                  </div>
                                  <div>
                                    <Label className="font-medium text-gray-700">
                                      نوع المنظمة:
                                    </Label>
                                    <p className="mt-1">
                                      {selectedOrg.organizationType}
                                    </p>
                                  </div>
                                  <div>
                                    <Label className="font-medium text-gray-700">
                                      عدد الأعضاء:
                                    </Label>
                                    <p className="mt-1">
                                      {selectedOrg.membersCount || "غير محدد"}
                                    </p>
                                  </div>
                                  <div>
                                    <Label className="font-medium text-gray-700">
                                      تاريخ التأسيس:
                                    </Label>
                                    <p className="mt-1">
                                      {selectedOrg.foundingDate
                                        ? formatDate(selectedOrg.foundingDate)
                                        : "غير متوفر"}
                                    </p>
                                  </div>
                                  <div>
                                    <Label className="font-medium text-gray-700">
                                      المقر الرئيسي:
                                    </Label>
                                    <p className="mt-1">
                                      {selectedOrg.headquarters || "غير متوفر"}
                                    </p>
                                  </div>
                                </div>

                                {/* Description */}
                                {selectedOrg.description && (
                                  <div>
                                    <Label className="font-medium text-gray-700">
                                      وصف المنظمة:
                                    </Label>
                                    <p className="mt-1 bg-gray-50 p-3 rounded-lg">
                                      {selectedOrg.description}
                                    </p>
                                  </div>
                                )}

                                {/* Work Areas */}
                                <div>
                                  <Label className="font-medium text-gray-700">
                                    مجالات العمل:
                                  </Label>
                                  <div className="mt-2 flex flex-wrap gap-2">
                                    {selectedOrg.workAreas.map(
                                      (area, index) => (
                                        <Badge key={index} variant="outline">
                                          {area}
                                        </Badge>
                                      )
                                    )}
                                  </div>
                                </div>

                                {/* Contact Information */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                  <Label className="font-medium text-gray-700 mb-3 block">
                                    معلومات التواصل:
                                  </Label>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-2">
                                      <Mail className="h-4 w-4 text-gray-500" />
                                      <span className="text-sm">
                                        {selectedOrg.contactEmail}
                                      </span>
                                    </div>
                                    {selectedOrg.contactPhone && (
                                      <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-gray-500" />
                                        <span className="text-sm">
                                          {selectedOrg.contactPhone}
                                        </span>
                                      </div>
                                    )}
                                    <div className="flex items-center gap-2">
                                      <MapPin className="h-4 w-4 text-gray-500" />
                                      <span className="text-sm">
                                        {selectedOrg.city}, {selectedOrg.state},{" "}
                                        {selectedOrg.country}
                                      </span>
                                    </div>
                                    {selectedOrg.website && (
                                      <div className="flex items-center gap-2">
                                        <span className="text-sm">🌐</span>
                                        <a
                                          href={selectedOrg.website}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-sm text-blue-600 hover:text-blue-800"
                                        >
                                          {selectedOrg.website}
                                        </a>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Owner Information */}
                                <div className="bg-blue-50 p-4 rounded-lg">
                                  <Label className="font-medium text-gray-700 mb-3 block">
                                    معلومات المالك:
                                  </Label>
                                  <div className="space-y-2">
                                    <p className="flex items-center gap-2">
                                      <Users className="h-4 w-4 text-gray-500" />
                                      <strong>الاسم:</strong>{" "}
                                      {selectedOrg.owner.name}
                                    </p>
                                    <p className="flex items-center gap-2">
                                      <Mail className="h-4 w-4 text-gray-500" />
                                      <strong>البريد:</strong>{" "}
                                      {selectedOrg.owner.email}
                                    </p>
                                    {selectedOrg.owner.phone && (
                                      <p className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-gray-500" />
                                        <strong>الهاتف:</strong>{" "}
                                        {selectedOrg.owner.phone}
                                      </p>
                                    )}
                                    <p className="flex items-center gap-2">
                                      <Calendar className="h-4 w-4 text-gray-500" />
                                      <strong>تاريخ التسجيل:</strong>{" "}
                                      {formatDate(selectedOrg.createdAt)}
                                    </p>
                                  </div>
                                </div>

                                {/* Rejection Form */}
                                {showRejectionForm &&
                                  selectedOrg.isVerified === "pending" && (
                                    <div className="space-y-3 border-t pt-4">
                                      <Label htmlFor="rejectionReason">
                                        سبب رفض المنظمة
                                      </Label>
                                      <Textarea
                                        id="rejectionReason"
                                        value={rejectionReason}
                                        onChange={(e) =>
                                          setRejectionReason(e.target.value)
                                        }
                                        placeholder="اكتب سبب رفض المنظمة..."
                                        rows={3}
                                      />
                                      <div className="flex gap-2">
                                        <Button
                                          onClick={() =>
                                            handleStatusUpdate(
                                              selectedOrg.id,
                                              "rejected"
                                            )
                                          }
                                          disabled={
                                            isLoading || !rejectionReason.trim()
                                          }
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
                                  )}

                                {/* Action Buttons */}
                                {selectedOrg.isVerified === "pending" &&
                                  !showRejectionForm && (
                                    <div className="flex justify-center gap-4 pt-4 border-t">
                                      <Button
                                        onClick={() =>
                                          handleStatusUpdate(
                                            selectedOrg.id,
                                            "approved"
                                          )
                                        }
                                        disabled={isLoading}
                                        className="bg-green-600 hover:bg-green-700"
                                      >
                                        <CheckCircle className="h-4 w-4 ml-1" />
                                        قبول المنظمة
                                      </Button>
                                      <Button
                                        onClick={() =>
                                          setShowRejectionForm(true)
                                        }
                                        disabled={isLoading}
                                        variant="destructive"
                                      >
                                        <XCircle className="h-4 w-4 ml-1" />
                                        رفض المنظمة
                                      </Button>
                                    </div>
                                  )}

                                {/* Status Info */}
                                {selectedOrg.isVerified !== "pending" && (
                                  <div className="text-center py-4 border-t">
                                    <div className="flex items-center justify-center gap-2">
                                      <AdminOrganizationStatusBadge
                                        status={selectedOrg.isVerified}
                                      />
                                      <span className="text-sm text-gray-600">
                                        تم التحديث في{" "}
                                        {formatDate(selectedOrg.updatedAt)}
                                      </span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        {org.isVerified === "pending" && (
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              onClick={() =>
                                handleStatusUpdate(org.id, "approved")
                              }
                              disabled={isLoading}
                              className="bg-green-600 hover:bg-green-700 text-xs px-2"
                            >
                              قبول
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => {
                                setSelectedOrg(org);
                                setShowRejectionForm(true);
                              }}
                              disabled={isLoading}
                              className="text-xs px-2"
                            >
                              رفض
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

export default OrganizationsManagement;
