"use client";

import { useState, useRef } from "react";
import { Loader2, Calendar, Clock, ShieldCheck, CheckCircle2, Zap, MessageCircle, AlertCircle, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ScheduledRepairPage() {
  const formRef = useRef<HTMLDivElement>(null);

  // --- FORM STATE ---
  const [formData, setFormData] = useState({
    propertyType: "",
    repairCategory: "",
    date: "",
    timeWindow: "",
    description: "",
    mapLink: "",
    accessInfo: "",
    name: "",
    phone: "",
    email: "",
    agreed: false
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // --- MAIN FORM SUBMIT ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreed) return;
    setStatus("loading");

    const message = `
      REQ TYPE: Scheduled Repair (3-5 Days)
      PROPERTY: ${formData.propertyType}
      CATEGORY: ${formData.repairCategory}
      DATE: ${formData.date} (${formData.timeWindow})
      MAP: ${formData.mapLink}
      ACCESS: ${formData.accessInfo}
      ISSUE: ${formData.description}
      AGREED TO TERMS: Yes
    `;

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formData.name, email: formData.email, phone: formData.phone, serviceType: "Scheduled Repair", message }),
      });
      setStatus("success");
      setTimeout(() => { formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }); }, 100);
    } catch (error) {
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      
      {/* 1. HERO HEADER */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-slate-900 pt-32 pb-32">
        <Image src="/schedmaint.jpg" alt="Scheduled Maintenance" fill className="object-cover opacity-40" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <span className="inline-block py-1.5 px-4 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
            Scheduled Repairs • Planned Maintenance
          </span>
          <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">Professional Scheduled Repairs</h1>
          
          <p className="text-xl text-slate-200 font-light mb-8 leading-relaxed">
            Book your repair 3-5 days in advance for better rates and guaranteed service. Perfect for non-urgent maintenance and planned repairs.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <button 
              onClick={scrollToForm}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_30px_rgba(37,99,235,0.7)] flex items-center gap-2"
            >
              <Calendar className="w-5 h-5" /> Book Scheduled Repair
            </button>
            <div className="inline-flex items-center gap-2 bg-slate-800/80 px-6 py-4 rounded-full border border-slate-700 shadow-xl backdrop-blur-sm">
              <Clock className="w-5 h-5 text-amber-400" />
              <span className="font-bold text-white">Call-out GHS 350 (includes 1st hour)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-6xl mx-auto px-6 -mt-12 relative z-20 grid lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Info & Rates */}
        <div className="lg:col-span-1 space-y-8 pt-4">
          
          {/* Rate Card */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              💰 Our Scheduled Rates
            </h3>
            <div className="space-y-4 text-sm">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <span className="block font-bold text-blue-900 text-lg">GHS 350</span>
                <span className="text-blue-700">Standard Call-Out Fee (Includes 1st hour)</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2"><span className="text-slate-600">Additional Time</span><span className="font-bold text-slate-900">GHS 350/hr</span></div>
              <div className="flex justify-between border-b border-slate-100 pb-2"><span className="text-slate-600">Response Time</span><span className="font-bold text-slate-900">Within 1 Day</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Service Window</span><span className="font-bold text-slate-900">3-5 Days</span></div>
            </div>
          </div>

          {/* Need it Faster? */}
          <div className="bg-amber-50 p-6 rounded-xl border border-amber-200 shadow-sm">
            <h4 className="font-bold text-amber-900 mb-2 flex items-center gap-2"><Zap className="w-5 h-5" /> Need it faster?</h4>
            <p className="text-sm text-amber-800 mb-4 leading-relaxed">For urgent or emergency repairs with response times of 2-8 hours, please use our On-Demand service.</p>
            <Link href="/services/emergency" className="text-white bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-md font-bold text-xs inline-block transition">Go to Emergency Repairs →</Link>
          </div>

          {/* Features List */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hidden md:block">
            <h3 className="font-bold text-slate-900 mb-4">What's Included</h3>
            <ul className="space-y-4 text-sm text-slate-600">
              <li className="flex gap-3"><ShieldCheck className="w-5 h-5 text-green-600 shrink-0" /> 60-Day Workmanship Guarantee</li>
              <li className="flex gap-3"><MapPin className="w-5 h-5 text-blue-600 shrink-0" /> GPS Arrival Verification</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-slate-600 shrink-0" /> Digital Job Cards & Photos</li>
              <li className="flex gap-3"><AlertCircle className="w-5 h-5 text-red-600 shrink-0" /> Safety First Compliance</li>
            </ul>
          </div>
        </div>

        {/* MIDDLE COLUMN: Booking Form */}
        <div className="lg:col-span-2" ref={formRef}>
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 p-6 text-white border-b border-slate-800">
              <h2 className="text-2xl font-bold">Book a Scheduled Repair</h2>
              <p className="text-slate-400 text-sm mt-1">Schedule at least 3 days in advance.</p>
            </div>

            {status === "success" ? (
              <div className="p-12 text-center">
                <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-900">Booking Confirmed!</h3>
                <p className="text-slate-600 mt-2">We will contact you within 1 working day.</p>
                <button onClick={() => window.location.reload()} className="mt-6 text-blue-600 font-bold hover:underline">Book Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 space-y-8 bg-white">
                
                {/* 1. Job Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <InputSelect label="1. Property type" name="propertyType" value={formData.propertyType} onChange={handleChange} options={["Private House", "Estate Unit", "Apartment", "Guest House", "Hotel", "Office"]} />
                  <InputSelect label="2. Repair Category" name="repairCategory" value={formData.repairCategory} onChange={handleChange} options={["Electrical", "Plumbing", "HVAC / AC", "Appliances", "Generators", "IT / Networking", "Carpentry / Locks"]} />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <InputField label="3. Preferred date (≥3 days)" type="date" name="date" value={formData.date} onChange={handleChange} />
                  <InputSelect label="4. Preferred time window" name="timeWindow" value={formData.timeWindow} onChange={handleChange} options={["08:00 - 10:00", "10:00 - 12:00", "12:00 - 14:00", "14:00 - 16:00"]} />
                </div>

                {/* 5. Description (Full Width) */}
                <div className="w-full">
                  <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">5. Repair description</label>
                  <textarea 
                    name="description" 
                    rows={4} 
                    className="w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-100 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none transition-all text-slate-900 font-medium resize-none shadow-sm" 
                    placeholder="Describe the problem in detail: what's wrong, when it started, any symptoms or error messages..." 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                {/* 6. Location & Access */}
                <div className="space-y-6">
                  <div className="w-full">
                    <InputField label="6. Location (Google Maps link)" name="mapLink" value={formData.mapLink} onChange={handleChange} placeholder="Paste Google Maps link here" />
                    <a href="https://tinyurl.com/tfynxw37" target="_blank" className="text-xs text-blue-600 hover:underline mt-1 block font-medium">Need help getting a Google Maps link?</a>
                  </div>
                  <InputField label="7. Access info (optional)" name="accessInfo" value={formData.accessInfo} onChange={handleChange} placeholder="Gate codes, security contact..." />
                </div>

                {/* 8. Contact Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <InputField label="8. Your name" name="name" value={formData.name} onChange={handleChange} placeholder="Your full name" required />
                  <InputField label="9. Phone (WhatsApp)" name="phone" value={formData.phone} onChange={handleChange} placeholder="+233..." required />
                </div>
                
                <InputField label="10. Email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your.email@example.com" required />

                {/* Terms Agreement */}
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-sm text-slate-700 space-y-3 shadow-inner">
                  <p className="font-bold text-slate-900 border-b border-slate-200 pb-2">11. I understand and agree to:</p>
                  <ul className="list-disc pl-4 space-y-1 text-xs md:text-sm text-slate-600 leading-relaxed">
                    <li>Call-out fee is GHS 350 (includes first hour of work)</li>
                    <li>Additional time beyond first hour is GHS 350/hr and requires my approval</li>
                    <li>Replacement parts are billed separately and require approval before purchase</li>
                    <li>Work includes a 60-day workmanship guarantee</li>
                    <li>Technician arrival must be confirmed via GPS + arrival code before billing starts</li>
                    <li>Safety issues will be addressed before proceeding with repairs</li>
                    <li>Payments are electronic only (cards, Mobile Money, bank transfer) - no cash</li>
                    <li>I must provide a valid Google Maps link for service location</li>
                  </ul>
                  <label className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-200 cursor-pointer p-2 hover:bg-white rounded-lg transition select-none">
                    <input type="checkbox" name="agreed" className="w-6 h-6 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer" required onChange={(e) => setFormData({...formData, agreed: e.target.checked})} />
                    <span className="font-bold text-slate-900 text-base">I Agree to Terms & Payment</span>
                  </label>
                </div>

                {/* Actions */}
                <div className="space-y-4 pt-2">
                  <button 
                    type="submit" 
                    disabled={status === "loading" || !formData.agreed}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-lg"
                  >
                    {status === "loading" ? <Loader2 className="animate-spin" /> : "Pay GHS 350 & Confirm Booking"}
                  </button>
                  <a href="https://wa.me/233551010108" target="_blank" className="w-full py-3 border-2 border-green-600 text-green-700 font-bold rounded-xl transition-all flex items-center justify-center gap-2 hover:bg-green-50">
                    <MessageCircle className="w-5 h-5" /> Request via WhatsApp
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* FOOTER NOTE */}
      <div className="max-w-6xl mx-auto px-6 mt-16 text-center text-slate-500 text-sm border-t border-slate-200 pt-8">
        <p className="mb-2 font-bold text-slate-700">Questions? Call +233 551010108 or Email repairs@raymond-gray.org</p>
        <p>© 2026 Raymond Gray – Scheduled Repairs · 60-day workmanship guarantee</p>
      </div>

      <style jsx>{`
        .label { @apply block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide; }
        .input { @apply w-full p-3.5 rounded-lg border-2 border-slate-200 bg-slate-100 focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition font-medium text-slate-900 placeholder:text-slate-400; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

// --- HELPER COMPONENTS ---

function RateItem({ label, price, sub }: { label: string, price: string, sub: string }) {
  return (
    <div className="flex justify-between items-start border-b border-slate-100 pb-2 last:border-0">
      <div>
        <span className="block text-slate-700 font-medium">{label}</span>
        <span className="text-xs text-slate-500">{sub}</span>
      </div>
      <span className="font-bold text-slate-900">{price}</span>
    </div>
  );
}

function InputField({ label, ...props }: any) {
  return (
    <div className="w-full">
      <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">{label}</label>
      <input 
        {...props}
        className="w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-100 focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all text-slate-900 font-medium placeholder:text-slate-400 shadow-sm hover:border-slate-300"
      />
    </div>
  );
}

function InputSelect({ label, options, ...props }: any) {
  return (
    <div className="w-full">
      <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">{label}</label>
      <div className="relative">
        <select 
          {...props}
          className="w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-100 focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all text-slate-900 font-medium appearance-none cursor-pointer shadow-sm hover:border-slate-300"
        >
          <option value="">Select...</option>
          {options.map((opt: string) => <option key={opt}>{opt}</option>)}
        </select>
        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>
    </div>
  );
}
