import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "بادر - منصة المبادرات المجتمعية",
    short_name: "بادر",
    description:
      "منصة بادر تربط بين الشباب المسلم والمبادرات المجتمعية التطوعية لتحقيق الخير والإصلاح",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#064E43",
    theme_color: "#064E43",
    orientation: "portrait-primary",
    lang: "ar",
    dir: "rtl",
    categories: ["social", "community", "volunteering"],

    icons: [
      // Standard icons
      {
        src: "public/pwa/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "public/pwa/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      // Maskable (for Android adaptive icons)
      {
        src: "public/pwa/icons/manifest-icon-192.maskable.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "public/pwa/icons/manifest-icon-512.maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      // Fallback icon
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],

    screenshots: [
      {
        src: "public/pwa/badir-landing-mobile.png",
        sizes: "430x932",
        type: "image/png",
        form_factor: "narrow",
        label: "الصفحة الرئيسية",
      },
      {
        src: "public/pwa/badir-initiatives-mobile.png",
        sizes: "430x932",
        type: "image/png",
        form_factor: "narrow",
        label: "المبادرات",
      },
      {
        src: "public/pwa/badir-initiative-mobile.png",
        sizes: "430x932",
        type: "image/png",
        form_factor: "narrow",
        label: "تفاصيل المبادرة",
      },
      {
        src: "public/pwa/badir-landing-desktop.png",
        sizes: "2490x1353",
        type: "image/png",
        form_factor: "wide",
        label: "الصفحة الرئيسية - سطح المكتب",
      },
      {
        src: "public/pwa/badir-initiatives-desktop.png",
        sizes: "2490x1350",
        type: "image/png",
        form_factor: "wide",
        label: "المبادرات - سطح المكتب",
      },
    ],

    prefer_related_applications: false, // keep false unless we have a native app
  };
}
