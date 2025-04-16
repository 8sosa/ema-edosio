// app/api/masterclasses/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Get the user with their active masterclass accesses
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        masterclassAccesses: {
          where: {
            OR: [
              { expiresAt: null },
              { expiresAt: { gte: new Date() } },
            ],
          },
          select: {
            masterclassId: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Extract accessible masterclass IDs
    const accessibleIds = new Set(
      user.masterclassAccesses.map((access) => access.masterclassId)
    );

    // Get all masterclasses
    const masterclasses = await prisma.masterclass.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        createdAt: true,
      },
    });

    // Return all masterclasses, marking access for each
    const result = masterclasses.map((mc) => ({
      ...mc,
      access: accessibleIds.has(mc.id),
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching masterclass data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
