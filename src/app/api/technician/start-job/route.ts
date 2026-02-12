import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { jobId, code } = await req.json();

  const job = await prisma.inquiry.findUnique({ where: { id: jobId } });

  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  // 🔒 SECURITY FIX: Ensure the logged-in user is the assigned technician
  if (job.technicianId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden: You are not assigned to this job." }, { status: 403 });
  }

  if (job.startCode !== code) {
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
