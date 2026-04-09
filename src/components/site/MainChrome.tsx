"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { HashScroll } from "@/components/site/HashScroll";

export function MainChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className={cn("flex min-h-0 flex-1 flex-col", !isHome && "pt-14")}>
      <HashScroll />
      {children}
    </div>
  );
}
