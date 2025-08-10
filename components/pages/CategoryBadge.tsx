import { cn } from "@/lib/utils";
import { InitiativeCategory } from "@/types";
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
        "rounded-full text-sm font-medium py-1 px-3 border border-secondary-600",
        bgColor === undefined && "bg-transparent",
        textColor === undefined && "text-secondary-600"
      )}
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      {categoryName}
    </Badge>
  );
}
