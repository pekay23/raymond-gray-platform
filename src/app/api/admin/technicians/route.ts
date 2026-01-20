import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const techs = await prisma.user.findMany({
    where: { role: "TECHNICIAN" },
    select: { id: true, name: true }
  });
  return NextResponse.json(techs);
}
