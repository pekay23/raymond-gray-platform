import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { format } from "date-fns";

export default async function TechJobsList() {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "TECHNICIAN") {
    return <div className="p-8">Access Denied</div>;
  }

  // Fetch only jobs assigned to this technician
  const jobs = await prisma.inquiry.findMany({
    where: { 
      technicianId: session.user.id,
      status: { not: "RESOLVED" } // Only show active jobs
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">My Assigned Jobs</h1>

      {jobs.length === 0 ? (
        <div className="bg-white p-12 rounded-xl text-center border border-slate-200">
          <p className="text-slate-500">No active jobs assigned to you right now.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <Link 
              key={job.id} 
              href={`/technician/jobs/${job.id}`}
              className="block bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition group"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide ${
                      job.status === 'IN_PROGRESS' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {job.status.replace("_", " ")}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3"/>
                      {format(new Date(job.createdAt), "MMM d, h:mm a")}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{job.name}</h3>
                  <p className="text-sm text-slate-600 line-clamp-1 mb-3">{job.message}</p>
                  
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <MapPin className="w-3 h-3"/>
                    {job.latitude ? "Location Available" : "Accra, Ghana"}
                  </div>
                </div>
                
                <div className="text-slate-300 group-hover:text-blue-600 transition">
                  <ArrowRight className="w-5 h-5"/>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
