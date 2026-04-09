import type { Metadata } from "next";
import { PageShell } from "@/components/site/PageShell";
import { DonacionesDonarBlock } from "@/components/donaciones/DonacionesDonarBlock";
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
  const stripeReady = Boolean(process.env.STRIPE_SECRET_KEY?.trim());

  return (
    <PageShell
      title="Donaciones"
      contentMaxWidth="lg"
      subtitle="Tu aporte fortalece proyectos culturales con transparencia. Paga con tarjeta (Stripe) o pulsa «Enviar datos por correo» para ver la opción por correo y el formulario."
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

      <DonacionesDonarBlock stripeReady={stripeReady} />
    </PageShell>
  );
}
