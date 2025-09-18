"use client";

import { useMemo, useState } from "react";
import {
  InitiativeCard as InitiativeCardType,
  InitiativeFilters,
  InitiativeService,
} from "@/services/initiatives";
import { CategoryCard } from "@/services/categories";
import InitiativeCard from "@/components/pages/InitiativeCard";
import SearchInput from "@/components/SearchInput";
import FilterSelect from "@/components/FilterSelect";
import PaginationControls from "@/components/PaginationControls";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import api from "@/services/api";
import { Checkbox } from "@/components/ui/checkbox";
import { PaginatedResponse } from "@/types/Pagination";

interface InitiativesListProps {
  initialData: PaginatedResponse<InitiativeCardType>;
  categories: CategoryCard[];
}

const targetAudienceOptions = [
  { value: "all", label: "جميع الفئات" },
  { value: "helpers", label: "متطوعون" },
  { value: "participants", label: "مستفيدون" },
  { value: "both", label: "كلاهما" },
];

const statusOptions = [
  { value: "all", label: "جميع الحالات" },
  { value: "published", label: "منشورة" },
  { value: "ongoing", label: "جارية" },
  { value: "completed", label: "مكتملة" },
];

const organizerTypeOptions = [
  { value: "all", label: "جميع المنظمين" },
  { value: "user", label: "أفراد" },
  { value: "organization", label: "منظمات" },
];

export default function InitiativesList({
  initialData,
  categories,
}: InitiativesListProps) {
  const [initiatives, setInitiatives] =
    useState<PaginatedResponse<InitiativeCardType>>(initialData);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<InitiativeFilters>({});

  const categoryOptions = useMemo(() => {
    return [
      { value: "all", label: "جميع الفئات" },
      ...categories.map((cat) => ({
        value: cat.id.toString(),
        label: cat.nameAr,
      })),
    ];
  }, [categories]);

  // Fetch initiatives with filters
  const fetchInitiatives = async (
    newFilters: InitiativeFilters,
    page: number = 1
  ) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      // Add filters to params
      if (newFilters.search) params.append("search", newFilters.search);
      if (newFilters.categoryId)
        params.append("categoryId", newFilters.categoryId.toString());
      if (newFilters.targetAudience)
        params.append("targetAudience", newFilters.targetAudience);
      if (newFilters.status) params.append("status", newFilters.status);
      if (newFilters.organizerType)
        params.append("organizerType", newFilters.organizerType);
      if (newFilters.hasAvailableSpots)
        params.append("hasAvailableSpots", "true");

      params.append("page", page.toString());
      params.append("limit", "12");

      const response = await api.get(
        `${InitiativeService.API_PATH}?${params.toString()}`
      );
      const data = response.data;

      if (data.success) {
        setInitiatives(data.data);
      }
    } catch (error) {
      console.error("Error fetching initiatives:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle filter changes
  const handleFilterChange = (key: keyof InitiativeFilters, value: string) => {
    const newFilters = { ...filters };

    if (value === "all" || value === "") {
      delete newFilters[key];
    } else {
      if (key === "categoryId") {
        newFilters[key] = value;
      } else if (key === "hasAvailableSpots") {
        newFilters[key] = value === "true";
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (newFilters as any)[key] = value;
      }
    }

    setFilters(newFilters);
    fetchInitiatives(newFilters, 1);
  };

  const handleSearch = (searchTerm: string) => {
    const newFilters = { ...filters };
    if (searchTerm.trim() === "") {
      delete newFilters.search;
    } else {
      newFilters.search = searchTerm.trim();
    }

    setFilters(newFilters);
    fetchInitiatives(newFilters, 1);
  };

  const handlePageChange = (page: number) => {
    fetchInitiatives(filters, page);
  };

  return (
    <div className="min-h-screen bg-neutrals-100" dir="rtl">
      <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-primary-md font-bold text-neutrals-700 mb-4">
            مبادراتنا الحالية
          </h1>
        </div>

        {/* Filters Section */}
        <Card className="mb-8 bg-transparent shadow-none border-none">
          <CardContent className="p-4">
            {/* Search */}
            <div className="max-w-full md:max-w-1/2 mb-4">
              <SearchInput
                value={filters.search || ""}
                onChange={handleSearch}
                placeholder="ابحث في المبادرات..."
                className="w-full"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Category Filter */}
              <FilterSelect
                value={filters.categoryId?.toString() || "all"}
                onChange={(value) => handleFilterChange("categoryId", value)}
                options={categoryOptions}
                placeholder="فئة المبادرة"
              />

              {/* Target Audience Filter */}
              <FilterSelect
                value={filters.targetAudience || "all"}
                onChange={(value) =>
                  handleFilterChange("targetAudience", value)
                }
                options={targetAudienceOptions}
                placeholder="الجمهور المستهدف"
              />

              {/* Status Filter */}
              <FilterSelect
                value={filters.status || "all"}
                onChange={(value) => handleFilterChange("status", value)}
                options={statusOptions}
                placeholder="حالة المبادرة"
              />

              {/* Organizer Type Filter */}
              <FilterSelect
                value={filters.organizerType || "all"}
                onChange={(value) => handleFilterChange("organizerType", value)}
                options={organizerTypeOptions}
                placeholder="نوع المنظم"
              />
            </div>

            {/* Additional Filters */}
            <div className="mt-4 flex flex-wrap gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  id="hasAvailableSpots"
                  name="hasAvailableSpots"
                  checked={filters.hasAvailableSpots || false}
                  onCheckedChange={(checked) =>
                    handleFilterChange(
                      "hasAvailableSpots",
                      checked ? "true" : ""
                    )
                  }
                  className="data-[state=checked]:bg-secondary-500 data-[state=checked]:border-secondary-500 border-neutrals-500"
                />
                <span className="text-sm text-neutrals-600">متاح للانضمام</span>
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-neutrals-600">
            <span className="font-medium">{initiatives.pagination.total}</span>{" "}
            {initiatives.data.length > 1 ? "مبادرات" : "مبادرة"}
            {filters.search && (
              <span className="mr-2">
                • نتائج البحث عن &quot;{filters.search}&quot;
              </span>
            )}
          </div>

          {loading && (
            <div className="flex items-center gap-2 text-neutrals-500">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>جاري التحميل...</span>
            </div>
          )}
        </div>

        {/* Initiatives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {initiatives.data.map((initiative) => (
            <div key={initiative.id} className="h-full">
              <InitiativeCard initiative={initiative} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {initiatives.data.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="mb-4">
              <div className="w-24 h-24 bg-neutrals-200 rounded-full mx-auto flex items-center justify-center">
                <span className="text-neutrals-400 text-2xl">🔍</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-neutrals-600 mb-2">
              لا توجد مبادرات
            </h3>
            <p className="text-neutrals-500">
              لم نتمكن من العثور على مبادرات تطابق المعايير المحددة
            </p>
          </div>
        )}

        {/* Pagination */}
        {initiatives.pagination.totalPages > 1 && (
          <PaginationControls
            currentPage={initiatives.pagination.page}
            totalPages={initiatives.pagination.totalPages}
            hasNext={initiatives.pagination.hasNext}
            hasPrev={initiatives.pagination.hasPrev}
            onPageChange={handlePageChange}
            className="mt-8"
          />
        )}
      </div>
    </div>
  );
}
