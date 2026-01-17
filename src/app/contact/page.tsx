"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Loader2, CheckCircle } from "lucide-react";
import Image from "next/image";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "General Inquiry",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", serviceType: "General Inquiry", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white min-h-screen">
      
      {/* 1. HERO SECTION (Restored & Fixed Layout) */}
      {/* Using h-[60vh] to ensure it's tall enough, and object-center to prevent bad cropping */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
          alt="Contact Raymond Gray"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        
        <div className="relative z-10 text-center text-white px-6 mt-16"> 
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold mb-4 tracking-tight"
          >
            Contact Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-300 font-light max-w-2xl mx-auto"
          >
            Start the conversation. We're ready to help you optimize your facility.
          </motion.p>
        </div>
      </section>

      {/* 2. MAIN CONTENT SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* LEFT: Contact Information */}
          <div className="lg:col-span-4 space-y-10">
            <div>
              <h3 className="text-3xl font-bold text-slate-900 mb-6">Get in Touch</h3>
              <p className="text-lg text-slate-600 leading-relaxed border-l-4 border-red-600 pl-6">
                Contact us for tailored facilities management solutions that enhance your property and operational efficiency. We're here to assist you.
              </p>
            </div>

            <div className="space-y-8 pt-4">
              <ContactItem 
                icon={<MapPin />} 
                title="Headquarters" 
                text="Accra, Greater Accra Region, Ghana" 
              />
              <ContactItem 
                icon={<Phone />} 
                title="Phone" 
                text="+233 551 010 108" 
                sub="Mon-Fri, 8am - 5pm"
              />
              <ContactItem 
                icon={<Mail />} 
                title="Email" 
                // Displaying both emails clearly
                text={
                  <>
                    <a href="mailto:contactus@raymond-gray.org" className="hover:text-red-600 transition block">contactus@raymond-gray.org</a>
                    <a href="mailto:repairs@raymond-gray.org" className="hover:text-red-600 transition block mt-1">repairs@raymond-gray.org</a>
                  </>
                } 
              />
            </div>
          </div>

          {/* RIGHT: High Contrast Form (ABM Style) */}
          <div className="lg:col-span-8">
            <div className="bg-slate-50 p-8 md:p-12 rounded-2xl border border-slate-200 shadow-sm">
              
              {status === "success" ? (
                <div className="text-center py-12 bg-white rounded-xl border border-green-100 shadow-sm">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Inquiry Received</h3>
                  <p className="text-slate-600">Thank you. A representative will contact you shortly.</p>
                  <button onClick={() => setStatus("idle")} className="mt-6 text-red-600 font-bold hover:underline">
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Send us a message</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <InputGroup label="Full Name *" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
                    <InputGroup label="Phone Number" name="phone" placeholder="+233..." value={formData.phone} onChange={handleChange} />
                  </div>

                  <InputGroup label="Email Address *" name="email" type="email" placeholder="name@company.com" value={formData.email} onChange={handleChange} required />

                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">I am interested in...</label>
                    <div className="relative">
                      <select 
                        name="serviceType" 
                        value={formData.serviceType} 
                        onChange={handleChange}
                        className="w-full p-4 rounded-lg border border-slate-300 bg-white text-slate-900 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all appearance-none cursor-pointer font-medium"
                      >
                        <option>General Inquiry</option>
                        <option>Integrated Facility Management</option>
                        <option>Building Maintenance</option>
                        <option>Construction Finishing</option>
                        <option>Engineering Services</option>
                        <option>Request a Quote</option>
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">Message *</label>
                    <textarea 
                      name="message" 
                      required 
                      rows={5} 
                      value={formData.message} 
                      onChange={handleChange}
                      className="w-full p-4 rounded-lg border border-slate-300 bg-white text-slate-900 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all resize-none font-medium"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={status === "loading"}
                    className="w-full md:w-auto px-10 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  >
                    {status === "loading" ? <Loader2 className="animate-spin w-5 h-5" /> : "Submit Inquiry"}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// --- COMPONENTS ---

function ContactItem({ icon, title, text, sub }: { icon: React.ReactNode, title: string, text: React.ReactNode, sub?: string }) {
  return (
    <div className="flex items-start gap-5">
      <div className="text-red-600 shrink-0 mt-1 bg-red-50 p-3 rounded-full">
        <div className="[&>svg]:w-6 [&>svg]:h-6">{icon}</div>
      </div>
      <div>
        <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide mb-1">{title}</h4>
        <div className="text-slate-700 font-medium text-lg leading-snug">{text}</div>
        {sub && <p className="text-slate-500 text-sm mt-1">{sub}</p>}
      </div>
    </div>
  );
}

function InputGroup({ label, ...props }: any) {
  return (
    <div>
      <label className="block text-sm font-bold text-slate-800 mb-2">{label}</label>
      <input 
        {...props}
        className="w-full p-4 rounded-lg border border-slate-300 bg-white text-slate-900 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all placeholder:text-slate-400 font-medium"
      />
    </div>
  );
}
