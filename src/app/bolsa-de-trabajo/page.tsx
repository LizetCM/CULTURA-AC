import type { Metadata } from "next";
import { BolsaDeTrabajoBody } from "@/components/bolsa/BolsaDeTrabajoBody";
import { PageShell } from "@/components/site/PageShell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bolsa de trabajo",
  description: `Consejo consultivo, voluntariado por proyecto y convocatorias — ${site.name}.`,
};

export default function BolsaDeTrabajoPage() {
  return (
    <PageShell
      title="Bolsa de trabajo"
      contentMaxWidth="lg"
      subtitle="Consejo consultivo, voluntariado por programa y otras colaboraciones. Elige el perfil o línea en el formulario y adjunta tu CV en PDF."
    >
      <BolsaDeTrabajoBody />
    </PageShell>
  );
}
