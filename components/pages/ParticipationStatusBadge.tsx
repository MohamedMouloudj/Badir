import React from "react";
import { Badge } from "../ui/badge";
import { ParticipationStatus } from "@prisma/client";
import { cn } from "@/lib/utils";

export default function ParticipationStatusBadge({
  status,
  className,
}: {
  status: ParticipationStatus;
  className?: string;
}) {
  /**
   *  Determine status info based on the participation status
   */
  const getStatusInfo = () => {
    switch (status) {
      case ParticipationStatus.approved:
        return {
          label: "تمت الموافقة",
          className: "bg-state-success text-secondary-700",
        };
      case ParticipationStatus.rejected:
        return {
          label: "مرفوض",
          className: "bg-neutrals-300 text-neutrals-600",
        };
      case ParticipationStatus.kicked:
        return {
          label: "مطرود",
          className: "bg-state-error text-neutrals-700",
        };
      case ParticipationStatus.registered:
      default:
        return {
          label: "قيد المراجعة",
          className: "bg-state-warning text-yellow-700",
        };
    }
  };

  const { label, className: statusClassName } = getStatusInfo();

  return (
    <Badge
      className={cn(
        "rounded-full text-sm font-medium py-1 px-3",
        statusClassName,
        className
      )}
    >
      {label}
    </Badge>
  );
}
