"use client";

import { useEffect, useRef, useState } from "react";
import { DonatePanel } from "@/components/forms/DonatePanel";
import { ContactForm } from "@/components/forms/ContactForm";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

export function DonacionesDonarBlock() {
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
          Donar por correo
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Elige un monto y abre tu correo con el texto listo, o usa el
          formulario si prefieres enviar el mensaje desde la web (requiere SMTP
          configurado en el servidor).
        </p>
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
            Alternativa: propuesta de donación, facturación o dudas. El
            formulario y los correos se dirigen a{" "}
            <a
              href={`mailto:${site.contact.email}`}
              className="font-medium text-brand-teal underline-offset-2 hover:underline dark:text-green-400"
            >
              {site.contact.email}
            </a>
            .
          </p>
          <div className="mt-8">
            <ContactForm defaultSubject="Propuesta de donación" />
          </div>
        </div>
      ) : null}
    </div>
  );
}
