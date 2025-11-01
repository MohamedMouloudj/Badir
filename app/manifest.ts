import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "BadirInitiativesApp",
    name: "بادر - منصة المبادرات المجتمعية",
    short_name: "بادر",
    description:
      "منصة بادر تربط بين الشباب المسلم والمبادرات المجتمعية التطوعية لتحقيق الخير والإصلاح",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#F1F0EA",
    theme_color: "#064E43",
    orientation: "portrait",
    lang: "ar",
    dir: "rtl",
    categories: ["social", "community", "volunteering"],

    icons: [
      // Standard icons
      {
        src: "/pwa/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/pwa/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      // Maskable (for Android adaptive icons)
      {
        src: "/pwa/icons/manifest-icon-192.maskable.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/pwa/icons/manifest-icon-512.maskable.png",
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
        src: "/pwa/badir-landing-mobile.png",
        sizes: "430x932",
        type: "image/png",
        form_factor: "narrow",
        label: "الصفحة الرئيسية",
      },
      {
        src: "/pwa/badir-initiatives-mobile.png",
        sizes: "430x932",
        type: "image/png",
        form_factor: "narrow",
        label: "المبادرات",
      },
      {
        src: "/pwa/badir-initiative-mobile.png",
        sizes: "430x932",
        type: "image/png",
        form_factor: "narrow",
        label: "تفاصيل المبادرة",
      },
      {
        src: "/pwa/badir-landing-desktop.png",
        sizes: "2490x1353",
        type: "image/png",
        form_factor: "wide",
        label: "الصفحة الرئيسية - سطح المكتب",
      },
      {
        src: "/pwa/badir-initiatives-desktop.png",
        sizes: "2490x1350",
        type: "image/png",
        form_factor: "wide",
        label: "المبادرات - سطح المكتب",
      },
    ],

    prefer_related_applications: false, // keep false unless we have a native app
  };
}
