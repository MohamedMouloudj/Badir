import { aboutInfo } from "@/data/statics";
import InfoCard from "@/components/pages/InfoCard";

export default function About() {
  return (
    <section
      className="flex-center-column items-center"
      style={{
        padding: "calc(var(--navbar-height) - 2rem) 0 4rem",
      }}
    >
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
