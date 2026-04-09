import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

type ParticiparBolsaIntroProps = {
  className?: string;
};

export function ParticiparBolsaIntro({ className }: ParticiparBolsaIntroProps) {
  return (
    <Container className={cn("relative", className)}>
      <div className="mx-auto max-w-3xl [font-family:var(--font-inter),ui-sans-serif,system-ui,sans-serif]">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
          Participar
        </p>
        <h1 className="mt-4 text-balance text-center text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl md:text-5xl dark:text-zinc-50">
          Bolsa de Trabajo para Mujeres
        </h1>
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
          <ButtonLink
            href="/bolsa-de-trabajo"
            className="h-14 px-10 text-base transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-zinc-900/15"
          >
            Sumar mi talento
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
