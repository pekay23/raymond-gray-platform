"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export function StartJobForm({ jobId }: { jobId: number }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleStart = async () => {
    setLoading(true);
    const res = await fetch("/api/technician/start-job", {
      method: "POST",
      body: JSON.stringify({ jobId, code })
    });

    if (res.ok) {
      toast.success("Code Verified! Job Timer Started.");
      router.refresh();
    } else {
      toast.error("Invalid Code. Ask client again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <input 
        type="text" 
        maxLength={4} 
        placeholder="Enter 4-Digit Code"
        className="w-full text-center text-2xl font-mono tracking-[0.5em] text-slate-900 rounded-xl border-none focus:ring-4 focus:ring-green-500 py-4"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button 
        onClick={handleStart}
        disabled={loading || code.length < 4}
        className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 disabled:opacity-50 flex justify-center items-center gap-2 shadow-lg"
      >
        {loading ? <Loader2 className="w-6 h-6 animate-spin"/> : "START JOB"}
      </button>
    </div>
  );
}
