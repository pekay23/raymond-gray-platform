"use client";
import { useState, useEffect } from "react";
import { UserPlus, Loader2, Check, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function AssignTech({ inquiryId, currentTechId, status }: { inquiryId: number, currentTechId: string | null, status: string }) {
  const [techs, setTechs] = useState<any[]>([]);
  const [selectedTech, setSelectedTech] = useState(currentTechId || "");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // If already assigned, lock the UI (unless you want to allow re-assignment)
  const isAssigned = !!currentTechId; 

  useEffect(() => {
    // Only fetch techs if we might need to assign
    if (!isAssigned) {
        fetch("/api/admin/technicians").then(res => res.json()).then(setTechs);
    }
  }, [isAssigned]);

  const handleAssign = async () => {
    if (!confirm("Assign this technician? This generates security codes.")) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/inquiries/${inquiryId}/assign`, {
        method: "PATCH",
        body: JSON.stringify({ technicianId: selectedTech })
      });
      
      if (res.ok) {
        toast.success("Technician Assigned");
        router.refresh();
      } else {
        toast.error("Assignment failed");
      }
    } catch (e) {
      toast.error("Network error");
    }
    setLoading(false);
  };

  if (isAssigned) {
    return (
      <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg flex items-center justify-between">
        <div className="flex items-center gap-2 text-green-700 text-sm font-bold">
          <Check className="w-4 h-4" />
          <span>Job Assigned</span>
        </div>
        {/* Optional: Add a 'Re-assign' button here later if needed */}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-500">Select a technician to handle this job.</p>
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <select 
          className="border rounded-lg p-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none w-full flex-1"
          value={selectedTech}
          onChange={(e) => setSelectedTech(e.target.value)}
        >
          <option value="">Select Technician...</option>
          {techs.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
        <button 
          onClick={handleAssign}
          disabled={loading || !selectedTech}
          className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-800 disabled:opacity-50 w-full sm:w-auto whitespace-nowrap"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin"/> : <UserPlus className="w-4 h-4"/>}
          Confirm
        </button>
      </div>
    </div>
  );
}
