"use client";

import { useState, useRef } from "react";
import { Loader2, Zap, MapPin, Clock, ShieldCheck, CheckCircle2, AlertTriangle, MessageCircle, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function EmergencyRepairPage() {
  const formRef = useRef<HTMLDivElement>(null);

  // --- FORM STATE ---
  const [formData, setFormData] = useState({
    propertyType: "",
    urgency: "",
    repairCategory: "",
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

  // --- ARRIVAL STATE (NEW) ---
  const [arrivalData, setArrivalData] = useState({ workOrder: "", code: "" });
  const [arrivalStatus, setArrivalStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // --- MAIN FORM SUBMIT ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreed) return;
    setStatus("loading");

    const message = `
      REQ TYPE: Emergency/On-Demand Repair
      PROPERTY: ${formData.propertyType}
      URGENCY: ${formData.urgency}
      CATEGORY: ${formData.repairCategory}
      TIME: ${formData.timeWindow}
      MAP: ${formData.mapLink}
      ACCESS: ${formData.accessInfo}
      ISSUE: ${formData.description}
      AGREED TO TERMS: Yes
    `;

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formData.name, email: formData.email, phone: formData.phone, serviceType: "Emergency Repair", message }),
      });
      setStatus("success");
      setTimeout(() => { formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }); }, 100);
    } catch (error) {
      setStatus("error");
    }
  };

  // --- ARRIVAL CONFIRMATION SUBMIT (NEW) ---
  const handleArrivalConfirm = async () => {
    if (!arrivalData.workOrder || !arrivalData.code) {
      alert("Please enter both Work Order and Arrival Code");
      return;
    }
    setArrivalStatus("loading");

    // Get GPS Location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        sendArrivalData(latitude, longitude);
      }, (error) => {
        console.error("GPS Error", error);
        alert("GPS Location is required to confirm arrival. Please allow location access.");
        setArrivalStatus("idle");
      });
    } else {
      alert("GPS not supported on this browser.");
      setArrivalStatus("idle");
    }
  };

  const sendArrivalData = async (lat: number, lng: number) => {
    try {
      const res = await fetch("/api/confirm-arrival", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...arrivalData, latitude: lat, longitude: lng }),
      });
      if (res.ok) setArrivalStatus("success");
      else setArrivalStatus("error");
    } catch (error) {
      setArrivalStatus("error");
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
        <Image src="/247emerg.jpg" alt="Emergency Repair" fill className="object-cover opacity-40" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <span className="inline-block py-1.5 px-4 rounded-full bg-red-600/20 border border-red-500/30 text-red-300 text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
            24/7 Emergency & On-Demand Call Outs
          </span>
          <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">Fast, Professional Fixes <br/> <span className="text-red-500">When You Need Them.</span></h1>
          
          <p className="text-xl text-slate-200 font-light mb-8 leading-relaxed">
            Electrical, plumbing, AC, appliances, generators & more. Transparent pricing, digital job cards, 60-day workmanship guarantee.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <button 
              onClick={scrollToForm}
              className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-all shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:shadow-[0_0_30px_rgba(220,38,38,0.7)] flex items-center gap-2"
            >
              <Zap className="w-5 h-5" /> Book Emergency Repair
            </button>

            <Link href="/services/scheduled" className="inline-flex items-center gap-2 bg-slate-800/80 px-6 py-4 rounded-full border border-slate-700 shadow-xl backdrop-blur-sm hover:bg-slate-700/80 transition text-sm">
              <Calendar className="w-4 h-4 text-blue-400" />
              <span className="font-medium text-slate-300">Not urgent? Try Scheduled (3–5 days) →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20 grid lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Rates & Info (5 cols) */}
        <div className="lg:col-span-5 space-y-8 pt-4">
          
          {/* Rate Card */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              💳 Our Rates (Includes 1st Hour)
            </h3>
            <div className="space-y-3 text-sm">
              <RateItem label="Weekday Sameday (4–8h)" price="GHS 500" sub="Mon-Fri, 8am-5pm" />
              <RateItem label="Weekday Next-Day" price="GHS 450" sub="Mon-Fri, scheduled" />
              <RateItem label="Sat & Public Holidays (4–6h)" price="GHS 600" sub="9am-3pm" />
              <RateItem label="Sundays & Out-of-hours" price="GHS 1,500" sub="All Sunday; or out-of-hours" />
              <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-red-900">Emergency (≤2h, Anytime)</span>
                  <span className="font-bold text-red-700 text-lg">GHS 2,000</span>
                </div>
                <span className="text-xs text-red-800 block">Within 2 hours • Includes first hour + make-safe</span>
              </div>
              <div className="flex justify-between border-t border-slate-100 pt-3 mt-2">
                <span className="text-slate-600 font-medium">Hourly Rate (after 1st hr)</span>
                <span className="font-bold text-slate-900">GHS 350/hr</span>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hidden md:block">
            <h3 className="font-bold text-slate-900 mb-4">How It Works</h3>
            <ul className="space-y-4 text-sm text-slate-600">
              <li className="flex gap-3">
                <span className="bg-slate-100 text-slate-900 font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">1</span>
                <span><strong>Book & Pay Call-Out:</strong> Choose urgency, get ETA & Work Order.</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-slate-100 text-slate-900 font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">2</span>
                <span><strong>GPS Confirmation:</strong> Technician arrives, you verify code to start time.</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-slate-100 text-slate-900 font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">3</span>
                <span><strong>Diagnosis & Fix:</strong> We aim to fix within the 1st hour. Extra time needs approval.</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-slate-100 text-slate-900 font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">4</span>
                <span><strong>Close-Out:</strong> Digital job card, photos & 60-day guarantee.</span>
              </li>
            </ul>
          </div>

          {/* Guarantee Box */}
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" /> 60-Day Labour Guarantee
            </h4>
            <p className="text-sm text-blue-800 mb-0 leading-relaxed">
              We stand behind our work. If a covered issue recurs within 60 days, we return to fix it for free.
            </p>
          </div>

        </div>

        {/* RIGHT COLUMN: Booking Form (7 cols) */}
        <div className="lg:col-span-7" ref={formRef}>
          {/* BOOKING FORM */}
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden mb-8">
            <div className="bg-slate-900 p-6 text-white border-b border-slate-800">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Zap className="w-6 h-6 text-red-500" /> Book Emergency Repair
              </h2>
              <p className="text-slate-400 text-sm mt-1">Select urgency level below to see pricing.</p>
            </div>

            {status === "success" ? (
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Received!</h3>
                <p className="text-slate-600 mb-8">Our dispatch team has been notified. You will receive a confirmation shortly.</p>
                <button onClick={() => window.location.reload()} className="px-6 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition">Book Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 space-y-8 bg-white">
                
                {/* 1. Property Type & Urgency */}
                <div className="grid md:grid-cols-2 gap-6">
                  <InputSelect 
                    label="1. Property type" 
                    name="propertyType" 
                    value={formData.propertyType} 
                    onChange={handleChange} 
                    options={["Private House", "Estate Unit", "Apartment", "Guest House", "Hotel", "Office"]} 
                  />
                  <InputSelect 
                    label="2. Urgency" 
                    name="urgency" 
                    value={formData.urgency} 
                    onChange={handleChange} 
                    options={["Emergency (≤2h)", "Same-Day (4–8h)", "Next-Day"]} 
                  />
                </div>

                {/* 2. Category & Time */}
                <div className="grid md:grid-cols-2 gap-6">
                  <InputSelect 
                    label="3. Repair Category" 
                    name="repairCategory" 
                    value={formData.repairCategory} 
                    onChange={handleChange} 
                    options={["Electrical", "Plumbing", "HVAC / AC", "Appliances", "Generators", "IT / Networking", "Carpentry / Locks"]} 
                  />
                  <InputSelect 
                    label="4. Preferred time window" 
                    name="timeWindow" 
                    value={formData.timeWindow} 
                    onChange={handleChange} 
                    options={["08:00–10:00", "10:00–12:00", "12:00–14:00", "14:00–16:00", "16:00–18:00", "Emergency - ASAP"]} 
                  />
                </div>

                {/* 5. Description */}
                <div className="w-full">
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide text-xs">5. Repair Description</label>
                  <textarea 
                    name="description" 
                    rows={3} 
                    className="w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-100 focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all text-slate-900 font-medium resize-none shadow-sm" 
                    placeholder="Example: No power in kitchen; burning smell at socket; AC not cooling; leak under sink; generator won't start…" 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                {/* 6. Location */}
                <div className="space-y-6">
                  <div className="w-full">
                    <InputField label="6. Location (Google Maps link preferred)" name="mapLink" value={formData.mapLink} onChange={handleChange} placeholder="Paste Google Maps link here" required />
                    <a href="https://tinyurl.com/tfynxw37" target="_blank" className="text-xs text-blue-600 hover:underline mt-1 block font-medium">Need help getting a Google Maps link?</a>
                  </div>
                  <InputField label="10. Access info (gate code, caretaker)" name="accessInfo" value={formData.accessInfo} onChange={handleChange} placeholder="Gate code, caretaker contact..." />
                </div>

                {/* 7-9. Contact Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <InputField label="7. Your name" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required />
                  <InputField label="8. Phone (WhatsApp)" name="phone" value={formData.phone} onChange={handleChange} placeholder="+233..." required />
                </div>
                
                <InputField label="9. Email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@example.com" required />

                {/* 11. Agreement */}
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-sm text-slate-700 space-y-3 shadow-inner">
                  <p className="font-bold text-slate-900 border-b border-slate-200 pb-2">11. I understand and agree that:</p>
                  <ul className="list-disc pl-4 space-y-1 text-xs md:text-sm text-slate-600 leading-relaxed">
                    <li>Call-out fee covers first hour only; additional time at GHS 350/hr quoted separately</li>
                    <li>Work includes a 60-day workmanship guarantee</li>
                    <li>Safety issues will be addressed before proceeding with work</li>
                    <li>All costs will be confirmed before additional work begins</li>
                    <li>Repair parts are supplied and charged separately</li>
                    <li>All payments will be made electronically via debit/credit cards, Mobile Money, instant bank transfer or similar options - no cash payments</li>
                  </ul>
                  <label className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-200 cursor-pointer p-2 hover:bg-white rounded-lg transition select-none">
                    <input type="checkbox" name="agreed" className="w-6 h-6 text-red-600 rounded border-gray-300 focus:ring-red-500 cursor-pointer" required onChange={(e) => setFormData({...formData, agreed: e.target.checked})} />
                    <span className="font-bold text-slate-900 text-base">I Agree to Terms & Payment</span>
                  </label>
                </div>

                {/* Actions */}
                <div className="space-y-4 pt-2">
                  <button 
                    type="submit" 
                    disabled={status === "loading" || !formData.agreed}
                    className="w-full py-4 bg-red-600 hover:bg-red-700 disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-lg"
                  >
                    {status === "loading" ? <Loader2 className="animate-spin" /> : "Confirm & Pay Call-Out"}
                  </button>

                  <a href="https://wa.me/233551010108" target="_blank" className="w-full py-3 border-2 border-green-600 text-green-700 font-bold rounded-xl transition-all flex items-center justify-center gap-2 hover:bg-green-50">
                    <MessageCircle className="w-5 h-5" /> Request via WhatsApp
                  </a>
                </div>

              </form>
            )}
          </div>

          {/* ARRIVAL CONFIRMATION BOX (WORKING) */}
          <div className="mt-8 bg-white rounded-xl shadow-lg border border-slate-200 p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <MapPin className="text-red-600" /> Confirm Technician Arrival
            </h3>
            
            {arrivalStatus === "success" ? (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-center">
                <CheckCircle2 className="w-8 h-8 mx-auto mb-2" />
                <p className="font-bold">Arrival Confirmed!</p>
                <p className="text-xs">Billing clock has started.</p>
              </div>
            ) : (
              <>
                <p className="text-sm text-slate-600 mb-6">
                  Technician arrived? Enter your work order reference and their unique code to start the billing clock.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <input 
                    placeholder="Work Order (e.g. RG-EMG-123)" 
                    className="w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-100 focus:bg-white focus:border-red-600 outline-none transition-all font-medium"
                    value={arrivalData.workOrder}
                    onChange={(e) => setArrivalData({...arrivalData, workOrder: e.target.value})}
                  />
                  <input 
                    placeholder="Arrival Code (6-digit)" 
                    className="w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-100 focus:bg-white focus:border-red-600 outline-none transition-all font-medium"
                    value={arrivalData.code}
                    onChange={(e) => setArrivalData({...arrivalData, code: e.target.value})}
                  />
                </div>
                <button 
                  onClick={handleArrivalConfirm}
                  disabled={arrivalStatus === "loading"}
                  className="w-full mt-4 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition shadow-md flex justify-center items-center gap-2"
                >
                  {arrivalStatus === "loading" ? <Loader2 className="animate-spin w-5 h-5" /> : "Confirm Arrival (GPS Required)"}
                </button>
              </>
            )}
          </div>

        </div>
      </div>

      {/* FOOTER NOTE */}
      <div className="max-w-6xl mx-auto px-6 mt-16 text-center text-slate-500 text-sm border-t border-slate-200 pt-8">
        <p className="mb-2 font-bold text-slate-700">Questions? Call +233 551010108 or Email repairs@raymond-gray.org</p>
        <p>© 2026 Raymond Gray – Emergency Repairs · Professional fixes when you need them.</p>
      </div>

      <style jsx>{`
        .label { @apply block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide text-xs; }
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
      <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide text-xs">{label}</label>
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
      <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide text-xs">{label}</label>
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
