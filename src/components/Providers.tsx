"use client";

import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide Navbar/Footer on dashboard routes
  const isDashboard = pathname?.startsWith("/admin") || 
                      pathname?.startsWith("/technician") || 
                      pathname?.startsWith("/client");

  return (
    <SessionProvider>
      {!isDashboard && <Navbar />}
      
      {/* If it's a dashboard, the sidebar layout handles the structure */}
      <div className={isDashboard ? "" : "min-h-screen"}>
        {children}
      </div>

      {!isDashboard && <Footer />}
    </SessionProvider>
  );
}
