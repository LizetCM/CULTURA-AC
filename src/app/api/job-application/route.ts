import { NextResponse } from "next/server";
import { formEmailSchema } from "@/lib/form-email";
import { JOB_APPLICATION_MAX_CV_BYTES } from "@/lib/job-application-limits";
import {
  createMailTransport,
  escapeHtmlForMail,
  getFromAddress,
  getInboxAddress,
  isSmtpConfigured,
} from "@/lib/mail";

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") || "";

  if (!contentType.includes("multipart/form-data")) {
    return NextResponse.json(
      { error: "Usa multipart/form-data" },
      { status: 400 },
    );
  }

  const form = await req.formData();
  const name = String(form.get("name") || "").trim();
  const emailRaw = String(form.get("email") || "");
  const vacancy = String(form.get("vacancy") || "").trim();
  const message = String(form.get("message") || "").trim();
  const file = form.get("cv");

  const emailParsed = formEmailSchema.safeParse(emailRaw);
  if (!emailParsed.success) {
    return NextResponse.json(
      { error: emailParsed.error.issues[0]?.message || "Correo no válido." },
      { status: 400 },
    );
  }
  const email = emailParsed.data;

  if (name.length < 2 || vacancy.length < 2) {
    return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
  }

  const cvFile = file instanceof File && file.size > 0 ? file : null;
  if (cvFile) {
    if (cvFile.size > JOB_APPLICATION_MAX_CV_BYTES) {
      return NextResponse.json(
        { error: "El CV no debe superar 4 MB (límite del alojamiento web)." },
        { status: 400 },
      );
    }
    const lower = cvFile.name.toLowerCase();
    const type = cvFile.type;
    const isPdf =
      lower.endsWith(".pdf") &&
      (!type || type === "application/pdf");
    const isPng =
      lower.endsWith(".png") &&
      (!type || type === "image/png");
    if (!isPdf && !isPng) {
      return NextResponse.json(
        { error: "El CV debe ser un archivo PDF o PNG." },
        { status: 400 },
      );
    }
  }

  if (!isSmtpConfigured()) {
    console.info("[job-application]", {
      name,
      email,
      vacancy,
      message: message.slice(0, 500),
      cv: cvFile
        ? { name: cvFile.name, size: cvFile.size, type: cvFile.type }
        : null,
    });
    return NextResponse.json({
      ok: true,
      delivered: false,
      message:
        "Solicitud registrada en consola. Configura SMTP_* en .env.local para envío por correo (ver .env.example).",
    });
  }

  const bodyText = [
    `Solicitud — Bolsa de trabajo (web)`,
    ``,
    `Nombre: ${name}`,
    `Correo: ${email}`,
    `Perfil / área: ${vacancy}`,
    message ? `\nMensaje:\n${message}` : "",
    cvFile ? `\nCV adjunto: ${cvFile.name}` : "\n(Sin archivo CV adjunto)",
  ].join("\n");

  const subjectLine = `Bolsa de trabajo — ${vacancy} — ${name}`;
  const msgBlock = message
    ? `<p style="margin:1rem 0 0"><strong>Mensaje</strong></p><div style="white-space:pre-wrap;margin:0.25rem 0 0">${escapeHtmlForMail(message)}</div>`
    : "";
  const cvNote = cvFile
    ? `<p style="margin:0.75rem 0 0;font-size:0.875rem;color:#166534"><strong>CV adjunto en este correo:</strong> ${escapeHtmlForMail(cvFile.name)}</p>`
    : `<p style="margin:0.75rem 0 0;font-size:0.875rem;color:#71717a">Sin archivo CV adjunto.</p>`;
  const htmlBody = `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;line-height:1.5;color:#171717;max-width:40rem">
<p style="margin:0 0 0.5rem;font-size:0.75rem;text-transform:uppercase;letter-spacing:0.08em;color:#166534">Bolsa de trabajo · sitio web</p>
<h1 style="margin:0 0 1rem;font-size:1.25rem;font-weight:600;color:#14532d">${escapeHtmlForMail(subjectLine)}</h1>
<table style="border-collapse:collapse;font-size:0.9375rem">
<tr><td style="padding:0.2rem 1.5rem 0.2rem 0;vertical-align:top;color:#52525b">Nombre</td><td>${escapeHtmlForMail(name)}</td></tr>
<tr><td style="padding:0.2rem 1.5rem 0.2rem 0;vertical-align:top;color:#52525b">Correo</td><td><a href="mailto:${encodeURIComponent(email)}">${escapeHtmlForMail(email)}</a></td></tr>
<tr><td style="padding:0.2rem 1.5rem 0.2rem 0;vertical-align:top;color:#52525b">Perfil / área</td><td>${escapeHtmlForMail(vacancy)}</td></tr>
</table>
${msgBlock}
${cvNote}
<p style="margin:1.25rem 0 0;font-size:0.875rem;color:#52525b">Puedes responder al candidato con “Responder” (Reply-To: ${escapeHtmlForMail(email)}).</p>
</body></html>`;

  try {
    const transporter = await createMailTransport();
    await transporter.sendMail({
      from: getFromAddress(),
      to: getInboxAddress(),
      replyTo: email,
      subject: subjectLine,
      text: bodyText,
      html: htmlBody,
      attachments: cvFile
        ? [
            {
              filename: cvFile.name || "cv.pdf",
              content: Buffer.from(await cvFile.arrayBuffer()),
              contentType:
                cvFile.type ||
                (cvFile.name?.toLowerCase().endsWith(".png")
                  ? "image/png"
                  : "application/pdf"),
            },
          ]
        : undefined,
    });
  } catch (err) {
    console.error("[job-application] sendMail", err);
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
    message:
      "¡Listo! Hemos recibido tu solicitud. Si adjuntaste CV, lo revisaremos pronto.",
  });
}
