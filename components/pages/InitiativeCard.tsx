import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpLeft, MapPin } from "lucide-react";
import { InitiativeCard as InitiativeCardType } from "@/services/initiatives";
import AppButton from "../AppButton";
import AvailabilityBadge from "./AvailabilityBadge";
import Image from "next/image";
import CategoryBadge from "./CategoryBadge";

export default function InitiativeCard({
  initiative,
}: {
  initiative: InitiativeCardType;
}) {
  const {
    category,
    titleAr,
    shortDescriptionAr,
    startDate,
    endDate,
    city,
    currentParticipants,
    maxParticipants,
    organizer,
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
        <div className="flex justify-between items-start">
          <CategoryBadge
            nameAr={category.nameAr}
            bgColor={category.bgColor ?? "transparent"}
            textColor={category.textColor ?? "inherit"}
          />
          <AvailabilityBadge
            isAvailable={
              !maxParticipants || currentParticipants < maxParticipants
            }
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

        {/* Description */}
        {shortDescriptionAr && (
          <p className="text-sm md:text-base text-neutrals-500 leading-relaxed">
            {shortDescriptionAr}
          </p>
        )}

        {/* Location and participants */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-2 text-neutrals-600 text-sm md:text-base">
            <div className="flex-center size-fit p-0.5 bg-primary-500 rounded-full">
              <MapPin className="w-5 h-5 md:w-5 md:h-5 text-neutrals-100" />
            </div>
            <span>{city}</span>
          </div>

          <div className="flex items-center gap-2 text-neutrals-600 text-sm md:text-base">
            <Image
              src="/images/icons/group.svg"
              alt="عدد المشاركين"
              width={24}
              height={24}
            />
            <span>
              {currentParticipants} \ {maxParticipants} متطوع
            </span>
          </div>
        </div>

        {/* Organizer */}
        <div className="text-neutrals-500 text-sm md:text-base">
          نُظِّمت بواسطة:{" "}
          <span className="font-medium text-neutrals-600">
            {organizer.name}
          </span>
        </div>

        {/* Action button */}
        <div className="flex justify-center pt-4 justify-self-end">
          <AppButton
            type="outline"
            corner="rounded"
            size="md"
            icon={<ArrowUpLeft />}
            className="w-full sm:w-auto"
          >
            انضم للمبادرة
          </AppButton>
        </div>
      </CardContent>
    </Card>
  );
}
