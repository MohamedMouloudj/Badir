import React from "react";
import { Badge } from "../ui/badge";
import { InitiativeStatus } from "@prisma/client";
import { cn } from "@/lib/utils";

export default function AvailabilityBadge({
  initiativeStatus,
  isAvailable = true,
  isCompleted = false,
  isOngoing = false,
  isCancelled = false,
}: {
  initiativeStatus: InitiativeStatus;
  isAvailable?: boolean;
  isCompleted?: boolean;
  isOngoing?: boolean;
  isCancelled?: boolean;
}) {
  const getStatusInfo = () => {
    if (isCancelled) {
      return {
        label: "ملغي",
        className: "bg-state-error text-neutrals-700",
      };
    }
    if (!isAvailable) {
      return {
        label: "غير متاح",
        className: "bg-state-error text-neutrals-700",
      };
    }

    // Next check actual statuses in priority order
    if (isCompleted) {
      return {
        label: "مكتمل",
        className: "bg-neutrals-300 text-neutrals-600",
      };
    }

    if (isOngoing) {
      return {
        label: "جاري",
        className: "bg-state-warning text-yellow-700",
      };
    }

    // Finally, check the enum status
    switch (initiativeStatus) {
      case InitiativeStatus.published:
        return {
          label: "متاح",
          className: "bg-state-success text-secondary-700",
        };
      case InitiativeStatus.draft:
        return {
          label: "مسودة",
          className: "bg-neutrals-400 text-neutrals-700",
        };
      case InitiativeStatus.cancelled:
        return {
          label: "ملغي",
          className: "bg-state-error text-neutrals-700",
        };
      default:
        return {
          label: "غير معروف",
          className: "bg-neutrals-200 text-neutrals-700",
        };
    }
  };

  const { label, className } = getStatusInfo();

  return (
    <Badge
      className={cn("rounded-full text-sm font-medium py-1 px-3", className)}
    >
      {label}
    </Badge>
  );
}
