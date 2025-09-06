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
      `${OrganizationService.API_PATH}?${params.toString()}`
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
    <div className="min-h-screen bg-neutrals-100" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8 flex-center-column items-center">
          <h1 className="text-primary-md font-bold text-neutrals-700 mb-4">
            المنظمات الشريكة
          </h1>
          <p className="section-description text-center">
            تعرف على المنظمات التي تقود التغيير الإيجابي في مجتمعنا
          </p>
        </div>
        <div className="mb-6 max-w-lg mx-auto">
          <SearchInput
            value={search}
            onChange={handleSearch}
            placeholder="ابحث عن منظمة..."
            className="w-full"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 mx-auto max-w-full md:max-w-2/3 gap-6 mb-8">
          {organizations.data.map((org) => (
            <OrganizationCard key={org.id} org={org} />
          ))}
        </div>
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
