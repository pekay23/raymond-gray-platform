"use client";

import { useState } from "react";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // Using toast instead of alert

export function StatusToggle({ id, initialStatus }: { id: number, initialStatus: string }) {
  const [status, setStatus] = useState(initialStatus || "PENDING");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const toggleStatus = async () => {
    setIsLoading(true);
    const newStatus = status === "PENDING" ? "RESOLVED" : "PENDING";

    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setStatus(newStatus);
        router.refresh();
        toast.success(`Inquiry marked as ${newStatus}`);
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Network error while updating status");
    }
    setIsLoading(false);
  };

  return (
    <button
      onClick={toggleStatus}
      disabled={isLoading}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all shadow-sm ${
        status === "RESOLVED"
          ? "bg-green-100 text-green-700 hover:bg-green-200 border border-green-200"
          : "bg-orange-100 text-orange-700 hover:bg-orange-200 border border-orange-200"
      }`}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : status === "RESOLVED" ? (
        <CheckCircle className="w-4 h-4" />
      ) : (
        <XCircle className="w-4 h-4" />
      )}
      {status === "RESOLVED" ? "Resolved" : "Mark as Resolved"}
    </button>
  );
}
