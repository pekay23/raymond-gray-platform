import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { jobId, code } = await req.json();

  const job = await prisma.inquiry.findUnique({ where: { id: jobId } });

  if (!job || job.startCode !== code) {
    return NextResponse.json({ error: "Invalid Code" }, { status: 400 });
  }

  await prisma.inquiry.update({
    where: { id: jobId },
    data: { 
      status: "IN_PROGRESS",
      startedAt: new Date()
    }
  });

  return NextResponse.json({ success: true });
}
