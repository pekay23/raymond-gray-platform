import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ClipboardList, CheckCircle, Clock, Play, MapPin } from "lucide-react";
import { format } from "date-fns";

export default async function TechDashboard() {
  const session = await getServerSession(authOptions);
  if (!session) return <div>Access Denied</div>;

  // 1. Fetch jobs assigned to THIS technician
  const assignedJobs = await prisma.inquiry.findMany({
    where: { 
      technicianId: session.user.id,
      status: { in: ["ASSIGNED", "IN_PROGRESS"] } // Only show active jobs
    },
    orderBy: { createdAt: "desc" }
  });

  const completedCount = await prisma.inquiry.count({ 
    where: { 
      technicianId: session.user.id,
      status: "RESOLVED" 
    } 
  });

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Technician Dashboard</h1>
        <p className="text-slate-500">Hello, {session.user.name}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <TechStatCard title="Active Jobs" value={assignedJobs.length} icon={<Clock className="text-blue-600" />} />
        <TechStatCard title="Completed" value={completedCount} icon={<CheckCircle className="text-green-600" />} />
      </div>

      {/* Assigned Jobs List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-bold text-slate-800">My Assigned Jobs</h2>
        </div>
        
        <div className="divide-y divide-slate-100">
          {assignedJobs.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              <p>No active jobs assigned to you.</p>
            </div>
          ) : (
            assignedJobs.map((job) => (
              <div key={job.id} className="p-4 hover:bg-slate-50 transition flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide ${
                      job.status === 'IN_PROGRESS' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {job.status.replace("_", " ")}
                    </span>
                    <span className="text-xs text-slate-400">{format(new Date(job.createdAt), "MMM d, h:mm a")}</span>
                  </div>
                  
                  <h3 className="font-bold text-slate-900 text-lg mb-1">{job.name}</h3>
                  <p className="text-sm text-slate-600 line-clamp-1 mb-2">{job.message}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                     <span className="flex items-center gap-1"><MapPin className="w-3 h-3"/> {job.latitude ? "Location Set" : "Accra, GH"}</span>
                  </div>
                </div>

                {/* Action Button */}
                <Link 
                  href={`/technician/jobs/${job.id}`}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition shadow-sm w-full md:w-auto justify-center ${
                    job.status === 'IN_PROGRESS' 
                      ? "bg-green-600 text-white hover:bg-green-700" 
                      : "bg-slate-900 text-white hover:bg-slate-800"
                  }`}
                >
                  {job.status === 'IN_PROGRESS' ? (
                    <>View Job</>
                  ) : (
                    <><Play className="w-4 h-4" /> Start Job</>
                  )}
                </Link>

              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function TechStatCard({ title, value, icon }: any) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center gap-3">
      <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
      <div>
        <p className="text-xs text-slate-500 uppercase font-bold">{title}</p>
        <p className="text-xl font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}
