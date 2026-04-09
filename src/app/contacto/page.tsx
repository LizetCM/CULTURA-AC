import type { Metadata } from "next";
import { ContactPanel } from "@/components/contact/ContactPanel";
import { PageShell } from "@/components/site/PageShell";
import { site } from "@/lib/site";

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
      <ContactPanel />
    </PageShell>
  );
}
