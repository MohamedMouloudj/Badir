import { aboutInfo } from "@/data/statics";
import InfoCard from "@/components/pages/about/InfoCard";

export default function About() {
  return (
    <section className="flex-center-column items-center">
      <h2 className="section-title max-md:mb-6">عن منصتنا</h2>
      <p className="section-description max-w-2xl text-center mb-4">
        منصّة تطوعية تهدف إلى تنظيم العمل التطوعي عبر ربط المتطوّعين بالفرص
        التطوعية إلكترونيًا وميدانيًا، ومدّ يد العون للمحتاجين في إطارٍ من
        التعاون والعطاء المنظّم.
      </p>
      <div className="flex-center-column items-center gap-14 max-w-2xl xl:max-w-5xl w-full px-6">
        {aboutInfo.map((info, index) => (
          <InfoCard
            key={index}
            title={info.title}
            description={info.description}
          />
        ))}
      </div>
    </section>
  );
}
