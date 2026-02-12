import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { technicianId } = await req.json();

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
  } catch {
    return NextResponse.json({ error: "Failed to assign" }, { status: 500 });
  }
}
