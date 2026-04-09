import type { Metadata } from "next";
import { HomePageContent } from "@/components/home/HomePageContent";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Inicio",
  description: site.tagline,
  openGraph: {
    title: `${site.name} — Inicio`,
    description: site.tagline,
    url: "/",
  },
};

export default function Home() {
  return <HomePageContent />;
}
