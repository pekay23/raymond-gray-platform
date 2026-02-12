import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    // 1. Find the token (Assuming you reused the VerificationToken model or created a new PasswordResetToken model)
    // Ideally, you should have a separate PasswordResetToken model, but for simplicity, some reuse VerificationToken.
    // Let's assume you added a PasswordResetToken model to your schema:
    /*
      model PasswordResetToken {
        id         String   @id @default(cuid())
        identifier String   // User Email
        token      String   @unique
        expires    DateTime
        @@unique([identifier, token])
      }
    */

    // For this example, let's assume you check your "PasswordResetToken" table
    // If you haven't created it yet, go to Step 3 below.
    const record = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    if (!record) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    if (new Date() > record.expires) {
      return NextResponse.json({ error: "Token expired" }, { status: 400 });
    }

    // 2. Hash the new password
    const hashedPassword = await hash(password, 12);

    // 3. Update the User's password
    await prisma.user.update({
      where: { email: record.identifier },
      data: { password: hashedPassword },
    });

    // 4. Delete the token so it can't be used again
    await prisma.passwordResetToken.delete({ where: { token } });

    return NextResponse.json({ message: "Password reset successfully" });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
