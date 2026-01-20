"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle } from "lucide-react";

export function CompleteJobForm({ jobId }: { jobId: number }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleComplete = async () => {
    setLoading(true);
    const res = await fetch("/api/technician/complete-job", {
      method: "POST",
      body: JSON.stringify({ jobId, code })
    });

    if (res.ok) {
      toast.success("Job Completed Successfully!");
      router.refresh();
    } else {
      toast.error("Invalid Code. Ask client for the Completion Code.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <input 
        type="text" 
        maxLength={4} 
        placeholder="Client's Completion Code"
        className="w-full text-center text-xl font-mono tracking-widest text-slate-900 rounded-xl border-none focus:ring-4 focus:ring-red-500 py-3 bg-white"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button 
        onClick={handleComplete}
        disabled={loading || code.length < 4}
        className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 disabled:opacity-50 flex justify-center items-center gap-2 shadow-lg"
      >
        {loading ? <Loader2 className="w-6 h-6 animate-spin"/> : <><CheckCircle className="w-6 h-6"/> COMPLETE JOB</>}
      </button>
    </div>
  );
}
