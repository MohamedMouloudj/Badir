import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import GuideItem from "@/components/pages/GuideItem";

export default function VolunteerGuidePage() {
  return (
    <section className="container mx-auto px-4 py-12" dir="rtl">
      {/* Main Title */}
      <h1 className="text-primary-500 mb-10 text-center text-3xl font-bold md:text-4xl">
        دليل المتطوع
      </h1>

      {/* Guide Card */}
      <Card className="bg-neutrals-200 border-neutrals-300 mx-auto max-w-4xl rounded-3xl border p-0 shadow-sm">
        <CardContent className="space-y-6 p-8 text-right">
          {/* Welcome Message */}
          <h2 className="text-neutrals-700 text-right text-xl font-bold">
            مرحبًا بك في أسرة بادر!
          </h2>

          {/* Introduction */}
          <p className="text-neutrals-700 text-lg leading-relaxed">
            هذا الدليل يساعدك على فهم دورك ومسؤولياتك:
          </p>

          {/* Guide Items */}
          <div className="mt-4 space-y-4">
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
          <p className="text-primary-500 text-paragraph-lg pt-4 text-center font-semibold">
            <span className="underline">تذكّر</span>: العمل التطوعي ليس وقتًا
            تمنحه فحسب، بل أثرًا تتركه في قلوب الناس.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
