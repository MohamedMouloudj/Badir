"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  dir?: "ltr" | "rtl";
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "البحث...",
  className,
  dir = "rtl",
}: SearchInputProps) {
  return (
    <div className={cn("relative", className)} dir={dir}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-5 h-5 text-neutrals-400" />
      </div>
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-10 pr-4 py-3 w-full border border-neutrals-300 rounded-lg bg-white text-neutrals-700 placeholder-neutrals-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
        dir={dir}
      />
    </div>
  );
}
