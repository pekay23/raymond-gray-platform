import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { Resend } from 'resend';
import crypto from "crypto";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  // Rate limit: 5 signups per IP per 15 minutes
  const ip = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "unknown";
  const { success } = rateLimit(`signup:${ip}`);
  if (!success) {
    return NextResponse.json({ message: "Too many requests. Please try again later." }, { status: 429 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { name, email, password } = await req.json();

    // 1. Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // 2. Hash Password
    const hashedPassword = await hash(password, 12);

    // 3. Create User (Unverified by default)
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "CLIENT",
      },
    });

    // 4. Generate Verification Token
    const verifyToken = crypto.randomBytes(32).toString("hex");
    const expires = new Date(new Date().getTime() + 24 * 60 * 60 * 1000); // 24 hours

    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token: verifyToken,
        expires,
      },
    });

    // 5. Send Verification Email via Resend
    await resend.emails.send({
      from: 'Raymond Gray <onboarding@resend.dev>', // Update to your domain once verified
      to: email,
      subject: 'Verify your email address',
      html: `
        <h2>Welcome to Raymond Gray, ${name}!</h2>
        <p>Please verify your email to enable booking features.</p>
        <p><a href="${process.env.NEXTAUTH_URL}/auth/verify?token=${verifyToken}">Click here to verify your email</a></p>
      `,
    });

    return NextResponse.json({ message: "User created" }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Error creating user" }, { status: 500 });
  }
}
