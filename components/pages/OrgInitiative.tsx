import { MapPin } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../ui/card";
import CategoryBadge from "./CategoryBadge";
import Ratings from "../Ratings";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { InitiativeWithAvgRating } from "@/services/initiatives";

export default function OrgInitiative({
  initiative,
}: {
  initiative: InitiativeWithAvgRating;
}) {
  const {
    category,
    titleAr,
    startDate,
    endDate,
    city,
    avgRating,
    _count: { participants },
  } = initiative;

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleDateString("ar-DZ", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Card
      className="w-full max-w-2xl h-full mx-auto bg-neutrals-100 border-2 border-secondary-700 rounded-xl p-4 md:p-6 shadow-md"
      dir="rtl"
    >
      <CardContent className="p-0 flex-center-column justify-between h-full gap-2">
        {/* Header with badges */}
        <div className="flex justify-between items-start gap-1">
          <CategoryBadge
            nameAr={category.nameAr}
            bgColor={category.bgColor ?? "transparent"}
            textColor={category.textColor ?? "inherit"}
          />
        </div>

        {/* Title and Date - Responsive Layout */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-4">
          {/* Title */}
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-neutrals-700 leading-tight flex-1">
            {titleAr}
          </h3>

          {/* Date */}
          <div className="text-neutrals-700 text-sm md:text-base flex-wrap lg:border-r-2 lg:border-secondary-700 lg:pr-4">
            <span className="font-semibold">{formatDate(startDate)}</span>
            <span className="mx-2">إلى</span>
            <span className="font-semibold">{formatDate(endDate)}</span>
          </div>
        </div>

        {/* Location and participants */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-neutrals-500 text-sm md:text-base">
            المشاركون: {participants}
          </p>
        </div>

        {/* Organizer */}
        <div className="flex-center justify-between w-full mt-2 gap-4">
          <div className="flex items-center gap-2 text-neutrals-600 text-sm md:text-base">
            <div className="flex-center size-fit p-0.5 bg-primary-500 rounded-full">
              <MapPin className="w-5 h-5 md:w-5 md:h-5 text-neutrals-100" />
            </div>
            <span>{city}</span>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-pointer">
                  <Ratings
                    value={avgRating ?? 0}
                    readOnly
                    allowHalf
                    size="sm"
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                {avgRating
                  ? `التقييم: ${avgRating} من 5`
                  : "هذه المبادرة ليس لها تقييم حتى الآن"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
}
