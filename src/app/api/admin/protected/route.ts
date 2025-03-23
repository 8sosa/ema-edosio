/* eslint-disable @typescript-eslint/no-unused-vars */
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET(_req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Access Denied" }, { status: 403 });
  }

  return NextResponse.json({ message: "Welcome, Admin!" });
}