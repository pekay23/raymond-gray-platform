import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { Plus, Clock, CheckCircle2, FileText, User } from "lucide-react";

export default async function ClientDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="text-xl text-slate-600 mb-4">Please sign in to view your dashboard.</p>
          <Link href="/signin" className="px-6 py-3 bg-slate-900 text-white rounded-lg font-bold">Sign In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20 pt-24">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">My Dashboard</h1>
            <p className="text-slate-600">Welcome back, {session.user.name || session.user.email}</p>
          </div>
          <Link href="/services/emergency" className="hidden md:flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition shadow-lg">
            <Plus className="w-5 h-5" /> New Request
          </Link>
        </div>

        {/* Status Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <StatusCard icon={<Clock className="text-amber-500" />} label="Active Requests" count="0" />
          <StatusCard icon={<CheckCircle2 className="text-green-500" />} label="Completed Jobs" count="0" />
          <StatusCard icon={<FileText className="text-blue-500" />} label="Total Invoices" count="0" />
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-bold text-slate-900 text-lg">Recent Requests</h2>
            <Link href="#" className="text-sm text-blue-600 hover:underline">View All</Link>
          </div>
          
          {/* Empty State Placeholder */}
          <div className="p-12 text-center text-slate-500">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-slate-400" />
            </div>
            <p>No recent activity found.</p>
            <Link href="/services/scheduled" className="text-blue-600 font-bold mt-2 inline-block hover:underline">
              Book a Service
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

function StatusCard({ icon, label, count }: { icon: any, label: string, count: string }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
      <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center shrink-0">
        <div className="[&>svg]:w-6 [&>svg]:h-6">{icon}</div>
      </div>
      <div>
        <span className="block text-2xl font-bold text-slate-900">{count}</span>
        <span className="text-sm text-slate-500 font-medium">{label}</span>
      </div>
    </div>
  );
}
