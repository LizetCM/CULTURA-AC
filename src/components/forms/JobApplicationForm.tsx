"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { jobApplicationVacancyOptions } from "@/lib/bolsa-trabajo";
import { isFormEmailValid } from "@/lib/form-email";

export function JobApplicationForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const email = String(fd.get("email") || "");
    if (!isFormEmailValid(email)) {
      setStatus("error");
      setMessage("Correo no válido.");
      return;
    }
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/job-application", {
        method: "POST",
        body: fd,
      });
      const data = (await res.json()) as {
        message?: string;
        error?: string;
        delivered?: boolean;
      };
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "No se pudo enviar.");
        return;
      }
      setStatus("ok");
      let msg = data.message || "¡Listo! Revisaremos tu perfil.";
      if (data.delivered === false) {
        msg +=
          " No se mandó ningún correo: configura SMTP_PASS en .env.local y reinicia el servidor de desarrollo.";
      }
      setMessage(msg);
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Error de red.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5" noValidate>
      <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
        <div>
          <label htmlFor="ja-name" className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Nombre completo
          </label>
          <input
            id="ja-name"
            name="name"
            required
            autoComplete="name"
            className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none ring-zinc-900/10 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:ring-white/10"
          />
        </div>
        <div>
          <label htmlFor="ja-email" className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Correo
          </label>
          <input
            id="ja-email"
            name="email"
            type="text"
            inputMode="email"
            autoComplete="email"
            aria-invalid={status === "error" && message === "Correo no válido."}
            className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none ring-zinc-900/10 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:ring-white/10"
          />
        </div>
      </div>
      <div>
        <label htmlFor="ja-vacancy" className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
          Perfil o área de interés
        </label>
        <select
          id="ja-vacancy"
          name="vacancy"
          required
          defaultValue={jobApplicationVacancyOptions[0]}
          className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none ring-zinc-900/10 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:ring-white/10"
        >
          {jobApplicationVacancyOptions.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="ja-message" className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
          Carta o mensaje (opcional)
        </label>
        <textarea
          id="ja-message"
          name="message"
          rows={4}
          className="mt-1.5 w-full resize-y rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none ring-zinc-900/10 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:ring-white/10"
        />
      </div>
      <div>
        <label htmlFor="ja-cv" className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
          CV (PDF o PNG, máx. recomendado 5&nbsp;MB)
        </label>
        <input
          id="ja-cv"
          name="cv"
          type="file"
          accept=".pdf,.png,application/pdf,image/png"
          className="mt-2 block w-full text-sm text-zinc-600 file:mr-4 file:rounded-lg file:border-0 file:bg-zinc-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white dark:text-zinc-400 dark:file:bg-zinc-100 dark:file:text-zinc-900"
        />
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          Si configuraste correo en el servidor (ver .env.example), el archivo se envía
          como adjunto al buzón indicado en CONTACT_TO.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Enviando…" : "Enviar solicitud"}
        </Button>
        {status === "ok" ? (
          <p className="text-sm text-emerald-700 dark:text-emerald-400" role="status">
            {message}
          </p>
        ) : null}
        {status === "error" ? (
          <p className="text-sm text-red-600" role="alert">
            {message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
