import type { Metadata } from "next";
import { ParticiparBolsaIntro } from "@/components/participar/ParticiparBolsaIntro";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Participar",
  description: `Bolsa de Trabajo para Mujeres — espacio para colaborar con ${site.name}.`,
};

export default function ParticiparPage() {
  return (
    <div className="relative min-h-0 flex-1 overflow-hidden bg-white py-14 sm:py-20 md:py-24 dark:bg-zinc-950">
      <div
        className="pointer-events-none absolute inset-0 bg-grid opacity-40 dark:opacity-25"
        aria-hidden
      />
      <ParticiparBolsaIntro />
    </div>
  );
}
