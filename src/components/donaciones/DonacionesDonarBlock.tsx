"use client";

import { useEffect, useRef, useState } from "react";
import { DonatePanel } from "@/components/forms/DonatePanel";
import { ContactForm } from "@/components/forms/ContactForm";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

type DonacionesDonarBlockProps = {
  stripeReady: boolean;
};

export function DonacionesDonarBlock({ stripeReady }: DonacionesDonarBlockProps) {
  const [correoVisible, setCorreoVisible] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (correoVisible && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [correoVisible]);

  return (
    <div
      className={cn(
        "grid gap-14 lg:gap-16",
        correoVisible ? "lg:grid-cols-2" : "",
      )}
    >
      <div>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Donar en línea
        </h2>
        {stripeReady ? (
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Pago seguro con tarjeta (Stripe Checkout). Serás redirigido a la
            pasarela para completar el donativo en MXN.
          </p>
        ) : (
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Para activar pagos con tarjeta, define la variable{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
              STRIPE_SECRET_KEY
            </code>{" "}
            (clave secreta de Stripe) en{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
              .env.local
            </code>{" "}
            o en Vercel → Settings → Environment Variables. Opcional:{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
              NEXT_PUBLIC_SITE_URL
            </code>{" "}
            con tu dominio definitivo (Stripe usará la URL de Vercel si no está
            definida).
          </p>
        )}
        <div className="mt-8">
          <DonatePanel onMostrarFormulario={() => setCorreoVisible(true)} />
        </div>
      </div>

      {correoVisible ? (
        <div ref={formRef}>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Formulario de contacto
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Alternativa sin pasarela: propuesta de donación, facturación o dudas.
            El formulario y los correos se dirigen a{" "}
            <a
              href={`mailto:${site.contact.email}`}
              className="font-medium text-brand-teal underline-offset-2 hover:underline dark:text-green-400"
            >
              {site.contact.email}
            </a>
            (mismo buzón si tienes configurado el envío SMTP en el servidor).
          </p>
          <div className="mt-8">
            <ContactForm defaultSubject="Propuesta de donación" />
          </div>
        </div>
      ) : null}
    </div>
  );
}
