import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import FAQItem from "@/components/pages/FAQItem";

export default function FAQPage() {
  return (
    <section className="container mx-auto px-4 py-12" dir="rtl">
      {/* Main Title */}
      <h1 className="section-title text-primary-500 mb-10 text-center font-bold">
        الأسئلة الشائعة
      </h1>

      {/* FAQ Card */}
      <Card className="bg-neutrals-200 border-neutrals-300 mx-auto max-w-3xl rounded-3xl border p-0 shadow-sm">
        <CardContent className="space-y-8 p-8 text-right">
          {/* FAQ Items */}
          <FAQItem
            number={1}
            question="هل المشاركة في بادر مجانية؟"
            answer="نعم، جميع خدماتنا مجانية للمتطوعين والمنظمات."
          />

          <FAQItem
            number={2}
            question="كيف أنضم كمتطوع؟"
            answer="أنشئ حسابًا وحدد مهاراتك، ثم اختر المبادرات التي تناسبك."
          />

          <FAQItem
            number={3}
            question="هل يمكنني تقديم فكرة مبادرة؟"
            answer="نعم، يمكنك إضافة مبادرتك عبر حسابك، وسيتم مراجعتها قبل نشرها."
          />

          <FAQItem
            number={4}
            question="هل أستطيع التطوع عن بُعد؟"
            answer="بالتأكيد، هناك فرص إلكترونية بالإضافة إلى الميدانية."
          />

          <FAQItem
            number={5}
            question="هل أستطيع الانسحاب بعد التسجيل؟"
            answer="نعم، لكن نرجو إبلاغ الفريق مسبقًا لضمان استمرارية العمل."
          />
        </CardContent>
      </Card>
    </section>
  );
}
