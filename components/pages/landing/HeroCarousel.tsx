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
      <div className="w-full aspect-square bg-gray-200 rounded-xl flex items-center justify-center">
        <p className="text-gray-500">No carousel items found</p>
      </div>
    );
  }

  return (
    <div className="relative w-full mx-auto max-w-3xl">
      <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-2xl bg-gray-100">
        {/* All Slides - Simple approach without transforms */}
        {heroCarouselItems.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
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
            <div className="absolute bottom-4 left-4 text-white z-20">
              <div className="bg-black/50 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                {item.alt}
              </div>
            </div>
          </div>
        ))}

        {/* Static Dark Gradient Overlay - Stays in place over all images */}
        <div className="absolute inset-0 z-30 pointer-events-none bg-gradient-to-br from-black/40 via-black/20 to-black/60" />
      </div>
    </div>
  );
}
