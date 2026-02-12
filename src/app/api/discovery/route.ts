import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const data = await req.json();

        // Try to find a client user if email is provided
        let clientId = undefined;
        if (data.clientEmail) {
            const clientUser = await prisma.user.findUnique({
                where: { email: data.clientEmail },
            });
            if (clientUser) {
                clientId = clientUser.id;
            }
        }

        const report = await prisma.discoveryReport.create({
            data: {
                ...data,
                authorId: session.user.id,
                clientId: clientId,
                // Ensure strictly typed fields are handled correctly if they come in as undefined
                sitesDiscussed: data.sitesDiscussed ? parseInt(data.sitesDiscussed) : undefined,
                meetingDate: new Date(data.meetingDate),
            },
        });

        return NextResponse.json(report);
    } catch {
        return NextResponse.json(
            { error: "Failed to create report" },
            { status: 500 }
        );
    }
}

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { user } = session;
        let whereClause = {};

        // Role-based filtering
        if (user.role === "ADMIN") {
            // Admins see all
            whereClause = {};
        } else if (user.role === "TECHNICIAN") {
            // Technicians see only reports they authored
            whereClause = { authorId: user.id };
        } else {
            // Clients see only reports linked to them
            whereClause = { clientId: user.id };
        }

        const reports = await prisma.discoveryReport.findMany({
            where: whereClause,
            include: {
                author: {
                    select: { name: true, email: true },
                },
                client: {
                    select: { name: true, email: true },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(reports);
    } catch {
        return NextResponse.json(
            { error: "Failed to fetch reports" },
            { status: 500 }
        );
    }
}
