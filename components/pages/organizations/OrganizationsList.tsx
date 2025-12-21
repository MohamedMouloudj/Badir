"use client";
import { useState } from "react";
import {
  OrganizationCard as OrganizationCardType,
  OrganizationService,
} from "@/services/organizations";
import OrganizationCard from "@/components/pages/OrganizationCard";
import PaginationControls from "@/components/PaginationControls";
import SearchInput from "@/components/SearchInput";
import api from "@/services/api";
import { PaginatedResponse } from "@/types/Pagination";
import { Loader2 } from "lucide-react";

export default function OrganizationsList({
  initialData,
}: {
  initialData: PaginatedResponse<OrganizationCardType>;
}) {
  const [organizations, setOrganizations] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchOrganizations = async (searchTerm: string, page: number = 1) => {
    setLoading(true);
    const params = new URLSearchParams();
    if (searchTerm) params.append("search", searchTerm);
    params.append("page", page.toString());
    params.append("limit", "12");
    const response = await api.get(
      `${OrganizationService.API_PATH}?${params.toString()}`,
    );
    const data = response.data;
    if (data.success) setOrganizations(data.data);
    setLoading(false);
  };

  const handleSearch = (searchTerm: string) => {
    setSearch(searchTerm);
    fetchOrganizations(searchTerm, 1);
  };

  const handlePageChange = (page: number) => {
    fetchOrganizations(search, page);
  };

  return (
    <div className="bg-neutrals-100 min-h-screen" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        <div className="flex-center-column mb-8 items-center text-center">
          <h1 className="text-primary-md text-neutrals-700 mb-4 font-bold">
            المنظمات الشريكة
          </h1>
          <p className="section-description text-center">
            تعرف على المنظمات التي تقود التغيير الإيجابي في مجتمعنا
          </p>
        </div>
        <div className="mx-auto mb-4 max-w-lg">
          <SearchInput
            value={search}
            onChange={handleSearch}
            placeholder="ابحث عن منظمة..."
            className="w-full"
          />
          <div className="relative h-6">
            {loading && (
              <div className="text-neutrals-500 absolute inset-0 flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>جاري التحميل...</span>
              </div>
            )}
          </div>
        </div>
        {organizations.data.length === 0 && !loading ? (
          <div className="text-neutrals-500 mt-16 text-center">
            لا توجد منظمات مطابقة لبحثك.
          </div>
        ) : (
          <div className="mx-auto mb-8 grid max-w-full grid-cols-1 gap-6 sm:max-w-3/4 md:grid-cols-2">
            {organizations.data.map((org) => (
              <OrganizationCard key={org.id} org={org} />
            ))}
          </div>
        )}
        {organizations.pagination.totalPages > 1 && (
          <PaginationControls
            currentPage={organizations.pagination.page}
            totalPages={organizations.pagination.totalPages}
            hasNext={organizations.pagination.hasNext}
            hasPrev={organizations.pagination.hasPrev}
            onPageChange={handlePageChange}
            className="mt-8"
          />
        )}
      </div>
    </div>
  );
}
