"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, CheckSquare, LogOut, Menu, X, Home } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function TechnicianLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
        fixed top-0 left-0 bottom-0 w-64 bg-indigo-950 text-white z-50 transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:flex-shrink-0
      `}>
        <div className="p-6 border-b border-indigo-800 h-16 lg:h-auto flex items-center justify-between">
          <div>
            <h2 className="font-bold text-xl text-white">Raymond Gray</h2>
            <p className="text-xs text-indigo-300 uppercase tracking-wider font-bold">Technician</p>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden"><X className="w-5 h-5"/></button>
        </div>
        
        <nav className="p-4 space-y-2">
          <NavLink href="/technician/dashboard" icon={<LayoutDashboard />} label="Dashboard" active={pathname === '/technician/dashboard'} onClick={() => setIsSidebarOpen(false)} />
          <NavLink href="/technician/jobs" icon={<CheckSquare />} label="Available Jobs" active={pathname?.startsWith('/technician/jobs')} onClick={() => setIsSidebarOpen(false)} />
          <div className="pt-4 mt-4 border-t border-indigo-900">
            <NavLink href="/" icon={<Home />} label="Back to Website" active={false} onClick={() => setIsSidebarOpen(false)} />
          </div>
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-indigo-950 border-t border-indigo-900">
           <button 
             onClick={() => signOut({ callbackUrl: '/signin' })} 
             className="flex w-full items-center gap-3 px-4 py-3 text-indigo-300 hover:text-white hover:bg-indigo-900 rounded-lg transition-colors"
           >
             <LogOut className="w-5 h-5" /> Sign Out
           </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full pt-16 lg:pt-0 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}

function NavLink({ href, icon, label, active, onClick }: any) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        active 
          ? "bg-indigo-700 text-white shadow-lg" 
          : "text-indigo-200 hover:text-white hover:bg-indigo-800"
      }`}
    >
      <span className="[&>svg]:w-5 [&>svg]:h-5">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}
