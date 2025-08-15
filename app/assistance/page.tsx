import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import GuideItem from "@/components/pages/GuideItem";

export default function AssistancePage() {
  return (
    <section className="container mx-auto px-4 py-12" dir="rtl">
      {/* Main Title */}
      <h2 className="section-title font-bold text-primary-500 text-center mb-10">
        ابحث عن مساعدات
      </h2>

      {/* Guide Card */}
      <Card className="bg-neutrals-200 border border-neutrals-300 rounded-3xl shadow-sm max-w-4xl mx-auto p-0">
        <CardContent className="p-8 space-y-6 text-right">
          {/* Introduction */}
          <p className="text-neutrals-700 text-lg leading-relaxed">
            إذا كنت بحاجة إلى دعم لمبادرتك، أنت في المكان المناسب:
          </p>

          {/* Steps */}
          <div className="space-y-2 mt-4">
            <GuideItem
              title=""
              content="حدّد نوع المساعدة التي تحتاجها (مالية، تقنية، لوجستية، تدريبية…)."
              isBullet={true}
            />

            <GuideItem
              title=""
              content="اكتب تفاصيل واضحة لما تبحث عنه."
              isBullet={true}
            />

            <GuideItem
              title=""
              content="سنعرض طلبك على الشبكة الواسعة من المتطوعين والمنظمات."
              isBullet={true}
            />
          </div>

          {/* Closing Statement */}
          <p className="text-primary-500 font-semibold text-paragraph-lg pt-4 text-center">
            مع بادر… الدعم أقرب مما تتصور.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
