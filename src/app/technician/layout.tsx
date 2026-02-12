"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, CheckSquare, LogOut, Menu, X, Home, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function TechnicianLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const router = useRouter();

  // 🔒 SECURITY CHECK
  if (status === "loading") return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!session || session.user.role !== "TECHNICIAN") {
    router.push("/signin");
    return null;
  }

  return (
    <div className="min-h-screen flex bg-slate-50 relative">

      {/* MOBILE HEADER - INDIGO */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-indigo-900 text-white flex items-center justify-between px-4 z-50 shadow-md">
        <span className="font-bold text-lg tracking-tight">Tech Portal</span>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2">
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* OVERLAY */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR - INDIGO */}
      <aside className={`
        fixed top-0 left-0 bottom-0 bg-indigo-950 text-white z-50 transition-all duration-300 ease-in-out border-r border-indigo-900
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 ${isCollapsed ? "w-20" : "w-64"} flex flex-col
      `}>
        <div className={`p-6 border-b border-indigo-800 flex flex-col gap-4 relative ${isCollapsed ? "items-center px-2" : ""}`}>
          <div className={`relative w-full mb-2 transition-all duration-300 ${isCollapsed ? "h-10 px-2" : "h-20"}`}>
            <Image
              src="/raymond-gray-logo1.svg"
              alt="Raymond Gray"
              fill
              className="object-contain"
              priority
            />
          </div>
          {!isCollapsed && (
            <div className="flex justify-between items-center text-indigo-300 animate-in fade-in duration-300">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Tech Portal</p>
              </div>
              <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Collapse Toggle - Desktop Only */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 bg-indigo-600 text-white rounded-full p-1 shadow-lg hover:bg-indigo-700 transition-colors z-50"
          >
            {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto no-scrollbar">
          <NavLink href="/technician/dashboard" icon={<LayoutDashboard />} label="Dashboard" active={pathname === '/technician/dashboard'} onClick={() => setIsSidebarOpen(false)} isCollapsed={isCollapsed} />
          <NavLink href="/discovery" icon={<FileText />} label="History" active={pathname?.startsWith('/discovery')} onClick={() => setIsSidebarOpen(false)} isCollapsed={isCollapsed} />
          <NavLink href="/technician/jobs" icon={<CheckSquare />} label="Jobs" active={pathname?.startsWith('/technician/jobs')} onClick={() => setIsSidebarOpen(false)} isCollapsed={isCollapsed} />
          <div className={`pt-4 mt-4 border-t border-indigo-900 transition-opacity duration-300 ${isCollapsed ? "opacity-0" : "opacity-100"}`}>
            <NavLink href="/" icon={<Home />} label="Website" active={false} onClick={() => setIsSidebarOpen(false)} isCollapsed={isCollapsed} />
          </div>
        </nav>

        <div className={`p-4 bg-indigo-950 border-t border-indigo-900 mt-auto ${isCollapsed ? "p-2 items-center" : ""}`}>
          <button
            onClick={() => signOut({ callbackUrl: '/signin' })}
            className={`flex w-full items-center gap-3 text-indigo-300 hover:text-white hover:bg-indigo-900 rounded-lg transition-colors ${isCollapsed ? "justify-center p-3" : "px-4 py-3"}`}
            title={isCollapsed ? "Sign Out" : ""}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="font-medium animate-in fade-in duration-300">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className={`flex-1 w-full pt-16 lg:pt-0 overflow-x-hidden transition-all duration-300 ${isCollapsed ? "lg:ml-20" : "lg:ml-64"}`}>
        {children}
      </main>
    </div>
  );
}

function NavLink({ href, icon, label, active, onClick, isCollapsed }: any) {
  return (
    <Link
      href={href}
      onClick={onClick}
      title={isCollapsed ? label : ""}
      className={`flex items-center gap-3 rounded-lg transition-all duration-300 ${active
        ? "bg-indigo-700 text-white shadow-lg"
        : "text-indigo-200 hover:text-white hover:bg-indigo-800"
        } ${isCollapsed ? "justify-center p-3" : "px-4 py-3"}`}
    >
      <span className="[&>svg]:w-5 [&>svg]:h-5 flex-shrink-0">{icon}</span>
      {!isCollapsed && <span className="font-medium whitespace-nowrap animate-in fade-in duration-300">{label}</span>}
    </Link>
  );
}
