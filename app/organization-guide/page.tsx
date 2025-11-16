import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import GuideItem from "@/components/pages/GuideItem";

export default function OrganizationGuidePage() {
  return (
    <section className="container mx-auto px-4 py-12" dir="rtl">
      {/* Main Title */}
      <h2 className="text-primary-500 mb-10 text-center text-3xl font-bold md:text-4xl">
        دليل المنظمة
      </h2>

      {/* Guide Card */}
      <Card className="bg-neutrals-200 border-neutrals-300 mx-auto max-w-4xl rounded-3xl border p-0 shadow-sm">
        <CardContent className="space-y-6 p-8 text-right">
          {/* Introduction */}
          <p className="text-neutrals-700 text-lg leading-relaxed">
            في &quot;بادر&quot;، وجودكم كمنظمة يعني أننا شركاء في صناعة الخير،
            وملتزمون معًا بالعمل وفق قيمنا ومبادئنا.
          </p>

          {/* Guide Items */}
          <div className="mt-6 space-y-5">
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
