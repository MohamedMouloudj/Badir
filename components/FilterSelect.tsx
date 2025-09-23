"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface FilterSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{
    value: string;
    label: string;
  }>;
  placeholder?: string;
  className?: string;
  dir?: "ltr" | "rtl";
}

/**
 * FilterSelect component for selecting a filter option.
 * @param param0 - Props for the FilterSelect component.
 * @param value - The currently selected value.
 * @param onChange - Callback function when the value changes.
 * @param options - Array of options to select from.
 * @param placeholder - Placeholder text when no option is selected.
 * @param className - Additional CSS classes for styling.
 * @param dir - Direction of the select component, either 'ltr' or 'rtl'. Default is 'rtl'.
 * @returns JSX.Element
 */

export default function FilterSelect({
  value,
  onChange,
  options,
  placeholder = "اختر فلتر...",
  className,
  dir = "rtl",
}: FilterSelectProps) {
  return (
    <div className="flex-center-column items-start gap-2 w-full">
      <span className="text-label text-neutrals-600">{placeholder}</span>
      <Select value={value || ""} onValueChange={onChange} dir={dir}>
        <SelectTrigger
          className={cn(
            "w-full border border-neutrals-300 rounded-lg bg-white text-neutrals-700 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors h-12",
            className
          )}
        >
          <SelectValue placeholder={placeholder || "اختر"} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
