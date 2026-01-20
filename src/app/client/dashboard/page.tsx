import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FileText, CheckCircle, Clock, Plus } from "lucide-react";
import { format } from "date-fns";

export default async function ClientDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) return <div>Access Denied</div>;

  // Fetch only THIS user's inquiries
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

  return (
    <div className="p-4 md:p-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">My Dashboard</h1>
          <p className="text-slate-500">Welcome back, {session.user.name}</p>
        </div>
        <Link href="/services" className="hidden md:flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition shadow-sm">
          <Plus className="w-5 h-5" /> New Service Request
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <ClientStatCard title="Active Requests" value={stats.pending} icon={<Clock className="text-orange-600" />} bg="bg-orange-50" />
        <ClientStatCard title="Resolved" value={stats.resolved} icon={<CheckCircle className="text-green-600" />} bg="bg-green-50" />
        <ClientStatCard title="Total History" value={stats.total} icon={<FileText className="text-blue-600" />} bg="bg-blue-50" />
      </div>

      {/* Recent Requests List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">Recent Activity</h2>
        </div>
        
        {myInquiries.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <p className="mb-4">You haven't submitted any requests yet.</p>
            <Link href="/contact" className="text-blue-600 font-bold hover:underline">Make your first request</Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {myInquiries.map((req) => (
              <div key={req.id} className="p-4 md:p-6 hover:bg-slate-50 transition flex flex-col md:flex-row gap-4 justify-between md:items-center">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      req.status === 'RESOLVED' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {req.status || 'PENDING'}
                    </span>
                    <span className="text-xs text-slate-400">
                      {format(new Date(req.createdAt), "MMM d, yyyy")}
                    </span>
                  </div>
                  <p className="text-slate-900 font-medium line-clamp-1">{req.message}</p>
                </div>
                {/* No view button needed for clients usually, unless you build a client view page */}
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
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
      <div className={`w-12 h-12 ${bg} rounded-full flex items-center justify-center`}>
        <div className="[&>svg]:w-6 [&>svg]:h-6">{icon}</div>
      </div>
      <div>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{title}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}
