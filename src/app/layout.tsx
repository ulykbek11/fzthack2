import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "leaflet/dist/leaflet.css";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#090B11",
};

export const metadata: Metadata = {
  title: "QoS — Закажи заранее. Забери без очереди. Получи бонусы.",
  description:
    "Платформа предзаказа еды для кафе, ресторанов и fast food. Покупайте по цене самого заведения без наценок и получайте бонусы за каждый предзаказ.",
  keywords: [
    "QoS",
    "предзаказ еды",
    "takeaway",
    "foodtech",
    "без очереди",
    "кофейни",
    "рестораны",
    "бонусы",
  ],
  authors: [{ name: "QoS Team" }],
};

import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="scroll-smooth dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-[#f8fafc] text-slate-900 dark:bg-[#090B11] dark:text-gray-100 min-h-screen selection:bg-orange-500 selection:text-white transition-colors duration-300`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
