import type { Metadata } from "next";
import { BolsaDeTrabajoBody } from "@/components/bolsa/BolsaDeTrabajoBody";
import { ParticiparBolsaIntro } from "@/components/participar/ParticiparBolsaIntro";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Participar",
  description: `Bolsa de Trabajo para Mujeres: consejo consultivo, voluntariado y solicitud — ${site.name}.`,
};

export default function ParticiparPage() {
  return (
    <div className="relative min-h-0 flex-1 overflow-hidden bg-white dark:bg-zinc-950">
      <div
        className="pointer-events-none absolute inset-0 bg-grid opacity-40 dark:opacity-25"
        aria-hidden
      />
      <div className="relative py-14 sm:py-20 md:py-24">
        <ParticiparBolsaIntro ctaHref="#aplicar-bolsa" />
      </div>
      <section
        id="aplicar-bolsa"
        className="relative scroll-mt-[4.5rem] border-t border-zinc-200/80 bg-surface-muted py-12 sm:py-16 md:py-20 dark:border-zinc-800 dark:bg-zinc-900/40"
        aria-label="Formulario y convocatorias de bolsa de trabajo"
      >
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-green-900/85 dark:text-green-200/90">
              Bolsa de trabajo
            </p>
            <h2 className="mt-4 text-balance text-2xl font-bold tracking-tight text-brand-teal sm:text-3xl">
              Consejo consultivo, voluntariado y aplicación
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm text-zinc-600 sm:text-base dark:text-zinc-400">
              Elige el perfil o línea en el formulario y adjunta tu CV en PDF.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-4xl">
            <BolsaDeTrabajoBody showCrossLinks={false} />
          </div>
        </Container>
      </section>
    </div>
  );
}
