import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Proyectos y programas",
  description: `Líneas de acción y programas de ${site.name}.`,
};

const programs = [
  {
    id: "ecoaldeas-del-norte",
    title: "EcoAldeas del Norte",
    body:
      "Promover un desarrollo urbano y rural sostenible que garantice el acceso a vivienda digna y asequible para todos, fortaleciendo la cohesión comunitaria, regulando los costos habitacionales y asegurando una oferta adecuada de vivienda social en las áreas afectadas por el éxodo rural y la urbanización descontrolada.",
  },
  {
    id: "proyecto-xomali",
    title: "Proyecto Xomalí",
    body:
      "Promover una sociedad inclusiva y equitativa que elimine las desigualdades de género mediante el fomento de la participación ciudadana, la reducción de brechas salariales, y la erradicación de estereotipos, garantizando que todas las personas tengan acceso igualitario a oportunidades y derechos en todos los ámbitos.",
  },
  {
    id: "conservacion-del-ecosistema",
    title: "Conservación del Ecosistema",
    body:
      "Fomentar prácticas sostenibles y responsables que promuevan la conservación ambiental mediante la reducción del consumo excesivo, la preservación de conocimientos tradicionales, y el impulso de una agricultura menos industrializada y más ecológica, para disminuir el impacto ambiental y proteger los recursos naturales.",
  },
] as const;

export default function ProyectosPage() {
  return (
    <PageShell
      title="Proyectos y programas"
      subtitle="Programas con enfoque en vivienda y territorio, equidad de género y conservación ambiental."
    >
      <div className="space-y-16">
        {programs.map((p) => (
          <section
            key={p.id}
            id={p.id}
            className="scroll-mt-24 border-b border-zinc-200 pb-14 last:border-0 last:pb-0 dark:border-zinc-800"
          >
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              {p.title}
            </h2>
            <p className="mt-4 leading-relaxed text-zinc-700 dark:text-zinc-300">
              {p.body}
            </p>
          </section>
        ))}

        <div className="rounded-2xl bg-surface-muted p-8 dark:bg-zinc-900">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
            ¿Quieres alianzas o patrocinio?
          </p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Escríbenos para explorar colaboraciones institucionales o apoyo a
            programas específicos.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/#contacto">Contactar</ButtonLink>
            <ButtonLink href="/donaciones" variant="outline">
              Apoyar económicamente
            </ButtonLink>
          </div>
        </div>

        <p className="text-sm text-zinc-500">
          <Link
            href="/"
            className="text-brand-teal hover:underline dark:text-accent-cyan"
          >
            ← Volver al inicio
          </Link>
        </p>
      </div>
    </PageShell>
  );
}
