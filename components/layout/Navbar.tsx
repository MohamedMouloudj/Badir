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
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

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
            `${height}px`
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
        className="md:hidden p-2 rounded-md border-none hover:bg-gray-100 transition-colors"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? (
          <X className="w-6 h-6 text-primary-500" />
        ) : (
          <Menu className="w-6 h-6 text-primary-500" />
        )}
      </button>

      <Logo />

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6 flex-1">
        <ul>
          {landingRoute.map((navRoute) => {
            if (isTablet && navRoute.url === "/") {
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
        className="md:hidden absolute bg-neutrals-100 top-full left-0 right-0 z-50"
        style={{
          height: `calc(100vh - var(--navbar-height))`,
          visibility: isMenuOpen ? "visible" : "hidden",
        }}
      >
        <div className="flex flex-col justify-between p-4 h-full">
          <ul>
            {landingRoute.map((navRoute) => (
              <li key={navRoute.url}>
                <Link
                  className={`py-2 px-3 ${
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

          <div className="bg-secondary-200 h-0.25 w-full mb-6" />
          <AuthProfileButtons isMobile={true} onMenuAction={closeMenu} />
        </div>
      </div>
    </nav>
  );
}
