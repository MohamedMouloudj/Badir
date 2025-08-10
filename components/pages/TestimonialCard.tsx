import { TestimonialOpinion } from "@/types";
import React from "react";

export default function TestimonialCard({
  testimonial,
}: {
  testimonial: TestimonialOpinion;
}) {
  return (
    <div
      className="flex-center-column items-start border-2 border-primary-600 py-6 px-4 gap-4 rounded-xl"
      dir="rtl"
    >
      <p className="text-paragraph-md">{testimonial.comment}</p>
      <div className="flex-center gap-5">
        <h3 className="text-label text-primary-500">{testimonial.userName}</h3>
        <p className="text-paragraph-md font-medium">{testimonial.userJob}</p>
      </div>
    </div>
  );
}
