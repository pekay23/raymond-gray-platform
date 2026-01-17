"use client";

import { useState, useRef } from "react";
import { Loader2, Wrench, MessageCircle, CheckCircle2, AlertTriangle, Calendar } from "lucide-react";
import Image from "next/image";

export default function ServicingPage() {
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    propertyType: "",
    equipmentType: "",
    serviceWindow: "",
    brand: "",
    model: "",
    capacity: "",
    age: "",
    lastService: "",
    issues: "",
    additionalEquipment: "No",
    name: "",
    phone: "",
    email: "",
    mapLink: "",
    agreed: false
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreed) return;
    setStatus("loading");

    const message = `
      REQ TYPE: Standard Equipment Servicing
      PROPERTY: ${formData.propertyType}
      EQUIPMENT: ${formData.equipmentType} (${formData.brand} - ${formData.model})
      CAPACITY: ${formData.capacity}
      AGE: ${formData.age}
      LAST SERVICE: ${formData.lastService}
      ISSUES: ${formData.issues}
      ADDITIONAL EQUIP: ${formData.additionalEquipment}
      WINDOW: ${formData.serviceWindow}
      MAP: ${formData.mapLink}
      AGREED TO TERMS: Yes
    `;

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formData.name, email: formData.email, phone: formData.phone, serviceType: "Equipment Servicing", message }),
      });
      setStatus("success");
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
        <Image src="/schedmaint.jpg" alt="Equipment Servicing" fill className="object-cover opacity-40" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <span className="inline-block py-1.5 px-4 rounded-full bg-green-600/20 border border-green-500/30 text-green-300 text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
            Standard Servicing • Professional Maintenance
          </span>
          <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">Professional Equipment Servicing</h1>
          
          <p className="text-xl text-slate-200 font-light mb-8 leading-relaxed">
            Regular maintenance for your equipment to ensure optimal performance and longevity. We service generators, AC units, and more.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <button 
              onClick={scrollToForm}
              className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full transition-all shadow-[0_0_20px_rgba(22,163,74,0.5)] hover:shadow-[0_0_30px_rgba(22,163,74,0.7)] flex items-center gap-2"
            >
              <Wrench className="w-5 h-5" /> Request Servicing Quote
            </button>

            <a href="https://wa.me/233551010108" target="_blank" className="inline-flex items-center gap-2 bg-slate-800/80 px-6 py-4 rounded-full border border-slate-700 shadow-xl backdrop-blur-sm hover:bg-slate-700/80 transition font-bold text-white">
              <MessageCircle className="w-5 h-5 text-green-400" /> Send Us A WhatsApp
            </a>
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
              💳 Our Servicing Rates
            </h3>
            <p className="text-sm text-slate-600 mb-6">Standard call-out fee of GHS 350 plus the cost of servicing. Detailed quote provided before work begins.</p>
            
            <div className="space-y-3 text-sm">
              <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                <span className="block font-bold text-green-900 text-lg">GHS 350</span>
                <span className="text-green-700">Standard Call-Out Fee (Applied to all requests)</span>
              </div>
              <RateItem label="Servicing Cost" price="Varies" sub="Based on equipment type & size" />
              <RateItem label="Quote Response" price="1 Working Day" sub="After receiving details" />
              <RateItem label="Service Window" price="3-5 Days" sub="After quote acceptance" />
            </div>
          </div>

          {/* What's Included */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-4">✅ Standard Servicing Includes</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" /> Replacement of standard parts</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" /> Oils and lubricants</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" /> Filters (air, fuel, oil)</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" /> Seals and gaskets</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" /> Refrigerant gas (for ACs)</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" /> Performance testing</li>
            </ul>
          </div>

          {/* Warning Box */}
          <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
            <h4 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> Additional Charges
            </h4>
            <ul className="space-y-2 text-xs text-amber-800 list-disc pl-4 mb-4">
              <li>Damaged parts requiring replacement</li>
              <li>Non-serviceable parts</li>
              <li>Additional labor beyond standard servicing</li>
            </ul>
            <p className="text-xs text-amber-900 font-bold italic">
              "Any damaged parts needing replacement will be raised as a separate work order."
            </p>
          </div>

        </div>

        {/* RIGHT COLUMN: Booking Form (7 cols) */}
        <div className="lg:col-span-7" ref={formRef}>
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 p-6 text-white border-b border-slate-800">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Wrench className="w-6 h-6 text-green-500" /> Request Standard Servicing
              </h2>
              <p className="text-slate-400 text-sm mt-1">Provide equipment details for an accurate quote.</p>
            </div>

            {status === "success" ? (
              <div className="p-12 text-center h-[600px] flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Received!</h3>
                <p className="text-slate-600 mb-8">We will review your details and send a quote within 1 working day.</p>
                <button onClick={() => window.location.reload()} className="px-6 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition">Submit Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 space-y-8 bg-white">
                
                {/* 1. Property & Equipment Type */}
                <div className="grid md:grid-cols-2 gap-6">
                  <InputSelect 
                    label="1. Property type" 
                    name="propertyType" 
                    value={formData.propertyType} 
                    onChange={handleChange} 
                    options={["Private House", "Estate Unit", "Apartment", "Guest House", "Hotel", "Office", "Commercial", "Industrial"]} 
                  />
                  <InputSelect 
                    label="2. Equipment Type" 
                    name="equipmentType" 
                    value={formData.equipmentType} 
                    onChange={handleChange} 
                    options={["Generator", "Air Conditioner", "Refrigerator", "Freezer", "UPS System", "Voltage Stabilizer", "Water Pump", "Other"]} 
                  />
                </div>

                {/* 3. Service Window */}
                <InputSelect 
                  label="3. Preferred Service Window" 
                  name="serviceWindow" 
                  value={formData.serviceWindow} 
                  onChange={handleChange} 
                  options={["Monday-Friday, 08:00–12:00", "Monday-Friday, 12:00–16:00", "Saturday, 09:00–13:00", "Flexible - Any weekday"]} 
                />

                {/* EQUIPMENT DETAILS SECTION */}
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-6 shadow-sm">
                  <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider border-b border-slate-200 pb-2">Equipment Details</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <InputField label="4. Brand " name="brand" value={formData.brand} onChange={handleChange} placeholder="e.g. Honda, LG"/>
                    <InputField label="5. Model " name="model" value={formData.model} onChange={handleChange} placeholder="e.g. EU2200i"/>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <InputField label="6. Capacity/Power Rating" name="capacity" value={formData.capacity} onChange={handleChange} placeholder="e.g. 2.2kVA, 1.5HP" />
                    <InputSelect label="7. Equipment Age" name="age" value={formData.age} onChange={handleChange} options={["Less than 1 year", "1-3 years", "3-5 years", "5-10 years", "Over 10 years"]} />
                  </div>

                  <InputField label="8. Last Service Date" name="lastService" value={formData.lastService} onChange={handleChange} placeholder="e.g. 6 months ago, Never" />

                  <div className="w-full">
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide text-xs">9. Current Issues or Concerns</label>
                    <textarea 
                      name="issues" 
                      rows={3} 
                      className="w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-100 focus:bg-white focus:border-green-600 focus:ring-4 focus:ring-green-600/10 outline-none transition-all text-slate-900 font-medium resize-none shadow-sm hover:border-slate-300" 
                      placeholder="Describe any performance issues, noises, leaks..." 
                      onChange={handleChange} 
                    />
                  </div>

                  <InputSelect label="10. Additional Equipment?" name="additionalEquipment" value={formData.additionalEquipment} onChange={handleChange} options={["No", "Yes"]} />
                </div>

                {/* PERSONAL DETAILS */}
                <div className="space-y-6">
                  <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider border-b border-slate-200 pb-2">Personal Details</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <InputField label="11. Your name" name="name" value={formData.name} onChange={handleChange} placeholder="Full name" required />
                    <InputField label="12. Phone (WhatsApp)" name="phone" value={formData.phone} onChange={handleChange} placeholder="+233..." required />
                  </div>
                  
                  <InputField label="13. Email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="example@gmail.com" required />

                  <div className="w-full">
                    <InputField label="14. Location (Google Maps Link)" name="mapLink" value={formData.mapLink} onChange={handleChange} placeholder="Paste Google Maps link here" required />
                    <a href="https://tinyurl.com/tfynxw37" target="_blank" className="text-xs text-blue-600 hover:underline mt-1 block font-medium">Need help getting a link?</a>
                  </div>
                </div>

                {/* 15. Agreement */}
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-sm text-slate-700 space-y-3 shadow-inner">
                  <p className="font-bold text-slate-900 border-b border-slate-200 pb-2">15. I understand and agree that:</p>
                  <ul className="list-disc pl-4 space-y-1 text-xs md:text-sm text-slate-600 leading-relaxed">
                    <li>GHS 350 call-out fee is non-refundable and covers initial assessment</li>
                    <li>Servicing cost will be quoted separately based on equipment details</li>
                    <li>Standard servicing includes oils, filters, seals, and refrigerant gas</li>
                    <li>Damaged parts requiring replacement will be quoted separately</li>
                    <li>Labor for part replacements will be charged at standard hourly rates</li>
                    <li>Quote will be provided within 1 working day</li>
                    <li>Service will be scheduled within 3-5 days after quote acceptance</li>
                    <li>I must provide a valid Google Maps link for service location</li>
                  </ul>
                  <label className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-200 cursor-pointer p-2 hover:bg-white rounded-lg transition select-none">
                    <input type="checkbox" name="agreed" className="w-6 h-6 text-green-600 rounded border-gray-300 focus:ring-green-500 cursor-pointer" required onChange={(e) => setFormData({...formData, agreed: e.target.checked})} />
                    <span className="font-bold text-slate-900 text-base">I Agree to Terms & Payment</span>
                  </label>
                </div>

                {/* Actions */}
                <div className="space-y-4 pt-2">
                  <button 
                    type="submit" 
                    disabled={status === "loading" || !formData.agreed}
                    className="w-full py-4 bg-green-600 hover:bg-green-700 disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-lg"
                  >
                    {status === "loading" ? <Loader2 className="animate-spin" /> : "Pay GHS 350 Call-Out Fee"}
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
        <p className="mb-2 font-bold text-slate-700">Servicing Inquiries: +233 551010108 or Email servicing@raymond-gray.org</p>
        <p>© 2026 Raymond Gray – Professional Equipment Servicing</p>
      </div>
    </div>
  );
}

// --- HELPER COMPONENTS (GOLD STANDARD) ---

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
        className="w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-100 focus:bg-white focus:border-green-600 focus:ring-4 focus:ring-green-600/10 outline-none transition-all text-slate-900 font-medium placeholder:text-slate-400 shadow-sm hover:border-slate-300"
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
          className="w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-100 focus:bg-white focus:border-green-600 focus:ring-4 focus:ring-green-600/10 outline-none transition-all text-slate-900 font-medium appearance-none cursor-pointer shadow-sm hover:border-slate-300"
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
