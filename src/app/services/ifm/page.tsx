"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Leaf, Users, Monitor, Utensils, PaintBucket, Wrench, FileText } from "lucide-react";

export default function IFMPage() {
  return (
    <div className="bg-white overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-slate-900 pt-20">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2070&q=90"
            alt="Integrated Facilities Management"
            fill
            className="object-cover opacity-40"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        </motion.div>
        
        <div className="relative z-10 text-center max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-4 block">
              Total Building Care
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Integrated Facilities <br/> Management
            </h1>
            <p className="text-xl text-slate-200 font-light max-w-3xl mx-auto leading-relaxed">
              We combine soft and hard services into a single, seamless solution. One partner, one contract, one point of accountability.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/25">
                Get a Quote <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="#services" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full transition-all border border-white/20 backdrop-blur-sm">
                Explore Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. TYPICAL SCOPE & TECHNOLOGY */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Typical Scope</h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Our integrated approach ensures that every aspect of your building—from the reception desk to the boiler room—operates at peak efficiency.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <FeatureItem icon={<ShieldCheck />} title="100% Compliance" desc="Local safety and building regulations." />
              <FeatureItem icon={<Leaf />} title="Sustainability" desc="Eco-friendly cleaning & energy management." />
              <FeatureItem icon={<Users />} title="Vetted Staff" desc="Highly trained, uniformed teams." />
              {/* EXACT TEXT REQUESTED */}
              <FeatureItem icon={<Monitor />} title="Technology" desc="BMS & controls, IT/networking, CAFM helpdesk, IoT monitoring & reporting." />
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
              <h4 className="font-bold text-blue-900 mb-1">Site Assessment First</h4>
              <p className="text-blue-800 text-sm mb-4">Pricing follows a short on-site review for accurate staffing and scope.</p>
              <a href="mailto:fm@raymond-gray.org" className="inline-flex items-center gap-2 text-blue-700 font-bold hover:underline text-lg">
                Schedule Your Facility Assessment <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl border border-slate-100">
            <Image 
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1000&q=90"
              alt="Facility Manager"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICES (Image Cards with EXACT TEXT) */}
      <section id="services" className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Comprehensive Solutions</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Whether you need daily cleaning or complex engineering maintenance, we handle it all under one roof.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceImageCard 
              title="IT Support Networking & Data Services" 
              desc="Keep your business online and protected. We design, install, and manage secure networks, provide 24/7 helpdesk support, and safeguard your data with backups and cybersecurity—so your people stay connected and productive."
              img="https://images.unsplash.com/photo-1558494949-ef526b0042a0?auto=format&fit=crop&w=800&q=80"
              icon={<Monitor />}
            />
            <ServiceImageCard 
              title="Front Desk and Reception Services" 
              desc="Make a great first impression. Our trained reception team manages visitor check-ins, calls, deliveries, meeting room bookings, and concierge requests with a warm, professional touch that reflects your brand."
              img="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80"
              icon={<Users />}
            />
            <ServiceImageCard 
              title="Health & Safety Compliance" 
              desc="Stay compliant and safe. We deliver risk assessments, policy development, staff training, audits, and incident reporting—aligning your workplace with local regulations and best practice to reduce risk and protect your people."
              img="https://images.unsplash.com/photo-1581094794329-cd56b5095e8e?auto=format&fit=crop&w=800&q=80"
              icon={<FileText />}
            />
            <ServiceImageCard 
              title="Canteen & Cafeteria Services" 
              desc="Fuel your workforce with fresh, affordable meals. From menu planning and daily service to hygiene controls and cashless payment, we run canteens that are tasty, efficient, and tailored to your team."
              img="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80"
              icon={<Utensils />}
            />
            <ServiceImageCard 
              title="Decor, Fit Out & Furniture" 
              desc="Transform spaces with smart design. We handle concept, layout, finishes, and ergonomic furniture to create functional, beautiful workplaces—delivered on time and coordinated with your operation."
              img="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
              icon={<PaintBucket />}
            />
            <ServiceImageCard 
              title="Building Maintenance & Management" 
              desc="Protect your assets with proactive care. Our technicians provide planned and reactive maintenance (HVAC, electrical, plumbing) while our security team oversees access control, CCTV, and patrols for a safe, reliable facility."
              img="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
              icon={<Wrench />}
            />
          </div>

        </div>
      </section>

      {/* 4. CTA */}
      <section className="py-24 bg-blue-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
            Ready to streamline your <br/> facility operations?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Get a tailored proposal that meets your specific needs and budget.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-blue-900 hover:bg-blue-50 font-bold rounded-full text-lg transition-all shadow-xl hover:-translate-y-1"
          >
            Request a Proposal <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
}

// --- HELPER COMPONENTS ---

function FeatureItem({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="flex gap-4">
      <div className="text-blue-600 shrink-0 mt-1 bg-blue-50 p-2 rounded-lg h-fit">{icon}</div>
      <div>
        <h4 className="font-bold text-slate-900 text-lg">{title}</h4>
        <p className="text-slate-600 text-sm">{desc}</p>
      </div>
    </div>
  );
}

function ServiceImageCard({ title, desc, img, icon }: { title: string, desc: string, img: string, icon: any }) {
  return (
    <div className="group relative h-[500px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
      <Image 
        src={img} 
        alt={title} 
        fill 
        className="object-cover transition-transform duration-700 group-hover:scale-110" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent opacity-95 transition-opacity" />
      
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mb-4 text-white border border-white/20 group-hover:bg-blue-600 group-hover:border-blue-600 transition-colors">
          <div className="[&>svg]:w-6 [&>svg]:h-6">{icon}</div>
        </div>
        <h3 className="text-2xl font-bold text-white mb-3 leading-tight">{title}</h3>
        <p className="text-slate-300 text-sm leading-relaxed mb-4 group-hover:text-white transition-colors">
          {desc}
        </p>
      </div>
    </div>
  );
}
