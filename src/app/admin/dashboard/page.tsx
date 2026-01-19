import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FileText, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { AnalyticsCharts } from "@/components/admin/AnalyticsCharts"; // Import the charts
import { format, subDays } from "date-fns";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "ADMIN") {
    // ... access denied code ...
    return <div>Access Denied</div>;
  }

  // Fetch ALL Inquiries for stats
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: 'desc' },
  });

  // --- 1. CALCULATE SERVICE DISTRIBUTION ---
  const serviceCounts: Record<string, number> = {};
  inquiries.forEach(inq => {
    // Extract service type from message "[Service: Type]..."
    const match = inq.message.match(/\[Service: (.*?)\]/);
    const type = match ? match[1] : "General";
    serviceCounts[type] = (serviceCounts[type] || 0) + 1;
  });

  const serviceData = Object.keys(serviceCounts).map(key => ({
    name: key,
    value: serviceCounts[key]
  }));

  // --- 2. CALCULATE TIMELINE (Last 7 Days) ---
  const timelineData = [];
  for (let i = 6; i >= 0; i--) {
    const date = subDays(new Date(), i);
    const dateStr = format(date, 'MMM dd');
    
    // Count inquiries for this day
    const count = inquiries.filter(inq => 
      format(new Date(inq.createdAt), 'MMM dd') === dateStr
    ).length;

    timelineData.push({ date: dateStr, count });
  }

  // Stats Logic
  const stats = {
    total: inquiries.length,
    emergency: inquiries.filter(i => i.message.includes("Emergency")).length,
    audit: inquiries.filter(i => i.message.includes("Audit")).length,
    servicing: inquiries.filter(i => i.message.includes("Servicing")).length,
  };

  return (
    <div className="p-8 space-y-8">
      
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500">Welcome back, {session.user.name}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Requests" value={stats.total} icon={<FileText className="text-blue-600" />} />
        <StatCard title="Emergency" value={stats.emergency} icon={<AlertCircle className="text-red-600" />} />
        <StatCard title="Audits" value={stats.audit} icon={<CheckCircle className="text-green-600" />} />
        <StatCard title="Servicing" value={stats.servicing} icon={<Clock className="text-amber-600" />} />
      </div>

      {/* Analytics Charts Section */}
      <AnalyticsCharts timelineData={timelineData} serviceData={serviceData} />

      {/* Recent Inquiries Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-800">Recent Inquiries</h2>
          <Link href="/admin/inquiries" className="text-sm text-blue-600 hover:underline font-medium">View All</Link>
        </div>
        
        {/* ADDED: no-scrollbar class to hide scrollbar but allow swipe */}
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-sm min-w-[800px]">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-4 font-semibold w-32">Date</th>
                <th className="p-4 font-semibold w-48">Client</th>
                <th className="p-4 font-semibold w-32">Type</th>
                <th className="p-4 font-semibold">Details</th>
                <th className="p-4 font-semibold text-right w-24">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {inquiries.slice(0, 10).map((job) => (
                <tr key={job.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 text-slate-500 whitespace-nowrap align-top">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 font-medium text-slate-900 align-top">
                    {job.name}
                    <span className="block text-xs text-slate-400 font-normal truncate max-w-[150px]">{job.phone || "No Phone"}</span>
                  </td>
                  <td className="p-4 align-top">
                    <ServiceBadge message={job.message} />
                  </td>
                  <td className="p-4 text-slate-600 align-top">
                    {/* ADDED: line-clamp-2 to prevent huge height */}
                    <div className="line-clamp-2 max-w-sm" title={job.message}>
                      {job.message}
                    </div>
                  </td>
                  <td className="p-4 text-right align-top">
                    <Link href={`/admin/inquiries/${job.id}`} className="inline-block text-blue-600 hover:text-blue-800 font-bold text-xs bg-blue-50 px-3 py-1 rounded-full whitespace-nowrap transition-colors">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
              
              {inquiries.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-slate-400">
                    No inquiries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// --- HELPER COMPONENTS ---

function StatCard({ title, value, icon }: { title: string, value: number, icon: any }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between hover:shadow-md transition-shadow">
      <div>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{title}</p>
        <p className="text-3xl font-bold text-slate-900">{value}</p>
      </div>
      <div className="p-3 bg-slate-50 rounded-lg">{icon}</div>
    </div>
  );
}

function ServiceBadge({ message }: { message: string }) {
  if (message.includes("Emergency")) return <span className="text-red-700 bg-red-100 px-2 py-1 rounded text-xs font-bold">Emergency</span>;
  if (message.includes("Audit")) return <span className="text-blue-700 bg-blue-100 px-2 py-1 rounded text-xs font-bold">Audit</span>;
  if (message.includes("Servicing")) return <span className="text-green-700 bg-green-100 px-2 py-1 rounded text-xs font-bold">Servicing</span>;
  return <span className="text-slate-700 bg-slate-100 px-2 py-1 rounded text-xs font-bold">General</span>;
}
