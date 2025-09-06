import type { Metadata } from "next";
import { IBMPlex } from "@/lib/fonts";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";
import "./globals.css";

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
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${IBMPlex.variable} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster
          position="bottom-right"
          expand={true}
          richColors={true}
          toastOptions={{
            duration: 4000,
            classNames: {
              toast:
                "bg-neutrals-100 border border-neutrals-300 text-neutrals-700",
              title: "text-neutrals-700 font-medium",
              description: "text-neutrals-500",
              actionButton:
                "bg-primary-500 text-neutrals-100 hover:bg-primary-400",
              cancelButton:
                "bg-neutrals-300 text-neutrals-600 hover:bg-neutrals-400",
              closeButton:
                "bg-neutrals-200 text-neutrals-600 hover:bg-neutrals-300",
              success: "bg-green-50 border-green-200 text-green-800",
              error: "bg-red-50 border-red-200 text-red-800",
              warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
              info: "bg-blue-50 border-blue-200 text-blue-800",
            },
          }}
        />
      </body>
    </html>
  );
}
