import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Update path if needed
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

// 1. GET: List all users
export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const users = await prisma.user.findMany({
    orderBy: { role: 'asc' }, // Admins first
    select: { id: true, name: true, email: true, role: true, emailVerified: true } // Don't send passwords!
  });

  return NextResponse.json(users);
}

// 2. POST: Create a new user (with specific Role)
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, email, password, role } = await req.json();
    const hashedPassword = await hash(password, 12);

    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword, role },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json({ error: "User already exists or invalid data" }, { status: 400 });
  }
}

// 3. DELETE: Remove a user
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  await prisma.user.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
