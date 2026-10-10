import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteEffects } from "@/components/site-effects";
import "./globals.css";

export const metadata: Metadata = {
  title: "Md. Maruf Rayhan — Android Developer",
  description: "Android developer building mobile products and learning data science and machine learning.",
  icons: { icon: "/favicon.svg" },
  openGraph: { title: "Md. Maruf Rayhan — Android Developer", description: "Android development · Data Science & Machine Learning", type: "website" },
  twitter: { card: "summary", title: "Md. Maruf Rayhan — Android Developer", description: "Android development · Data Science & Machine Learning" },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en"><body>{children}<SiteEffects/></body></html>;
}
