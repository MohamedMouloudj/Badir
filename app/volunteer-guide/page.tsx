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
            هنا يبدأ أثرُك، وتكبر رسالتُك، ويُصبح وقتك حُجّةً لك لا عليك. هذا
            الدليل يرشدك إلى دورك ومسؤولياتك:
          </p>

          {/* Guide Items */}
          <div className="mt-4 space-y-4">
            <GuideItem
              title="أنتَ الجماعةُ والجماعةُ أنتَ"
              content="تواجدُك هنا يعني أنك أصبحت جزءًا من فريقٍ يحمل همًّا ورسالة؛ فجَدِّد نيتك، وأخلِص عملك، وكن لبنةً في بناءِ الخير."
              isBullet={false}
            />
            <GuideItem
              title="الالتزام عنوانك"
              content="احرص على المواعيد، واحترم الجهود، فالمبادرات تُبنى على الانضباط، ويُقاس نجاح المتطوّع بقدر التزامه."
              isBullet={false}
            />
            <GuideItem
              title="الأدب قبل الخدمة"
              content="استقبل المستفيدين بابتسامة، وتحدّث برفق، وكن قدوة في الأخلاق قبل العمل؛ فالكلمة الطيبة أثرٌ لا يُنسى."
              isBullet={false}
            />
            <GuideItem
              title="روح الفريق فوق كل شيء"
              content="ساعد، وشجّع، وادعم زملاءك. العمل التطوعي لا يقوم بالأفراد، بل بالبيئة الصّحية."
              isBullet={false}
            />
            <GuideItem
              title="ابدأ من نفسك"
              content="طوّر مهاراتك، تعلّم، اقرأ، واطلب التوجيه. فالمتطوّع الذي ينمو… ينمو معه الأثر."
              isBullet={false}
            />
            <GuideItem
              title="الأمانة أصلُ رسالتك"
              content="حافظ على المعلومات، وعلى الممتلكات، وعلى سمعة الفريق. فكل ذلك أمانةٌ ستُسأل عنها."
              isBullet={false}
            />
            <GuideItem
              title="الأثر هو الغاية"
              content="لا تُقاس المبادرات بعدد المنخرطين، بل بأثرٍ يلمسه الناس… أثرٌ قد يغيّر قلبًا واحدًا أو يفتح بابًا من الخير للآخرين."
              isBullet={false}
            />
            <GuideItem
              title="كُن رقما صعبًا"
              content="دع عملك يتقدمك، ودع الله يرفعه ولو لم يرك أحد."
              isBullet={false}
            />
          </div>

          {/* Closing Statement */}
          <p className="text-primary-500 text-paragraph-lg pt-4 text-center font-semibold">
            هُنا نُبادر بصنع الاثر، فبادِر معنَا 🌱
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
