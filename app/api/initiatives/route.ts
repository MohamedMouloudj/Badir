import { NextRequest, NextResponse } from "next/server";
import { InitiativeService, InitiativeFilters } from "@/services/initiatives";
import {
  InitiativeStatus,
  OrganizerType,
  TargetAudience,
} from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");

    // filter parameters
    const filters: InitiativeFilters = {};

    const search = searchParams.get("search");
    if (search) filters.search = search;

    const categoryId = searchParams.get("categoryId");
    if (categoryId) filters.categoryId = categoryId;

    const city = searchParams.get("city");
    if (city) filters.city = city;

    const status = searchParams.get("status");
    if (status) filters.status = status as InitiativeStatus;

    const targetAudience = searchParams.get("targetAudience");
    if (targetAudience)
      filters.targetAudience = targetAudience as TargetAudience;

    const organizerType = searchParams.get("organizerType");
    if (organizerType) filters.organizerType = organizerType as OrganizerType;

    const hasAvailableSpots = searchParams.get("hasAvailableSpots");
    if (hasAvailableSpots === "true") filters.hasAvailableSpots = true;

    const startDateFrom = searchParams.get("startDateFrom");
    if (startDateFrom) filters.startDateFrom = new Date(startDateFrom);

    const startDateTo = searchParams.get("startDateTo");
    if (startDateTo) filters.startDateTo = new Date(startDateTo);

    const endDateFrom = searchParams.get("endDateFrom");
    if (endDateFrom) filters.endDateFrom = new Date(endDateFrom);

    const endDateTo = searchParams.get("endDateTo");
    if (endDateTo) filters.endDateTo = new Date(endDateTo);

    // Fetch initiatives
    const result = await InitiativeService.getMany(filters, { page, limit });

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch initiatives",
      },
      { status: 500 }
    );
  }
}
