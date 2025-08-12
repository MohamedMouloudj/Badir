"use client";

import { partners } from "@/data/statics";
import PartnerMarqueeCard from "./PartnerMarqueeCard";

export default function Partners() {
  return (
    <section className="flex flex-col items-center w-full px-0" dir="rtl">
      <h2 className="section-title mb-8">شُـــركـــــــاؤنـــــا</h2>
      <div
        className="wrapper max-w-full flex-center bg-primary-400"
        style={{ "--number-marquee": partners.length } as React.CSSProperties}
      >
        {partners.map((partner, index) => (
          <PartnerMarqueeCard
            key={`marquee-card-${index}`}
            partner={partner}
            index={index + 1}
          />
        ))}
      </div>
    </section>
  );
}
