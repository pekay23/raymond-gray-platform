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

    // 3. Protect Client Routes (Optional: if you want strict role separation)
    // If you want Admins to be able to see Client views, remove the second check.
    if (path.startsWith("/client") && token?.role !== "CLIENT" && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Only allow if logged in
    },
  }
);

// Define which paths this middleware runs on
export const config = {
  matcher: [
    "/admin/:path*",
    "/client/:path*",
    "/technician/:path*",
  ],
};
