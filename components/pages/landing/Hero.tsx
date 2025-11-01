"use client";

import AppButton from "@/components/AppButton";
import HeroCarousel from "@/components/pages/landing/HeroCarousel";
import { ArrowUpLeft } from "lucide-react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { SplitText } from "gsap/all";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";

export default function Hero() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  useGSAP(() => {
    document.fonts.ready.then(() => {
      const heroTitle = new SplitText(".hero-title", { type: "words" });
      const heroSplit = new SplitText(".hero-description", { type: "words" });

      gsap.from(heroTitle.words, {
        yPercent: 100,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
        stagger: 0.1,
      });
      gsap.from(heroSplit.words, {
        direction: "rtl",
        opacity: 0,
        autoAlpha: 0,
        filter: "blur(8px)",
        xPercent: isMobile ? 0 : 100,
        duration: 1.5,
        ease: "expo.out",
        stagger: 0.05,
        delay: 1,
      });
    });
  }, []);
  return (
    <section
      className="flex-center-column xl:flex-center justify-evenly items-stretch"
      dir="rtl"
    >
      <div className="flex-center-column max-xl:text-center gap-10 justify-center items-center h-full flex-1/2 xl:pr-8">
        <div className="flex-center-column gap-10 justify-center h-full">
          <h1 className="hero-title text-neutrals-700 font-bold mb-4 text-hero-md lg:text-hero-lg">
            <span className="text-primary-500 max-xl:block max-xl:w-full">
              بــادِر
            </span>{" "}
            .. بصُنع الأثر
          </h1>
          <p className="hero-description font-bold text-primary-sm">
            نُقرّب المسافة بين من يريد العطاء ومن يحتاجه، ليكبر الأثر معًا.
          </p>
          <div className="flex-center max-xl:justify-center max-sm:items-end gap-4 py-6">
            <AppButton
              type="outline"
              border="rounded"
              size="lg"
              url="/initiatives"
            >
              اكتشف المبادرات
            </AppButton>
            <AppButton
              type="primary"
              icon={<ArrowUpLeft className="w-4 h-4 sm:w-6 sm:h-6" />}
              border="rounded"
              size="lg"
              url="/signup/organization"
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
