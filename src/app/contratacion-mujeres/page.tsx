import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contratación de mujeres",
  description: `Red de talento femenino y servicios profesionales — ${site.name}.`,
};

const services = [
  {
    title: "Dirección y producción cultural",
    body:
      "Gestión integral de festivales, exposiciones y circuitos comunitarios con enfoque participativo.",
  },
  {
    title: "Facilitación y pedagogía cultural",
    body:
      "Diseño de talleres, mediación en museos y rutas educativas inclusivas.",
  },
  {
    title: "Comunicación e incidencia",
    body:
      "Narrativas, contenido digital y estrategias para visibilizar impacto social.",
  },
] as const;

export default function ContratacionMujeresPage() {
  return (
    <PageShell
      title="Contratación de mujeres"
      subtitle="Conectamos organizaciones con talento femenino en cultura, educación y desarrollo social. Priorizamos condiciones justas, seguridad y enfoque de género."
    >
      <section className="rounded-2xl bg-brand-teal px-6 py-8 text-brand-teal-foreground sm:px-8 sm:py-10">
        <h2 className="text-lg font-semibold">Objetivo</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/90">
          Visibilizar y contratar competencias de mujeres y personas con
          identidades disidentes en espacios culturales, reduciendo brechas de
          acceso y promoviendo liderazgos sostenibles.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink
            href="/#contacto"
            className="border-0 bg-white text-zinc-900 hover:bg-zinc-100"
          >
            Solicitar talento
          </ButtonLink>
          <a
            href={`mailto:${site.contact.email}?subject=${encodeURIComponent("Red de contratación de mujeres")}`}
            className="inline-flex h-11 items-center justify-center rounded-full border border-white/40 bg-transparent px-6 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Escribir al equipo
          </a>
        </div>
      </section>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {services.map((s) => (
          <Card key={s.title}>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
              {s.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {s.body}
            </p>
          </Card>
        ))}
      </div>

      <p className="mt-12 text-sm text-zinc-500">
        <Link
          href="/#bolsa-de-trabajo"
          className="font-medium text-brand-teal hover:underline dark:text-accent-cyan"
        >
          Ver bolsa de trabajo
        </Link>
        {" · "}
        <Link href="/" className="hover:underline">
          Inicio
        </Link>
      </p>
    </PageShell>
  );
}
