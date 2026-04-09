import { z } from "zod";

/**
 * Solo caracteres ASCII permitidos en correos del formulario (sin acentos ni caracteres Unicode).
 * Debe incluir @ y cumplir forma local@dominio.tld
 */
const FORM_EMAIL_RE =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)+$/;

export function isFormEmailValid(value: string): boolean {
  const t = value.trim();
  if (t.length < 5 || !t.includes("@")) return false;
  return FORM_EMAIL_RE.test(t);
}

export const formEmailSchema = z
  .string()
  .trim()
  .min(5, { message: "Correo no válido." })
  .refine((s) => s.includes("@") && FORM_EMAIL_RE.test(s), {
    message: "Correo no válido.",
  });
