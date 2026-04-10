"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { HOME_NAV_LINKS } from "@/lib/home-nav";

function scrollToHash(id: string) {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function NavBar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) return;

    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const glassOnHero = isHome && !scrolled;

  const onHashNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith("/#")) return;
      const id = href.slice(2);
      if (pathname === "/") {
        e.preventDefault();
        scrollToHash(id);
        window.history.replaceState(null, "", href);
      }
    },
    [pathname],
  );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-14 transition-[background-color,border-color,box-shadow] duration-300",
        glassOnHero
          ? "border-b border-white/10 bg-zinc-950/35 shadow-none backdrop-blur-md"
          : "border-b border-zinc-200/80 bg-white/90 shadow-sm shadow-zinc-900/5 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/90",
      )}
    >
      <Container className="flex h-full items-center justify-between gap-3">
        <Logo inverse={glassOnHero} compact />

        <nav
          className="hidden items-center gap-5 lg:flex"
          aria-label="Principal"
        >
          {HOME_NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={(e) => onHashNavClick(e, l.href)}
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
              "inline-flex h-9 items-center justify-center rounded-full px-4 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg sm:px-5",
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
