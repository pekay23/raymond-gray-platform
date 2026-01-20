import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { technicianId } = await req.json(); // We generate codes here, not from client

  // Generate random codes
  const startCode = Math.floor(1000 + Math.random() * 9000).toString();
  const endCode = Math.floor(1000 + Math.random() * 9000).toString();

  try {
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
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to assign" }, { status: 500 });
  }
}
