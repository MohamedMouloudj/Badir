import AppButton from "@/components/AppButton";
import InitiativeCard from "@/components/pages/InitiativeCard";
import { sampleInitiatives } from "@/data/statics";
import { ArrowUpLeft } from "lucide-react";
import React from "react";

export default function LastInitiatives() {
  return (
    <section className="flex-center-column items-center" dir="rtl">
      <h2 className="section-title">آخـــر مبادراتنا</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {sampleInitiatives.map((initiative) => (
          <InitiativeCard key={initiative.id} initiative={initiative} />
        ))}
      </div>
      <AppButton
        type="primary"
        icon={<ArrowUpLeft className="w-4 h-4 sm:w-6 sm:h-6" />}
        corner="rounded"
        url=""
      >
        عرض جميع المبادرات
      </AppButton>
    </section>
  );
}
