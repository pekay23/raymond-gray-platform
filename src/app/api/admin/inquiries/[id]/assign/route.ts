import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { technicianId, startCode } = await req.json();

  await prisma.inquiry.update({
    where: { id: parseInt(id) },
    data: { 
      technicianId, 
      status: "ASSIGNED",
      startCode 
    }
  });

  return NextResponse.json({ success: true });
}
