import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { MapPin, Phone, Play, CheckCircle, ArrowLeft } from "lucide-react";
import { StartJobForm } from "@/components/technician/StartJobForm";
import Link from "next/link";

export default async function JobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  
  const jobId = parseInt(id);
  const job = await prisma.inquiry.findUnique({ where: { id: jobId } });
  
  // DEBUGGING: Remove this line in production
  console.log("Job Tech ID:", job?.technicianId, "Session User ID:", session?.user?.id);

  if (!job) return <div className="p-8">Job Not Found</div>;

  // Ensure strict string comparison for IDs
  if (job.technicianId !== session?.user.id) {
      return (
        <div className="p-8 text-center">
            <h1 className="text-xl font-bold text-red-600">Unauthorized</h1>
            <p>This job is assigned to another technician.</p>
            <p className="text-xs text-slate-400 mt-2">Job ID: {job.id}</p>
        </div>
      );
  }

  const mapLink = `https://www.google.com/maps/search/?api=1&query=${job.latitude || 5.6037},${job.longitude || -0.1870}`;

  return (
    <div className="p-4 md:p-6 max-w-lg mx-auto space-y-6">
      <Link href="/technician/dashboard" className="flex items-center gap-2 text-slate-500 font-bold mb-4">
        <ArrowLeft className="w-5 h-5" /> Back to Dashboard
      </Link>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
        <div className="bg-blue-600 p-6 text-white">
          <h1 className="text-2xl font-bold mb-1">Job #{job.id}</h1>
          <p className="text-blue-100 text-sm">Client: {job.name}</p>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <a href={`tel:${job.phone}`} className="flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 p-4 rounded-xl border border-slate-200 transition">
              <Phone className="w-6 h-6 text-slate-700 mb-2"/>
              <span className="text-sm font-bold text-slate-700">Call</span>
            </a>
            <a href={mapLink} target="_blank" className="flex flex-col items-center justify-center bg-blue-50 hover:bg-blue-100 p-4 rounded-xl border border-blue-200 transition">
              <MapPin className="w-6 h-6 text-blue-600 mb-2"/>
              <span className="text-sm font-bold text-blue-600">Navigate</span>
            </a>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Job Description</h3>
            <p className="text-slate-800 bg-slate-50 p-4 rounded-lg text-sm leading-relaxed border border-slate-100">
              {job.message}
            </p>
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl">
            {/* Show "Start Job" if ASSIGNED, or "Job in Progress" if IN_PROGRESS */}
            {job.status === "ASSIGNED" ? (
              <>
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <Play className="w-5 h-5 text-green-400"/> Start Job
                </h3>
                <p className="text-slate-400 text-sm mb-6">Ask client for the 4-digit code to begin.</p>
                <StartJobForm jobId={job.id} />
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-8 h-8 text-green-500"/>
                </div>
                <p className="font-bold text-xl text-green-400">Job In Progress</p>
                <p className="text-slate-400 text-sm mt-1">
                    {job.startedAt ? `Timer started at ${job.startedAt.toLocaleTimeString()}` : "Timer Running"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
