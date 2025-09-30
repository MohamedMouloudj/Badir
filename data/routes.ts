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

// const appRoutes: Route[] = [
//   {
//     url: "/dashboard",
//     label: "لوحة التحكم",
//   },
//   {
//     url: "/organizations",
//     label: "المنظمات",
//   },
//   {
//     url: "/initiatives",
//     label: "المبادرات",
//   },
//   {
//     url: "/settings",
//     label: "الإعدادات",
//   },
//   {
//     url: "/contact",
//     label: "تواصل معنا",
//   },
// ];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const authRoutes: Record<string, any> = {
  signup: {
    signupOrganization: {
      url: "/signup/organization",
      label: "منظمة",
    },
    signupIndividual: {
      url: "/signup/user",
      label: "مستخدم",
    },
    label: "انضم الآن",
  },
  login: {
    url: "/login",
    label: "تسجيل الدخول",
  },
};

const forMiddleware = {
  publicRoutes: [
    "/",
    "/organizations",
    "/initiatives",
    "/contact",
    "/about",
    "/privacy-policy",
    "/terms",
    "/organization-guide",
    "/volunteer-guide",
    "/faq",
    "/how-it-works",
    "/assistance",
  ],
  authRoutes: ["/signup", "/login", "/forgot-password"],
  apiAuthPrefix: "/api/auth",
};

const AUTHORIZED_REDIRECTION = "/initiatives";

export { landingRoute, authRoutes, forMiddleware, AUTHORIZED_REDIRECTION };
