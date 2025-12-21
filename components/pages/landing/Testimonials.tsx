import TestimonialCard from "@/components/pages/landing/TestimonialCard";
import { sampleRatings } from "@/data/statics";
import React from "react";

export default function Testimonials() {
  return (
    <section className="flex-center-column items-center" dir="rtl">
      <h2 className="section-title">أثرٌ يُروى .. ماذا يقول المتطوعون؟</h2>
      <p className="section-description text-center">
        تجارب واقعية لشباب صنعوا الأثر عبر منصة بادِر، وحوّلوا الشغف إلى فعل،
        والخير إلى مبادرة. قصص تلهمك لتبدأ أنت أيضًا.
      </p>
      <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
        {sampleRatings.map((testimonial, index) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            className={
              sampleRatings.length === 3 && index === 2
                ? "sm:col-span-2 lg:col-span-1"
                : ""
            }
          />
        ))}
      </div>
    </section>
  );
}
