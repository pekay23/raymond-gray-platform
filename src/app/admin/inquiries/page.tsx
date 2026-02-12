"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Search, Loader2, RefreshCcw, Trash2, Eye, User, Calendar } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchInquiries = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/inquiries");
      if (res.ok) {
        const data = await res.json();
        setInquiries(Array.isArray(data) ? data : []);
      } else {
        setInquiries([]);
      }
    } catch {
      // silently handle fetch errors
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;

    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Inquiry deleted");
        fetchInquiries();
      } else {
        toast.error("Failed to delete");
      }
    } catch (e) {
      toast.error("Network error");
    }
  };

  const filteredInquiries = inquiries.filter((inq) =>
    inq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inq.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 min-h-screen">

      {/* HEADER & SEARCH */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Inquiries</h1>
          <p className="text-slate-500 text-sm">Manage client messages.</p>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={fetchInquiries}
            className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition bg-white"
          >
            <RefreshCcw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="p-12 text-center text-slate-400 flex flex-col items-center">
          <Loader2 className="w-8 h-8 animate-spin mb-2" />
          Loading messages...
        </div>
      ) : filteredInquiries.length === 0 ? (
        <div className="p-12 text-center text-slate-500 bg-white rounded-xl border border-slate-200">
          No inquiries found.
        </div>
      ) : (
        <>
          {/* --- DESKTOP VIEW (Table) --- */}
          <div className="hidden md:block bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="p-4 text-sm font-bold text-slate-500 w-32">Date</th>
                  <th className="p-4 text-sm font-bold text-slate-500 w-48">From</th>
                  <th className="p-4 text-sm font-bold text-slate-500">Message</th>
                  <th className="p-4 text-sm font-bold text-slate-500 text-right w-32">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-50 transition group">
                    <td className="p-4 text-sm text-slate-500 whitespace-nowrap align-top">
                      {format(new Date(inq.createdAt), 'MMM d, yyyy')}
                    </td>
                    <td className="p-4 align-top">
                      <div className="font-bold text-slate-900 truncate max-w-[150px]">{inq.name}</div>
                      <div className="text-xs text-slate-500 truncate max-w-[150px]">{inq.email}</div>
                    </td>
                    <td className="p-4 text-sm text-slate-600 align-top">
                      <div className="line-clamp-2 max-w-lg">
                        {inq.message}
                      </div>
                    </td>
                    <td className="p-4 text-right align-top">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/inquiries/${inq.id}`} className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition">
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button onClick={() => handleDelete(inq.id)} className="p-2 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* --- MOBILE VIEW (Cards) --- */}
          <div className="md:hidden space-y-4">
            {filteredInquiries.map((inq) => (
              <div key={inq.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">

                {/* Card Header: Name & Date */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{inq.name}</h3>
                      <p className="text-xs text-slate-500">{inq.email}</p>
                    </div>
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-1 bg-slate-50 px-2 py-1 rounded">
                    <Calendar className="w-3 h-3" />
                    {format(new Date(inq.createdAt), 'MMM d')}
                  </div>
                </div>

                {/* Message Body */}
                <div className="mb-4">
                  <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100 line-clamp-3">
                    {inq.message}
                  </p>
                </div>

                {/* Action Buttons (Full Width on Mobile) */}
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href={`/admin/inquiries/${inq.id}`}
                    className="flex items-center justify-center gap-2 bg-blue-50 text-blue-700 py-2.5 rounded-lg font-bold text-sm border border-blue-100 active:scale-95 transition"
                  >
                    <Eye className="w-4 h-4" /> View
                  </Link>

                  <button
                    onClick={() => handleDelete(inq.id)}
                    className="flex items-center justify-center gap-2 bg-white text-red-600 py-2.5 rounded-lg font-bold text-sm border border-slate-200 hover:bg-red-50 active:scale-95 transition"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>

              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
