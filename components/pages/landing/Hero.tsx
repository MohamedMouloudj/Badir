"use client";

import AppButton from "@/components/AppButton";
import HeroCarousel from "@/components/pages/HeroCarousel";
import { ArrowUpLeft } from "lucide-react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { SplitText } from "gsap/all";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  useGSAP(() => {
    const heroTitle = new SplitText(".hero-title", { type: "words" });
    const heroSplit = new SplitText(".hero-description", { type: "lines" });

    gsap.from(heroTitle.words, {
      yPercent: 100,
      opacity: 0,
      duration: 1.5,
      ease: "expo.out",
      stagger: 0.1,
    });
    gsap.from(heroSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.5,
      ease: "expo.out",
      stagger: 0.05,
      delay: 1,
    });
  }, []);
  return (
    <section
      className="flex-center-column xl:flex-center justify-evenly items-stretch"
      dir="rtl"
      style={{
        padding: "calc(var(--navbar-height) - 2rem) 0 4rem",
      }}
    >
      <div className="flex-center-column max-xl:text-center gap-10 justify-between items-center h-full flex-1/2 xl:pr-8">
        <div className="flex-center-column gap-8 justify-between h-full">
          <h1 className="hero-title text-neutrals-700 font-bold mb-4 text-hero-md lg:text-hero-lg">
            <span className="text-primary-500 max-xl:block max-xl:w-full">
              بــادِر
            </span>{" "}
            .. بصُنع الأثر
          </h1>
          <p className="hero-description font-bold text-primary-sm">
            منصّة تُنظّم عطاءك ليصنع الفرق، من خلال الوصل بين الخير وأهله،
            والعمل ومُحتاجيه.
          </p>
          <div className="flex-center max-xl:justify-center max-sm:items-end gap-4 flex-1 py-6">
            <AppButton type="outline" corner="rounded" size="lg">
              اكتشف المبادرات
            </AppButton>
            <AppButton
              type="primary"
              icon={<ArrowUpLeft className="w-4 h-4 sm:w-6 sm:h-6" />}
              corner="rounded"
              size="lg"
            >
              تطوَّع الآن
            </AppButton>
          </div>
        </div>
      </div>
      <div className="flex-1/2 w-full flex justify-center items-center p-4">
        <HeroCarousel />
      </div>
    </section>
  );
}
