import type { Metadata } from "next";
import { PageShell } from "@/components/site/PageShell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Aviso de privacidad",
  robots: { index: false, follow: true },
};

export default function AvisoPrivacidadPage() {
  return (
    <PageShell
      title="Aviso de privacidad"
      subtitle="Borrador informativo. Sustituye este texto por el aviso elaborado conforme a la LFPDPPP y lineamientos aplicables."
    >
      <div className="prose prose-zinc max-w-none text-sm leading-relaxed dark:prose-invert">
        <p>
          <strong>{site.name}</strong> (en lo sucesivo, “el responsable”) pone a
          su disposición el presente aviso de privacidad con fundamento en la
          legislación mexicana en materia de protección de datos personales.
        </p>
        <h2 className="mt-8 text-base font-semibold">Datos que podemos recabar</h2>
        <p>
          Identificación básica, datos de contacto y, en su caso, información
          relacionada con donativos o candidaturas laborales que nos proporciones
          de forma voluntaria a través de formularios o correo electrónico.
        </p>
        <h2 className="mt-8 text-base font-semibold">Finalidades</h2>
        <p>
          Atender solicitudes, administrar donativos, dar seguimiento a procesos
          de selección, enviar información institucional relevante y cumplir
          obligaciones legales.
        </p>
        <h2 className="mt-8 text-base font-semibold">Transferencias</h2>
        <p>
          No transferimos datos personales a terceros, salvo obligación legal o
          requerimiento de autoridad competente.
        </p>
        <h2 className="mt-8 text-base font-semibold">Derechos ARCO</h2>
        <p>
          Puedes ejercer los derechos de acceso, rectificación, cancelación y
          oposición escribiendo a{" "}
          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
          Indica nombre completo, medio de contacto y el derecho que deseas
          ejercer.
        </p>
        <p className="mt-8 text-xs text-zinc-500">
          Última actualización: marzo de {new Date().getFullYear()}.
        </p>
      </div>
    </PageShell>
  );
}
