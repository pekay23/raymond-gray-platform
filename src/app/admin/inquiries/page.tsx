"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Search, Loader2, RefreshCcw } from "lucide-react";
import Link from "next/link";

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
        setInquiries(Array.isArray(data) ? data : []); // Ensure it's an array
      } else {
        setInquiries([]);
      }
    } catch (e) {
      console.error(e);
      setInquiries([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const filteredInquiries = inquiries.filter((inq) => 
    inq?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inq?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inq?.message?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-slate-900">Inquiries & Messages</h1>
        
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={fetchInquiries}
            className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition"
          >
            <RefreshCcw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4 text-sm font-bold text-slate-500 w-32">Date</th>
                <th className="p-4 text-sm font-bold text-slate-500 w-48">From</th>
                <th className="p-4 text-sm font-bold text-slate-500">Message</th>
                <th className="p-4 text-sm font-bold text-slate-500 text-right w-24">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                 <tr><td colSpan={4} className="p-8 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-slate-400"/></td></tr>
              ) : filteredInquiries.length === 0 ? (
                <tr><td colSpan={4} className="p-8 text-center text-slate-500">No inquiries found.</td></tr>
              ) : (
                filteredInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-50 transition">
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
                      <Link href={`/admin/inquiries/${inq.id}`} className="inline-block text-blue-600 font-bold text-sm hover:underline whitespace-nowrap bg-blue-50 px-3 py-1 rounded-full">
                          View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
