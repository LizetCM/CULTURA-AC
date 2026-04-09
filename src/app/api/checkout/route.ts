import { NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";
import { site } from "@/lib/site";

const bodySchema = z.object({
  amountMxn: z.number().int().min(50).max(500_000),
});

export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      {
        error: "stripe_not_configured",
        message:
          "Define STRIPE_SECRET_KEY y NEXT_PUBLIC_SITE_URL para activar pagos con Stripe.",
      },
      { status: 501 },
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Monto inválido" }, { status: 400 });
  }

  const stripe = new Stripe(secret);
  const base = site.url.replace(/\/+$/, "");

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: `${base}/donaciones?exito=1`,
    cancel_url: `${base}/donaciones`,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "mxn",
          unit_amount: parsed.data.amountMxn * 100,
          product_data: {
            name: `Donación — ${site.name}`,
            description: "Apoyo a proyectos culturales con impacto social.",
          },
        },
      },
    ],
    metadata: {
      source: "web_donation",
    },
  });

  if (!session.url) {
    return NextResponse.json({ error: "Sin URL de sesión" }, { status: 500 });
  }

  return NextResponse.json({ url: session.url });
}
