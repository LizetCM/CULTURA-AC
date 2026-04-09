import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
  /** Barra oscura sobre el hero */
  inverse?: boolean;
};

const LOGO_SRC = "/brand/logo.png";

export function Logo({ className, inverse = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex shrink-0 items-center rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        inverse
          ? "focus-visible:ring-white/50 focus-visible:ring-offset-transparent"
          : "focus-visible:ring-zinc-900/30 focus-visible:ring-offset-white dark:focus-visible:ring-zinc-100/30 dark:focus-visible:ring-offset-zinc-950",
        className,
      )}
      aria-label="Ir al inicio — Cultura A.C."
    >
      <Image
        src={LOGO_SRC}
        alt="Cultura A.C."
        width={200}
        height={64}
        priority
        className={cn(
          "h-8 w-auto max-w-[min(100%,9.5rem)] object-contain object-left sm:h-10 sm:max-w-[11.5rem]",
          inverse && "drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]",
        )}
      />
    </Link>
  );
}
