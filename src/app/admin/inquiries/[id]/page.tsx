import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Mail, Phone, User, MessageSquare, Reply, MapPin } from "lucide-react";
import { format } from "date-fns";
import { StatusToggle } from "@/components/admin/StatusToggle";
import { AssignTech } from "@/components/admin/AssignTech";

export default async function InquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const inquiryId = parseInt(resolvedParams.id);
  
  if (isNaN(inquiryId)) return notFound();

  const inquiry = await prisma.inquiry.findUnique({
    where: { id: inquiryId },
    include: { technician: true }
  });

  if (!inquiry) return notFound();

  // Generate Map Link if coordinates exist
  const mapLink = inquiry.latitude && inquiry.longitude 
    ? `https://www.google.com/maps/search/?api=1&query=${inquiry.latitude},${inquiry.longitude}`
    : null;

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
        <div className="self-start md:self-auto">
          <StatusToggle id={inquiry.id} initialStatus={inquiry.status || "PENDING"} />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Main Info */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 p-6 border-b border-slate-200 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                  <User className="w-6 h-6" />
                </div>
                <div className="overflow-hidden">
                  <h2 className="text-lg font-bold text-slate-900 truncate">{inquiry.name}</h2>
                  <p className="text-sm text-slate-500">Client</p>
                </div>
              </div>
              <div className="flex flex-col sm:items-end gap-2">
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(inquiry.createdAt), "PPP p")}
                </div>
                <a 
                  href={`mailto:${inquiry.email}?subject=Re: Your Inquiry - Raymond Gray&body=Hi ${inquiry.name},%0D%0A%0D%0AThank you for contacting Raymond Gray regarding:%0D%0A"${inquiry.message}"%0D%0A%0D%0A[Your Reply Here]`}
                  className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-700 w-full sm:w-auto transition"
                >
                  <Reply className="w-4 h-4" /> Reply
                </a>
              </div>
            </div>

            <div className="p-6 grid gap-6">
              {/* Contact Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                {mapLink && (
                  <InfoBox 
                    icon={<MapPin />} 
                    label="Location" 
                    value="View on Google Maps" 
                    href={mapLink} 
                    isExternal
                  />
                )}
              </div>

              {/* Message Content */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 w-full">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" /> Message
                </h3>
                {/* REMOVED overflow-hidden on parent to allow text to flow naturally */}
                <div className="w-full">
                  <p className="text-slate-800 text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words">
                    {inquiry.message}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Job Assignment */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-6">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">
              Job Assignment
            </h3>
            
            {inquiry.technician ? (
              <div className="bg-green-50 border border-green-100 p-4 rounded-lg mb-4">
                <p className="text-xs text-green-600 font-bold uppercase mb-1">Assigned To</p>
                <p className="text-slate-900 font-bold">{inquiry.technician.name}</p>
                {inquiry.startCode && (
                  <div className="mt-2 pt-2 border-t border-green-200">
                    <p className="text-xs text-slate-500">Security Code</p>
                    <p className="font-mono text-lg font-bold tracking-widest">{inquiry.startCode}</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-slate-500 mb-4 italic">No technician assigned yet.</p>
            )}

            <AssignTech 
              inquiryId={inquiry.id} 
              currentTechId={inquiry.technicianId} 
              status={inquiry.status} // <--- Pass status
            />
          </div>
        </div>

      </div>
    </div>
  );
}

function InfoBox({ icon, label, value, href, isExternal }: any) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 text-slate-400 shrink-0">{icon}</div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">{label}</p>
        {href ? (
          <a 
            href={href} 
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="text-sm font-medium text-blue-600 hover:underline block break-all"
          >
            {value}
          </a>
        ) : (
          <p className="text-sm font-medium text-slate-900 break-words">{value}</p>
        )}
      </div>
    </div>
  );
}
