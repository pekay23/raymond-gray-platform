import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { jobId, code } = await req.json();

  const job = await prisma.inquiry.findUnique({ where: { id: jobId } });

  // Verify the END code
  if (!job || job.endCode !== code) {
    return NextResponse.json({ error: "Invalid Completion Code" }, { status: 400 });
  }

  await prisma.inquiry.update({
    where: { id: jobId },
    data: { 
      status: "RESOLVED",
      completedAt: new Date()
    }
  });

  return NextResponse.json({ success: true });
}
