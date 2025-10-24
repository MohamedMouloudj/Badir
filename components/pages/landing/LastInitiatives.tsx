import AppButton from "@/components/AppButton";
import { sampleInitiatives } from "@/data/statics";
import {
  InitiativeCard as InitiativeCardType,
  InitiativeService,
} from "@/services/initiatives";
import { ArrowUpLeft } from "lucide-react";
import React from "react";
import InitiativeCard from "../InitiativeCard";

export default async function LastInitiatives() {
  let threeInitiatives: InitiativeCardType[] = [];
  const initialInitiatives = await InitiativeService.getMany(
    {},
    { page: 1, limit: 3 }
  );

  threeInitiatives = initialInitiatives.data;

  if (initialInitiatives.data.length < 3) {
    threeInitiatives = threeInitiatives.concat(
      sampleInitiatives.slice(
        initialInitiatives.data.length,
        3
      ) as unknown as InitiativeCardType[]
    );
  }

  return (
    <section className="flex-center-column items-center" dir="rtl">
      <h2 className="section-title">آخـــر مبادراتنا</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {threeInitiatives.map((initiative) => (
          <InitiativeCard key={initiative.id} initiative={initiative} />
        ))}
      </div>
      <AppButton
        type="primary"
        icon={<ArrowUpLeft className="w-4 h-4 sm:w-6 sm:h-6" />}
        border="rounded"
        url="/initiatives"
      >
        عرض جميع المبادرات
      </AppButton>
    </section>
  );
}
