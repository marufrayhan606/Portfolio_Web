import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WorkContent } from "./work-content";

export const metadata: Metadata = {
  title: "Work — Md. Maruf Rayhan | Android & Applied ML",
  description:
    "Comprehensive directory of native Android applications, on-device machine learning prototypes, space mission support platforms, and utilities.",
};

export default function WorkPage() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <WorkContent />
      <SiteFooter />
    </>
  );
}
