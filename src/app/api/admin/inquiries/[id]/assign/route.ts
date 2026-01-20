import { NextResponse } from "next/server"; // <--- THIS WAS MISSING
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { technicianId } = await req.json();

  // Generate TWO separate codes
  const startCode = Math.floor(1000 + Math.random() * 9000).toString();
  const endCode = Math.floor(1000 + Math.random() * 9000).toString();

  await prisma.inquiry.update({
    where: { id: parseInt(id) },
    data: { 
      technicianId, 
      status: "ASSIGNED",
      startCode,
      endCode
    }
  });

  return NextResponse.json({ success: true });
}
