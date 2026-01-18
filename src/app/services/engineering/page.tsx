"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  Wrench, 
  Zap, 
  Thermometer, 
  Cpu, 
  Truck, 
  Activity,
  CheckCircle2,
  Settings
} from "lucide-react";

export default function EngineeringPage() {

  return (
    <div className="bg-white overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-slate-900 pt-32 pb-20">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src="/hero-engineering.jpg"
            alt="Engineering Services"
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
             <span className="inline-block py-1 px-4 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
              Technical Excellence
            </span>
            
            <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight tracking-tight text-white">
              Engineering <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">
                Solutions
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 font-light max-w-3xl mx-auto leading-relaxed">
              Expert engineering solutions, including vehicle fleet maintenance, for seamless operational support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. INTRODUCTION & ETHOS (Static Background Image) */}
      <section className="py-24 relative overflow-hidden bg-slate-900">
        
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/engineering.jpg"
            alt="Engineering Background"
            fill
            className="object-cover"
          />
          {/* Dark overlay to ensure white text is readable */}
          <div className="absolute inset-0 bg-slate-900/85" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Introduction Text */}
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight text-white drop-shadow-md">
              Your building's complex systems are its lifeblood. <br/>
              <span className="text-blue-400">When they fail, your business stops.</span>
            </h2>
            <p className="text-lg text-slate-200 leading-relaxed font-medium drop-shadow-sm">
              We provide the critical expertise to design, install, maintain, and optimize HVAC, power, water, IT, and building emergency control systems to UK engineering standards.
            </p>
          </div>

          {/* Ethos Cards */}
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-white mb-2 tracking-wide uppercase drop-shadow-md">Our Engineering Ethos</h3>
            <p className="text-blue-200 text-lg font-medium">Precision, Driven by Discipline</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <EthosCard 
              number="01"
              title="Proactive, not reactive"
              desc="Predictive and planned maintenance to prevent downtime before it happens."
              icon={<Activity />}
            />
            <EthosCard 
              number="02"
              title="Standards-based execution"
              desc="UK-inspired rigour with strict code compliance and safety protocols."
              icon={<CheckCircle2 />}
            />
            <EthosCard 
              number="03"
              title="Integrated systems thinking"
              desc="HVAC, BMS, and IT teams collaborate for peak performance across all layers."
              icon={<Settings />}
            />
          </div>

          {/* Mailto CTA */}
          <div className="mt-16 text-center">
            <p className="text-white mb-4 text-sm font-bold uppercase tracking-wider drop-shadow-md">Is your building’s performance built on engineering excellence?</p>
            <a 
              href="mailto:engineering@raymond-gray.org" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-900 hover:bg-blue-50 font-bold rounded-full transition-all shadow-xl hover:-translate-y-1"
            >
              Request an Engineering Audit <ArrowRight className="w-5 h-5" />
            </a>
          </div>

        </div>
      </section>

      {/* 3. KEY DISCIPLINES */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Key Disciplines</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"/>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <DisciplineCard 
              title="HVAC & Mechanical"
              subtitle="Optimal climate, air quality, and efficiency."
              items={[
                "System design and installation",
                "Precision cooling for data rooms",
                "Planned preventive maintenance",
                "Energy re-trofits"
              ]}
              img="/hvac.jpg"
              icon={<Thermometer />}
            />
            
            <DisciplineCard 
              title="IT & Data Infrastructure"
              subtitle="The digital backbone."
              items={[
                "Structured cabling (fibre, CAT6/7)",
                "Data-centre design and infrastructure",
                "In-house IT support",
                "Server room/cabinet management"
              ]}
              img="/itinfras.jpg"
              icon={<Cpu />}
            />
            
            <DisciplineCard 
              title="Electrical & Power Systems"
              subtitle="Uninterrupted, safe electricity."
              items={[
                "Generator and power-plant installation/maintenance",
                "Electrical distribution",
                "UPS systems",
                "Lighting design/automation"
              ]}
              img="/electricalpower.jpg"
              icon={<Zap />}
            />
            
            <DisciplineCard 
              title="Building Automation (BMS)"
              subtitle="Unlock efficiency through central control."
              items={[
                "BMS installation and integration",
                "Commissioning & optimization",
                "Sustainable-energy monitoring",
                "24/7 remote diagnostics"
              ]}
              img="/buildingautomation.jpg"
              icon={<Settings />}
            />

            {/* Full Width for Fleet */}
            <div className="lg:col-span-2">
               <DisciplineCard 
                title="Fleet & Auto Engineering"
                subtitle="Reliable mobility for your operations."
                items={[
                  "Vehicle maintenance & diagnostic",
                  "Heavy & light duty vehicle servicing",
                  "Dispatch & logistics optimization",
                  "GPS-enabled fleet tracking"
                ]}
                img="/fleetauto.jpg"
                icon={<Truck />}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. FINAL CTA */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Need an Engineering Audit?</h2>
          <p className="text-lg text-slate-600 mb-10">
            Identify risks and optimize your building's performance with a comprehensive engineering assessment.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 px-10 py-5 bg-blue-600 text-white hover:bg-blue-700 font-bold rounded-lg text-lg transition-all shadow-xl hover:-translate-y-1"
          >
            Get in Touch <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
}

// --- HELPER COMPONENTS ---

function EthosCard({ number, title, desc, icon }: { number: string, title: string, desc: string, icon: any }) {
  return (
    <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/20 hover:bg-white/15 transition-all text-left group">
      <div className="flex justify-between items-start mb-4">
        <div className="text-blue-300 group-hover:text-white transition-colors [&>svg]:w-8 [&>svg]:h-8">{icon}</div>
        <span className="text-5xl font-bold text-white/10 group-hover:text-white/20 transition-colors">{number}</span>
      </div>
      <h3 className="text-xl font-bold text-white mb-3 tracking-wide">{title}</h3>
      <p className="text-slate-200 text-sm leading-relaxed font-light">{desc}</p>
    </div>
  );
}

function DisciplineCard({ title, subtitle, items, img, icon }: { title: string, subtitle: string, items: string[], img: string, icon: any }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-100 flex flex-col md:flex-row group h-full hover:shadow-xl transition-shadow duration-300">
      {/* Image Side */}
      <div className="relative w-full md:w-2/5 h-64 md:h-auto overflow-hidden">
        <Image 
          src={img} 
          alt={title} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 to-transparent md:bg-gradient-to-t" />
        <div className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center text-white border border-white/20">
          <div className="[&>svg]:w-5 [&>svg]:h-5">{icon}</div>
        </div>
      </div>
      
      {/* Content Side */}
      <div className="flex-1 p-8 flex flex-col justify-center">
        <h3 className="text-2xl font-bold text-slate-900 mb-1">{title}</h3>
        <p className="text-blue-600 text-sm font-medium mb-6 uppercase tracking-wider">{subtitle}</p>
        
        <ul className="space-y-3">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-slate-600 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
