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

function isGmailHost(host: string): boolean {
  const h = host.toLowerCase();
  return h === "smtp.gmail.com" || h.includes("gmail");
}

/** Buzón: CONTACT_TO, o correo público (mismo que en la web), o valor por defecto. */
export function getInboxAddress(): string {
  return (
    process.env.CONTACT_TO?.trim() ||
    process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ||
    "culturaregenerativaac@gmail.com"
  );
}

/** Cabecera From: Gmail exige que la dirección coincida con SMTP_USER (o alias verificado). */
export function getFromAddress(): string {
  const user = process.env.SMTP_USER?.trim() || getInboxAddress();
  const raw = process.env.SMTP_FROM?.trim();
  if (!raw) return user;

  const m = raw.match(/<([^>]+)>/);
  const embedded = m?.[1]?.trim().toLowerCase();
  if (embedded) {
    return embedded === user.toLowerCase() ? raw : user;
  }
  if (raw.includes("@") && !/\s/.test(raw)) {
    return raw.toLowerCase() === user.toLowerCase() ? raw : user;
  }
  return user;
}

export async function createMailTransport() {
  const nodemailer = await import("nodemailer");
  const user = process.env.SMTP_USER?.trim() || "";
  const pass = process.env.SMTP_PASS?.trim() || "";
  const host = process.env.SMTP_HOST?.trim() || "";

  const timeouts = {
    connectionTimeout: 30_000,
    greetingTimeout: 30_000,
    socketTimeout: 60_000,
  } as const;

  if (host && isGmailHost(host)) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
      ...timeouts,
    });
  }

  const port = Number(process.env.SMTP_PORT || "587");
  const secure = process.env.SMTP_SECURE === "true";
  return nodemailer.createTransport({
    host: host || "smtp.gmail.com",
    port,
    secure,
    requireTLS: !secure && port === 587,
    auth: { user, pass },
    ...timeouts,
  });
}
