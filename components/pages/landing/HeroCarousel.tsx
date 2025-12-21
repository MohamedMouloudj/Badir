"use client";

import { useEffect, useState } from "react";
import { heroCarouselItems } from "@/data/statics";
import Image from "next/image";

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const newIndex = (prev + 1) % heroCarouselItems.length;
        return newIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (!heroCarouselItems || heroCarouselItems.length === 0) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded-xl bg-gray-200">
        <p className="text-gray-500">No carousel items found</p>
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100 shadow-2xl">
        {/* All Slides - Simple approach without transforms */}
        {heroCarouselItems.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? "z-10 opacity-100" : "z-0 opacity-0"
            }`}
          >
            {/* Fallback colored background */}
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: `hsl(${index * 120}, 50%, 70%)`,
              }}
            />

            {/* Image */}
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 768px) 200px, 600px"
              className="object-cover"
              quality={80}
              priority={index === 0}
            />

            {/* Content overlay */}
            <div className="absolute bottom-4 left-4 z-20 text-white">
              <div className="rounded-full bg-black/50 px-3 py-1 text-sm backdrop-blur-sm">
                {item.alt}
              </div>
            </div>
          </div>
        ))}

        {/* Static Dark Gradient Overlay - Stays in place over all images */}
        <div className="pointer-events-none absolute inset-0 z-30 bg-linear-to-br from-black/40 via-black/20 to-black/60" />
      </div>
    </div>
  );
}
