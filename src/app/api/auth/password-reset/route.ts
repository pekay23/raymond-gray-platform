import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { prisma } from "@/lib/prisma"; // Ensure this path is correct
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // 1. Verify user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // Security: Don't reveal if user exists. Fake success.
      return NextResponse.json({ message: "Email sent" }); 
    }

    // 2. Generate a Secure Token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const expires = new Date(new Date().getTime() + 1 * 60 * 60 * 1000); // 1 Hour Expiry

    // 3. Save Token to Database (Upsert handles creating or updating)
    await prisma.passwordResetToken.upsert({
      where: { token: resetToken }, // This is just a placeholder requirement for upsert
      create: {
        identifier: email,
        token: resetToken,
        expires,
      },
      update: {
        token: resetToken,
        expires,
      },
    });
    
    // Note: Since 'token' is unique, upsert by token is tricky if it doesn't exist. 
    // Better approach for tokens tied to email: Delete old ones first.
    await prisma.passwordResetToken.deleteMany({ where: { identifier: email } });
    await prisma.passwordResetToken.create({
      data: {
        identifier: email,
        token: resetToken,
        expires
      }
    });

    // 4. Send the email with the REAL token
    await resend.emails.send({
      from: 'Raymond Gray Support <onboarding@resend.dev>', // Update this once you verify your domain
      to: email,
      subject: 'Reset Your Password',
      html: `
        <h2>Password Reset Request</h2>
        <p>Someone requested a password reset for your Raymond Gray account.</p>
        <p>Click the link below to reset it (valid for 1 hour):</p>
        <p>
          <a href="${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}" style="padding: 10px 20px; background-color: #000; color: #fff; text-decoration: none; border-radius: 5px;">
            Reset Password
          </a>
        </p>
        <p>Or copy this link: ${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}</p>
        <p>If this wasn't you, please ignore this email.</p>
      `,
    });

    return NextResponse.json({ message: "Email sent" });
  } catch (error) {
    console.error("Reset error:", error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
