// filmmaker-website-frontend/src/app/api/check-masterclass-access/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const access = await prisma.masterclassAccess.findFirst({
      where: {
        userId,
        OR: [
          { expiresAt: null },
          { expiresAt: { gte: new Date() } },
        ],
      },
    });

    return NextResponse.json({ hasAccess: Boolean(access) });
  } catch (err) {
    console.error("Access check failed:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
