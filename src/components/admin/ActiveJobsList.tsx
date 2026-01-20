"use client";

import Link from "next/link";
import { Clock, ArrowRight, User } from "lucide-react";
import { JobTimer } from "@/components/client/JobTimer"; // Reuse your existing timer

export function ActiveJobsList({ jobs }: { jobs: any[] }) {
  if (jobs.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-3">
          <Clock className="w-6 h-6 text-green-600 opacity-50" />
        </div>
        <h3 className="font-bold text-slate-900">All Quiet</h3>
        <p className="text-sm text-slate-500">No jobs are currently in progress.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-full flex flex-col">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <h2 className="text-lg font-bold text-slate-800">Live Operations</h2>
        </div>
        <span className="text-xs font-bold bg-slate-100 px-2 py-1 rounded text-slate-600">
          {jobs.length} Active
        </span>
      </div>
      
      <div className="divide-y divide-slate-100 overflow-y-auto max-h-[400px]">
        {jobs.map((job) => (
          <div key={job.id} className="p-4 hover:bg-slate-50 transition group">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs">
                  {job.technician?.name?.charAt(0) || "T"}
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{job.technician?.name || "Unknown Tech"}</p>
                  <p className="text-xs text-slate-500">Client: {job.name}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-mono font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                  <JobTimer startTime={job.startedAt} />
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-3 pl-11">
              <p className="text-xs text-slate-500 truncate max-w-[150px]">{job.message}</p>
              <Link href={`/admin/inquiries/${job.id}`} className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-1">
                Monitor <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
