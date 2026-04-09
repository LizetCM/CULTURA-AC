import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import {
  getMiembroConsejoBySlug,
  miembrosConsejoDirectivo,
} from "@/lib/consejo-directivo";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string }> };

const CONSEJO_LABEL = "Consejo directivo";

export function generateStaticParams() {
  return miembrosConsejoDirectivo.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const m = getMiembroConsejoBySlug(slug);
  if (!m) return { title: "Equipo" };
  return {
    title: m.name,
    description: `${m.role} · ${CONSEJO_LABEL} — ${site.name}.`,
  };
}

export default async function EquipoMiembroPage({ params }: PageProps) {
  const { slug } = await params;
  const m = getMiembroConsejoBySlug(slug);
  if (!m) notFound();

  return (
    <div className="min-h-0 flex-1 bg-[#f6f8f7] dark:bg-zinc-950">
      <Container className="py-10 sm:py-14 md:py-16">
        <nav className="text-sm text-zinc-600 dark:text-zinc-400">
          <Link
            href="/"
            className="font-medium text-brand-teal transition hover:underline dark:text-accent-cyan"
          >
            Inicio
          </Link>
          <span className="mx-2 text-zinc-400" aria-hidden>
            /
          </span>
          <Link
            href="/#equipo-consejo"
            className="font-medium text-brand-teal transition hover:underline dark:text-accent-cyan"
          >
            Conoce al equipo
          </Link>
          <span className="mx-2 text-zinc-400" aria-hidden>
            /
          </span>
          <span className="text-zinc-900 dark:text-zinc-200">{m.name}</span>
        </nav>

        <article className="mt-10 overflow-hidden rounded-3xl border border-zinc-200/90 bg-white shadow-[0_24px_60px_-24px_rgba(22,101,52,0.14)] dark:border-zinc-800 dark:bg-zinc-900">
          <div className="grid lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)] xl:grid-cols-[minmax(0,300px)_minmax(0,1fr)]">
            <div className="flex justify-center bg-zinc-100 px-6 py-8 sm:px-8 sm:py-10 lg:justify-center lg:py-12 dark:bg-zinc-800">
              <div className="relative aspect-[3/4] w-full max-w-[200px] overflow-hidden rounded-2xl shadow-md ring-1 ring-zinc-900/10 sm:max-w-[240px] lg:w-full lg:max-w-[260px]">
                <Image
                  src={m.image}
                  alt={m.imageAlt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 200px, (max-width: 1024px) 240px, 260px"
                  priority
                  unoptimized={m.image.startsWith("/")}
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-900/20 via-transparent to-transparent"
                  aria-hidden
                />
              </div>
            </div>

            <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-800/90 dark:text-green-300/90">
                {CONSEJO_LABEL}
              </p>
              <h1 className="font-display mt-3 text-balance text-3xl font-medium tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
                {m.name}
              </h1>
              <p className="mt-3 text-base font-medium text-zinc-600 dark:text-zinc-400">
                {m.role}
              </p>

              <div className="mt-8 text-[0.95rem] leading-relaxed text-zinc-700 dark:text-zinc-300">
                {m.paragraphs.map((p, i) => (
                  <p key={i} className={cn(i > 0 && "mt-5")}>
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </article>

        <p className="mt-10 text-center text-sm text-zinc-600 dark:text-zinc-400">
          <Link
            href="/#equipo-consejo"
            className="font-medium text-brand-teal underline-offset-4 transition hover:underline dark:text-accent-cyan"
          >
            ← Volver a Conoce al equipo
          </Link>
        </p>
      </Container>
    </div>
  );
}
