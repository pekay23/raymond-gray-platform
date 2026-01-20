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
      
      {/* MOBILE HEADER */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-50">
        <Link href="/" className="font-bold text-lg text-slate-900 tracking-tight">
          Raymond Gray<span className="text-blue-600">.</span>
        </Link>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-600">
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* OVERLAY */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`
        fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-slate-200 z-50 transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:flex-shrink-0
      `}>
        <div className="p-6 border-b border-slate-100 flex justify-between items-center h-16 lg:h-auto">
          <Link href="/" className="text-xl font-bold tracking-tight text-slate-900 block hover:text-blue-600 transition">
            Raymond Gray<span className="text-blue-600">.</span>
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-1 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="p-4 space-y-1">
          <div className="mb-6">
             <Link 
               href="/contact" 
               className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-bold shadow-md hover:bg-blue-700 transition"
             >
               <PlusCircle className="w-5 h-5" /> New Request
             </Link>
          </div>

          <NavLink href="/client/dashboard" icon={<LayoutDashboard />} label="Overview" active={pathname === '/client/dashboard'} onClick={() => setIsSidebarOpen(false)} />
          <NavLink href="/client/requests" icon={<FileText />} label="My Requests" active={pathname?.startsWith('/client/requests')} onClick={() => setIsSidebarOpen(false)} />
          <NavLink href="/client/profile" icon={<User />} label="My Profile" active={pathname === '/client/profile'} onClick={() => setIsSidebarOpen(false)} />
          
          <div className="pt-4 mt-4 border-t border-slate-100">
            <NavLink href="/" icon={<Home />} label="Back to Website" active={false} onClick={() => setIsSidebarOpen(false)} />
          </div>
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-100 bg-slate-50">
           <button 
             onClick={() => signOut({ callbackUrl: '/signin' })} 
             className="flex w-full items-center gap-3 px-4 py-3 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
           >
             <LogOut className="w-5 h-5" />
             Sign Out
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
          ? "bg-blue-50 text-blue-700 font-medium" 
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      }`}
    >
      <span className="[&>svg]:w-5 [&>svg]:h-5">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}
