"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Clock, Play, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { JobTimer } from "@/components/client/JobTimer";

export function ActiveJobsCarousel({ jobs }: { jobs: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextJob = () => {
    setCurrentIndex((prev) => (prev + 1) % jobs.length);
  };

  const prevJob = () => {
    setCurrentIndex((prev) => (prev === 0 ? jobs.length - 1 : prev - 1));
  };

  const job = jobs[currentIndex];

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border-l-8 border-green-500 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <Clock className="w-32 h-32" />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
              LIVE JOB {jobs.length > 1 ? `(${currentIndex + 1}/${jobs.length})` : ""}
            </span>
            <h2 className="text-xl font-bold truncate max-w-[200px] sm:max-w-md">
              {job.name || "Service Request"}
            </h2>
          </div>

          {/* Navigation Controls (Only if > 1 job) */}
          {jobs.length > 1 && (
            <div className="flex gap-2">
              <button onClick={prevJob} className="p-1 bg-white/10 rounded-full hover:bg-white/20 transition">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={nextJob} className="p-1 bg-white/10 rounded-full hover:bg-white/20 transition">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-slate-400 text-sm mb-1">Job Description</p>
            <p className="text-slate-200 line-clamp-2">{job.message}</p>
            <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">
              <Play className="w-4 h-4 text-green-400" />
              Started at: <span className="text-white">{job.startedAt ? format(new Date(job.startedAt), "h:mm a") : "Unknown"}</span>
            </div>
            <div className="mt-1 flex items-center gap-2 text-sm text-slate-400">
              <Clock className="w-4 h-4 text-blue-400" />
              Time Elapsed: {job.startedAt ? <JobTimer startTime={job.startedAt} /> : "0m"}
            </div>
          </div>

          <div className="bg-white/10 p-4 rounded-xl border border-white/10">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-400 shrink-0" />
              <div>
                <h3 className="font-bold text-yellow-400 text-sm uppercase tracking-wide mb-1">Completion Code</h3>
                <p className="text-xs text-slate-300 mb-3">
                  Provide this code to the technician ONLY when the job is finished.
                </p>
                <div className="bg-white text-slate-900 font-mono text-2xl font-black tracking-[0.2em] text-center py-3 rounded-lg shadow-inner">
                  {job.endCode}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
