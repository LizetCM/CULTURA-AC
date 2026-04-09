import type { Metadata } from "next";
import { PageShell } from "@/components/site/PageShell";
import { Card } from "@/components/ui/Card";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre nosotros",
  description: `Historia, misión y valores de ${site.name}.`,
};

export default function SobreNosotrosPage() {
  return (
    <PageShell
      title="Sobre nosotros"
      subtitle="Construimos puentes entre cultura, educación y comunidad con rigor, sensibilidad y transparencia."
    >
      <div className="space-y-10 text-zinc-700 dark:text-zinc-300">
        <section>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Historia
          </h2>
          <p className="mt-3 leading-relaxed">
            {site.name} nace como respuesta a la necesidad de generar espacios
            culturales inclusivos, sostenibles y anclados al territorio. A lo
            largo del tiempo hemos consolidado alianzas con instituciones
            públicas, organizaciones de la sociedad civil y comunidades para
            ampliar el acceso a la cultura y fortalecer el tejido social.
          </p>
        </section>

        <div className="grid gap-6 sm:grid-cols-3">
          <Card>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-teal">
              Misión
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Impulsar proyectos culturales y educativos que transformen
              comunidades mediante participación, equidad y excelencia en la
              gestión.
            </p>
          </Card>
          <Card>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-teal">
              Visión
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Ser un referente nacional de impacto cultural medible, abierto al
              diálogo y reconocido por su ética y resultados compartidos.
            </p>
          </Card>
          <Card>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-teal">
              Valores
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Transparencia, colaboración, diversidad, cuidado del territorio y
              enfoque de derechos humanos.
            </p>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}
