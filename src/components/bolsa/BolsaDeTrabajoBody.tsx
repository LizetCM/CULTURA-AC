import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { JobApplicationForm } from "@/components/forms/JobApplicationForm";
import {
  consejoConsultivoRoles,
  voluntariadoProgramas,
} from "@/lib/bolsa-trabajo";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

type BolsaDeTrabajoBodyProps = {
  className?: string;
  /** En la página de inicio suele ocultarse el pie con enlaces cruzados. */
  showCrossLinks?: boolean;
};

export function BolsaDeTrabajoBody({
  className,
  showCrossLinks = true,
}: BolsaDeTrabajoBodyProps) {
  return (
    <div className={cn("space-y-14", className)}>
      <section aria-labelledby="consejo-consultivo-heading">
        <h2
          id="consejo-consultivo-heading"
          className="text-lg font-semibold text-zinc-900 dark:text-zinc-50"
        >
          Consejo consultivo
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Buscamos personas expertas que acompañen con opiniones técnicas y
          éticas; la participación es acorde a la naturaleza consultiva del
          órgano.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {consejoConsultivoRoles.map((rol) => (
            <Card key={rol.title}>
              <p className="text-xs font-semibold uppercase tracking-wide text-green-900/90 dark:text-green-300/90">
                {rol.tag}
              </p>
              <h3 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
                {rol.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {rol.body}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="voluntariado-heading">
        <h2
          id="voluntariado-heading"
          className="text-lg font-semibold text-zinc-900 dark:text-zinc-50"
        >
          Voluntariado
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Convocatorias por proyecto. En el formulario selecciona la línea que
          te interesa; si tienes dudas, escríbenos en el mensaje.
        </p>
        <div className="mt-8 space-y-8">
          {voluntariadoProgramas.map((programa) => (
            <Card key={programa.title}>
              <p className="text-xs font-semibold uppercase tracking-wide text-green-900/90 dark:text-green-300/90">
                Proyecto
              </p>
              <h3 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
                {programa.title}
              </h3>
              <div className="mt-6 space-y-6 border-t border-zinc-200/90 pt-6 dark:border-zinc-700">
                {programa.sections.map((sec, idx) => (
                  <div key={idx}>
                    {sec.title ? (
                      <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                        {sec.title}
                      </h4>
                    ) : null}
                    <div className="mt-2 space-y-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {sec.paragraphs.map((p, pi) => (
                        <p key={pi}>{p}</p>
                      ))}
                    </div>
                    {sec.bullets && sec.bullets.length > 0 ? (
                      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-zinc-600 dark:text-zinc-400">
                        {sec.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    ) : null}
                    {sec.capacitaciones && sec.capacitaciones.length > 0 ? (
                      <div className="mt-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                          Capacitación y fortalecimiento
                        </p>
                        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-zinc-600 dark:text-zinc-400">
                          {sec.capacitaciones.map((c) => (
                            <li key={c}>{c}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    {sec.carreras && sec.carreras.length > 0 ? (
                      <div className="mt-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                          Carreras
                        </p>
                        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-zinc-600 dark:text-zinc-400">
                          {sec.carreras.map((c) => (
                            <li key={c}>{c}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    {sec.tiempo ? (
                      <p className="mt-4 text-sm font-medium text-green-950 dark:text-green-200">
                        Tiempo: {sec.tiempo}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-surface-muted p-6 dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Aplicar
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Dudas:{" "}
          <a
            href={`mailto:${site.contact.email}`}
            className="text-brand-teal hover:underline dark:text-accent-cyan"
          >
            {site.contact.email}
          </a>
        </p>
        <div className="mt-8">
          <JobApplicationForm />
        </div>
      </section>

      {showCrossLinks ? (
        <p className="text-sm text-zinc-500">
          <Link
            href="/#participar"
            className="font-medium text-brand-teal hover:underline dark:text-accent-cyan"
          >
            Contratación de mujeres
          </Link>
          {" · "}
          <Link href="/#contacto" className="hover:underline">
            Contacto
          </Link>
        </p>
      ) : null}
    </div>
  );
}
