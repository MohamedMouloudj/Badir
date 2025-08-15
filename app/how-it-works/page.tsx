import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import GuideItem from "@/components/pages/GuideItem";

export default function HowItWorksPage() {
  return (
    <section className="container mx-auto px-4 py-12" dir="rtl">
      {/* Main Title */}
      <h2 className="section-title font-bold text-primary-500 text-center mb-10">
        كيف تعمل
      </h2>

      {/* Guide Card */}
      <Card className="bg-neutrals-200 border border-neutrals-300 rounded-3xl shadow-sm max-w-4xl mx-auto p-0">
        <CardContent className="p-8 space-y-6 text-right">
          {/* Introduction */}
          <p className="text-neutrals-700 text-lg leading-relaxed">
            في &quot;بادر&quot;، نحن لا نكتفي بربط الأفكار بالأيدي… بل نربطها
            بالقلوب المؤمنة بالقيم التي تحكم عملنا.
          </p>
          <p className="text-neutrals-700 text-lg leading-relaxed">
            كل مبادرة تمر عبر ثلاث ركائز: الإخلاص، الإتقان، واحترام مبادئ ديننا
            وقيمنا المجتمعية.
          </p>

          {/* Steps */}
          <div className="space-y-2 mt-6">
            <GuideItem
              title="ابدأ التسجيل"
              content="اختر حسابك كمتطوع أو كمنظمة، واملأ بياناتك بدقة."
              isBullet={false}
            />

            <GuideItem
              title="اعرض أو انضم"
              content="أضف مبادرتك الخاصة أو اختر من بين المبادرات الميدانية أو الإلكترونية المنشورة."
              isBullet={false}
            />

            <GuideItem
              title="التوافق القيمي"
              content="نتأكد أن المبادرة وأسلوب العمل يتماشيان مع الضوابط الشرعية وأخلاقيات العمل التطوعي."
              isBullet={false}
            />

            <GuideItem
              title="التواصل والتنسيق"
              content="تفاعل مع فريقك أو مع المتطوعين الذين اخترتهم، وضعوا خطة واضحة."
              isBullet={false}
            />

            <GuideItem
              title="العمل الميداني أو الرقمي"
              content="أنجز المهام بروح الفريق، وبتعاون قائم على الاحترام والثقة."
              isBullet={false}
            />

            <GuideItem
              title="المتابعة والتقارير"
              content="عبر لوحة التحكم، يمكنك متابعة أثر المبادرة ونتائجها بشكل شفاف."
              isBullet={false}
            />
          </div>

          {/* Closing Statement */}
          <p className="text-primary-500 font-semibold text-paragraph-lg pt-4 text-center">
            في بادر، الأثر لا يُقاس فقط بما أنجزته… بل بالنية التي انطلقت بها،
            وبالخير الذي أبقيته بعدك.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
