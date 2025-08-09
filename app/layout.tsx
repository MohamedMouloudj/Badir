import type { Metadata } from "next";
import { IBMPlex } from "@/lib/fonts";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "بــادِر",
    template: "%s | منصة تطوعية شبابية",
  },
  description:
    "تنظم الجهود وتقيم جسوراً بين من يملكون القدرة على العطاء، ومن يتطلعون إلى من يعينهم",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${IBMPlex.variable} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
