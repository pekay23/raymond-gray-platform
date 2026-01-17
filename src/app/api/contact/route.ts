import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // This connects to your Neon DB

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, serviceType, message } = body;

    // Validate data
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Save to Neon Database
    // Note: We use the 'Inquiry' model you defined in schema.prisma
    const newInquiry = await prisma.inquiry.create({
      data: {
        name,
        email,
        phone: phone || '',
        message: `[Service: ${serviceType}] ${message}`, // Combine service + message
      },
    });

    return NextResponse.json({ success: true, data: newInquiry }, { status: 200 });

  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to submit inquiry' },
      { status: 500 }
    );
  }
}
