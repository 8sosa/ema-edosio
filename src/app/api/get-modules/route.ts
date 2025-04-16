// // src/app/api/get-modules/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const masterclassId = searchParams.get("masterclassId");

    const modules = await prisma.module.findMany({
        where: masterclassId ? { masterclassId } : {},
        orderBy: {
          module: 'asc',  // Proper structure for ordering by module field
        },
        select: {
          id: true,
          module: true,
          title: true,
          intro: true,
          masterclassId: true
        },
      });
      

    return NextResponse.json({ modules });
  } catch (error) {
    console.error("Error fetching modules:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}