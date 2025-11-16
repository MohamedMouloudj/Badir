"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import AppButton from "./AppButton";

export default function BackButton() {
  const router = useRouter();

  return (
    <AppButton
      type="outline"
      onClick={() => router.back()}
      icon={<ChevronLeft className="h-4 w-4" />}
      size="sm"
      border="default"
    >
      العودة
    </AppButton>
  );
}
