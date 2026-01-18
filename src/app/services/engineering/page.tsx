"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Zap, Wrench, Server, Droplets, Gauge, Truck, ArrowRight, CheckCircle2 } from "lucide-react";

export default function EngineeringPage() {
  return (
    <div className="bg-slate-50">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=2070&q=90"
            alt="Engineering Excellence"
            fill
            className="object-cover opacity-30"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
        </motion.div>
        
        <div className="relative z-10 container mx-auto px-6 grid md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-amber-400 font-bold tracking-widest uppercase text-sm mb-4 block">
              The Silent Heartbeat of Your Property
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Engineering <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Excellence</span>
            </h1>
            <p className="text-xl text-slate-300 font-light max-w-lg mb-10 leading-relaxed">
              Expert engineering solutions, including vehicle fleet maintenance, for seamless operational support.
            </p>
            
            <Link href="/services/audit" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all flex items-center gap-2 w-fit shadow-lg shadow-blue-900/50">
              Request an Engineering Audit <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. THE ETHOS (Text Block) */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-8">Our Engineering Ethos</h2>
            <div className="text-xl text-slate-600 leading-relaxed space-y-6">
              <p>
                Your building's complex systems are its lifeblood. When they fail, your business stops. 
              </p>
              <p className="font-medium text-slate-800">
                We provide the critical expertise to design, install, maintain, and optimize HVAC, power, water, IT, and building emergency control systems to <span className="text-blue-600">UK engineering standards.</span>
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mt-16 text-left">
            <FeatureCard number="01" title="Proactive" desc="Predictive and planned maintenance to prevent downtime, not just react to it." />
            <FeatureCard number="02" title="Standards-Based" desc="UK-inspired rigour with strict code compliance and execution." />
            <FeatureCard number="03" title="Integrated" desc="HVAC, BMS, and IT teams collaborate for total peak performance." />
          </div>
        </div>
      </section>

      {/* 3. KEY DISCIPLINES (Bento Grid) */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <span className="text-blue-400 font-bold uppercase tracking-widest mb-2 block">Our Key Disciplines</span>
            <h2 className="text-4xl md:text-5xl font-bold">Precision, Driven by Discipline</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <ServiceCard 
              title="Electrical & Power" 
              desc="Uninterrupted, safe electricity. Generator plants, UPS systems, and lighting automation."
              icon={<Zap className="w-8 h-8 text-yellow-400" />}
            />
            
            <ServiceCard 
              title="HVAC & Mechanical" 
              desc="Optimal climate and air quality. Design, installation, and precision cooling for data rooms."
              icon={<Wrench className="w-8 h-8 text-blue-400" />}
            />

            <ServiceCard 
              title="IT & Data Infrastructure" 
              desc="The digital backbone. Fibre/CAT6 cabling, server room management, and IT support."
              icon={<Server className="w-8 h-8 text-purple-400" />}
            />

            <ServiceCard 
              title="Plumbing & Fire Safety" 
              desc="Reliable water and sanitation. Drainage, firefighting systems, and water treatment."
              icon={<Droplets className="w-8 h-8 text-cyan-400" />}
            />

            <ServiceCard 
              title="Building Automation (BMS)" 
              desc="Unlock efficiency. Central control, energy monitoring, and 24/7 remote diagnostics."
              icon={<Gauge className="w-8 h-8 text-green-400" />}
            />

            {/* Featured Card: Fleet */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-2xl shadow-xl lg:col-span-1 border border-blue-500 relative overflow-hidden group">
              <div className="relative z-10">
                <Truck className="w-10 h-10 text-white mb-6" />
                <h3 className="text-2xl font-bold mb-3">Fleet & Auto Engineering</h3>
                <ul className="space-y-2 text-blue-100 text-sm mb-6">
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4" /> Vehicle maintenance & diagnostic</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4" /> Heavy & light duty servicing</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4" /> GPS-enabled fleet tracking</li>
                </ul>
                <Link href="/services/servicing" className="text-white font-bold border-b border-white pb-1 hover:opacity-80 transition">
                  Book Service
                </Link>
              </div>
              <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
                <Truck className="w-48 h-48" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Need an Engineering Audit?</h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            Identify risks and optimize your building's performance with a comprehensive engineering assessment.
          </p>
          <Link 
            href="/services/audit" 
            className="inline-flex items-center gap-2 px-10 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full transition-all shadow-xl hover:-translate-y-1"
          >
            Schedule Audit <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
}

// --- COMPONENTS ---

function FeatureCard({ number, title, desc }: { number: string, title: string, desc: string }) {
  return (
    <div className="p-6 border-l-4 border-blue-600 bg-slate-50 hover:bg-white hover:shadow-lg transition-all rounded-r-xl">
      <span className="text-4xl font-bold text-slate-200 mb-2 block">{number}</span>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function ServiceCard({ title, desc, icon }: { title: string, desc: string, icon: any }) {
  return (
    <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors group cursor-default">
      <div className="mb-6 p-3 bg-white/5 w-fit rounded-xl group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
