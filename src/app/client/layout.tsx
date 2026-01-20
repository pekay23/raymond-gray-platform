"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, FileText, User, LogOut, 
  Menu, X, Home, PlusCircle 
} from "lucide-react";
import { signOut } from "next-auth/react";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-slate-50 relative">
      
      {/* MOBILE HEADER - TEAL */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-teal-900 text-white flex items-center justify-between px-4 z-50 shadow-md">
        <span className="font-bold text-lg tracking-tight">Client Portal</span>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-white">
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

      {/* SIDEBAR - TEAL */}
      <aside className={`
        fixed top-0 left-0 bottom-0 w-64 bg-teal-950 text-white z-50 transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:flex-shrink-0
      `}>
        <div className="p-6 border-b border-teal-800 flex justify-between items-center h-16 lg:h-auto">
          <div>
            <h2 className="font-bold text-xl text-white">Raymond Gray</h2>
            <p className="text-xs text-teal-300 uppercase tracking-wider font-bold">Client</p>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="p-4 space-y-2">
          <div className="mb-6">
             <Link 
               href="/services" 
               className="flex items-center justify-center gap-2 w-full bg-white text-teal-900 px-4 py-3 rounded-lg font-bold shadow-md hover:bg-teal-50 transition"
             >
               <PlusCircle className="w-5 h-5" /> New Request
             </Link>
          </div>

          <NavLink href="/client/dashboard" icon={<LayoutDashboard />} label="Overview" active={pathname === '/client/dashboard'} onClick={() => setIsSidebarOpen(false)} />
          <NavLink href="/client/requests" icon={<FileText />} label="My Requests" active={pathname?.startsWith('/client/requests')} onClick={() => setIsSidebarOpen(false)} />
          <NavLink href="/client/profile" icon={<User />} label="My Profile" active={pathname === '/client/profile'} onClick={() => setIsSidebarOpen(false)} />
          
          <div className="pt-4 mt-4 border-t border-teal-900">
            <NavLink href="/" icon={<Home />} label="Back to Website" active={false} onClick={() => setIsSidebarOpen(false)} />
          </div>
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-teal-950 border-t border-teal-900">
           <button 
             onClick={() => signOut({ callbackUrl: '/signin' })} 
             className="flex w-full items-center gap-3 px-4 py-3 text-teal-300 hover:text-white hover:bg-teal-900 rounded-lg transition-colors font-medium"
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
          ? "bg-teal-800 text-white shadow-lg" 
          : "text-teal-200 hover:text-white hover:bg-teal-900"
      }`}
    >
      <span className="[&>svg]:w-5 [&>svg]:h-5">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}
