"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, FileText, User, LogOut,
  Menu, X, Home, PlusCircle, ChevronLeft, ChevronRight
} from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
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
        fixed top-0 left-0 bottom-0 bg-teal-950 text-white z-50 transition-all duration-300 ease-in-out border-r border-teal-900
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 ${isCollapsed ? "w-20" : "w-64"} flex flex-col
      `}>
        <div className={`p-6 border-b border-teal-800 flex flex-col gap-4 relative ${isCollapsed ? "items-center px-2" : ""}`}>
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
            <div className="flex justify-between items-center text-teal-300 animate-in fade-in duration-300">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Client Portal</p>
              </div>
              <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-teal-400">
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Collapse Toggle - Desktop Only */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 bg-teal-600 text-white rounded-full p-1 shadow-lg hover:bg-teal-700 transition-colors z-50"
          >
            {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto no-scrollbar">
          {!isCollapsed && (
            <div className="mb-6 animate-in slide-in-from-top duration-300">
              <Link
                href="/services"
                className="flex items-center justify-center gap-2 w-full bg-white text-teal-900 px-4 py-3 rounded-lg font-bold shadow-md hover:bg-teal-50 transition"
              >
                <PlusCircle className="w-5 h-5" /> New Request
              </Link>
            </div>
          )}
          {isCollapsed && (
            <div className="mb-6 flex justify-center">
              <Link
                href="/services"
                title="New Request"
                className="flex items-center justify-center w-10 h-10 bg-white text-teal-900 rounded-full font-bold shadow-md hover:bg-teal-50 transition"
              >
                <PlusCircle className="w-5 h-5" />
              </Link>
            </div>
          )}

          <NavLink href="/client/dashboard" icon={<LayoutDashboard />} label="Overview" active={pathname === '/client/dashboard'} onClick={() => setIsSidebarOpen(false)} isCollapsed={isCollapsed} />
          <NavLink href="/client/requests" icon={<FileText />} label="Requests" active={pathname?.startsWith('/client/requests')} onClick={() => setIsSidebarOpen(false)} isCollapsed={isCollapsed} />
          <NavLink href="/client/profile" icon={<User />} label="Profile" active={pathname === '/client/profile'} onClick={() => setIsSidebarOpen(false)} isCollapsed={isCollapsed} />

          <div className={`pt-4 mt-4 border-t border-teal-900 transition-opacity duration-300 ${isCollapsed ? "opacity-0" : "opacity-100"}`}>
            <NavLink href="/" icon={<Home />} label="Website" active={false} onClick={() => setIsSidebarOpen(false)} isCollapsed={isCollapsed} />
          </div>
        </nav>

        <div className={`p-4 bg-teal-950 border-t border-teal-900 mt-auto ${isCollapsed ? "p-2 items-center" : ""}`}>
          <button
            onClick={() => signOut({ callbackUrl: '/signin' })}
            className={`flex w-full items-center gap-3 text-teal-300 hover:text-white hover:bg-teal-900 rounded-lg transition-colors font-medium ${isCollapsed ? "justify-center p-3" : "px-4 py-3"}`}
            title={isCollapsed ? "Sign Out" : ""}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="animate-in fade-in duration-300 text-sm">Sign Out</span>}
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
        ? "bg-teal-800 text-white shadow-lg"
        : "text-teal-200 hover:text-white hover:bg-teal-900"
        } ${isCollapsed ? "justify-center p-3" : "px-4 py-3"}`}
    >
      <span className="[&>svg]:w-5 [&>svg]:h-5 flex-shrink-0">{icon}</span>
      {!isCollapsed && <span className="font-medium whitespace-nowrap animate-in fade-in duration-300">{label}</span>}
    </Link>
  );
}
