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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof onChange === "function") {
      onChange(value);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="w-full mb-2">
      <div className={cn("relative", className)} dir={dir}>
        <button
          type="submit"
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-neutrals-400 hover:text-primary-500"
        >
          <Search className="h-5 w-5" />
        </button>
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="pl-10 pr-4 py-3 w-full border border-neutrals-300 rounded-lg bg-white text-neutrals-700 placeholder-neutrals-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          dir={dir}
        />
      </div>
    </form>
  );
}
