import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import GuideItem from "@/components/pages/GuideItem";

export default function VolunteerGuidePage() {
  return (
    <section className="container mx-auto px-4 py-12" dir="rtl">
      {/* Main Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-primary-500 text-center mb-10">
        دليل المتطوع
      </h1>

      {/* Guide Card */}
      <Card className="bg-neutrals-200 border border-neutrals-300 rounded-3xl shadow-sm max-w-4xl mx-auto p-0">
        <CardContent className="p-8 space-y-6 text-right">
          {/* Welcome Message */}
          <h2 className="text-neutrals-700 text-xl font-bold text-right">
            مرحبًا بك في أسرة بادر!
          </h2>

          {/* Introduction */}
          <p className="text-neutrals-700 text-lg leading-relaxed">
            هذا الدليل يساعدك على فهم دورك ومسؤولياتك:
          </p>

          {/* Guide Items */}
          <div className="space-y-4 mt-4">
            <GuideItem
              title=""
              content="التعاون مع باقي الفريق بروح إيجابية."
              isBullet={true}
            />
            <GuideItem
              title=""
              content="الالتزام بالمواعيد والمهام الموكلة إليك."
              isBullet={true}
            />
            <GuideItem
              title=""
              content="الاحترافية في التعامل مع المستفيدين."
              isBullet={true}
            />
            <GuideItem
              title=""
              content="التطوير المستمر لمهاراتك."
              isBullet={true}
            />
          </div>

          {/* Closing Statement */}
          <p className="text-primary-500 font-semibold text-paragraph-lg pt-4 text-center">
            <span className="underline">تذكّر</span>: العمل التطوعي ليس وقتًا
            تمنحه فحسب، بل أثرًا تتركه في قلوب الناس.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
