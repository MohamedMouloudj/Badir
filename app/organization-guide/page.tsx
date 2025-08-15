import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import GuideItem from "@/components/pages/GuideItem";

export default function OrganizationGuidePage() {
  return (
    <section className="container mx-auto px-4 py-12" dir="rtl">
      {/* Main Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-primary-500 text-center mb-10">
        دليل المنظمة
      </h1>

      {/* Guide Card */}
      <Card className="bg-neutrals-200 border border-neutrals-300 rounded-3xl shadow-sm max-w-4xl mx-auto p-0">
        <CardContent className="p-8 space-y-6 text-right">
          {/* Introduction */}
          <p className="text-neutrals-700 text-lg leading-relaxed">
            في &quot;بادر&quot;، وجودكم كمنظمة يعني أننا شركاء في صناعة الخير،
            وملتزمون معًا بالعمل وفق قيمنا ومبادئنا.
          </p>

          {/* Guide Items */}
          <div className="space-y-5 mt-6">
            <GuideItem
              title="التسجيل للتوثيق"
              content="أدخل بيانات منظمتك عبر نموذج الانضمام، مع التأكد من صحة المعلومات."
            />

            <GuideItem
              title="عرض المبادرات"
              content="أضف فرص التطوع أو المبادرات التي تعمل عليها، موضحة الأهداف، والفئة المستهدفة، وضوابط العمل."
            />

            <GuideItem
              title="التوافق القيمي"
              content="تأكد أن المبادرة تحترم الضوابط الشرعية والأخلاقية قبل نشرها."
            />

            <GuideItem
              title="التواصل مع المتطوعين"
              content="استقبل طلبات الانضمام من المتطوعين، واختر الأنسب وفق مهاراتهم والتزامهم."
            />

            <GuideItem
              title="متابعة الأثر"
              content="من لوحة التحكم، راقب سير العمل، وقيّم الأداء، وتابع النتائج بشكل منتظم."
            />

            <GuideItem
              title="غايتنا"
              content="تمكين منظمتكم من العمل بكفاءة، وربطكم بشبكة دعم من الكفاءات البشرية والموارد التي تساعد على إنجاح مشاريعكم، بأعلى درجات الاحترافية والشفافية."
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
