import AppButton from "@/components/AppButton";
import React from "react";

export default function Contact() {
  return (
    <section dir="rtl" className="flex-center-column items-center">
      <h2 className="section-title">رأيـــك يهمــنا</h2>
      <p className="section-description text-center">
        ضع هنا كل فكرة، تحسين ترجو أن يكون في هذه المنصة
      </p>
      <div className="bg-neutrals-100 border-primary-400 flex items-center overflow-hidden rounded-full border-3">
        <input
          type="email"
          placeholder="فكرتك"
          className="text-neutrals-700 placeholder-neutrals-400 h-10 min-w-0 flex-1 bg-transparent px-3 text-sm focus:outline-none sm:h-12 sm:px-4 sm:text-base"
          dir="rtl"
        />
        <div className="flex-shrink-0 p-1">
          <AppButton
            type="primary"
            border="rounded"
            size="sm"
            className="h-8 px-3 whitespace-nowrap sm:h-10 sm:px-4"
          >
            أرسلها
          </AppButton>
        </div>
      </div>
    </section>
  );
}
