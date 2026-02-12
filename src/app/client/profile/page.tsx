import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { User, Mail, Shield, FileText, ChevronRight } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";

export default async function ClientProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) return <div>Access Denied</div>;

  // Fetch linked reports
  const reports = await prisma.discoveryReport.findMany({
    where: { clientId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-900 h-32 relative">
          <div className="absolute -bottom-12 left-8 w-24 h-24 bg-white p-1 rounded-full">
            <div className="w-full h-full bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {session.user.name?.charAt(0) || "U"}
            </div>
          </div>
        </div>

        <div className="pt-16 pb-8 px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-1">{session.user.name}</h2>
          <p className="text-slate-500 mb-8">Valued Client</p>

          <div className="space-y-6">
            <ProfileField icon={<Mail />} label="Email Address" value={session.user.email} />
            <ProfileField icon={<Shield />} label="Account Type" value={session.user.role} />
            <ProfileField icon={<User />} label="User ID" value={session.user.id} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-blue-600" />
          My Property Reports
        </h2>

        {reports.length === 0 ? (
          <p className="text-slate-500 italic">No reports have been linked to your profile yet.</p>
        ) : (
          <div className="space-y-4">
            {reports.map((report) => (
              <Link
                key={report.id}
                href={`/discovery/${report.id}`}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <FileText className="w-5 h-5 text-slate-400 group-hover:text-blue-500" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Meeting: {format(new Date(report.meetingDate), "PP")}</p>
                    <p className="text-sm text-slate-500">Facility Audit / Discovery Form</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProfileField({ icon, label, value }: any) {
  return (
    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
      <div className="text-slate-400">{icon}</div>
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
        <p className="text-slate-900 font-medium">{value}</p>
      </div>
    </div>
  );
}
