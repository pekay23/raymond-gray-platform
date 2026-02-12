import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Define Validation Schema
const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  address: z.string().optional(),
  serviceType: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate Input
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation Failed', details: result.error.format() },
        { status: 400 }
      );
    }

    const { name, email, phone, address, serviceType, message } = result.data;

    // Save to Neon Database
    const newInquiry = await prisma.inquiry.create({
      data: {
        name,
        email,
        phone: phone || '',
        address: address || '',
        message: `[Service: ${serviceType || 'General'}] ${message}`,
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
