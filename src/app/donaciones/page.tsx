import type { Metadata } from "next";
import { PageShell } from "@/components/site/PageShell";
import { DonacionesDonarBlock } from "@/components/donaciones/DonacionesDonarBlock";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Donaciones",
  description: `Apoya a ${site.name} por correo o formulario de contacto.`,
};

export default function DonacionesPage() {
  return (
    <PageShell
      title="Donaciones"
      contentMaxWidth="lg"
      subtitle="Tu aporte fortalece proyectos culturales con transparencia. Por ahora las donaciones son por correo (mailto) o formulario web; indica si requieres comprobante fiscal."
    >
      <DonacionesDonarBlock />
    </PageShell>
  );
}
