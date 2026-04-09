import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

type PageShellProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  /** Ancho máximo del contenido principal (por defecto max-w-3xl) */
  contentMaxWidth?: "md" | "lg" | "xl";
  /** Centrar título y subtítulo del encabezado */
  centerHeader?: boolean;
};

const maxWidths = {
  md: "max-w-3xl",
  lg: "max-w-4xl",
  xl: "max-w-5xl",
} as const;

export function PageShell({
  title,
  subtitle,
  children,
  className,
  contentMaxWidth = "md",
  centerHeader = false,
}: PageShellProps) {
  const mw = maxWidths[contentMaxWidth];
  return (
    <div
      className={cn(
        "min-h-0 flex-1 bg-white dark:bg-zinc-950",
        className,
      )}
    >
      <Container className="py-14 sm:py-20 md:py-24">
        <header className={cn(mw, centerHeader && "mx-auto text-center")}>
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-5 text-pretty text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              {subtitle}
            </p>
          ) : null}
        </header>
        <div className={cn("mt-12", mw)}>{children}</div>
      </Container>
    </div>
  );
}
