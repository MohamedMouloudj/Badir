import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import GuideItem from "@/components/pages/GuideItem";

export default function HowItWorksPage() {
  return (
    <section className="container mx-auto px-4 py-12" dir="rtl">
      {/* Main Title */}
      <h2 className="section-title text-primary-500 mb-10 text-center font-bold">
        كيف تعمل
      </h2>

      {/* Guide Card */}
      <Card className="bg-neutrals-200 border-neutrals-300 mx-auto max-w-4xl rounded-3xl border p-0 shadow-sm">
        <CardContent className="space-y-6 p-8 text-right">
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
          <div className="mt-6 space-y-2">
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
          <p className="text-primary-500 text-paragraph-lg pt-4 text-center font-semibold">
            في بادر، الأثر لا يُقاس فقط بما أنجزته… بل بالنية التي انطلقت بها،
            وبالخير الذي أبقيته بعدك.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
