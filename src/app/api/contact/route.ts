import { NextResponse } from "next/server";
import { flattenError, z } from "zod";
import { formEmailSchema } from "@/lib/form-email";
import {
  createMailTransport,
  escapeHtmlForMail,
  getFromAddress,
  getInboxAddress,
  isSmtpConfigured,
} from "@/lib/mail";

const bodySchema = z.object({
  name: z.string().min(2),
  email: formEmailSchema,
  message: z.string().min(10),
  subject: z.string().optional(),
});

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    const fe = flattenError(parsed.error).fieldErrors;
    const first =
      fe.email?.[0] ||
      fe.name?.[0] ||
      fe.message?.[0] ||
      "Revisa los campos obligatorios";
    return NextResponse.json({ error: first }, { status: 400 });
  }

  if (!isSmtpConfigured()) {
    console.info("[contact]", parsed.data);
    return NextResponse.json({
      ok: true,
      delivered: false,
      message:
        "Mensaje registrado. Configura SMTP_* en .env.local para envío real por correo (ver .env.example).",
    });
  }

  const subjectLine =
    parsed.data.subject?.trim() || `Contacto web — ${parsed.data.name}`;
  const textBody = `De: ${parsed.data.name} <${parsed.data.email}>\n\n${parsed.data.message}`;
  const htmlBody = `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;line-height:1.5;color:#171717;max-width:40rem">
<p style="margin:0 0 0.5rem;font-size:0.75rem;text-transform:uppercase;letter-spacing:0.08em;color:#166534">Contacto desde el sitio web</p>
<h1 style="margin:0 0 1rem;font-size:1.25rem;font-weight:600;color:#14532d">${escapeHtmlForMail(subjectLine)}</h1>
<p style="margin:0 0 0.25rem"><strong>De:</strong> ${escapeHtmlForMail(parsed.data.name)} &lt;${escapeHtmlForMail(parsed.data.email)}&gt;</p>
<p style="margin:0 0 1rem;font-size:0.875rem;color:#52525b">Puedes responder directamente a este correo; la respuesta irá al remitente.</p>
<hr style="border:none;border-top:1px solid #e4e4e7;margin:1rem 0">
<div style="white-space:pre-wrap">${escapeHtmlForMail(parsed.data.message)}</div>
</body></html>`;

  try {
    const transporter = await createMailTransport();
    await transporter.sendMail({
      from: getFromAddress(),
      to: getInboxAddress(),
      replyTo: parsed.data.email,
      subject: subjectLine,
      text: textBody,
      html: htmlBody,
    });
  } catch (err) {
    console.error("[contact] sendMail", err);
    return NextResponse.json(
      {
        error:
          "No se pudo enviar el correo. Revisa SMTP_* o la contraseña de aplicación de Gmail.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    delivered: true,
    message: "Gracias. Hemos recibido tu mensaje y te responderemos pronto.",
  });
}
