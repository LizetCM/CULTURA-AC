"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

const links: Array<{ href: string; label: string }> = [
  { href: "/sobre-nosotros", label: "Sobre nosotros" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/contratacion-mujeres", label: "Contratación de mujeres" },
  { href: "/bolsa-de-trabajo", label: "Bolsa de trabajo" },
  { href: "/contacto", label: "Contacto" },
];

export function NavBar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) return;

    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const glassOnHero = isHome && !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-16 transition-[background-color,border-color,box-shadow] duration-300",
        glassOnHero
          ? "border-b border-white/10 bg-zinc-950/35 shadow-none backdrop-blur-md"
          : "border-b border-zinc-200/80 bg-white/90 shadow-sm shadow-zinc-900/5 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/90",
      )}
    >
      <Container className="flex h-full items-center justify-between gap-4">
        <Logo inverse={glassOnHero} />

        <nav
          className="hidden items-center gap-6 lg:flex"
          aria-label="Principal"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "text-sm transition-colors",
                glassOnHero
                  ? "text-white/85 hover:text-white"
                  : "text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/participar"
            className={cn(
              "hidden text-sm font-medium transition-colors sm:inline",
              glassOnHero
                ? "text-white/80 hover:text-white"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50",
            )}
          >
            Participar
          </Link>
          <Link
            href="/donaciones"
            className={cn(
              "inline-flex h-10 items-center justify-center rounded-full px-5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg",
              "bg-accent-cyan hover:bg-accent-cyan-hover",
            )}
          >
            ¡Apóyanos!
          </Link>
        </div>
      </Container>
    </header>
  );
}
