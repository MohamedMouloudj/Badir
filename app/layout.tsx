import type { Metadata } from "next";
import { IBMPlex } from "@/lib/fonts";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";
import "./globals.css";
import { getCookieCache } from "better-auth/cookies";

export const metadata: Metadata = {
  title: {
    default: "بــادِر",
    template: "%s | منصة تطوعية شبابية",
  },
  description:
    "تنظم الجهود وتقيم جسوراً بين من يملكون القدرة على العطاء، ومن يتطلعون إلى من يعينهم",
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${IBMPlex.variable} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
