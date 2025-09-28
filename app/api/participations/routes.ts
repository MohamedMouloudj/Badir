import { ParticipationService } from "@/services/participations";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId");
    if (!userId) {
      const allParticipations = await ParticipationService.getAll();
      return NextResponse.json({ success: true, data: allParticipations });
    }
    const userParticipations = await ParticipationService.getUserParticipations(
      userId
    );
    return NextResponse.json({ success: true, data: userParticipations });
  } catch (error) {
    console.error("Error fetching participations:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch participations" },
      { status: 500 }
    );
  }
}
