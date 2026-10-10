import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SiteEffects } from "@/components/site-effects";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const viewport: Viewport = {
  themeColor: "#030712",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Md. Maruf Rayhan — Android Developer & Data Science",
  description:
    "Software Engineering student at DIU crafting intelligent Android applications with Kotlin, Jetpack Compose, Clean Architecture, and applied Machine Learning models.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Md. Maruf Rayhan — Android Developer & Data Science",
    description:
      "Crafting high-performance Android systems and applied machine learning models.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Md. Maruf Rayhan — Android Developer & Data Science",
    description:
      "Crafting high-performance Android systems and applied machine learning models.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        {children}
        <SiteEffects />
      </body>
    </html>
  );
}
