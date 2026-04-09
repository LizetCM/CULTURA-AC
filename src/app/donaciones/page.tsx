import type { Metadata } from "next";
import { PageShell } from "@/components/site/PageShell";
import { DonatePanel } from "@/components/forms/DonatePanel";
import { ContactForm } from "@/components/forms/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Donaciones",
  description: `Apoya a ${site.name} con donación en línea o por correo.`,
};

type Props = {
  searchParams: Promise<{ exito?: string }>;
};

export default async function DonacionesPage({ searchParams }: Props) {
  const q = await searchParams;
  const ok = q.exito === "1";

  return (
    <PageShell
      title="Donaciones"
      contentMaxWidth="lg"
      subtitle="Tu aporte fortalece proyectos culturales con transparencia. Elige pago con tarjeta (Stripe) o envíanos tus datos por correo."
    >
      {ok ? (
        <p
          className="mb-10 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100"
          role="status"
        >
          ¡Gracias! Recibimos tu pago. Si necesitas comprobante fiscal, escríbenos
          a {site.contact.email}.
        </p>
      ) : null}

      <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Donar en línea
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Activa{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
              STRIPE_SECRET_KEY
            </code>{" "}
            y{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
              NEXT_PUBLIC_SITE_URL
            </code>{" "}
            en tu entorno de producción.
          </p>
          <div className="mt-8">
            <DonatePanel />
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Formulario de contacto
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Alternativa sin pasarela: envíanos propuesta de donación, datos de
            facturación o dudas.
          </p>
          <div className="mt-8">
            <ContactForm defaultSubject="Propuesta de donación" />
          </div>
        </div>
      </div>
    </PageShell>
  );
}
