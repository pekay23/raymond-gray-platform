import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { MapPin, Phone, Play, CheckCircle, ArrowLeft } from "lucide-react";
import { StartJobForm } from "@/components/technician/StartJobForm";
import { CompleteJobForm } from "@/components/technician/CompleteJobForm";
import Link from "next/link";

export default async function JobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  
  const jobId = parseInt(id);
  const job = await prisma.inquiry.findUnique({ where: { id: jobId } });
  
  if (!job) return <div className="p-8">Job Not Found</div>;

  // Ensure strict string comparison for IDs
  if (job.technicianId !== session?.user.id) {
      return (
        <div className="p-8 text-center min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-xl font-bold text-red-600">Unauthorized Access</h1>
            <p className="text-slate-600 mt-2">This job is assigned to another technician.</p>
            <p className="text-xs text-slate-400 mt-4">Job ID: {job.id}</p>
            <Link href="/technician/dashboard" className="mt-6 text-blue-600 hover:underline">
              Return to Dashboard
            </Link>
        </div>
      );
  }

  // Generate Smart Map Link
  const mapQuery = job.address 
    ? encodeURIComponent(job.address)
    : `${job.latitude || 5.6037},${job.longitude || -0.1870}`;
    
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  return (
    <div className="p-4 md:p-6 max-w-lg mx-auto space-y-6">
      <Link href="/technician/dashboard" className="flex items-center gap-2 text-slate-500 font-bold mb-4 hover:text-slate-800 transition">
        <ArrowLeft className="w-5 h-5" /> Back to Dashboard
      </Link>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
        
        {/* Header */}
        <div className="bg-blue-600 p-6 text-white">
          <h1 className="text-2xl font-bold mb-1">Job #{job.id}</h1>
          <p className="text-blue-100 text-sm">Client: {job.name}</p>
        </div>
        
        <div className="p-6 space-y-6">
          
          {/* Contact & Map Actions */}
          <div className="grid grid-cols-2 gap-4">
            <a href={`tel:${job.phone}`} className="flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 p-4 rounded-xl border border-slate-200 transition">
              <Phone className="w-6 h-6 text-slate-700 mb-2"/>
              <span className="text-sm font-bold text-slate-700">Call Client</span>
            </a>
            <a href={mapLink} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center bg-blue-50 hover:bg-blue-100 p-4 rounded-xl border border-blue-200 transition">
              <MapPin className="w-6 h-6 text-blue-600 mb-2"/>
              <span className="text-sm font-bold text-blue-600">Navigate</span>
            </a>
          </div>

          {/* Job Details */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Job Description</h3>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <p className="text-slate-800 text-sm leading-relaxed whitespace-pre-wrap">
                {job.message}
              </p>
              {job.address && (
                <div className="mt-3 pt-3 border-t border-slate-200 flex items-start gap-2 text-xs text-slate-500">
                  <MapPin className="w-3 h-3 mt-0.5 shrink-0" />
                  <span>{job.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* JOB ACTION CARD */}
          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl border border-slate-800">
            
            {/* STATE 1: ASSIGNED (Start Job) */}
            {job.status === "ASSIGNED" ? (
              <>
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <Play className="w-5 h-5 text-green-400"/> Start Job
                </h3>
                <p className="text-slate-400 text-sm mb-6">Ask client for the 4-digit START code.</p>
                <StartJobForm jobId={job.id} />
              </>
            ) : job.status === "IN_PROGRESS" ? (
              
              /* STATE 2: IN PROGRESS (Finish Job) */
              <>
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 bg-green-900/30 px-3 py-1 rounded-full border border-green-500/30">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <p className="text-green-400 font-bold text-sm">JOB IN PROGRESS</p>
                  </div>
                  <p className="text-slate-400 text-xs mt-2">
                    Started: {job.startedAt ? new Date(job.startedAt).toLocaleTimeString() : 'Just now'}
                  </p>
                </div>
                
                <div className="border-t border-slate-700 pt-6">
                  <h3 className="font-bold text-lg mb-2 text-white flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-400"/> Finish Job
                  </h3>
                  <p className="text-slate-400 text-sm mb-4">Work done? Ask client for the 4-digit COMPLETION code.</p>
                  <CompleteJobForm jobId={job.id} />
                </div>
              </>
            ) : (
              
              /* STATE 3: RESOLVED (Done) */
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-green-500/50">
                  <CheckCircle className="w-8 h-8 text-green-500"/>
                </div>
                <p className="font-bold text-xl text-green-400">Job Completed</p>
                <p className="text-slate-400 text-sm mt-1">
                    {job.completedAt ? `Finished on ${new Date(job.completedAt).toLocaleDateString()} at ${new Date(job.completedAt).toLocaleTimeString()}` : "Job Done"}
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
