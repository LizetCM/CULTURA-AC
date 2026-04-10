import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

const ctaClassName =
  "inline-flex h-14 items-center justify-center rounded-full bg-zinc-900 px-10 text-base font-medium text-white transition hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-lg hover:shadow-zinc-900/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/30 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200";

type ParticiparBolsaIntroProps = {
  className?: string;
  /** Destino del botón (p. ej. ancla en inicio). */
  ctaHref?: string;
  /** En inicio ya existe h1 en el hero; usar h2 evita dos h1. */
  titleAs?: "h1" | "h2";
};

export function ParticiparBolsaIntro({
  className,
  ctaHref = "/participar#aplicar-bolsa",
  titleAs = "h1",
}: ParticiparBolsaIntroProps) {
  const TitleTag = titleAs;
  return (
    <Container className={cn("relative", className)}>
      <div className="mx-auto max-w-3xl [font-family:var(--font-inter),ui-sans-serif,system-ui,sans-serif]">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
          Participar
        </p>
        <TitleTag className="mt-4 text-balance text-center text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl md:text-5xl dark:text-zinc-50">
          Bolsa de Trabajo para Mujeres
        </TitleTag>
        <div className="mx-auto mt-8 max-w-2xl text-left text-pretty text-lg leading-relaxed text-zinc-600 sm:text-xl dark:text-zinc-400">
          <p>
            En nuestra asociación, estamos convencidas de que el talento
            femenino es el motor del cambio social. Por ello, hemos creado este
            espacio exclusivo para{" "}
            <strong className="font-semibold text-zinc-800 dark:text-zinc-200">
              mujeres profesionistas
            </strong>{" "}
            que buscan colaborar en un entorno de{" "}
            <strong className="font-semibold text-zinc-800 dark:text-zinc-200">
              convivencia sana, segura y flexible
            </strong>
            .
          </p>
          <p className="mt-6">
            Queremos que tu carrera profesional conviva en armonía con tu vida
            personal. Por el momento, nuestra modalidad de integración es a
            través de{" "}
            <strong className="font-semibold text-zinc-800 dark:text-zinc-200">
              proyectos por honorarios
            </strong>{" "}
            y voluntariado estratégico, permitiendo que cada aliada gestione sus
            tiempos de manera autónoma y segura. Si eres contadora, creativa o
            especialista en temas sociales, ¡queremos conocerte!
          </p>
        </div>
        <div className="mt-12 flex justify-center">
          {ctaHref.startsWith("#") ? (
            <a href={ctaHref} className={ctaClassName}>
              Sumar mi talento
            </a>
          ) : (
            <ButtonLink href={ctaHref} className={ctaClassName}>
              Sumar mi talento
            </ButtonLink>
          )}
        </div>
      </div>
    </Container>
  );
}
