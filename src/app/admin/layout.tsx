"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Users, MessageSquare, Settings, LogOut, 
  Menu, X, Home 
} from "lucide-react";
import { signOut } from "next-auth/react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-slate-50 relative">
      
      {/* MOBILE HEADER */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 text-white flex items-center justify-between px-4 z-50 shadow-md">
        <Link href="/" className="font-bold text-lg tracking-tight">
          Raymond Gray<span className="text-red-500">.</span>
        </Link>
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

      {/* SIDEBAR */}
      <aside className={`
        fixed top-0 left-0 bottom-0 w-64 bg-slate-900 text-white z-50 transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:flex-shrink-0
      `}>
        <div className="p-6 border-b border-slate-800 flex justify-between items-center h-16 lg:h-auto">
          <div>
            <Link href="/" className="text-xl font-bold tracking-tight block hover:text-red-400 transition">
              Raymond Gray<span className="text-red-500">.</span>
            </Link>
            <p className="text-slate-500 text-xs uppercase tracking-widest mt-1 hidden lg:block">Admin Portal</p>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-1 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* ADDED 'no-scrollbar' HERE */}
        <nav className="p-4 space-y-2 overflow-y-auto max-h-[calc(100vh-140px)] no-scrollbar">
          <NavLink href="/" icon={<Home />} label="Back to Website" active={false} onClick={() => setIsSidebarOpen(false)} />
          <div className="h-px bg-slate-800 my-2 mx-4" />
          <NavLink href="/admin/dashboard" icon={<LayoutDashboard />} label="Dashboard" active={pathname === '/admin/dashboard'} onClick={() => setIsSidebarOpen(false)} />
          <NavLink href="/admin/users" icon={<Users />} label="User Management" active={pathname?.startsWith('/admin/users')} onClick={() => setIsSidebarOpen(false)} />
          <NavLink href="/admin/inquiries" icon={<MessageSquare />} label="Inquiries" active={pathname?.startsWith('/admin/inquiries')} onClick={() => setIsSidebarOpen(false)} />
          <div className="pt-8 pb-2">
            <p className="px-4 text-xs font-bold text-slate-500 uppercase">Settings</p>
          </div>
          <NavLink href="/admin/settings" icon={<Settings />} label="Platform Config" active={pathname === '/admin/settings'} onClick={() => setIsSidebarOpen(false)} />
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800 bg-slate-900">
           <button 
             onClick={() => signOut({ callbackUrl: '/signin' })} 
             className="flex w-full items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
           >
             <LogOut className="w-5 h-5" />
             <span className="font-medium">Sign Out</span>
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
          ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
          : "text-slate-300 hover:text-white hover:bg-slate-800"
      }`}
    >
      <span className="[&>svg]:w-5 [&>svg]:h-5">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
}
