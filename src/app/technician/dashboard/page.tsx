import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Wrench, MapPin, ClipboardList, LogOut, CheckCircle } from "lucide-react";

export default async function TechnicianDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "TECHNICIAN") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="text-center p-6">
          <p className="text-3xl font-bold text-red-500 mb-4">Access Denied</p>
          <p className="text-xl">Technicians Only.</p>
          <Link href="/signin" className="mt-6 inline-block bg-blue-600 px-6 py-3 rounded-md font-bold">Sign In</Link>
        </div>
      </div>
    );
  }

  // Fetch Jobs (Demo: Showing all Emergency jobs for now)
  const jobs = await prisma.inquiry.findMany({
    where: { message: { contains: "Emergency" } },
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24">
      
      {/* App Header */}
      <header className="bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-50 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg"><Wrench className="text-white w-5 h-5" /></div>
          <h1 className="font-bold text-lg tracking-wide text-white">RG TECH</h1>
        </div>
        <div className="w-9 h-9 bg-slate-800 rounded-full flex items-center justify-center text-xs font-bold border border-slate-700">
          {session.user.name?.charAt(0) || "T"}
        </div>
      </header>

      <main className="p-4 space-y-6">
        
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-6 rounded-2xl border border-blue-700 shadow-lg">
          <p className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-1">Welcome Back</p>
          <h2 className="text-2xl font-bold text-white">{session.user.name || "Technician"}</h2>
          <div className="flex gap-4 mt-4">
            <div className="bg-blue-950/50 px-4 py-2 rounded-lg text-center border border-blue-500/30">
              <span className="block text-xl font-bold">{jobs.length}</span>
              <span className="text-[10px] text-blue-200 uppercase">Active</span>
            </div>
            <div className="bg-blue-950/50 px-4 py-2 rounded-lg text-center border border-blue-500/30">
              <span className="block text-xl font-bold">0</span>
              <span className="text-[10px] text-blue-200 uppercase">Done</span>
            </div>
          </div>
        </div>

        {/* Job List */}
        <div>
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-300">
            <ClipboardList className="w-5 h-5 text-blue-500" /> Today's Jobs
          </h3>
          
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="bg-slate-900 rounded-xl border border-slate-800 p-5 shadow-sm active:scale-95 transition-transform">
                <div className="flex justify-between items-start mb-3">
                  <span className="bg-red-900/50 text-red-400 text-xs font-bold px-2 py-1 rounded uppercase">Emergency</span>
                  <span className="text-slate-500 text-xs">{new Date(job.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
                <h4 className="font-bold text-lg text-white mb-1">{job.name}</h4>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">{job.message.split('\n')[0]}</p>
                
                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-lg text-sm font-bold transition">Start</button>
                  <button className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition">
                    <MapPin className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}

            {jobs.length === 0 && (
              <div className="text-center py-10 text-slate-600">
                <CheckCircle className="w-12 h-12 mx-auto mb-2 opacity-20" />
                <p>No active jobs right now.</p>
              </div>
            )}
          </div>
        </div>

      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 h-16 flex justify-around items-center z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
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
