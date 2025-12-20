import AppButton from "@/components/AppButton";
import { ArrowUpLeft } from "lucide-react";
import React from "react";

export default function Contact() {
  return (
    <section dir="rtl" className="flex-center-column items-center">
      <h2 className="section-title">رأيـــك يهمــنا</h2>
      <p className="section-description text-center">
        نسعد بملاحظاتك واقتراحاتك لتحسين تجربتك على المنصة
      </p>
      {/* <div className="bg-neutrals-100 border-primary-400 flex items-center overflow-hidden rounded-full border-3">
        <input
          type="email"
          placeholder="فكرتك"
          className="text-neutrals-700 placeholder-neutrals-400 h-10 min-w-0 flex-1 bg-transparent px-3 text-sm focus:outline-none sm:h-12 sm:px-4 sm:text-base"
          dir="rtl"
        />
        <div className="shrink-0 p-1">
          <AppButton
            type="primary"
            border="rounded"
            size="sm"
            className="h-8 px-3 whitespace-nowrap sm:h-10 sm:px-4"
          >
            أرسلها
          </AppButton>
        </div>
      </div> */}
      <AppButton
        type="primary"
        border="rounded"
        url="/contact"
        className="h-8 px-3 whitespace-nowrap sm:h-10 sm:px-4"
        icon={<ArrowUpLeft className="h-4 w-4 md:h-5 md:w-5" />}
      >
        تواصل معنا
      </AppButton>
    </section>
  );
}
