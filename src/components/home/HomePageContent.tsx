import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/home/Reveal";
import { cn } from "@/lib/cn";
import {
  colaboradores,
  colaboradorCategoryLabels,
} from "@/lib/colaboradores";
import { miembrosConsejoDirectivo } from "@/lib/consejo-directivo";
import { site } from "@/lib/site";

const heroImage =
  "https://images.unsplash.com/photo-1518996993288-48fc726ac633?auto=format&fit=crop&w=2400&q=85";

type ProgramSection = {
  heading?: string;
  items: readonly string[];
};

type ProgramCard = {
  title: string;
  sections: readonly ProgramSection[];
  image: string;
  imageFit: "contain" | "cover";
  imageBg: string;
};

const projectCards: readonly ProgramCard[] = [
  {
    title: "Xomali, maternando juntas",
    sections: [
      {
        heading: "Actividades",
        items: [
          "Acompañamiento legal y psicológico a maternidades en riesgo.",
          "Impulso al intercambio que generen ganancia (gratiferia, trueques, mercados solidarios, reciprocidad, cadena de favores, tequios, etc.) para fortalecer la autonomía económica de las mujeres que habitan comunidades rurales en situación de vulnerabilidad.",
          "Formación en economía social y solidaria.",
          "Escuelita de sostenibilidad para infancias: Semillas del Futuro. Alianza con la UANL.",
          "Formación en nuevas masculinidades para la promoción de la equidad de género. Alianza con el IINSO, UANL.",
          "Capacitación en proyectos productivos sostenibles y regenerativos.",
        ],
      },
    ],
    image: "/programas/proyecto-xomali.png",
    imageFit: "contain",
    /** Blanco para que la ilustración (fondo claro) destaque */
    imageBg: "bg-white",
  },
  {
    title: "Cooperativa de vivienda: Ecoaldeas del Norte",
    sections: [
      {
        items: [
          "Conformación de comité vecinal que va a accionar y gestionar la seguridad legal de los terrenos.",
          "Formación en proceso de seguridad legal del terreno.",
          "Formación de organización comunitaria de la figura legal elegida para la administración de los bienes comunes.",
          "Acompañamiento en gestiones para el reconocimiento vecinal: en los ejidos y ante gobierno.",
          "Formación de Cooperativa de Vivienda.",
        ],
      },
    ],
    image: "/programas/ecoaldeas-del-norte.png",
    imageFit: "contain",
    imageBg: "bg-zinc-100",
  },
  {
    title: "Conservación del Ecosistema",
    sections: [
      {
        items: [
          "Diseño de viviendas basado en la permacultura.",
          "Creación de espacios comunitarios.",
          "Conservación del suelo para la gestión integral del agua.",
          "Creación de senderos interpretativos para la preservación y cuidado de los espacios comunes.",
          "Reforestación basada en la permacultura.",
        ],
      },
      {
        heading: "Educación ambiental: Biblioteca Semillas del Futuro",
        items: [
          "Talleres de recuperación de saberes.",
          "Editorial Semillas del Futuro.",
        ],
      },
    ],
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=85",
    imageFit: "cover",
    imageBg: "bg-zinc-900",
  },
];

const mapEmbedSrc = site.contact.mapEmbedUrl;

const philanthropicPartners = [
  {
    name: "Fundación Deacero",
    src: "/inversionistas/fundacion-deacero.png",
    alt: "Logotipo de Fundación Deacero",
    width: 197,
    height: 88,
    circleClass:
      "bg-white shadow-md ring-1 ring-zinc-200/90 dark:bg-zinc-100 dark:ring-zinc-600/40",
    imgClass:
      "max-h-[3.25rem] w-auto max-w-[82%] object-contain sm:max-h-14 md:max-h-[3.75rem]",
  },
  {
    name: "Fundación Merced",
    src: "/inversionistas/fundacion-merced.png",
    alt: "Logotipo de Fundación Merced",
    width: 205,
    height: 112,
    circleClass:
      "bg-white shadow-md ring-1 ring-zinc-200/90 dark:bg-zinc-100 dark:ring-zinc-600/40",
    imgClass:
      "max-h-[3.75rem] w-auto max-w-[78%] object-contain sm:max-h-16 md:max-h-[4.25rem]",
  },
  {
    name: "Tecnológico de Monterrey",
    src: "/inversionistas/tecnologico-monterrey.png",
    alt: "Logotipo del Tecnológico de Monterrey",
    width: 137,
    height: 137,
    circleClass:
      "bg-surface-muted shadow-md ring-1 ring-zinc-300/80 dark:bg-zinc-800 dark:ring-zinc-600/50",
    imgClass:
      "max-h-[6.25rem] w-auto max-w-[88%] object-contain sm:max-h-28 md:max-h-32",
  },
] as const;

export function HomePageContent() {
  return (
    <main id="contenido-principal">
      {/* Hero pantalla completa — alineado a referencia con barra oscura (NavBar overlay) */}
      <section
        className="relative flex min-h-[100svh] items-center justify-center"
        aria-label="Presentación"
      >
        <Image
          src={heroImage}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/68 to-zinc-950/88"
          aria-hidden
        />
        <Container className="relative z-10 flex max-w-4xl flex-col items-center px-6 py-28 text-center sm:py-32 md:py-40">
          <p className="home-animate-hero mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
            Asociación Civil
          </p>
          <h1 className="home-animate-hero home-animate-hero-delay-1 max-w-4xl text-balance font-semibold tracking-tight text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
            Cultura A.C.
          </h1>
          <p className="home-animate-hero home-animate-hero-delay-2 mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-white/85 sm:text-xl md:text-2xl">
            Impulsamos el desarrollo cultural y social a través de proyectos
            que transforman comunidades.
          </p>
          <div className="home-animate-hero home-animate-hero-delay-3 mt-12 flex w-full flex-col items-stretch justify-center gap-4 sm:flex-row sm:justify-center">
            <ButtonLink
              href="/donaciones"
              className="h-14 min-w-[11rem] bg-accent-cyan px-10 text-base text-white shadow-lg shadow-black/25 hover:bg-accent-cyan-hover dark:text-white"
            >
              Donar
            </ButtonLink>
            <ButtonLink
              href="/participar"
              variant="outline"
              className="h-14 min-w-[11rem] border-white/35 bg-white/10 px-10 text-base text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/18"
            >
              Participar
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* ¿Quiénes somos? / Objetivo — tipografía y bloque tipo referencia, más aire */}
      <section
        className="bg-surface-muted py-20 sm:py-28 md:py-32 dark:bg-zinc-900"
        aria-labelledby="quienes-heading"
      >
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 lg:gap-x-24">
            <Reveal>
              <div className="max-w-xl">
                <h2
                  id="quienes-heading"
                  className="text-3xl font-bold tracking-tight text-brand-teal sm:text-4xl"
                >
                  ¿Quiénes somos?
                </h2>
                <p className="mt-6 text-pretty text-base leading-relaxed text-zinc-700 sm:text-lg">
                  Somos una comunidad de personas y aliadas comprometidas con
                  ampliar el acceso a la cultura y fortalecer el tejido social.
                  Articulamos trabajo comunitario, educación cultural y
                  desarrollo territorial con enfoque de derechos, equidad de
                  género y transparencia.
                </p>
              </div>
            </Reveal>
            <Reveal delayMs={90}>
              <div className="max-w-xl lg:justify-self-end">
                <h2 className="text-3xl font-bold tracking-tight text-brand-teal sm:text-4xl">
                  Objetivo
                </h2>
                <p className="mt-6 text-pretty text-base leading-relaxed text-zinc-700 sm:text-lg">
                  Impulsar iniciativas culturales y educativas que generen
                  bienestar compartido, participación ciudadana e impacto
                  medible en las comunidades donde trabajamos; priorizando
                  alianzas locales, evidencia y rendición de cuentas.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Programas — estilo referencia: imagen + bloque teal (título en pastilla + cuerpo) */}
      <section
        className="bg-white py-20 sm:py-28 md:py-36 dark:bg-zinc-950"
        aria-labelledby="programas-heading"
      >
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="text-base font-medium text-zinc-600 sm:text-lg">
              ¡Únete a las actividades que tenemos disponibles!
            </p>
            <h2
              id="programas-heading"
              className="mt-4 text-balance text-4xl font-bold tracking-tight text-brand-teal sm:text-5xl"
            >
              Programas
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-10 md:mt-20 lg:grid-cols-3 lg:gap-10 lg:items-stretch">
            {projectCards.map((card, i) => (
              <Reveal key={card.title} delayMs={i * 100}>
                <article className="flex h-full flex-col overflow-hidden rounded-3xl shadow-lg shadow-zinc-900/10 ring-1 ring-zinc-200/80 dark:ring-zinc-700">
                  <div
                    className={cn(
                      "relative aspect-[16/11] shrink-0 overflow-hidden",
                      card.imageBg,
                    )}
                  >
                    <Image
                      src={card.image}
                      alt={`Programa: ${card.title}`}
                      fill
                      className={cn(
                        card.imageFit === "contain"
                          ? "object-contain p-3 sm:p-4"
                          : "object-cover",
                      )}
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      priority={i === 0}
                      unoptimized={card.image.startsWith("/")}
                    />
                  </div>
                  <div className="flex flex-1 flex-col bg-[#166534] p-6 sm:p-7">
                    <div className="flex justify-center">
                      <div className="max-w-full rounded-full bg-[#14532d] px-5 py-3 text-center shadow-sm sm:px-6 sm:py-3.5">
                        <h3 className="text-base font-bold uppercase tracking-wide text-white sm:text-lg">
                          {card.title}
                        </h3>
                      </div>
                    </div>
                    <div className="mt-4 space-y-4 rounded-2xl rounded-tl-sm bg-[#4d7c62] p-5 text-base leading-relaxed text-white shadow-inner sm:p-6 sm:text-lg">
                      {card.sections.map((section, si) => (
                        <div key={si}>
                          {section.heading ? (
                            <p
                              className={cn(
                                "text-center text-base font-semibold leading-snug tracking-tight text-white sm:text-lg",
                                si > 0 && "mt-4 border-t border-white/15 pt-4",
                              )}
                            >
                              {section.heading}
                            </p>
                          ) : null}
                          <ul
                            className={cn(
                              "list-disc list-outside space-y-3 pl-5 text-left text-pretty marker:text-white/85",
                              section.heading ? "mt-3" : "",
                            )}
                          >
                            {section.items.map((item, ii) => (
                              <li key={`${si}-${ii}`}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Alianzas operativas y consultores — enlaces a perfil */}
      <section
        id="red-profesional"
        className="border-y border-zinc-200/80 bg-gradient-to-b from-[#f4f7f6] via-white to-[#f4f7f6] py-20 sm:py-24 md:py-28 dark:border-zinc-800 dark:from-zinc-950 dark:via-zinc-900/50 dark:to-zinc-950"
        aria-labelledby="red-profesional-heading"
      >
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-green-900/85 dark:text-green-200/90">
              Red profesional
            </p>
            <h2
              id="red-profesional-heading"
              className="mt-4 text-balance text-3xl font-bold tracking-tight text-brand-teal sm:text-4xl"
            >
              Alianzas operativas y consultores
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-zinc-700 sm:text-lg">
              Personas y organizaciones que fortalecen nuestros programas. En
              cada perfil encontrarás la trayectoria completa y la fotografía.
            </p>
          </Reveal>

          <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:mt-16 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {colaboradores.map((persona, i) => (
              <Reveal key={persona.slug} delayMs={i * 90}>
                <Link
                  href={`/colaboradores/${persona.slug}`}
                  aria-label={`Ver perfil de ${persona.name}`}
                  className="group flex h-full min-h-[200px] flex-col justify-between rounded-2xl border border-zinc-200/90 bg-white px-8 py-8 text-center shadow-[0_8px_30px_-12px_rgba(22,101,52,0.09)] ring-1 ring-green-950/[0.04] transition duration-300 hover:-translate-y-0.5 hover:border-green-200/90 hover:shadow-[0_16px_36px_-18px_rgba(20,83,45,0.3)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 dark:border-zinc-700 dark:bg-zinc-900 dark:ring-white/5 dark:hover:border-green-600/50 dark:focus-visible:outline-green-300"
                >
                  <div>
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-green-900/90 dark:text-green-200/90">
                      {colaboradorCategoryLabels[persona.category]}
                    </p>
                    <h3 className="mt-4 text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
                      {persona.name}
                    </h3>
                  </div>
                  <p className="mt-8 text-sm font-semibold text-green-800 dark:text-green-300">
                    Ver perfil
                    <span
                      className="ml-1 inline-block transition group-hover:translate-x-0.5"
                      aria-hidden
                    >
                      →
                    </span>
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Inversionistas filantrópicos */}
      <section
        className="border-y border-zinc-200/70 bg-surface-mint py-20 sm:py-24 md:py-28 dark:border-zinc-800 dark:bg-zinc-900/80"
        aria-labelledby="inversionistas-heading"
      >
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2
              id="inversionistas-heading"
              className="text-balance text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50"
            >
              Inversionistas filantrópicos
            </h2>
            <p className="mt-4 text-pretty text-sm text-zinc-600 dark:text-zinc-400">
              Agradecemos la confianza de quienes hacen posible nuestros
              programas.
            </p>
          </Reveal>

          <div className="mt-14 flex flex-col items-center gap-12 sm:mt-16 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-14 sm:gap-y-12 md:gap-x-16 lg:gap-x-20">
            {philanthropicPartners.map((partner, i) => (
              <Reveal key={partner.src} delayMs={i * 100}>
                <div className="flex flex-col items-center text-center">
                  <div
                    className={cn(
                      "flex size-40 items-center justify-center rounded-full sm:size-44 md:size-48",
                      partner.circleClass,
                    )}
                  >
                    <Image
                      src={partner.src}
                      alt={partner.alt}
                      width={partner.width}
                      height={partner.height}
                      className={partner.imgClass}
                      sizes="(max-width: 640px) 160px, 192px"
                    />
                  </div>
                  <p className="mt-4 max-w-[12rem] text-xs font-medium leading-snug text-zinc-700 dark:text-zinc-300">
                    {partner.name}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Equipo — mismo patrón que red profesional; fotos en página de perfil */}
      <section
        id="equipo-consejo"
        className="bg-brand-teal py-20 text-brand-teal-foreground sm:py-28 md:py-32 dark:bg-zinc-950"
        aria-labelledby="equipo-heading"
      >
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/65">
              Gobierno corporativo
            </p>
            <h2
              id="equipo-heading"
              className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              Conoce al equipo
            </h2>
            <p className="mt-3 text-sm font-medium uppercase tracking-widest text-white/70">
              Consejo directivo
            </p>
          </Reveal>

          <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 sm:mt-14 lg:grid-cols-4 lg:gap-6">
            {miembrosConsejoDirectivo.map((member, i) => (
              <Reveal key={member.slug} delayMs={i * 70}>
                <Link
                  href={`/equipo/${member.slug}`}
                  aria-label={`Ver perfil de ${member.name}`}
                  className="group flex h-full min-h-[190px] flex-col justify-between rounded-2xl border border-white/15 bg-white/95 px-6 py-7 text-center shadow-[0_12px_40px_-18px_rgba(0,0,0,0.35)] ring-1 ring-white/20 transition duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <div>
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-green-900/90">
                      {member.role}
                    </p>
                    <h3 className="font-display mt-4 text-balance text-lg font-medium leading-snug text-zinc-900 sm:text-xl">
                      {member.name}
                    </h3>
                  </div>
                  <p className="mt-6 text-sm font-semibold text-green-800">
                    Ver perfil
                    <span
                      className="ml-1 inline-block transition group-hover:translate-x-0.5"
                      aria-hidden
                    >
                      →
                    </span>
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Donaciones */}
      <section
        className="relative overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-emerald-950 py-20 sm:py-28 md:py-36"
        aria-labelledby="donar-heading"
      >
        <div
          className="pointer-events-none absolute -right-24 top-1/2 size-[28rem] -translate-y-1/2 rounded-full bg-emerald-500/20 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-20 bottom-0 size-80 rounded-full bg-amber-400/15 blur-3xl"
          aria-hidden
        />
        <Container className="relative">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/50">
              Apoyo
            </p>
            <h2
              id="donar-heading"
              className="mt-5 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl"
            >
              Tu apoyo hace posible que sigamos generando impacto real.
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-white/75">
              Con transparencia y rendición de cuentas, destina recursos a
              programas culturales que llegan a quienes más lo necesitan.
            </p>
            <div className="mt-12 flex justify-center">
              <ButtonLink
                href="/donaciones"
                className="h-14 border-0 bg-accent-cyan px-10 text-base text-white shadow-lg shadow-black/25 transition hover:-translate-y-0.5 hover:bg-accent-cyan-hover"
              >
                Donar ahora
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Ubicación — fondo menta, mapa incrustado (sin mapas “decorados”) */}
      <section
        className="bg-surface-mint py-20 sm:py-24 md:py-28 dark:bg-zinc-900"
        aria-labelledby="ubicacion-heading"
      >
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <h2
                id="ubicacion-heading"
                className="text-3xl font-bold tracking-tight text-brand-teal sm:text-4xl"
              >
                ¿Dónde nos encontramos?
              </h2>
              <p className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-zinc-700 sm:text-lg">
                Nos ubicamos en <strong>{site.contact.venueName}</strong>,{" "}
                {site.contact.address.replace(/^Real Campestre,\s*/, "")}.
                Coordinamos proyectos y reuniones con aliados; agenda tu visita
                o escríbenos para canalizar colaboraciones.
              </p>
              <div className="mt-8">
                <ButtonLink
                  href={site.contact.mapsOpenUrl}
                  className="h-12 border-2 border-brand-teal bg-accent-cyan px-8 text-sm font-semibold text-white hover:bg-accent-cyan-hover dark:border-zinc-600"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Ver en mapa
                </ButtonLink>
              </div>
            </Reveal>
            <Reveal delayMs={100}>
              <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-zinc-900/10 dark:ring-zinc-700">
                <iframe
                  title={`Ubicación: ${site.contact.venueName}`}
                  src={mapEmbedSrc}
                  className="aspect-[4/3] min-h-[280px] w-full border-0 grayscale-[0.08] contrast-[1.02] sm:min-h-[320px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </main>
  );
}
