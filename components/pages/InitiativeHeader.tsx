"use client";

import { getInitiativeCover } from "@/actions/initiatives";
import { getPublicStorageUrl } from "@/actions/supabaseHelpers";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

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
      }
    );

    const headerRef = document.querySelector("[data-header-trigger]");
    if (headerRef) observer.observe(headerRef);

    return () => observer.disconnect();
  }, []);

  const fetchInitiativeCover = useCallback(async () => {
    if (coverImage) {
      const imageUrl = await getPublicStorageUrl("post-images", coverImage);
      setImage(imageUrl);
    } else {
      setImage(null);
    }
  }, []);

  useEffect(() => {
    fetchInitiativeCover();
  }, []);

  return (
    <div className="w-full h-48 sm:h-60" data-header-trigger>
      {/* Hero area */}
      <div className="relative w-full overflow-hidden">
        {image ? (
          <div className="w-full h-48 sm:h-60 relative">
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
          <div className="w-full h-[200px] md:h-[240px] bg-gradient-to-br from-primary-800 to-primary-600" />
        )}

        {/* Overlay content with smooth fade animation */}
        <div
          className={`absolute inset-0 flex items-end transition-opacity duration-300 ease-in-out ${
            compact ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <div className="w-full max-w-5xl mx-auto p-6 pb-10 text-right">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
              {title}
            </h1>

            {shortDescription && (
              <p className="mt-2 text-white/90 max-w-3xl text-sm md:text-base drop-shadow">
                {shortDescription}
              </p>
            )}

            <div className="mt-4 flex gap-4 text-white/90 text-sm md:text-base">
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
        <div className="w-full h-[60px] bg-transparent" /> // Adjust height to match your compact bar
      )}

      {/* Compact bar */}
      <div
        className={`w-full bg-white border-b border-neutrals-200 transition-all duration-300 ease-in-out transform ${
          compact
            ? "translate-y-0 opacity-100 fixed top-[var(--navbar-height)] shadow-sm z-10"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
          {image ? (
            <div className="w-12 h-12 relative rounded-md overflow-hidden flex-shrink-0">
              <Image
                src={image || ""}
                alt={title}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
          ) : (
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-md flex-shrink-0" />
          )}
          <div className="text-right overflow-hidden">
            <div className="font-semibold text-neutrals-900 truncate">
              {title}
            </div>
            <div className="text-xs text-neutrals-500">
              {startDate ? formatDate(startDate) : ""}{" "}
              {endDate ? ` - ${formatDate(endDate)}` : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
