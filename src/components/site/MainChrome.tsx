"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

export function MainChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className={cn("flex min-h-0 flex-1 flex-col", !isHome && "pt-16")}>
      {children}
    </div>
  );
}
