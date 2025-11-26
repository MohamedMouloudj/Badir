import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function HowItWorksPage() {
  return (
    <section className="container mx-auto px-4 py-12" dir="rtl">
      {/* Main Title */}
      <h2 className="section-title text-primary-500 mb-10 text-center font-bold">
        كيف تعمل منصّتُنا؟
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
          <ol className="mt-6 list-inside list-decimal space-y-4 text-lg leading-relaxed">
            <li>
              <span className="text-primary-500 ms-1 font-bold">
                أنشئ حسابك:
              </span>
              سجّل كمستخدم (متطوّع، مستفيد) أو كمنظمة (جمعية، نادي، مؤسسة…).
            </li>

            <li>
              <span className="text-primary-500 text-secondary-sm ms-1 font-bold">
                استكشف واطلب:
              </span>
              ابحث عن الفرص التطوعية والمبادرات المتاحة، أو قدّم طلب المساعدة
              عبر نموذج &quot;تواصل معنا&quot;.
            </li>

            <li>
              <span className="text-primary-500 text-secondary-sm ms-1 font-bold">
                أطلق مبادرتك:
              </span>
              اضغط على &quot;مبادرة جديدة&quot;، ثم أدخِل معلومات مبادرتك ليقوم
              فريقنا بدراستها والتواصل معك في أسرع وقت.
            </li>

            <li>
              <span className="text-primary-500 text-secondary-sm ms-1 font-bold">
                تواصل وتعاون:
              </span>
              تتيح لك المنصّة التواصل مباشرة مع المتطوعين أو مع الجهات الداعمة
              لإنجاح مبادرتك.
            </li>
          </ol>

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
