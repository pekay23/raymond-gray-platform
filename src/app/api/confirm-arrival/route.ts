import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


export async function POST(request: Request) {
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

  } catch (error) {
    console.error('Arrival Error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

