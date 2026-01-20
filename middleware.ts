import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // 1. Protect Admin Routes
    if (path.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    // 2. Protect Technician Routes
    if (path.startsWith("/technician") && token?.role !== "TECHNICIAN") {
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    // 3. Protect Client Routes (Clients & Admins allowed)
    if (path.startsWith("/client") && token?.role !== "CLIENT" && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // User must be logged in
    },
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/client/:path*",
    "/technician/:path*",
  ],
};
