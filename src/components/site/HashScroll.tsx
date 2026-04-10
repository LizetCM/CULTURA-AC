"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/" && pathname !== "/participar") return;
    const raw = window.location.hash.replace(/^#/, "");
    if (!raw) return;
    const id = decodeURIComponent(raw);
    const run = () => scrollToId(id);
    run();
    const t = window.setTimeout(run, 100);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return null;
}
