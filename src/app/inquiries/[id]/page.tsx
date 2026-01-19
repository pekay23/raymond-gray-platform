import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Mail, Phone, User, MessageSquare } from "lucide-react";
import { format } from "date-fns";

export default async function InquiryDetailPage({ params }: { params: { id: string } }) {
  // Ensure params.id is valid integer since Inquiry IDs are Ints in your schema
  const inquiryId = parseInt(params.id);
  
  if (isNaN(inquiryId)) return notFound();

  const inquiry = await prisma.inquiry.findUnique({
    where: { id: inquiryId }
  });

  if (!inquiry) return notFound();

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/admin/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-slate-900">Inquiry Details</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-50 p-6 border-b border-slate-200 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">{inquiry.name}</h2>
              <p className="text-sm text-slate-500">Client ID: #{inquiry.id}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <Calendar className="w-4 h-4" />
              {format(new Date(inquiry.createdAt), "PPP p")}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 grid gap-8">
          <div className="grid md:grid-cols-2 gap-6">
            <InfoBox icon={<Mail />} label="Email Address" value={inquiry.email} href={`mailto:${inquiry.email}`} />
            <InfoBox icon={<Phone />} label="Phone Number" value={inquiry.phone || "N/A"} href={inquiry.phone ? `tel:${inquiry.phone}` : undefined} />
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" /> Message Content
            </h3>
            <p className="text-slate-800 text-lg leading-relaxed whitespace-pre-wrap">
              {inquiry.message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoBox({ icon, label, value, href }: any) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1 text-slate-400">{icon}</div>
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
        {href ? (
          <a href={href} className="text-lg font-medium text-blue-600 hover:underline block">{value}</a>
        ) : (
          <p className="text-lg font-medium text-slate-900">{value}</p>
        )}
      </div>
    </div>
  );
}
