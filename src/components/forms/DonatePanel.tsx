"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

const PRESETS = [100, 500, 1000, 2500] as const;

function parseAmount(raw: string): number | null {
  const n = Number(String(raw).replace(/[^\d]/g, ""));
  if (!Number.isFinite(n) || n < 50) return null;
  if (n > 500_000) return null;
  return Math.floor(n);
}

type DonatePanelProps = {
  /** Despliega el formulario de contacto (tras abrir la zona de correo). */
  onMostrarFormulario?: () => void;
};

export function DonatePanel({ onMostrarFormulario }: DonatePanelProps) {
  const [custom, setCustom] = useState("");
  const [selected, setSelected] = useState<number | null>(500);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [correoAbierto, setCorreoAbierto] = useState(false);

  const amount = useMemo(() => {
    if (selected != null) return selected;
    return parseAmount(custom);
  }, [selected, custom]);

  const mailtoHref = useMemo(() => {
    const m = amount ?? 500;
    const subject = encodeURIComponent(`Propuesta de donación — ${site.name}`);
    const body = encodeURIComponent(
      `Hola,\n\nDeseo aportar $${m} MXN a ${site.name}.\n\nNombre:\nRFC (opcional):\nComprobante: (adjuntar si aplica)\n\nGracias.`,
    );
    return `mailto:${site.contact.email}?subject=${subject}&body=${body}`;
  }, [amount]);

  async function payStripe() {
    setError("");
    const m = amount;
    if (m == null) {
      setError("Elige un monto rápido o escribe un monto válido (mín. $50 MXN).");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amountMxn: m }),
      });
      const data = (await res.json()) as { url?: string; message?: string; error?: string };
      if (!res.ok) {
        setError(
          data.message ||
            "Pagos con tarjeta no están activos. Usa la opción por correo.",
        );
        return;
      }
      if (data.url) window.location.href = data.url;
    } catch {
      setError("No se pudo iniciar el pago. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
          Donación rápida
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {PRESETS.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => {
                setSelected(n);
                setCustom("");
              }}
              className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                selected === n
                  ? "border-brand-teal bg-brand-teal text-white"
                  : "border-zinc-200 bg-white text-zinc-800 hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              }`}
            >
              ${n} MXN
            </button>
          ))}
          <button
            type="button"
            onClick={() => setSelected(null)}
            className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
              selected === null && custom !== ""
                ? "border-brand-teal bg-brand-teal text-white"
                : "border-zinc-200 bg-white text-zinc-800 hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            }`}
          >
            Otro monto
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="custom-amount" className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
          Monto personalizado (MXN)
        </label>
        <input
          id="custom-amount"
          inputMode="numeric"
          value={custom}
          onChange={(e) => {
            setCustom(e.target.value);
            setSelected(null);
          }}
          placeholder="Ej. 750"
          className="mt-2 w-full max-w-xs rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none ring-zinc-900/10 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:ring-white/10"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="button" disabled={loading} onClick={payStripe}>
          {loading ? "Redirigiendo…" : "Pagar con Stripe"}
        </Button>
        <button
          type="button"
          onClick={() => {
            setCorreoAbierto(true);
            onMostrarFormulario?.();
          }}
          className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-200 px-6 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-900"
        >
          Enviar datos por correo
        </button>
      </div>

      {error ? (
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      ) : null}

      {correoAbierto ? (
        <div className="space-y-6 border-t border-zinc-200 pt-8 dark:border-zinc-700">
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Abre tu correo con el botón verde o completa el formulario que
            aparece al lado (o abajo en el móvil) con el mismo propósito.
          </p>
          <a
            href={mailtoHref}
            className="inline-flex h-11 items-center justify-center rounded-full border border-brand-teal bg-brand-teal px-6 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Abrir aplicación de correo
          </a>
          <div className="rounded-2xl border border-zinc-200 bg-surface-muted p-6 text-sm leading-relaxed text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
            <p className="font-semibold text-zinc-900 dark:text-zinc-100">
              Confianza y transparencia
            </p>
            <p className="mt-2">
              Publicamos informes de avance. Las donaciones se aplican a
              programas culturales priorizados por la asamblea y el consejo
              directivo. Si necesitas factura o comprobante fiscal, indícalo en
              tu mensaje.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
