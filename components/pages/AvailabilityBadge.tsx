import React from "react";
import { Badge } from "../ui/badge";

export default function AvailabilityBadge({
  isAvailable,
}: {
  isAvailable: boolean;
}) {
  return (
    <Badge
      className={`rounded-full text-sm font-medium py-1 px-3 ${
        isAvailable
          ? "bg-state-success text-secondary-700"
          : "bg-state-error text-neutrals-700"
      }`}
    >
      {isAvailable ? "متاح" : "غير متاح"}
    </Badge>
  );
}
