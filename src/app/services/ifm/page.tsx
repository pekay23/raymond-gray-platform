"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
// @ts-ignore
import FOG from "vanta/dist/vanta.fog.min"; // Using Fog for a classy, subtle depth

import { 
  ArrowRight, 
  ShieldCheck, 
  Leaf, 
  Users, 
  Monitor, 
  Utensils, 
  PaintBucket, 
  Wrench, 
  FileText, 
  Zap, 
  CheckCircle2 
} from "lucide-react";

export default function IFMPage() {
  const advantageRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  // Vanta.js Effect Hook for Advantage Section
  useEffect(() => {
    if (!vantaEffect && advantageRef.current) {
      setVantaEffect(
        FOG({
          el: advantageRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          highlightColor: 0x3b82f6, // Blue Highlight
          midtoneColor: 0x1e293b,   // Slate-800
          lowlightColor: 0x0f172a,  // Slate-900 (Base)
          baseColor: 0x0f172a,      // Dark Background
          blurFactor: 0.6,
          speed: 1.2,
          zoom: 0.8
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div className="bg-white overflow-hidden">
      
      {/* 1. HERO SECTION */}
            {/* 1. HERO SECTION - Fixed Zoom Issue & Matched Font */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-slate-900 pt-32 pb-20">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src="/exploreifm.jpg"
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
            {/* MATCHED HOME PAGE STYLING */}
            <span className="inline-block py-1 px-4 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
              Total Building Care
            </span>
            
            <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight tracking-tight text-white">
              Integrated Facilities <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">
                Management
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 font-light max-w-3xl mx-auto leading-relaxed">
              We combine soft and hard services into a single, seamless solution. One partner, one contract, one point of accountability.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. ONE POINT OF CONTACT */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
              One point of contact. <br/>
              One standard of excellence. <br/>
              <span className="text-blue-600">One invoice.</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Facility management shouldn’t turn you into a full-time coordinator. Raymond Gray’s Integrated Facility Management (IFM) consolidates hard, soft, and technology services under one accountable partner—delivering seamless workplaces and consistent results.
            </p>
            <div className="flex flex-col gap-4">
               <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
                  <p className="text-slate-700">Streamlined communication channels.</p>
               </div>
               <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
                  <p className="text-slate-700">Unified reporting and performance tracking.</p>
               </div>
            </div>
          </div>
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-slate-100">
            <Image 
              src="/ifm1.jpg"
              alt="Integrated Management"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3. THE INTEGRATED FM ADVANTAGE (Now with Vanta Fog Background) */}
      <section ref={advantageRef} className="py-24 relative overflow-hidden">
        {/* Dark overlay to ensure text readability if Fog is too bright in spots */}
        <div className="absolute inset-0 bg-slate-900/50 z-0" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-md">The Integrated FM Advantage</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"/>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AdvantageCard 
              icon={<Users />}
              title="Single Accountability"
              desc="One dedicated manager responsible for every service—from the generator room to the executive canteen."
            />
            <AdvantageCard 
              icon={<FileText />}
              title="Simplified Procurement"
              desc="One consolidated invoice and clearer budgeting; admin overheads drop."
            />
            <AdvantageCard 
              icon={<Zap />}
              title="Service Synergy"
              desc="Interconnected teams log and fix issues instantly, preventing small problems becoming big ones."
            />
            <AdvantageCard 
              icon={<ShieldCheck />}
              title="Uncompromising Quality"
              desc="UK-trained discipline across engineering, catering, and soft services."
            />
          </div>
        </div>
      </section>

      {/* 4. TYPICAL SCOPE (Modernized Look) */}
      <section className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-slate-900 mb-16 text-center">Typical Scope</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Hard Services */}
            <ScopeCard 
              title="Hard Services" 
              icon={<Wrench className="w-6 h-6" />}
              iconColor="text-blue-600"
              iconBg="bg-blue-100"
              borderColor="border-blue-200"
            >
              <ScopeItem text="Building maintenance & fabric" />
              <ScopeItem text="HVAC, plumbing & electrical" />
              <ScopeItem text="HSE & fire compliance" />
              <ScopeItem text="Energy management" />
              <ScopeItem text="Generators/power" />
              <ScopeItem text="Security systems" />
            </ScopeCard>

            {/* Soft Services */}
            <ScopeCard 
              title="Soft Services" 
              icon={<Leaf className="w-6 h-6" />}
              iconColor="text-green-600"
              iconBg="bg-green-100"
              borderColor="border-green-200"
            >
              <ScopeItem text="Canteen & corporate catering" />
              <ScopeItem text="Cleaning & waste" />
              <ScopeItem text="Reception/mailroom" />
              <ScopeItem text="Landscaping" />
              <ScopeItem text="Moves & space support" />
            </ScopeCard>

            {/* Technology */}
            <ScopeCard 
              title="Technology" 
              icon={<Monitor className="w-6 h-6" />}
              iconColor="text-purple-600"
              iconBg="bg-purple-100"
              borderColor="border-purple-200"
            >
              <ScopeItem text="BMS & controls" />
              <ScopeItem text="IT/networking" />
              <ScopeItem text="CAFM helpdesk" />
              <ScopeItem text="IoT monitoring & reporting" />
            </ScopeCard>
          </div>

          {/* Site Assessment Callout */}
          <div className="mt-16 bg-white border border-blue-100 p-8 rounded-2xl shadow-xl shadow-blue-900/5 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 pointer-events-none" />
            <div className="relative z-10">
              <h4 className="text-xl font-bold text-slate-900 mb-2">Site Assessment First</h4>
              <p className="text-slate-600">Pricing follows a short on-site review for accurate staffing and scope.</p>
            </div>
            <a 
              href="mailto:fm@raymond-gray.org" 
              className="relative z-10 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all flex items-center gap-2 shadow-lg hover:shadow-blue-600/25 hover:-translate-y-0.5 whitespace-nowrap"
            >
              Schedule Assessment <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 5. COMPREHENSIVE SOLUTIONS (Existing Grid) */}
      <section id="services" className="py-24 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Comprehensive Solutions</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Whether you need daily cleaning or complex engineering maintenance, we handle it all under one roof.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceImageCard 
              title="IT Support Networking & Data Services" 
              desc="Keep your business online and protected. We design, install, and manage secure networks, provide 24/7 helpdesk support, and safeguard your data with backups and cybersecurity."
              img="/itsupport.jpg"
              icon={<Monitor />}
            />
            <ServiceImageCard 
              title="Front Desk and Reception Services" 
              desc="Make a great first impression. Our trained reception team manages visitor check-ins, calls, deliveries, meeting room bookings, and concierge requests with a warm, professional touch."
              img="/helpdesk.jpg"
              icon={<Users />}
            />
            <ServiceImageCard 
              title="Health & Safety Compliance" 
              desc="Stay compliant and safe. We deliver risk assessments, policy development, staff training, audits, and incident reporting—aligning your workplace with local regulations."
              img="/healthandsafety.jpg"
              icon={<FileText />}
            />
            <ServiceImageCard 
              title="Canteen & Cafeteria Services" 
              desc="Fuel your workforce with fresh, affordable meals. From menu planning and daily service to hygiene controls and cashless payment, we run canteens that are tasty and efficient."
              img="/canteen.jpg"
              icon={<Utensils />}
            />
            <ServiceImageCard 
              title="Decor, Fit Out & Furniture" 
              desc="Transform spaces with smart design. We handle concept, layout, finishes, and ergonomic furniture to create functional, beautiful workplaces."
              img="/exploreifm.jpg"
              icon={<PaintBucket />}
            />
            <ServiceImageCard 
              title="Building Maintenance & Management" 
              desc="Protect your assets with proactive care. Our technicians provide planned and reactive maintenance (HVAC, electrical, plumbing) while our security team oversees access control."
              img="/workethic.jpg"
              icon={<Wrench />}
            />
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="py-24 bg-white text-center relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
            Ready to streamline your <br/> facility operations?
          </h2>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Get a tailored proposal that meets your specific needs and budget.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 px-10 py-5 bg-blue-600 text-white hover:bg-blue-700 font-bold rounded-lg text-lg transition-all shadow-xl hover:-translate-y-1"
          >
            Request a Proposal <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
}

// --- HELPER COMPONENTS ---

function AdvantageCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    // Glassmorphism effect added to stand out against Vanta background
    <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:bg-white/15 transition-all group">
      <div className="text-blue-400 mb-4 [&>svg]:w-10 [&>svg]:h-10 group-hover:text-blue-300 transition-colors drop-shadow-sm">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-3 tracking-wide">{title}</h3>
      <p className="text-slate-300 text-sm leading-relaxed group-hover:text-white transition-colors">{desc}</p>
    </div>
  );
}

function ScopeCard({ children, title, icon, iconColor, iconBg, borderColor }: any) {
  return (
    <div className={`bg-white p-8 rounded-2xl border ${borderColor} shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
      <div className={`w-14 h-14 ${iconBg} rounded-2xl flex items-center justify-center ${iconColor} mb-6 shadow-sm`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-6">{title}</h3>
      <ul className="space-y-4">
        {children}
      </ul>
    </div>
  )
}

function ScopeItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-3 text-slate-600 group">
      <div className="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-blue-500 transition-colors shrink-0" />
      <span className="text-sm font-medium group-hover:text-slate-900 transition-colors">{text}</span>
    </li>
  );
}

function ServiceImageCard({ title, desc, img, icon }: { title: string, desc: string, img: string, icon: any }) {
  return (
    <div className="group relative h-[500px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-slate-700/50">
      <Image 
        src={img} 
        alt={title} 
        fill 
        className="object-cover transition-transform duration-700 group-hover:scale-110" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/90 to-transparent opacity-100 transition-opacity" />
      
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
