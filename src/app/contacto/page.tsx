import type { Metadata } from "next";
import { SocialNetworkIcon } from "@/components/brand/SocialNetworkIcon";
import { PageShell } from "@/components/site/PageShell";
import { ContactForm } from "@/components/forms/ContactForm";
import { site, socialLinks } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: `Escríbenos — ${site.name}.`,
};

export default function ContactoPage() {
  return (
    <PageShell
      title="Contacto"
      subtitle="Estamos atentas y atentos a alianzas, voluntariado y consultas generales."
      centerHeader
    >
      <div className="grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2 text-center text-sm text-zinc-600 dark:text-zinc-400">
          <p className="font-semibold text-zinc-900 dark:text-zinc-50">
            Datos
          </p>
          <ul className="mt-4 space-y-3">
            <li>
              <span className="block text-xs font-medium uppercase tracking-wider text-zinc-500">
                Correo
              </span>
              <a
                href={`mailto:${site.contact.email}`}
                className="text-brand-teal hover:underline dark:text-accent-cyan"
              >
                {site.contact.email}
              </a>
            </li>
            <li>
              <span className="block text-xs font-medium uppercase tracking-wider text-zinc-500">
                Teléfono
              </span>
              <a
                href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                className="font-medium text-zinc-900 hover:underline dark:text-zinc-50"
              >
                {site.contact.phone.replace(/^\+52\s+/, "")}
              </a>
              <span className="mt-1 block text-xs text-zinc-500">
                Referencia: {site.contact.phoneContactName}
              </span>
            </li>
            <li>
              <span className="block text-xs font-medium uppercase tracking-wider text-zinc-500">
                Ubicación
              </span>
              {site.contact.address}
            </li>
          </ul>
          <p className="mt-8 text-xs font-medium uppercase tracking-wider text-zinc-500">
            Redes
          </p>
          <ul className="mt-3 flex flex-wrap justify-center gap-2">
            {socialLinks.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-label={item.ariaLabel}
                  className="inline-flex size-11 items-center justify-center rounded-full border border-zinc-200/80 bg-white text-zinc-700 transition hover:border-brand-teal/40 hover:bg-brand-teal/5 hover:text-brand-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-accent-cyan/50 dark:hover:bg-accent-cyan/10 dark:hover:text-accent-cyan dark:focus-visible:outline-accent-cyan"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <SocialNetworkIcon id={item.network} className="size-6 [&>svg]:size-6" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-3">
          <ContactForm />
        </div>
      </div>
    </PageShell>
  );
}
