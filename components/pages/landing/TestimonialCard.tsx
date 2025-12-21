import { TestimonialOpinion } from "@/types/Statics";
import React from "react";

export default function TestimonialCard({
  testimonial,
  className,
}: {
  testimonial: TestimonialOpinion;
  className?: string;
}) {
  return (
    <div
      className={`flex-center-column border-primary-600 items-start justify-between gap-4 rounded-xl border-2 px-4 py-6 ${className}`}
      dir="rtl"
    >
      <p className="text-paragraph-md">{testimonial.comment}</p>
      <div className="flex-center gap-5">
        <h3 className="text-label text-primary-500">{testimonial.userName}</h3>
        <p className="text-paragraph-md font-medium">
          {testimonial.initiative}
        </p>
      </div>
    </div>
  );
}
