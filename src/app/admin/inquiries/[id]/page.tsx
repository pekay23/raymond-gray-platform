import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Mail, Phone, User, MessageSquare, Reply } from "lucide-react";
import { format } from "date-fns";
import { StatusToggle } from "@/components/admin/StatusToggle";

// Fix: params is now a Promise in Next.js 15
export default async function InquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  
  // 1. Await params before using properties
  const resolvedParams = await params;
  const inquiryId = parseInt(resolvedParams.id);
  
  if (isNaN(inquiryId)) return notFound();

  const inquiry = await prisma.inquiry.findUnique({
    where: { id: inquiryId }
  });

  if (!inquiry) return notFound();

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      
      {/* TOP NAVIGATION */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Link href="/admin/inquiries" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition mb-2">
            <ArrowLeft className="w-4 h-4" /> Back to List
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Inquiry #{inquiry.id}</h1>
        </div>
        
        {/* Status Toggle */}
        <div className="self-start md:self-auto">
          {/* Ensure inquiry.status exists. If DB migration failed, fallback to PENDING */}
          <StatusToggle id={inquiry.id} initialStatus={inquiry.status || "PENDING"} />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        
        {/* CARD HEADER */}
        <div className="bg-slate-50 p-6 border-b border-slate-200 flex flex-col md:flex-row justify-between md:items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
              <User className="w-6 h-6" />
            </div>
            <div className="overflow-hidden">
              <h2 className="text-lg font-bold text-slate-900 truncate">{inquiry.name}</h2>
              <p className="text-sm text-slate-500">Client</p>
            </div>
          </div>

          <div className="flex flex-col md:items-end gap-3">
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <Calendar className="w-4 h-4" />
              {format(new Date(inquiry.createdAt), "PPP p")}
            </div>
            
            <a 
              href={`mailto:${inquiry.email}?subject=Re: Your Inquiry - Raymond Gray&body=Hi ${inquiry.name},%0D%0A%0D%0AThank you for contacting Raymond Gray regarding:%0D%0A"${inquiry.message}"%0D%0A%0D%0A[Your Reply Here]`}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-700 transition w-full md:w-auto"
            >
              <Reply className="w-4 h-4" /> Reply via Email
            </a>
          </div>
        </div>

        {/* CARD CONTENT */}
        <div className="p-6 md:p-8 flex flex-col gap-8">
          
          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoBox 
              icon={<Mail />} 
              label="Email Address" 
              value={inquiry.email} 
              href={`mailto:${inquiry.email}`} 
            />
            <InfoBox 
              icon={<Phone />} 
              label="Phone Number" 
              value={inquiry.phone || "N/A"} 
              href={inquiry.phone ? `tel:${inquiry.phone}` : undefined} 
            />
          </div>

          {/* Message Content - Fixed for Mobile Wrapping */}
          <div className="bg-slate-50 p-4 md:p-6 rounded-xl border border-slate-100 w-full">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" /> Message Content
            </h3>
            
            <div className="w-full overflow-hidden">
              <p className="text-slate-800 text-sm md:text-lg leading-relaxed whitespace-pre-wrap break-words break-all">
                {inquiry.message}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function InfoBox({ icon, label, value, href }: any) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-lg border border-slate-100 md:border-none">
      <div className="mt-1 text-slate-400 shrink-0">{icon}</div>
      <div className="min-w-0 flex-1 overflow-hidden">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
        
        {href ? (
          <a 
            href={href} 
            className="text-base md:text-lg font-medium text-blue-600 hover:underline block truncate"
            title={value} // Show full text on hover if truncated
          >
            {value}
          </a>
        ) : (
          <p className="text-base md:text-lg font-medium text-slate-900 break-words">{value}</p>
        )}
      </div>
    </div>
  );
}
