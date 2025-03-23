import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const films = await prisma.film.findMany();
  return NextResponse.json({ films });
}

export async function POST(req: Request) {
  try {
    const { title, synopsis } = await req.json();
    const film = await prisma.film.create({
      data: { title, synopsis },
    });
    return NextResponse.json({ film });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create film" }, { status: 500 });
  }
}
