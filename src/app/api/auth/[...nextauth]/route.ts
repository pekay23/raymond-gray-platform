import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // Make sure this path is correct for your project structure

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
