import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import GuideItem from "@/components/pages/GuideItem";
import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";

export default function AssistancePage() {
  return (
    <section className="container mx-auto px-4 py-12" dir="rtl">
      {/* Main Title */}
      <h2 className="section-title text-primary-500 mb-10 text-center font-bold">
        ابحث عن مساعدات
      </h2>

      {/* Guide Card */}
      <Card className="bg-neutrals-200 border-neutrals-300 mx-auto max-w-4xl rounded-3xl border p-0 shadow-sm">
        <CardContent className="space-y-6 p-8 text-right">
          {/* Introduction */}
          <p className="text-neutrals-700 text-lg leading-relaxed">
            إذا كنت بحاجة إلى دعم لمبادرتك، أنت في المكان المناسب:
          </p>

          {/* Steps */}
          <div className="mt-4 space-y-2">
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
          <p className="text-primary-500 text-paragraph-lg pt-4 text-center font-semibold">
            مع بادر… الدعم أقرب مما تتصور.
          </p>
        </CardContent>
      </Card>
      <div className="mt-10 mb-6 text-center">
        <Link
          className="text-primary-500 hover:text-primary-400 text-secondary-sm font-semibold underline"
          href="/contact"
        >
          تواصل معنا
          <ArrowUpLeft className="mr-1 inline-block h-4 w-4" />
        </Link>
        <p className="text-neutrals-600 text-paragraph-lg mb-6 font-medium"></p>
      </div>
    </section>
  );
}
