/** Evita HTML inyectado en plantillas de correo. */
export function escapeHtmlForMail(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function isSmtpConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST?.trim() &&
      process.env.SMTP_USER?.trim() &&
      process.env.SMTP_PASS?.trim(),
  );
}

export async function createMailTransport() {
  const nodemailer = await import("nodemailer");
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

/** Buzón donde recibes contacto y bolsa de trabajo si no defines CONTACT_TO. */
const DEFAULT_INBOX = "lizetmc08@gmail.com";

export function getInboxAddress(): string {
  return process.env.CONTACT_TO?.trim() || DEFAULT_INBOX;
}

export function getFromAddress(): string {
  return (
    process.env.SMTP_FROM?.trim() ||
    process.env.SMTP_USER!.trim()
  );
}
