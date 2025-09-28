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
} from "lucide-react";
import {
  AdminOrganizationCard,
  AdminInitiativeCard,
  AdminService,
} from "@/services/admin";

type AdminStatsType = Awaited<ReturnType<typeof AdminService.getAdminStats>>;

interface AdminDashboardProps {
  initialStats?: AdminStatsType;
}

const AdminDashboard = ({ initialStats }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState<AdminStatsType>(
    initialStats || {
      organizations: { pending: 0, approved: 0, rejected: 0, total: 0 },
      initiatives: { draft: 0, published: 0, cancelled: 0, total: 0 },
    }
  );

  // Organizations state
  const [organizations, setOrganizations] = useState<AdminOrganizationCard[]>(
    []
  );
  const [orgFilters, setOrgFilters] = useState({
    status: "all",
    search: "",
    organizationType: "all",
  });
  const [selectedOrg, setSelectedOrg] = useState<AdminOrganizationCard | null>(
    null
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
  const [error, setError] = useState<string | null>(null);

  // Mock data for demonstration
  useEffect(() => {
    // Load mock data - replace with actual API calls
    setOrganizations([
      {
        id: "1",
        userId: "user1",
        name: "جمعية الخير للتنمية المجتمعية",
        shortName: "جمعية الخير",
        description: "منظمة خيرية تهدف للتنمية المجتمعية",
        logo: null,
        contactEmail: "info@khair.org",
        contactPhone: "+213 555 123 456",
        website: null,
        city: "الجزائر",
        state: "الجزائر",
        country: "الجزائر",
        createdAt: new Date("2024-01-15T10:00:00Z"),
        updatedAt: new Date(),
        foundingDate: new Date("2020-01-01"),
        headquarters: "الجزائر العاصمة",
        identificationCard: null,
        membersCount: 50,
        officialLicense: null,
        organizationType: "خيرية",
        previousInitiatives: null,
        socialLinks: {},
        userRole: "رئيس المنظمة",
        workAreas: ["التعليم", "الصحة"],
        isVerified: "pending" as const,
        owner: {
          id: "user1",
          name: "أحمد محمد",
          email: "ahmed@example.com",
          phone: "+213 555 111 222",
        },
        _count: { initiatives: 3 },
      } as AdminOrganizationCard,
    ]);

    setInitiatives([
      {
        id: "1",
        organizerType: "user" as const,
        organizerUserId: "user3",
        organizerOrgId: null,
        categoryId: "cat1",
        titleAr: "حملة تشجير الأحياء السكنية",
        titleEn: "Neighborhood Tree Planting Campaign",
        descriptionAr: "حملة لتشجير الأحياء السكنية وتحسين البيئة",
        descriptionEn: null,
        shortDescriptionAr: "حملة تشجير للأحياء السكنية",
        shortDescriptionEn: null,
        location: "حي السلام، الجزائر",
        city: "الجزائر",
        state: "الجزائر",
        country: "الجزائر",
        startDate: new Date("2024-03-01"),
        endDate: new Date("2024-03-15"),
        registrationDeadline: new Date("2024-02-25"),
        maxParticipants: 100,
        currentParticipants: 25,
        isOpenParticipation: true,
        targetAudience: "both" as const,
        requiredQualifications: null,
        status: "draft" as const,
        coverImage: null,
        createdAt: new Date("2024-01-20T14:00:00Z"),
        updatedAt: new Date(),
        participationQstForm: null,
        category: {
          nameAr: "البيئة",
          nameEn: "Environment",
        },
        organizerUser: {
          id: "user3",
          name: "عمر خالد",
          email: "omar@example.com",
        },
        _count: { participants: 25 },
      } as AdminInitiativeCard,
    ]);
  }, []);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: {
        label: "قيد المراجعة",
        variant: "secondary" as const,
        icon: Clock,
      },
      approved: {
        label: "مقبول",
        variant: "default" as const,
        icon: CheckCircle,
      },
      rejected: {
        label: "مرفوض",
        variant: "destructive" as const,
        icon: XCircle,
      },
      draft: { label: "مسودة", variant: "secondary" as const, icon: FileText },
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
    status: string,
    type: "organization" | "initiative"
  ) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (type === "organization") {
        setOrganizations((prev) =>
          prev.map((org) =>
            org.id === id
              ? { ...org, isVerified: status as "approved" | "rejected" }
              : org
          )
        );
      } else {
        setInitiatives((prev) =>
          prev.map((init) =>
            init.id === id
              ? { ...init, status: status as "published" | "cancelled" }
              : init
          )
        );
      }
    } catch (error) {
      setError("حدث خطأ أثناء تحديث الحالة");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto" dir="rtl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
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
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {stats.organizations.pending}
                </div>
                <p className="text-xs text-muted-foreground">تحتاج لمراجعة</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  المنظمات المقبولة
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {stats.organizations.approved}
                </div>
                <p className="text-xs text-muted-foreground">تم قبولها</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  المبادرات قيد المراجعة
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {stats.initiatives.draft}
                </div>
                <p className="text-xs text-muted-foreground">تحتاج لمراجعة</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  المبادرات المنشورة
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {stats.initiatives.published}
                </div>
                <p className="text-xs text-muted-foreground">تم نشرها</p>
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
        <TabsContent value="organizations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                إدارة المنظمات
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex gap-4 mb-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  <Input
                    placeholder="البحث عن منظمة..."
                    value={orgFilters.search}
                    onChange={(e) =>
                      setOrgFilters((prev) => ({
                        ...prev,
                        search: e.target.value,
                      }))
                    }
                    className="w-64"
                  />
                </div>

                <Select
                  value={orgFilters.status}
                  onValueChange={(value) =>
                    setOrgFilters((prev) => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الحالات</SelectItem>
                    <SelectItem value="pending">قيد المراجعة</SelectItem>
                    <SelectItem value="approved">مقبولة</SelectItem>
                    <SelectItem value="rejected">مرفوضة</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={orgFilters.organizationType}
                  onValueChange={(value) =>
                    setOrgFilters((prev) => ({
                      ...prev,
                      organizationType: value,
                    }))
                  }
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="النوع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الأنواع</SelectItem>
                    <SelectItem value="خيرية">خيرية</SelectItem>
                    <SelectItem value="تنموية">تنموية</SelectItem>
                    <SelectItem value="تعليمية">تعليمية</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Organizations List */}
              <div className="space-y-4">
                {organizations.map((org) => (
                  <Card key={org.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {org.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {org.shortName}
                          </p>
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
                          {getStatusBadge(org.isVerified)}
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
                                <Eye className="h-4 w-4 ml-1" />
                                عرض التفاصيل
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
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
                                    <div className="bg-gray-50 p-3 rounded mt-1">
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
                                              "organization"
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
                                            handleStatusUpdate(
                                              selectedOrg.id,
                                              "rejected",
                                              "organization"
                                            )
                                          }
                                          disabled={isLoading}
                                          variant="destructive"
                                        >
                                          <XCircle className="h-4 w-4 ml-1" />
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
                                    "organization"
                                  )
                                }
                                disabled={isLoading}
                                className="bg-green-600 hover:bg-green-700 text-xs px-2"
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
                                    "organization"
                                  )
                                }
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
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Initiatives Tab */}
        <TabsContent value="initiatives" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                إدارة مبادرات المستخدمين
              </CardTitle>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  هذه الصفحة تعرض فقط المبادرات المنشأة من قبل المستخدمين
                  العاديين والتي تحتاج لموافقة المسؤول قبل النشر.
                </AlertDescription>
              </Alert>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex gap-4 mb-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  <Input
                    placeholder="البحث عن مبادرة..."
                    value={initiativeFilters.search}
                    onChange={(e) =>
                      setInitiativeFilters((prev) => ({
                        ...prev,
                        search: e.target.value,
                      }))
                    }
                    className="w-64"
                  />
                </div>

                <Select
                  value={initiativeFilters.status}
                  onValueChange={(value) =>
                    setInitiativeFilters((prev) => ({ ...prev, status: value }))
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
                {initiatives.map((initiative) => (
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
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {initiative.city}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(
                                initiative.startDate
                              ).toLocaleDateString("ar")}{" "}
                              -{" "}
                              {new Date(initiative.endDate).toLocaleDateString(
                                "ar"
                              )}
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
                                          selectedInitiative.startDate
                                        ).toLocaleDateString("ar")}
                                      </p>
                                    </div>
                                    <div>
                                      <label className="font-medium">
                                        تاريخ الانتهاء:
                                      </label>
                                      <p>
                                        {new Date(
                                          selectedInitiative.endDate
                                        ).toLocaleDateString("ar")}
                                      </p>
                                    </div>
                                  </div>

                                  <div>
                                    <label className="font-medium">
                                      معلومات المنظم:
                                    </label>
                                    <div className="bg-gray-50 p-3 rounded mt-1">
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
                                              "initiative"
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
                                            handleStatusUpdate(
                                              selectedInitiative.id,
                                              "cancelled",
                                              "initiative"
                                            )
                                          }
                                          disabled={isLoading}
                                          variant="destructive"
                                        >
                                          <XCircle className="h-4 w-4 ml-1" />
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
                                    "initiative"
                                  )
                                }
                                disabled={isLoading}
                                className="bg-green-600 hover:bg-green-700 text-xs px-2"
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
                                    "initiative"
                                  )
                                }
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
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default AdminDashboard;
