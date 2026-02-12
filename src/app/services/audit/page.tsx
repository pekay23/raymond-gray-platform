"use client";

import { useState, useRef } from "react";
import { Loader2, ClipboardCheck, Building, CheckCircle2, FileText, MessageCircle, Zap, Droplets, Flame, Snowflake, Wrench, Phone, Mail, Clock, UploadCloud, Plus, Trash2, X, File } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AuditPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // CLOUDINARY CONFIG
  const CLOUDINARY_CLOUD_NAME = "dvjxdxhdr";
  const CLOUDINARY_UPLOAD_PRESET = "raymond_uploads";

  // Dynamic State for Systems & Equipment
  const [systems, setSystems] = useState([
    { type: "", quantity: "", age: "", condition: "" }
  ]);

  const [formData, setFormData] = useState({
    facilityType: "",
    buildingAge: "",
    totalArea: "",
    floors: "",
    occupancy: "",
    location: "",
    challenges: "",
    goals: "",
    name: "",
    position: "",
    company: "",
    phone: "",
    email: "",
    accessInfo: "",
    agreed: false
  });

  // State for multiple files
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "uploading" | "loading" | "success" | "error">("idle");

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Systems Handlers
  const addSystem = () => {
    setSystems([...systems, { type: "", quantity: "", age: "", condition: "" }]);
  };

  const removeSystem = (index: number) => {
    const newSystems = systems.filter((_, i) => i !== index);
    setSystems(newSystems);
  };

  const updateSystem = (index: number, field: string, value: string) => {
    const newSystems = [...systems];
    // @ts-ignore
    newSystems[index][field] = value;
    setSystems(newSystems);
  };

  // File Handlers
  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Add new files to existing array
      setFiles(prev => [...prev, ...Array.from(e.target.files || [])]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreed) return;

    let fileUrls: string[] = [];

    // 1. Upload Files to Cloudinary First
    if (files.length > 0) {
      setStatus("uploading");

      try {
        // Upload all files in parallel
        const uploadPromises = files.map(async (file) => {
          const uploadData = new FormData();
          uploadData.append("file", file);
          uploadData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

          const uploadRes = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
            { method: "POST", body: uploadData }
          );

          if (!uploadRes.ok) throw new Error(`Failed to upload ${file.name}`);

          const uploadJson = await uploadRes.json();
          return uploadJson.secure_url;
        });

        fileUrls = await Promise.all(uploadPromises);

      } catch {
        alert("One or more files failed to upload. Please try again or submit without files.");
        setStatus("idle");
        return;
      }
    }

    setStatus("loading");

    // 2. Submit Data to Neon
    const systemsLog = systems.map(s =>
      `- ${s.type || 'N/A'}: Qty ${s.quantity}, Age ${s.age}, Cond ${s.condition}`
    ).join("\n");

    const message = `
      REQ TYPE: Building Audit & FM Assessment
      FACILITY: ${formData.facilityType}
      AGE: ${formData.buildingAge}
      SIZE: ${formData.totalArea} (${formData.floors} floors)
      OCCUPANCY: ${formData.occupancy}
      LOCATION: ${formData.location}
      
      --- EQUIPMENT LIST ---
      ${systemsLog}
      ----------------------

      CHALLENGES: ${formData.challenges}
      GOALS: ${formData.goals}
      CONTACT: ${formData.name} (${formData.position} @ ${formData.company})
      ACCESS: ${formData.accessInfo}
      
      ATTACHMENTS: 
      ${fileUrls.length > 0 ? fileUrls.join("\n") : "None"}
      
      AGREED TO FEE: Yes (GHS 5,000)
    `;

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formData.name, email: formData.email, phone: formData.phone, serviceType: "Building Audit", message }),
      });
      setStatus("success");

      // Scroll to confirmation
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);

    } catch (error) {
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-12">

      {/* 1. HERO HEADER */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-slate-900 pt-32 pb-32">
        <Image src="/bia.jpg" alt="Building Audit" fill className="object-cover opacity-30" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

        <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto">
          <span className="inline-block py-1.5 px-4 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
            Comprehensive Audit • Facility Management • Building Assessment
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Building Audit & <br /> <span className="text-blue-400">Facility Management Assessment</span>
          </h1>

          <p className="text-xl text-slate-200 font-light mb-8 leading-relaxed max-w-3xl mx-auto">
            Comprehensive building audit and inspection service for commercial buildings, residential blocks, and gated communities to enable effective facility management.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <button
              onClick={scrollToForm}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_30px_rgba(37,99,235,0.7)] flex items-center gap-2"
            >
              <ClipboardCheck className="w-5 h-5" /> Request Audit
            </button>

            <Link href="/services/servicing" className="inline-flex items-center gap-2 bg-slate-800/80 px-6 py-4 rounded-full border border-slate-700 shadow-xl backdrop-blur-sm hover:bg-slate-700/80 transition text-sm font-medium">
              <Wrench className="w-4 h-4 text-green-400" /> Looking for equipment servicing?
            </Link>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How Our Building Audit Works</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Our comprehensive audit provides a complete assessment of your facility's condition, enabling us to develop an effective facility management plan.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <ProcessStep number="1" title="Inspection" desc="We conduct a thorough inspection of your building, reviewing blueprints and assessing all critical systems including water, power, HVAC, and structural integrity." />
            <ProcessStep number="2" title="Analysis" desc="Our team analyzes all data and prepares a comprehensive report detailing the current state of your building with prioritized recommendations." />
            <ProcessStep number="3" title="Planning" desc="Based on findings, we develop a custom facility management plan with optimized schedules, resource allocation, and budget projections." />
            <ProcessStep number="4" title="Management" desc="Once approved, we implement the plan, taking over complete maintenance with clearly defined service levels and performance metrics." />
          </div>
        </div>
      </section>

      {/* 3. WHAT WE ASSESS */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">What We Assess</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AssessmentCard icon={<Building />} title="Building Structure" desc="Structural integrity, foundations, walls, roofs, and overall condition." />
            <AssessmentCard icon={<Zap />} title="Electrical Systems" desc="Distribution panels, wiring, emergency power, and code compliance." />
            <AssessmentCard icon={<Droplets />} title="Plumbing & Water" desc="Supply, drainage, sewage, pumps, heaters, and leak detection." />
            <AssessmentCard icon={<Snowflake />} title="HVAC Systems" desc="Chillers, boilers, air handlers, ductwork, and control systems." />
            <AssessmentCard icon={<Flame />} title="Fire & Life Safety" desc="Alarms, sprinklers, emergency lighting, and safety regulations." />
            <AssessmentCard icon={<Wrench />} title="Mechanical Systems" desc="Inspection of elevators, escalators, conveyor systems, and other mechanical equipment for proper operation and maintenance needs." />
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-12 gap-12">

        {/* LEFT COLUMN: Pricing & Value */}
        <div className="lg:col-span-5 space-y-8">

          <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl border border-slate-800 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">Comprehensive Audit Fee</h3>
              <div className="text-4xl font-bold text-blue-400 mb-1">GHS 5,000</div>
              <p className="text-slate-400 text-sm mb-6">Complete building inspection & assessment.</p>

              <div className="bg-blue-600/20 border border-blue-500/50 p-4 rounded-xl">
                <span className="block font-bold text-blue-300 text-lg mb-1">80% CREDIT OFFER</span>
                <p className="text-sm text-blue-100 leading-relaxed">
                  <strong>4,000 GHS</strong> will be credited back onto your first annual facility management or building maintenance invoice.
                </p>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-bl-full -z-0" />
          </div>

          <div className="bg-gradient-to-br from-blue-900 to-slate-900 text-white p-8 rounded-xl shadow-lg border border-blue-800">
            <h3 className="font-bold text-white mb-2 text-lg">Benefits of Audit</h3>
            <h4 className="text-sm font-bold text-blue-400 mb-6 uppercase tracking-wide">Comprehensive Facility Planning</h4>
            <ul className="space-y-4 text-blue-50">
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" /> <strong>Risk Mitigation:</strong> Identify issues early.</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" /> <strong>Cost Optimization:</strong> Accurate budgets.</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" /> <strong>Extended Asset Life:</strong> Proactive care.</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" /> <strong>Compliance:</strong> Regulatory safety.</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4">Additional Services</h3>
            <div className="space-y-6 text-sm text-slate-600">
              <div>
                <strong className="block text-slate-800 text-base mb-1">🔄 90-Day Transition</strong>
                <p>For new builds: construction close-out & defects management.</p>
              </div>
              <div>
                <strong className="block text-slate-800 text-base mb-1">🛡️ Equipment Insurance</strong>
                <p>Brokerage for critical equipment replacement coverage.</p>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Booking Form */}
        <div className="lg:col-span-7" ref={formRef}>
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 p-8 text-white border-b border-slate-800">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Building className="w-6 h-6 text-blue-500" /> Request Your Building Audit
              </h2>
              <p className="text-slate-400 text-sm mt-2">
                The audit takes 1-3 days on-site. Report delivered within 10 working days.
              </p>
            </div>

            {status === "success" ? (
              <div className="p-16 text-center h-[600px] flex flex-col items-center justify-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">Request Received!</h3>
                <p className="text-slate-600 mb-8 text-lg">We will contact you shortly to schedule the pre-audit planning session.</p>
                <button onClick={() => window.location.reload()} className="px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition">Submit Another Request</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-8 bg-white">

                {/* 1. Facility Type */}
                <InputSelect
                  label="1. Facility Type"
                  name="facilityType"
                  value={formData.facilityType}
                  onChange={handleChange}
                  options={["Commercial Building", "Office Building", "Residential Apartment Block", "Gated Community", "Shopping Mall", "Hotel/Resort", "Hospital/Healthcare Facility", "Educational Institution", "Industrial Facility", "New Construction (90-day transition)", "Other"]}
                />

                {/* 2. Age & 3. Area */}
                <div className="grid md:grid-cols-2 gap-6">
                  <InputSelect
                    label="2. Building Age"
                    name="buildingAge"
                    value={formData.buildingAge}
                    onChange={handleChange}
                    options={["New Construction (Not yet occupied)", "Less than 5 years", "5-10 years", "10-20 years", "20-30 years", "Over 30 years", "Not sure"]}
                  />
                  <InputField label="3. Total Building Area (sq ft/m²)" name="totalArea" value={formData.totalArea} onChange={handleChange} placeholder="e.g. 50000" />
                </div>

                {/* 4. Floors & 5. Occupancy */}
                <div className="grid md:grid-cols-2 gap-6">
                  <InputField label="4. Number of Floors" name="floors" value={formData.floors} onChange={handleChange} placeholder="e.g. 10" />
                  <div className="w-full">
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide text-xs">5. Current Occupancy/Usage</label>
                    <textarea name="occupancy" rows={1} className="w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-100 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none transition-all text-slate-900 font-medium resize-none shadow-sm hover:border-slate-300 h-[60px]" placeholder="Describe usage..." onChange={handleChange} />
                  </div>
                </div>

                {/* 6. Location */}
                <div className="w-full">
                  <InputField label="6. Building Location (Full Address/Google Maps Link)" name="location" value={formData.location} onChange={handleChange} placeholder="Paste link or type address" required />
                  <p className="text-xs text-slate-500 mt-1">Provide complete address for accurate assessment planning. <a href="https://tinyurl.com/tfynxw37" target="_blank" className="text-blue-600 hover:underline font-bold">Need help getting a link?</a></p>
                </div>

                {/* 7. DYNAMIC SYSTEMS LIST */}
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-inner">
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide text-xs">7. Building Systems & Equipment</label>
                    <button type="button" onClick={addSystem} className="text-xs flex items-center gap-1 font-bold text-blue-600 hover:text-blue-700 bg-white px-3 py-1.5 rounded-lg border border-blue-200 shadow-sm transition">
                      <Plus className="w-4 h-4" /> Add System
                    </button>
                  </div>

                  <div className="space-y-3">
                    {systems.map((system, index) => (
                      <div key={index} className="grid grid-cols-12 gap-2 items-start bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                        <div className="col-span-4">
                          <select
                            className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-medium focus:border-blue-500 outline-none"
                            value={system.type}
                            onChange={(e) => updateSystem(index, 'type', e.target.value)}
                          >
                            <option value="">Type...</option>
                            <option>Generator</option>
                            <option>HVAC / AC</option>
                            <option>Pump / Plumbing</option>
                            <option>Electrical Panel</option>
                            <option>Lift / Elevator</option>
                            <option>Fire Safety</option>
                            <option>Security System</option>
                            <option>Other</option>
                          </select>
                        </div>
                        <div className="col-span-2">
                          <input placeholder="Qty" className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-xs" value={system.quantity} onChange={(e) => updateSystem(index, 'quantity', e.target.value)} />
                        </div>
                        <div className="col-span-2">
                          <input placeholder="Age" className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-xs" value={system.age} onChange={(e) => updateSystem(index, 'age', e.target.value)} />
                        </div>
                        <div className="col-span-3">
                          <select className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-xs" value={system.condition} onChange={(e) => updateSystem(index, 'condition', e.target.value)}>
                            <option value="">Cond...</option>
                            <option>Good</option>
                            <option>Fair</option>
                            <option>Poor</option>
                            <option>Broken</option>
                          </select>
                        </div>
                        <div className="col-span-1 flex justify-center pt-2">
                          {index > 0 && <button type="button" onClick={() => removeSystem(index)} className="text-red-400 hover:text-red-600 transition"><Trash2 className="w-4 h-4" /></button>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 8. Challenges & 9. Goals */}
                <div className="space-y-6">
                  <div className="w-full">
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide text-xs">8. Current Challenges & Issues</label>
                    <textarea name="challenges" rows={3} className="w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-100 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none transition-all text-slate-900 font-medium resize-none shadow-sm hover:border-slate-300" placeholder="Describe maintenance issues or challenges..." onChange={handleChange} />
                  </div>
                  <div className="w-full">
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide text-xs">9. Facility Management Goals</label>
                    <textarea name="goals" rows={2} className="w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-100 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none transition-all text-slate-900 font-medium resize-none shadow-sm hover:border-slate-300" placeholder="e.g., cost reduction, improved reliability, compliance, etc." onChange={handleChange} />
                  </div>
                </div>

                {/* 10-14. Personal Details */}
                <div className="space-y-6 pt-6 border-t border-slate-100">
                  <div className="grid md:grid-cols-2 gap-6">
                    <InputField label="10. Your Name" name="name" value={formData.name} onChange={handleChange} required />
                    <InputField label="11. Your Position" name="position" value={formData.position} onChange={handleChange} placeholder="e.g., Property Manager" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <InputField label="12. Company/Organization" name="company" value={formData.company} onChange={handleChange} />
                    <InputField label="13. Phone (WhatsApp)" name="phone" value={formData.phone} onChange={handleChange} placeholder="+233..." required />
                  </div>
                  <InputField label="14. Email" type="email" name="email" value={formData.email} onChange={handleChange} required />
                  <InputField label="15. Access Instructions" name="accessInfo" value={formData.accessInfo} onChange={handleChange} placeholder="Security procedures, contact persons..." />

                  {/* File Upload UI - MODAL STYLE */}
                  <div className="w-full">
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" multiple />
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide text-xs">Upload Building Documents (Optional)</label>

                    {/* Selected Files List */}
                    {files.length > 0 && (
                      <div className="mb-3 space-y-2">
                        {files.map((f, i) => (
                          <div key={i} className="flex items-center justify-between p-2 bg-blue-50 border border-blue-100 rounded-lg text-xs text-blue-700">
                            <span className="flex items-center gap-2 truncate"><File className="w-3 h-3" /> {f.name}</span>
                            <button type="button" onClick={() => removeSystem(i)} className="text-red-400 hover:text-red-600"><X className="w-3 h-3" /></button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div
                      onClick={handleFileClick}
                      className="w-full p-6 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-blue-50 hover:border-blue-400 transition-all cursor-pointer text-center group"
                    >
                      <UploadCloud className="w-8 h-8 text-blue-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <p className="text-sm font-bold text-slate-700">
                        Click to upload blueprints or records
                      </p>
                      <p className="text-xs text-slate-500 mt-1">Select multiple files (PDF, JPG, PNG)</p>
                    </div>
                  </div>
                </div>

                {/* 16. Agreement */}
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-sm text-slate-700 space-y-3 shadow-inner">
                  <p className="font-bold text-slate-900 border-b border-slate-200 pb-2">I understand and agree that:</p>
                  <ul className="list-disc pl-4 space-y-1 text-xs md:text-sm text-slate-600 leading-relaxed">
                    <li>Comprehensive audit fee of GHS 5,000 for building inspection and assessment</li>
                    <li>80% (GHS 4,000) of this fee will be credited back on my first annual facility management invoice</li>
                    <li>Audit will take 1-3 days on-site with report delivered within 10 working days</li>
                    <li>Report will include detailed findings and prioritized recommendations</li>
                    <li>Any recommended repairs may be conditions for facility management engagement</li>
                    <li>We will coordinate access to the building and all relevant areas for the inspection</li>
                    <li>All payments will be made electronically via debit/credit cards, Mobile Money, instant bank transfer or similar options</li>
                  </ul>
                  <label className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-200 cursor-pointer p-2 hover:bg-white rounded-lg transition select-none">
                    <input type="checkbox" name="agreed" className="w-6 h-6 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer" required onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })} />
                    <span className="font-bold text-slate-900 text-base">I Agree to the Fee (GHS 5,000) & Terms</span>
                  </label>
                </div>

                {/* Actions */}
                <div className="space-y-4 pt-2">
                  <button
                    type="submit"
                    disabled={status === "loading" || status === "uploading" || !formData.agreed}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-lg"
                  >
                    {status === "uploading" ? <><Loader2 className="animate-spin" /> Uploading...</> : status === "loading" ? <Loader2 className="animate-spin" /> : "Confirm Audit Request"}
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

      {/* DEPARTMENT CONTACT SECTION */}
      <div className="max-w-4xl mx-auto px-6 mt-8">
        <div className="bg-slate-100 border border-slate-200 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-around gap-8 shadow-sm">
          <div className="text-center md:text-left">
            <h4 className="text-slate-900 font-bold text-lg mb-1">Schedule Your Building Audit</h4>
            <p className="text-slate-600 text-sm">Building Maintenance & Management Department</p>
          </div>
          <div className="flex flex-col gap-3 items-center md:items-start text-sm">
            <div className="flex items-center gap-3 text-slate-700"><Phone className="w-5 h-5 text-blue-600" /> <span className="font-bold">+233 551010108</span></div>
            <div className="flex items-center gap-3 text-slate-700"><Mail className="w-5 h-5 text-blue-600" /> <span className="font-medium">fm@raymond-gray.org</span></div>
          </div>
          <div className="text-center md:text-left text-sm text-slate-600">
            <div className="flex items-center gap-2 mb-1"><Clock className="w-4 h-4 text-slate-400" /> <span><strong>Office:</strong> Mon - Fri, 8AM - 6PM</span></div>
            <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-slate-400" /> <span><strong>Audit:</strong> Mon - Sat, 8AM - 5PM</span></div>
          </div>
        </div>
      </div>

    </div>
  );
}

// --- HELPER COMPONENTS (GOLD STANDARD) ---

function ProcessStep({ number, title, desc }: { number: string, title: string, desc: string }) {
  return (
    <div className="text-center">
      <div className="w-10 h-10 bg-slate-700 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4 shadow-lg">
        {number}
      </div>
      <h3 className="font-bold text-slate-900 mb-2 text-lg">{title}</h3>
      <p className="text-base text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}

function AssessmentCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="flex gap-4 bg-white p-6 rounded-xl border border-slate-200 hover:border-blue-400 transition-colors shadow-sm">
      <div className="text-blue-600 shrink-0 bg-blue-50 w-12 h-12 flex items-center justify-center rounded-lg">
        <div className="[&>svg]:w-6 [&>svg]:h-6">{icon}</div>
      </div>
      <div>
        <h4 className="font-bold text-slate-900">{title}</h4>
        <p className="text-sm text-slate-600 mt-1">{desc}</p>
      </div>
    </div>
  );
}

function InputField({ label, ...props }: any) {
  return (
    <div className="w-full">
      <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide text-xs">{label}</label>
      <input
        {...props}
        className="w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-100 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none transition-all text-slate-900 font-medium placeholder:text-slate-400 shadow-sm hover:border-slate-300"
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
          className="w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-100 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none transition-all text-slate-900 font-medium appearance-none cursor-pointer shadow-sm hover:border-slate-300"
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
