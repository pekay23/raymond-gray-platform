import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;

        const report = await prisma.discoveryReport.findUnique({
            where: { id },
            include: {
                author: { select: { name: true, email: true } },
                client: { select: { name: true, email: true } },
            },
        });

        if (!report) {
            return NextResponse.json({ error: "Report not found" }, { status: 404 });
        }

        // Access Control
        const isAuthor = report.authorId === session.user.id;
        const isClient = report.clientId === session.user.id;
        const isAdmin = session.user.role === "ADMIN";

        if (!isAuthor && !isClient && !isAdmin) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        return NextResponse.json(report);
    } catch (error) {
        console.error("Error fetching report:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const data = await req.json();

        const report = await prisma.discoveryReport.findUnique({
            where: { id },
        });

        if (!report) {
            return NextResponse.json({ error: "Report not found" }, { status: 404 });
        }

        // Access Control: Only Admin or Author can edit
        if (session.user.role !== "ADMIN" && report.authorId !== session.user.id) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        // Prevent modifying ownership
        delete data.authorId;
        delete data.id;
        delete data.createdAt;

        const updatedReport = await prisma.discoveryReport.update({
            where: { id },
            data: {
                ...data,
                sitesDiscussed: data.sitesDiscussed ? parseInt(data.sitesDiscussed) : undefined,
                meetingDate: data.meetingDate ? new Date(data.meetingDate) : undefined,
            },
        });

        return NextResponse.json(updatedReport);
    } catch (error) {
        console.error("Error updating report:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
