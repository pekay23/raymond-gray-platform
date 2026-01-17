import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { Wrench, MapPin, ClipboardList, LogOut } from "lucide-react";

export default async function TechnicianDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "TECHNICIAN") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="text-center p-6">
          <p className="text-3xl font-bold text-red-500 mb-4">Access Denied</p>
          <p className="text-xl">Technicians Only.</p>
          <Link href="/signin" className="mt-6 inline-block bg-blue-600 px-6 py-3 rounded-md font-bold">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-20">
      
      {/* App Header */}
      <header className="bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-50 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Wrench className="text-blue-500 w-6 h-6" />
          <h1 className="font-bold text-lg tracking-wide">RG TECH</h1>
        </div>
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
          {session.user.email?.charAt(0).toUpperCase()}
        </div>
      </header>

      <main className="p-4 space-y-6">
        
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-blue-900 to-slate-900 p-6 rounded-xl border border-blue-800">
          <p className="text-blue-300 text-sm font-medium uppercase tracking-wider mb-1">Welcome Back</p>
          <h2 className="text-2xl font-bold">{session.user.name || "Technician"}</h2>
          <p className="text-slate-400 text-xs mt-1">{session.user.email}</p>
        </div>

        {/* Status Strip */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-center">
            <span className="block text-3xl font-bold text-white">0</span>
            <span className="text-xs text-slate-500 uppercase">Active Jobs</span>
          </div>
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-center">
            <span className="block text-3xl font-bold text-green-500">0</span>
            <span className="text-xs text-slate-500 uppercase">Completed</span>
          </div>
        </div>

        {/* Assigned Jobs List (Placeholder) */}
        <div>
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-blue-500" /> Today's Assignments
          </h3>
          
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-8 text-center">
            <p className="text-slate-500">No jobs assigned yet.</p>
          </div>
        </div>

      </main>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 h-16 flex justify-around items-center z-50">
        <NavItem icon={<ClipboardList />} label="Jobs" active />
        <NavItem icon={<MapPin />} label="Map" />
        <Link href="/api/auth/signout" className="flex flex-col items-center gap-1 text-slate-500 hover:text-red-500">
          <LogOut className="w-5 h-5" />
          <span className="text-[10px] font-medium">Logout</span>
        </Link>
      </nav>

    </div>
  );
}

function NavItem({ icon, label, active }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <div className={`flex flex-col items-center gap-1 cursor-pointer ${active ? "text-blue-500" : "text-slate-500"}`}>
      <div className="w-5 h-5">{icon}</div>
      <span className="text-[10px] font-medium">{label}</span>
    </div>
  );
}
