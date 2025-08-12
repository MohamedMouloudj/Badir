import { aboutInfo } from "@/data/statics";
import InfoCard from "@/components/pages/about/InfoCard";

export default function About() {
  return (
    <section className="flex-center-column items-center">
      <h2 className="section-title max-md:mb-8">عن منصتنا</h2>
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
