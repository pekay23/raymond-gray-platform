import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FileText, CheckCircle, Clock, Plus, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { ActiveJobsCarousel } from "@/components/client/ActiveJobsCarousel"; // Ensure this component is created

export default async function ClientDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) return <div>Access Denied</div>;

  const myInquiries = await prisma.inquiry.findMany({
    where: { email: session.user.email || "" },
    orderBy: { createdAt: 'desc' },
    take: 10
  });

  const stats = {
    total: myInquiries.length,
    pending: myInquiries.filter(i => i.status !== "RESOLVED").length,
    resolved: myInquiries.filter(i => i.status === "RESOLVED").length,
  };

  // Find ALL active jobs (Assigned OR In Progress) to show in the carousel
  const activeJobs = myInquiries.filter(job => job.status === "IN_PROGRESS" || job.status === "ASSIGNED");

  return (
    <div className="p-4 md:p-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">My Dashboard</h1>
          <p className="text-slate-500">Welcome back, {session.user.name}</p>
        </div>
        <Link href="/services" className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-sm">
          <Plus className="w-5 h-5" /> New Service Request
        </Link>
      </div>

      {/* ACTIVE JOBS CAROUSEL (Handles multiple jobs + Start/End Codes) */}
      {activeJobs.length > 0 && (
        <ActiveJobsCarousel jobs={activeJobs} />
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <ClientStatCard title="Active Requests" value={stats.pending} icon={<Clock className="text-orange-600" />} bg="bg-orange-50" />
        <ClientStatCard title="Resolved" value={stats.resolved} icon={<CheckCircle className="text-green-600" />} bg="bg-green-50" />
        <ClientStatCard title="Total History" value={stats.total} icon={<FileText className="text-blue-600" />} bg="bg-blue-50" />
      </div>

      {/* Recent Requests List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-800">Recent Activity</h2>
          <Link href="/client/requests" className="text-sm text-blue-600 hover:underline">View All</Link>
        </div>
        
        {myInquiries.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <p className="mb-4">You haven't submitted any requests yet.</p>
            <Link href="/services" className="text-blue-600 font-bold hover:underline">Make your first request</Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
            {myInquiries.map((req) => (
              <div key={req.id} className="p-4 hover:bg-slate-50 transition group">
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
                  
                  {/* Left: Status & Date */}
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                      req.status === 'RESOLVED' ? 'bg-green-100 text-green-700' : 
                      req.status === 'IN_PROGRESS' ? 'bg-purple-100 text-purple-700' :
                      req.status === 'ASSIGNED' ? 'bg-blue-100 text-blue-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {req.status?.replace("_", " ") || 'PENDING'}
                    </span>
                    <span className="text-xs text-slate-400">
                      {format(new Date(req.createdAt), "MMM d")}
                    </span>
                  </div>

                  {/* Message Preview */}
                  <div className="flex-1 sm:ml-4">
                    <p className="text-slate-900 font-medium text-sm line-clamp-1 break-words">
                      {req.message}
                    </p>
                  </div>

                  {/* LINKED ARROW */}
                  <Link href="/client/requests" className="hidden sm:block text-slate-300 group-hover:text-blue-500 transition">
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ClientStatCard({ title, value, icon, bg }: any) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
      <div className={`w-10 h-10 ${bg} rounded-full flex items-center justify-center shrink-0`}>
        <div className="[&>svg]:w-5 [&>svg]:h-5">{icon}</div>
      </div>
      <div>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-0.5">{title}</p>
        <p className="text-xl font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}
