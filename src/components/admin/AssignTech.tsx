"use client";
import { useState, useEffect } from "react";
import { UserPlus, Loader2, Check } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function AssignTech({ inquiryId, currentTechId }: { inquiryId: number, currentTechId: string | null }) {
  const [techs, setTechs] = useState<any[]>([]);
  const [selectedTech, setSelectedTech] = useState(currentTechId || "");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/technicians").then(res => res.json()).then(setTechs);
  }, []);

  const handleAssign = async () => {
    setLoading(true);
    // Generate a random 4-digit code (1000-9999)
    const code = Math.floor(1000 + Math.random() * 9000).toString();

    try {
      const res = await fetch(`/api/admin/inquiries/${inquiryId}/assign`, {
        method: "PATCH",
        body: JSON.stringify({ technicianId: selectedTech, startCode: code })
      });
      
      if (res.ok) {
        toast.success("Technician Assigned & Code Generated");
        router.refresh();
      } else {
        toast.error("Assignment failed");
      }
    } catch (e) {
      toast.error("Network error");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 mt-2 w-full sm:w-auto">
      <select 
        className="border rounded-lg p-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none w-full sm:w-48"
        value={selectedTech}
        onChange={(e) => setSelectedTech(e.target.value)}
      >
        <option value="">Select Technician...</option>
        {techs.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
      </select>
      <button 
        onClick={handleAssign}
        disabled={loading || !selectedTech}
        className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-800 disabled:opacity-50 w-full sm:w-auto"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin"/> : <UserPlus className="w-4 h-4"/>}
        Assign
      </button>
    </div>
  );
}
