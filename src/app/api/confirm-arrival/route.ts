import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { workOrder, code, latitude, longitude } = body;

    if (!workOrder || !code) {
      return NextResponse.json({ error: 'Missing details' }, { status: 400 });
    }

    // Save to Database
    await prisma.arrivalConfirmation.create({
      data: {
        workOrder,
        code,
        latitude,
        longitude
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });

  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
