"use client";

import React, { useState, useEffect } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2,
  Users,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  TrendingUp,
  AlertCircle,
  Loader2,
  ArrowUpLeft,
  ArrowUpRight,
} from "lucide-react";
import {
  AdminOrganizationCard,
  AdminInitiativeCard,
  AdminService,
} from "@/services/admin";
import {
  getOrganizationsAction,
  getUserInitiativesAction,
} from "@/actions/admin";
import {
  AdminInitiativeStatusBadge,
  AdminOrganizationStatusBadge,
} from "../AdminStatusBadge";
import FilterSelect from "@/components/FilterSelect";
import SearchInput from "@/components/SearchInput";
import { organizationTypeOptions } from "@/types/Profile";
import { toast } from "sonner";
import Link from "next/link";
import AppButton from "@/components/AppButton";

type AdminStatsType = Awaited<ReturnType<typeof AdminService.getAdminStats>>;

interface AdminDashboardProps {
  initialStats?: AdminStatsType;
}

const AdminDashboard = ({ initialStats }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [stats] = useState<AdminStatsType>(
    initialStats || {
      organizations: { pending: 0, approved: 0, rejected: 0, total: 0 },
      initiatives: { draft: 0, published: 0, cancelled: 0, total: 0 },
    },
  );

  // Organizations state
  const [organizations, setOrganizations] = useState<AdminOrganizationCard[]>(
    [],
  );
  const [orgFilters, setOrgFilters] = useState({
    status: "all",
    search: "",
    organizationType: "all",
  });
  const [selectedOrg, setSelectedOrg] = useState<AdminOrganizationCard | null>(
    null,
  );

  // Initiatives state
  const [initiatives, setInitiatives] = useState<AdminInitiativeCard[]>([]);
  const [initiativeFilters, setInitiativeFilters] = useState({
    status: "all",
    search: "",
    categoryId: "",
  });
  const [selectedInitiative, setSelectedInitiative] =
    useState<AdminInitiativeCard | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const organizationsData = await getOrganizationsAction();
        setOrganizations(
          organizationsData.data ? organizationsData.data.data.slice(0, 3) : [],
        );

        const initiativesData = await getUserInitiativesAction();
        setInitiatives(
          initiativesData.data ? initiativesData.data.data.slice(0, 3) : [],
        );
      } catch (error) {
        toast.error("حدث خطأ أثناء جلب البيانات");
        console.error("Error fetching admin data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleStatusUpdate = async (
    id: string,
    status: string,
    type: "organization" | "initiative",
  ) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (type === "organization") {
        setOrganizations((prev) =>
          prev.map((org) =>
            org.id === id
              ? { ...org, isVerified: status as "approved" | "rejected" }
              : org,
          ),
        );
      } else {
        setInitiatives((prev) =>
          prev.map((init) =>
            init.id === id
              ? { ...init, status: status as "published" | "cancelled" }
              : init,
          ),
        );
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء تحديث الحالة");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl p-6" dir="rtl">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          لوحة تحكم المسؤول
        </h1>
        <p className="text-gray-600">إدارة المنظمات والمبادرات</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">الإحصائيات</TabsTrigger>
          <TabsTrigger value="organizations">المنظمات</TabsTrigger>
          <TabsTrigger value="initiatives">المبادرات</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  المنظمات قيد المراجعة
                </CardTitle>
                <Clock className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {stats.organizations.pending}
                </div>
                <p className="text-muted-foreground text-xs">تحتاج لمراجعة</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  المنظمات المقبولة
                </CardTitle>
                <CheckCircle className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {stats.organizations.approved}
                </div>
                <p className="text-muted-foreground text-xs">تم قبولها</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  المبادرات قيد المراجعة
                </CardTitle>
                <FileText className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {stats.initiatives.draft}
                </div>
                <p className="text-muted-foreground text-xs">تحتاج لمراجعة</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  المبادرات المنشورة
                </CardTitle>
                <TrendingUp className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {stats.initiatives.published}
                </div>
                <p className="text-muted-foreground text-xs">تم نشرها</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  إحصائيات المنظمات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">المجموع</span>
                    <span className="font-medium">
                      {stats.organizations.total}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">قيد المراجعة</span>
                    <span className="font-medium text-orange-600">
                      {stats.organizations.pending}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">مقبولة</span>
                    <span className="font-medium text-green-600">
                      {stats.organizations.approved}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">مرفوضة</span>
                    <span className="font-medium text-red-600">
                      {stats.organizations.rejected}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  إحصائيات المبادرات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">المجموع</span>
                    <span className="font-medium">
                      {stats.initiatives.total}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">مسودات</span>
                    <span className="font-medium text-blue-600">
                      {stats.initiatives.draft}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">منشورة</span>
                    <span className="font-medium text-green-600">
                      {stats.initiatives.published}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">ملغية</span>
                    <span className="font-medium text-red-600">
                      {stats.initiatives.cancelled}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Organizations Tab */}
        <TabsContent value="organizations" className="space-y-6" dir="rtl">
          <div className="flex-center-column mt-6 mb-6 flex-wrap gap-4 sm:justify-between">
            <div className="flex-center max-w-full gap-4 max-sm:flex-wrap sm:justify-center">
              <SearchInput
                value={orgFilters.search}
                onChange={(value) =>
                  setOrgFilters((prev) => ({
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
              className="grid w-fit grid-cols-1 gap-4 md:grid-cols-2"
              dir="rtl"
            >
              <FilterSelect
                value={orgFilters.status}
                onChange={(value) =>
                  setOrgFilters((prev) => ({ ...prev, status: value }))
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
                value={orgFilters.organizationType}
                onChange={(value) =>
                  setOrgFilters((prev) => ({
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
            {isLoading ? (
              <Loader2 className="mx-auto h-6 w-6 animate-spin text-gray-500" />
            ) : organizations.length > 0 ? (
              <>
                {organizations.map((org) => (
                  <Card key={org.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-start justify-between">
                        <div className="flex-1">
                          <Link
                            href={`/admin/organizations/${org.id}`}
                            target="_blank"
                            className="flex items-center"
                          >
                            <ArrowUpRight className="ml-1 inline-block h-4 w-4 text-gray-500" />
                            <h3 className="text-lg font-semibold text-gray-900 hover:underline">
                              {org.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-gray-600">
                            {org.shortName}
                          </p>
                          <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
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
                          <AdminOrganizationStatusBadge
                            status={org.isVerified}
                          />
                          <span className="text-sm text-gray-500">
                            {org._count.initiatives} مبادرة
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">المالك:</span>{" "}
                          {org.owner.name} ({org.owner.email})
                        </div>

                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedOrg(org)}
                              >
                                <Eye className="ml-1 h-4 w-4" />
                                عرض التفاصيل
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>تفاصيل المنظمة</DialogTitle>
                              </DialogHeader>
                              {selectedOrg && (
                                <div className="space-y-4" dir="rtl">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="font-medium">
                                        اسم المنظمة:
                                      </label>
                                      <p>{selectedOrg.name}</p>
                                    </div>
                                    <div>
                                      <label className="font-medium">
                                        الاسم المختصر:
                                      </label>
                                      <p>
                                        {selectedOrg.shortName || "غير متوفر"}
                                      </p>
                                    </div>
                                    <div>
                                      <label className="font-medium">
                                        البريد الإلكتروني:
                                      </label>
                                      <p>{selectedOrg.contactEmail}</p>
                                    </div>
                                    <div>
                                      <label className="font-medium">
                                        رقم الهاتف:
                                      </label>
                                      <p>
                                        {selectedOrg.contactPhone ||
                                          "غير متوفر"}
                                      </p>
                                    </div>
                                    <div>
                                      <label className="font-medium">
                                        نوع المنظمة:
                                      </label>
                                      <p>{selectedOrg.organizationType}</p>
                                    </div>
                                    <div>
                                      <label className="font-medium">
                                        الموقع:
                                      </label>
                                      <p>
                                        {selectedOrg.city},{" "}
                                        {selectedOrg.country}
                                      </p>
                                    </div>
                                  </div>

                                  <div>
                                    <label className="font-medium">
                                      معلومات المالك:
                                    </label>
                                    <div className="mt-1 rounded bg-gray-50 p-3">
                                      <p>
                                        <strong>الاسم:</strong>{" "}
                                        {selectedOrg.owner.name}
                                      </p>
                                      <p>
                                        <strong>البريد:</strong>{" "}
                                        {selectedOrg.owner.email}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex justify-center gap-4 pt-4">
                                    {selectedOrg.isVerified === "pending" && (
                                      <>
                                        <Button
                                          onClick={() =>
                                            handleStatusUpdate(
                                              selectedOrg.id,
                                              "approved",
                                              "organization",
                                            )
                                          }
                                          disabled={isLoading}
                                          className="bg-green-600 hover:bg-green-700"
                                        >
                                          <CheckCircle className="ml-1 h-4 w-4" />
                                          قبول المنظمة
                                        </Button>
                                        <Button
                                          onClick={() =>
                                            handleStatusUpdate(
                                              selectedOrg.id,
                                              "rejected",
                                              "organization",
                                            )
                                          }
                                          disabled={isLoading}
                                          variant="destructive"
                                        >
                                          <XCircle className="ml-1 h-4 w-4" />
                                          رفض المنظمة
                                        </Button>
                                      </>
                                    )}
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>

                          {org.isVerified === "pending" && (
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                onClick={() =>
                                  handleStatusUpdate(
                                    org.id,
                                    "approved",
                                    "organization",
                                  )
                                }
                                disabled={isLoading}
                                className="bg-green-600 px-2 text-xs hover:bg-green-700"
                              >
                                قبول
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() =>
                                  handleStatusUpdate(
                                    org.id,
                                    "rejected",
                                    "organization",
                                  )
                                }
                                disabled={isLoading}
                                className="px-2 text-xs"
                              >
                                رفض
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <div className="w-full" dir="rtl">
                  <AppButton
                    type="outline"
                    url="/admin/organizations"
                    className="mx-auto"
                    border="default"
                    icon={<ArrowUpLeft className="ml-1 h-4 w-4" />}
                  >
                    عرض المزيد
                  </AppButton>
                </div>
              </>
            ) : (
              <p className="text-center text-gray-500">لا توجد منظمات لعرضها</p>
            )}
          </div>
        </TabsContent>

        {/* Initiatives Tab */}
        <TabsContent value="initiatives" className="space-y-6" dir="rtl">
          <Alert className="mt-6" dir="rtl">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              هذه الصفحة تعرض فقط المبادرات المنشأة من قبل المستخدمين العاديين
              والتي تحتاج لموافقة المسؤول قبل النشر.
            </AlertDescription>
          </Alert>

          {/* Filters */}
          <div className="flex-center-column mt-6 mb-6 flex-wrap gap-4 sm:justify-between">
            <div className="flex-center max-w-full gap-4 max-sm:flex-wrap sm:justify-center">
              <SearchInput
                value={initiativeFilters.search}
                onChange={(value) =>
                  setInitiativeFilters((prev) => ({
                    ...prev,
                    search: value,
                  }))
                }
                placeholder="البحث عن مبادرة..."
                className="w-full"
              />
            </div>
            <FilterSelect
              value={initiativeFilters.status}
              onChange={(value) =>
                setInitiativeFilters((prev) => ({ ...prev, status: value }))
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
            {isLoading ? (
              <Loader2 className="mx-auto h-6 w-6 animate-spin text-gray-500" />
            ) : organizations.length > 0 ? (
              <>
                {initiatives.map((initiative) => (
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
                          <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {initiative.city}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(
                                initiative.startDate,
                              ).toLocaleDateString("ar")}{" "}
                              -{" "}
                              {new Date(initiative.endDate).toLocaleDateString(
                                "ar",
                              )}
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
                          {initiative.organizerUser?.name || "غير محدد"} (
                          {initiative.organizerUser?.email || ""})
                        </div>

                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  setSelectedInitiative(initiative)
                                }
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
                                      <label className="font-medium">
                                        عنوان المبادرة:
                                      </label>
                                      <p>{selectedInitiative.titleAr}</p>
                                    </div>
                                    <div>
                                      <label className="font-medium">
                                        العنوان بالإنجليزية:
                                      </label>
                                      <p>
                                        {selectedInitiative.titleEn ||
                                          "غير متوفر"}
                                      </p>
                                    </div>
                                    <div>
                                      <label className="font-medium">
                                        الفئة:
                                      </label>
                                      <p>
                                        {selectedInitiative.category.nameAr}
                                      </p>
                                    </div>
                                    <div>
                                      <label className="font-medium">
                                        المدينة:
                                      </label>
                                      <p>{selectedInitiative.city}</p>
                                    </div>
                                    <div>
                                      <label className="font-medium">
                                        تاريخ البدء:
                                      </label>
                                      <p>
                                        {new Date(
                                          selectedInitiative.startDate,
                                        ).toLocaleDateString("ar")}
                                      </p>
                                    </div>
                                    <div>
                                      <label className="font-medium">
                                        تاريخ الانتهاء:
                                      </label>
                                      <p>
                                        {new Date(
                                          selectedInitiative.endDate,
                                        ).toLocaleDateString("ar")}
                                      </p>
                                    </div>
                                  </div>

                                  <div>
                                    <label className="font-medium">
                                      معلومات المنظم:
                                    </label>
                                    <div className="mt-1 rounded bg-gray-50 p-3">
                                      <p>
                                        <strong>الاسم:</strong>{" "}
                                        {selectedInitiative.organizerUser
                                          ?.name || "غير محدد"}
                                      </p>
                                      <p>
                                        <strong>البريد:</strong>{" "}
                                        {selectedInitiative.organizerUser
                                          ?.email || "غير محدد"}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex justify-center gap-4 pt-4">
                                    {selectedInitiative.status === "draft" && (
                                      <>
                                        <Button
                                          onClick={() =>
                                            handleStatusUpdate(
                                              selectedInitiative.id,
                                              "published",
                                              "initiative",
                                            )
                                          }
                                          disabled={isLoading}
                                          className="bg-green-600 hover:bg-green-700"
                                        >
                                          <CheckCircle className="ml-1 h-4 w-4" />
                                          نشر المبادرة
                                        </Button>
                                        <Button
                                          onClick={() =>
                                            handleStatusUpdate(
                                              selectedInitiative.id,
                                              "cancelled",
                                              "initiative",
                                            )
                                          }
                                          disabled={isLoading}
                                          variant="destructive"
                                        >
                                          <XCircle className="ml-1 h-4 w-4" />
                                          إلغاء المبادرة
                                        </Button>
                                      </>
                                    )}
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>

                          {initiative.status === "draft" && (
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                onClick={() =>
                                  handleStatusUpdate(
                                    initiative.id,
                                    "published",
                                    "initiative",
                                  )
                                }
                                disabled={isLoading}
                                className="bg-green-600 px-2 text-xs hover:bg-green-700"
                              >
                                نشر
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() =>
                                  handleStatusUpdate(
                                    initiative.id,
                                    "cancelled",
                                    "initiative",
                                  )
                                }
                                disabled={isLoading}
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
                ))}
                <div className="w-full" dir="rtl">
                  <AppButton
                    type="outline"
                    url="/admin/initiatives"
                    className="mx-auto"
                    border="default"
                    icon={<ArrowUpLeft className="ml-1 h-4 w-4" />}
                  >
                    عرض المزيد
                  </AppButton>
                </div>
              </>
            ) : (
              <p className="text-center text-gray-500">
                لا توجد مبادرات لعرضها
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
