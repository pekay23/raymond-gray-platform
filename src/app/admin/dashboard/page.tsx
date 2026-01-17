import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Users, FileText, CheckCircle, Clock, AlertCircle } from "lucide-react";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <p className="text-2xl font-bold text-red-600 mb-2">Access Denied</p>
          <p className="text-slate-600 mb-6">You must be an Administrator to view this page.</p>
          <Link href="/signin" className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition">Go to Sign In</Link>
        </div>
      </div>
    );
  }

  // Fetch Real Data from Neon DB
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50, // Get last 50
  });

  const stats = {
    total: inquiries.length,
    emergency: inquiries.filter(i => i.message.includes("Emergency")).length,
    audit: inquiries.filter(i => i.message.includes("Audit")).length,
    servicing: inquiries.filter(i => i.message.includes("Servicing")).length,
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* Admin Header */}
      <header className="bg-slate-900 text-white p-6 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Admin Console</h1>
            <p className="text-xs text-slate-400">Manage Jobs & Assignments</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold">{session.user.name}</p>
              <p className="text-xs text-slate-400">{session.user.email}</p>
            </div>
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold">
              {session.user.name?.charAt(0) || "A"}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-8">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Total Requests" value={stats.total} icon={<FileText className="text-blue-500" />} />
          <StatCard title="Emergency" value={stats.emergency} icon={<AlertCircle className="text-red-500" />} />
          <StatCard title="Audits" value={stats.audit} icon={<CheckCircle className="text-green-500" />} />
          <StatCard title="Servicing" value={stats.servicing} icon={<Clock className="text-amber-500" />} />
        </div>

        {/* Job Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-800">Recent Inquiries</h2>
            <button className="text-sm text-blue-600 hover:underline font-medium">Export CSV</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-4 font-semibold">Date</th>
                  <th className="p-4 font-semibold">Client</th>
                  <th className="p-4 font-semibold">Type</th>
                  <th className="p-4 font-semibold">Details</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {inquiries.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 text-slate-500 whitespace-nowrap">
                      {new Date(job.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 font-medium text-slate-900">
                      {job.name}
                      <span className="block text-xs text-slate-400 font-normal">{job.phone || "No Phone"}</span>
                    </td>
                    <td className="p-4">
                      <ServiceBadge message={job.message} />
                    </td>
                    <td className="p-4 text-slate-600 max-w-xs truncate">
                      {job.message.substring(0, 50)}...
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button className="text-blue-600 hover:text-blue-800 font-bold text-xs">Manage</button>
                    </td>
                  </tr>
                ))}
                
                {inquiries.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-slate-400">
                      No inquiries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}

// --- HELPER COMPONENTS ---

function StatCard({ title, value, icon }: { title: string, value: number, icon: any }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
      <div>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{title}</p>
        <p className="text-3xl font-bold text-slate-900">{value}</p>
      </div>
      <div className="p-3 bg-slate-50 rounded-full">{icon}</div>
    </div>
  );
}

function ServiceBadge({ message }: { message: string }) {
  if (message.includes("Emergency")) return <span className="text-red-600 bg-red-50 px-2 py-1 rounded text-xs font-bold">Emergency</span>;
  if (message.includes("Audit")) return <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded text-xs font-bold">Audit</span>;
  if (message.includes("Servicing")) return <span className="text-green-600 bg-green-50 px-2 py-1 rounded text-xs font-bold">Servicing</span>;
  return <span className="text-slate-600 bg-slate-100 px-2 py-1 rounded text-xs font-bold">General</span>;
}
