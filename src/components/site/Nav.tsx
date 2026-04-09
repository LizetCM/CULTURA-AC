import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

const links: Array<{ href: string; label: string }> = [
  { href: "/sobre-nosotros", label: "Sobre nosotros" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/contratacion-mujeres", label: "Contratación de mujeres" },
  { href: "/bolsa-de-trabajo", label: "Bolsa de trabajo" },
  { href: "/contacto", label: "Contacto" },
];

export function Nav({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-zinc-200/70 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/70",
        className,
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Principal">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href="/donaciones" variant="outline" size="sm">
            Donar
          </ButtonLink>
          <ButtonLink href="/participar" variant="primary" size="sm">
            Participar
          </ButtonLink>
        </div>
      </Container>
    </header>
  );
}

