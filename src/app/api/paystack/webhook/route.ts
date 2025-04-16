// app/api/paystack/webhook/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/prisma"
import crypto from "crypto";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  const secret = process.env.NEXT_PUBLIC_TEST_PAYSTACK_SECRET_KEY!;
  const rawBody = await req.text();
  const signature = req.headers.get("x-paystack-signature");

  const hash = crypto
    .createHmac("sha512", secret)
    .update(rawBody)
    .digest("hex");

  if (hash !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody);

  if (event.event === "charge.success") {
    const email = event.data.customer.email;

    await prisma.user.update({
      where: { email },
      data: { hasAccessToMasterclass: true },
    });
  }

  return NextResponse.json({ received: true });
}
