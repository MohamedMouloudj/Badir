import AppButton from "@/components/AppButton";
import React from "react";

export default function Contact() {
  return (
    <section dir="rtl" className="flex-center-column items-center">
      <h2 className="section-title">رأيـــك يهمــنا</h2>
      <p className="section-description text-center">
        ضع هنا كل فكرة، تحسين ترجو أن يكون في هذه المنصة
      </p>
      <div className="flex items-center bg-neutrals-100 rounded-full overflow-hidden border-3 border-primary-400">
        <input
          type="email"
          placeholder="بريدك الإلكتروني"
          className="flex-1 min-w-0 h-10 sm:h-12 px-3 sm:px-4 bg-transparent text-neutrals-700 placeholder-neutrals-400 focus:outline-none text-sm sm:text-base"
          dir="rtl"
        />
        <div className="flex-shrink-0 p-1">
          <AppButton
            type="primary"
            corner="rounded"
            size="sm"
            className="whitespace-nowrap px-3 sm:px-4 h-8 sm:h-10"
          >
            اشترك
          </AppButton>
        </div>
      </div>
    </section>
  );
}
