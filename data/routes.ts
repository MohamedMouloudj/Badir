import { Route } from "@/types/Routes";

const landingRoute: Route[] = [
  {
    url: "/about",
    label: "عن المنصة",
  },
  {
    url: "/organizations",
    label: "المنظمات",
  },
  {
    url: "/initiatives",
    label: "المبادرات",
  },
  {
    url: "/contact",
    label: "تواصل معنا",
  },
];

const appRoutes: Route[] = [
  {
    url: "/dashboard",
    label: "لوحة التحكم",
  },
  {
    url: "/organizations",
    label: "المنظمات",
  },
  {
    url: "/initiatives",
    label: "المبادرات",
  },
  {
    url: "/settings",
    label: "الإعدادات",
  },
  {
    url: "/contact",
    label: "تواصل معنا",
  },
];

const authRoutes: Record<string, Route> = {
  signup: {
    url: "/signup",
    label: "انضم الآن",
  },
  login: {
    url: "/login",
    label: "تسجيل الدخول",
  },
};

export { landingRoute, appRoutes, authRoutes };
