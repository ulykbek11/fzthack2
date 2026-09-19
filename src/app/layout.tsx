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
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "QoS — предзаказ еды в Алматы",
  description:
    "Выбирайте заведение, оформляйте предзаказ и получайте бонусы за заказы в незагруженные часы.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} min-h-screen bg-white text-[#202124] antialiased selection:bg-[#ffc244] selection:text-[#173f35]`}
      >
        {children}
      </body>
    </html>
  );
}
