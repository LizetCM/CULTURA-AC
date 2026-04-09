import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import {
  colaboradores,
  colaboradorCategoryLabels,
  getColaboradorBySlug,
} from "@/lib/colaboradores";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return colaboradores.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const c = getColaboradorBySlug(slug);
  if (!c) return { title: "Perfil" };
  return {
    title: c.name,
    description: `${c.role} — ${site.name}. ${c.excerpt}`,
  };
}

export default async function ColaboradorPage({ params }: PageProps) {
  const { slug } = await params;
  const c = getColaboradorBySlug(slug);
  if (!c) notFound();

  const categoryLabel = colaboradorCategoryLabels[c.category];

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
            href="/#red-profesional"
            className="font-medium text-brand-teal transition hover:underline dark:text-accent-cyan"
          >
            Alianzas y consultores
          </Link>
          <span className="mx-2 text-zinc-400" aria-hidden>
            /
          </span>
          <span className="text-zinc-900 dark:text-zinc-200">{c.name}</span>
        </nav>

        <article className="mt-10 overflow-hidden rounded-3xl border border-zinc-200/90 bg-white shadow-[0_24px_60px_-24px_rgba(22,101,52,0.14)] dark:border-zinc-800 dark:bg-zinc-900">
          <div className="grid lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)] xl:grid-cols-[minmax(0,300px)_minmax(0,1fr)]">
            <div className="flex justify-center bg-zinc-100 px-6 py-8 sm:px-8 sm:py-10 lg:justify-center lg:py-12 dark:bg-zinc-800">
              <div className="relative aspect-[3/4] w-full max-w-[200px] overflow-hidden rounded-2xl shadow-md ring-1 ring-zinc-900/10 sm:max-w-[240px] lg:w-full lg:max-w-[260px]">
                <Image
                  src={c.image}
                  alt={c.imageAlt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 200px, (max-width: 1024px) 240px, 260px"
                  priority
                  unoptimized={c.image.startsWith("/")}
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-900/20 via-transparent to-transparent"
                  aria-hidden
                />
              </div>
            </div>

            <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-800/90 dark:text-green-300/90">
                {categoryLabel}
              </p>
              <h1 className="font-display mt-3 text-balance text-3xl font-medium tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
                {c.name}
              </h1>
              <p className="mt-3 text-base font-medium text-zinc-600 dark:text-zinc-400">
                {c.role}
              </p>

              {c.social && c.social.length > 0 ? (
                <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-y border-zinc-200/90 py-5 dark:border-zinc-700">
                  {c.social.map((s) => (
                    <li key={s.href}>
                      <a
                        href={s.href}
                        className="text-sm font-medium text-brand-teal underline-offset-4 transition hover:underline dark:text-accent-cyan"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}

              <div
                className={cn(
                  "text-[0.95rem] leading-relaxed text-zinc-700 dark:text-zinc-300",
                  c.social?.length ? "mt-2" : "mt-8",
                )}
              >
                {c.highlights && c.highlights.length > 0 ? (
                  <ul className="mb-8 list-disc space-y-3 pl-5 marker:text-green-700 dark:marker:text-green-400">
                    {c.highlights.map((line, hi) => (
                      <li key={hi}>{line}</li>
                    ))}
                  </ul>
                ) : null}
                {c.paragraphs.map((p, i) => (
                  <p key={i} className={cn(i > 0 && "mt-5")}>
                    {p}
                  </p>
                ))}
                {c.sessionRate ? (
                  <p className="mt-8 rounded-xl border border-green-200/90 bg-green-50/95 px-5 py-4 text-sm font-semibold text-green-950 dark:border-green-800/60 dark:bg-green-950/50 dark:text-green-100">
                    {c.sessionRate}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </article>

        <p className="mt-10 text-center text-sm text-zinc-600 dark:text-zinc-400">
          <Link
            href="/#red-profesional"
            className="font-medium text-brand-teal underline-offset-4 transition hover:underline dark:text-accent-cyan"
          >
            ← Volver a alianzas y consultores
          </Link>
        </p>
      </Container>
    </div>
  );
}
