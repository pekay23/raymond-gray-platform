import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FileText, AlertCircle, CheckCircle, Clock, TrendingUp, Users as UsersIcon, Calendar } from "lucide-react";
import { AnalyticsCharts } from "@/components/admin/AnalyticsCharts";
import { ActiveJobsList } from "@/components/admin/ActiveJobsList"; // Import new component
import { format, subDays } from "date-fns";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "ADMIN") {
    return <div>Access Denied</div>;
  }

  // Fetch ALL Inquiries (Include Technician data now)
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: 'desc' },
    include: { technician: true },
  });

  // Fetch Technician Counts
  const totalTechs = await prisma.user.count({ where: { role: 'TECHNICIAN' } });
  const activeTechsCount = await prisma.user.count({
    where: {
      role: 'TECHNICIAN',
      assignedJobs: { some: { status: 'IN_PROGRESS' } }
    }
  });

  // Filter ACTIVE jobs
  const activeJobs = inquiries.filter(i => i.status === "IN_PROGRESS");

  // --- GROWTH CALCULATIONS ---
  const sevenDaysAgo = subDays(new Date(), 7);
  const fourteenDaysAgo = subDays(new Date(), 14);

  const thisWeekCount = inquiries.filter(i => i.createdAt >= sevenDaysAgo).length;
  const lastWeekCount = inquiries.filter(i => i.createdAt >= fourteenDaysAgo && i.createdAt < sevenDaysAgo).length;

  const growthRate = lastWeekCount === 0
    ? (thisWeekCount > 0 ? 100 : 0)
    : Math.round(((thisWeekCount - lastWeekCount) / lastWeekCount) * 100);

  const growthText = growthRate >= 0 ? `+${growthRate}% from last week` : `${growthRate}% from last week`;

  // ... (Keep existing stats/charts logic) ...
  // --- 1. CALCULATE SERVICE DISTRIBUTION ---
  const serviceCounts: Record<string, number> = {};
  inquiries.forEach(inq => {
    const match = inq.message.match(/\[Service: (.*?)\]/);
    const type = match ? match[1] : "General";
    serviceCounts[type] = (serviceCounts[type] || 0) + 1;
  });
  const serviceData = Object.keys(serviceCounts).map(key => ({ name: key, value: serviceCounts[key] }));

  // --- 2. CALCULATE TIMELINE ---
  const timelineData = [];
  for (let i = 6; i >= 0; i--) {
    const date = subDays(new Date(), i);
    const dateStr = format(date, 'MMM dd');
    const count = inquiries.filter(inq => format(new Date(inq.createdAt), 'MMM dd') === dateStr).length;
    timelineData.push({ date: dateStr, count });
  }

  const stats = {
    total: inquiries.length,
    emergency: inquiries.filter(i => i.message.includes("Emergency")).length,
    audit: inquiries.filter(i => i.message.includes("Audit")).length,
    servicing: inquiries.filter(i => i.message.includes("Servicing")).length,
  };

  return (
    <div className="p-4 md:p-8 space-y-8 bg-slate-50/50 min-h-screen">

      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-500 mt-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Welcome back, <span className="font-bold text-slate-700">{session.user.name}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm text-sm font-medium text-slate-600 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {format(new Date(), 'EEEE, MMMM do')}
          </div>
        </div>
      </div>

      {/* QUICK STATS - PREMIUM CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Requests"
          value={stats.total}
          trend={growthText}
          icon={<FileText className="text-white" />}
          variant="blue"
        />
        <StatCard
          title="Emergency"
          value={stats.emergency}
          trend={`${Math.round((stats.emergency / (stats.total || 1)) * 100)}% of total`}
          icon={<AlertCircle className="text-white" />}
          variant="red"
        />
        <StatCard
          title="Audits"
          value={stats.audit}
          trend={`${stats.audit} pending review`}
          icon={<CheckCircle className="text-white" />}
          variant="green"
        />
        <StatCard
          title="Servicing"
          value={stats.servicing}
          trend={`${inquiries.filter(i => i.message.includes("Servicing") && i.status === 'PENDING').length} pending action`}
          icon={<Clock className="text-white" />}
          variant="amber"
        />
      </div>

      {/* GRID LAYOUT: Charts + Live Ops */}
      <div className="grid lg:grid-cols-3 gap-8">

        {/* Left: Charts (Span 2 cols) */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-1 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/60 overflow-hidden">
            <AnalyticsCharts timelineData={timelineData} serviceData={serviceData} />
          </div>

          {/* Recent Inquiries Table - Integrated into main content */}
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/60 overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Recent Inquiries</h2>
                <p className="text-sm text-slate-500">The latest 10 requests from clients.</p>
              </div>
              <Link href="/admin/inquiries" className="group flex items-center gap-2 text-sm text-blue-600 font-bold bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-100 transition-all">
                View Full List
                <TrendingUp className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left text-sm min-w-[800px]">
                <thead className="bg-slate-50/80 text-slate-500 uppercase tracking-[0.1em] text-[10px] font-black border-b border-slate-200">
                  <tr>
                    <th className="p-6 w-32">Date</th>
                    <th className="p-6 w-48">Client</th>
                    <th className="p-6 w-32">Type</th>
                    <th className="p-6">Details</th>
                    <th className="p-6 text-right w-24">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/50">
                  {inquiries.slice(0, 10).map((job) => (
                    <tr key={job.id} className="group hover:bg-blue-50/30 transition-colors">
                      <td className="p-6 text-slate-500 whitespace-nowrap align-middle">
                        <span className="font-medium text-slate-400">{format(new Date(job.createdAt), 'MMM dd, yyyy')}</span>
                      </td>
                      <td className="p-6 align-middle">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold border border-slate-200 group-hover:bg-white group-hover:scale-110 transition-all">
                            {job.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 leading-tight">{job.name}</p>
                            <p className="text-xs text-slate-400 font-medium">{job.phone || "No Phone"}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-6 align-middle">
                        <ServiceBadge message={job.message} />
                      </td>
                      <td className="p-6 text-slate-600 align-middle">
                        <div className="line-clamp-1 max-w-sm text-slate-500 italic" title={job.message}>
                          "{job.message}"
                        </div>
                      </td>
                      <td className="p-6 text-right align-middle">
                        <Link href={`/admin/inquiries/${job.id}`} className="inline-flex items-center justify-center h-10 w-10 bg-slate-100 text-slate-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                          <TrendingUp className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: Live Operations (Span 1 col) */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <UsersIcon className="w-24 h-24 rotate-12" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Live Ops Card</h3>
              <p className="text-blue-300 text-sm mb-6 leading-relaxed">
                System is monitoring <span className="text-white font-bold">{totalTechs}</span> registered technicians.
                Currently <span className="text-green-400 font-bold">{activeTechsCount}</span> are active on site.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[...Array(Math.min(activeTechsCount, 4))].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-blue-600 flex items-center justify-center text-[10px] font-bold">
                      T{i + 1}
                    </div>
                  ))}
                  {activeTechsCount > 4 && (
                    <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-[10px] font-bold">
                      +{activeTechsCount - 4}
                    </div>
                  )}
                </div>
                <span className="text-xs font-bold text-slate-400">{activeTechsCount} Active Now</span>
              </div>
            </div>
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/60 overflow-hidden">
              <ActiveJobsList jobs={activeJobs} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ... (Keep existing Helper Components StatCard, ServiceBadge) ...
function StatCard({ title, value, icon, variant, trend }: { title: string, value: number, icon: any, variant: 'blue' | 'red' | 'green' | 'amber', trend: string }) {
  const gradients = {
    blue: 'from-blue-600 to-indigo-600 shadow-blue-500/20',
    red: 'from-red-600 to-rose-600 shadow-red-500/20',
    green: 'from-green-600 to-emerald-600 shadow-green-500/20',
    amber: 'from-amber-500 to-orange-500 shadow-amber-500/20',
  };

  return (
    <div className="bg-white p-1 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/60 group hover:scale-[1.02] transition-all duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className={`p-4 rounded-2xl bg-gradient-to-br ${gradients[variant]} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </div>
          <div className="text-right">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{title}</p>
            <p className="text-3xl font-black text-slate-900 mt-1">{value}</p>
          </div>
        </div>
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{trend}</span>
          <div className={`w-2 h-2 rounded-full ${variant === 'red' ? 'bg-red-500' : 'bg-green-500'}`} />
        </div>
      </div>
    </div>
  );
}


function ServiceBadge({ message }: { message: string }) {
  if (message.includes("Emergency")) return <span className="text-red-700 bg-red-50 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border border-red-100">Emergency</span>;
  if (message.includes("Audit")) return <span className="text-blue-700 bg-blue-50 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border border-blue-100">Audit</span>;
  if (message.includes("Servicing")) return <span className="text-green-700 bg-green-50 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border border-green-100">Servicing</span>;
  return <span className="text-slate-700 bg-slate-50 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border border-slate-100">General</span>;
}
