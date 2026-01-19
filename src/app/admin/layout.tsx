import Link from "next/link";
import { LayoutDashboard, Users, MessageSquare, Settings, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white flex-shrink-0 hidden lg:block">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold tracking-tight">Raymond Gray<span className="text-red-500">.</span></h2>
          <p className="text-slate-500 text-xs uppercase tracking-widest mt-1">Admin Portal</p>
        </div>
        
        <nav className="p-4 space-y-2">
          <NavLink href="/admin/dashboard" icon={<LayoutDashboard />} label="Dashboard" />
          <NavLink href="/admin/users" icon={<Users />} label="User Management" />
          <NavLink href="/admin/inquiries" icon={<MessageSquare />} label="Inquiries" />
          <div className="pt-8 pb-2">
            <p className="px-4 text-xs font-bold text-slate-500 uppercase">Settings</p>
          </div>
          <NavLink href="/admin/settings" icon={<Settings />} label="Platform Config" />
        </nav>
        
        <div className="p-4 mt-auto border-t border-slate-800">
           <Link href="/api/auth/signout" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
             <LogOut className="w-5 h-5" />
             <span className="font-medium">Sign Out</span>
           </Link>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

function NavLink({ href, icon, label }: any) {
  return (
    <Link href={href} className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
      <span className="[&>svg]:w-5 [&>svg]:h-5">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
}
