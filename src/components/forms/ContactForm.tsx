"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { isFormEmailValid } from "@/lib/form-email";

type ContactFormProps = {
  defaultSubject?: string;
  className?: string;
};

export function ContactForm({ defaultSubject = "", className }: ContactFormProps) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "ok" | "error"
  >("idle");
  const [feedback, setFeedback] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      subject: String(fd.get("subject") || ""),
      message: String(fd.get("message") || ""),
    };
    if (!isFormEmailValid(payload.email)) {
      setStatus("error");
      setFeedback("Correo no válido.");
      return;
    }
    setStatus("loading");
    setFeedback("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as {
        message?: string;
        error?: string;
        delivered?: boolean;
      };
      if (!res.ok) {
        setStatus("error");
        setFeedback(data.error || "No se pudo enviar. Intenta de nuevo.");
        return;
      }
      setStatus("ok");
      let msg =
        data.message ||
        "Gracias. Hemos recibido tu mensaje y te responderemos pronto.";
      if (data.delivered === false) {
        msg +=
          " Configura SMTP_HOST, SMTP_USER y SMTP_PASS en Vercel (Production) o en .env.local si desarrollas en local.";
      }
      setFeedback(msg);
      e.currentTarget.reset();
    } catch {
      setStatus("error");
      setFeedback("Error de red. Verifica tu conexión.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn("grid gap-5", className)}
      noValidate
    >
      <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Nombre
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none ring-zinc-900/10 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:ring-white/10"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Correo
          </label>
          <input
            id="email"
            name="email"
            type="text"
            inputMode="email"
            autoComplete="email"
            aria-invalid={status === "error" && feedback === "Correo no válido."}
            className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none ring-zinc-900/10 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:ring-white/10"
          />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
          Asunto
        </label>
        <input
          id="subject"
          name="subject"
          defaultValue={defaultSubject}
          className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none ring-zinc-900/10 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:ring-white/10"
        />
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-1.5 w-full resize-y rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none ring-zinc-900/10 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:ring-white/10"
        />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Enviando…" : "Enviar mensaje"}
        </Button>
        {status === "ok" ? (
          <p className="text-sm text-emerald-700 dark:text-emerald-400" role="status">
            {feedback}
          </p>
        ) : null}
        {status === "error" ? (
          <p className="text-sm text-red-600 dark:text-red-400" role="alert">
            {feedback}
          </p>
        ) : null}
      </div>
    </form>
  );
}
