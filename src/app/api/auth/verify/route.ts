import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    // 1. Find token
    const record = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!record) {
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }

    // 2. Check expiration
    if (new Date() > record.expires) {
      return NextResponse.json({ message: "Token expired" }, { status: 400 });
    }

    // 3. Mark User as Verified
    const user = await prisma.user.findUnique({ where: { email: record.identifier } });
    
    if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    await prisma.user.update({
      where: { email: record.identifier },
      data: { emailVerified: new Date() },
    });

    // 4. Delete the used token
    await prisma.verificationToken.delete({ where: { token } });

    return NextResponse.json({ message: "Email verified successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Verification failed" }, { status: 500 });
  }
}
