import { cn } from "@/lib/utils";
import { InitiativeCategory } from "@prisma/client";
import React from "react";
import { Badge } from "../ui/badge";

type CategoryBadgeProps = Pick<
  InitiativeCategory,
  "nameAr" | "bgColor" | "textColor"
>;

export default function CategoryBadge({
  nameAr: categoryName,
  bgColor,
  textColor,
}: CategoryBadgeProps) {
  return (
    <Badge
      className={cn(
        "border-secondary-600 rounded-full border px-3 py-1 text-sm font-medium",
        bgColor === undefined && "bg-transparent",
        textColor === undefined && "text-secondary-600",
      )}
      style={{
        backgroundColor: bgColor ?? "transparent",
        color: textColor ?? "inherit",
      }}
    >
      {categoryName}
    </Badge>
  );
}
