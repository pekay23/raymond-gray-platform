import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { FileText, Clock, CheckCircle } from "lucide-react";

export default async function ClientRequestsPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) return <div>Access Denied</div>;

  const requests = await prisma.inquiry.findMany({
    where: { email: session.user.email || "" },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">My Requests</h1>
      <p className="text-slate-500 mb-8">Track the status of your service history.</p>

      <div className="space-y-4">
        {requests.length === 0 ? (
          <div className="bg-white p-12 rounded-xl text-center border border-slate-200">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">No requests found.</p>
          </div>
        ) : (
          requests.map((req) => (
            <div key={req.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${req.status === 'RESOLVED' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                    {req.status === 'RESOLVED' ? <CheckCircle className="w-5 h-5"/> : <Clock className="w-5 h-5"/>}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Request #{req.id}</h3>
                    <p className="text-xs text-slate-500">{format(new Date(req.createdAt), "PPP 'at' p")}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-center ${
                  req.status === 'RESOLVED' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                }`}>
                  {req.status || 'Pending'}
                </span>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg text-slate-700 text-sm leading-relaxed whitespace-pre-wrap break-words">
                {req.message}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
