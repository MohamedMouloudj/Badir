"use client";

import { formatDate } from "@/lib/utils";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import BackButton from "../BackButton";

type Props = {
  title: string;
  shortDescription?: string | null;
  startDate?: string | Date | null;
  endDate?: string | Date | null;
  coverImage?: string | null;
};

/**
 * Initiative page header component
 * @param title Initiative title
 * @param shortDescription Initiative short description
 * @param startDate Initiative start date
 * @param endDate Initiative end date
 * @returns JSX.Element
 */
export default function InitiativeHeader({
  title,
  shortDescription,
  startDate,
  endDate,
  coverImage,
}: Props) {
  const [compact, setCompact] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setCompact(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "-120px 0px 0px 0px",
      },
    );

    const headerRef = document.querySelector("[data-header-trigger]");
    if (headerRef) observer.observe(headerRef);

    return () => observer.disconnect();
  }, []);

  const fetchInitiativeCover = useCallback(async () => {
    if (coverImage) {
      setImage(coverImage);
      return;
    }
    setImage(null);
  }, [coverImage]);

  useEffect(() => {
    fetchInitiativeCover();
  }, [fetchInitiativeCover]);

  return (
    <div className="h-48 w-full sm:h-60" data-header-trigger>
      {/* Hero area */}
      <div className="relative w-full overflow-hidden">
        {image ? (
          <div className="relative h-48 w-full sm:h-60">
            <Image
              src={image || ""}
              alt={title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 640px, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
          </div>
        ) : (
          <div className="from-primary-800 to-primary-600 h-[200px] w-full bg-gradient-to-br md:h-[240px]" />
        )}

        {/* Overlay content with smooth fade animation */}
        <div
          className={`absolute inset-0 flex items-end transition-opacity duration-300 ease-in-out ${
            compact ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <div className="absolute top-4 left-4 mb-4 flex justify-end">
            <BackButton />
          </div>
          <div className="mx-auto w-full max-w-5xl p-6 pb-10 text-right">
            <h1 className="text-3xl font-bold text-white drop-shadow-lg md:text-4xl lg:text-5xl">
              {title}
            </h1>

            {shortDescription && (
              <p className="mt-2 max-w-3xl text-sm text-white/90 drop-shadow md:text-base">
                {shortDescription}
              </p>
            )}

            <div className="mt-4 flex gap-4 text-sm text-white/90 md:text-base">
              {startDate && (
                <div>
                  <div className="text-xs text-white/70">تاريخ البداية</div>
                  <div className="font-medium drop-shadow">
                    {formatDate(startDate)}
                  </div>
                </div>
              )}
              {endDate && (
                <div>
                  <div className="text-xs text-white/70">تاريخ الانتهاء</div>
                  <div className="font-medium drop-shadow">
                    {formatDate(endDate)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Compact bar with smooth slide-down animation */}
      {compact && (
        <div className="h-[60px] w-full bg-transparent" /> // Adjust height to match your compact bar
      )}

      {/* Compact bar */}
      <div
        className={`border-neutrals-200 w-full transform border-b bg-white transition-all duration-300 ease-in-out ${
          compact
            ? "fixed top-[var(--navbar-height)] z-10 translate-y-0 opacity-100 shadow-sm"
            : "pointer-events-none -translate-y-full opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-3">
          {image ? (
            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
              <Image
                src={image || ""}
                alt={title}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
          ) : (
            <div className="from-primary-500 to-primary-700 h-12 w-12 flex-shrink-0 rounded-md bg-gradient-to-br" />
          )}
          <div className="overflow-hidden text-right">
            <div className="text-neutrals-900 truncate font-semibold">
              {title}
            </div>
            <div className="text-neutrals-500 text-xs">
              {startDate ? formatDate(startDate) : ""}{" "}
              {endDate ? ` - ${formatDate(endDate)}` : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
