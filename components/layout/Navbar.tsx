"use client";

import { landingRoute } from "@/data/routes";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AuthProfileButtons } from "@/components/AuthProfileButtons";
import Logo from "@/components/Logo";
import { useMediaQuery } from "react-responsive";

export default function Navbar() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const updateNavbarHeight = () => {
      if (navRef.current) {
        const height = navRef.current.offsetHeight;
        const currentHeight =
          document.documentElement.style.getPropertyValue("--navbar-height");

        // Only update if height changed
        if (currentHeight !== `${height}px`) {
          document.documentElement.style.setProperty(
            "--navbar-height",
            `${height}px`,
          );
        }
      }
    };

    updateNavbarHeight();
    window.addEventListener("resize", updateNavbarHeight);

    // On content changes (e.g., font loading)
    const observer = new ResizeObserver(updateNavbarHeight);
    if (navRef.current) {
      observer.observe(navRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateNavbarHeight);
      observer.disconnect();
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav
      ref={navRef}
      dir="rtl"
      className={`app-navbar ${
        isMenuOpen ? "shadow-none" : "shadow-md"
      } md:shadow-md`}
    >
      {/* Mobile Burger Menu Button */}
      <button
        onClick={toggleMenu}
        className="rounded-md border-none p-2 transition-colors hover:bg-gray-100 md:hidden"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? (
          <X className="text-primary-500 h-6 w-6" />
        ) : (
          <Menu className="text-primary-500 h-6 w-6" />
        )}
      </button>

      <Logo />

      {/* Desktop Navigation */}
      <div className="hidden flex-1 items-center gap-6 md:flex">
        <ul>
          {landingRoute.map((navRoute) => {
            if (mounted && isTablet && navRoute.url === "/") {
              return null;
            }
            return (
              <li key={navRoute.url}>
                <Link
                  className={`${pathname === navRoute.url ? "underline" : ""}`}
                  href={`${navRoute.url}`}
                >
                  {navRoute.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <AuthProfileButtons isMobile={false} />
      </div>

      {/* Mobile Menu Overlay */}

      <div
        className="bg-neutrals-100 absolute top-full right-0 left-0 z-50 md:hidden"
        style={{
          height: `calc(100vh - var(--navbar-height))`,
          visibility: isMenuOpen ? "visible" : "hidden",
        }}
      >
        <div className="flex h-full flex-col justify-between p-4">
          <ul>
            {landingRoute.map((navRoute) => (
              <li key={navRoute.url}>
                <Link
                  className={`px-3 py-2 ${
                    pathname === navRoute.url ? "underline" : ""
                  }`}
                  href={`${navRoute.url}`}
                  onClick={closeMenu}
                >
                  {navRoute.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="bg-secondary-200 mb-6 h-px w-full" />
          <AuthProfileButtons isMobile={true} onMenuAction={closeMenu} />
        </div>
      </div>
    </nav>
  );
}
