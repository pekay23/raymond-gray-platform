"use client";

import { motion, Variants } from "framer-motion"; // Imported Variants type
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ArrowRight, Wrench, Building2, Zap } from "lucide-react";

// FIX: Explicitly typed as 'Variants' to solve the TypeScript error
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

export default function ServicesPage() {
  return (
    <div className="bg-white">
      
      {/* 1. SERVICES HERO */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0 opacity-60">
          <Image 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80"
            alt="Corporate Facility"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative z-10 text-center max-w-4xl px-6"
        >
          <span className="text-amber-400 font-bold tracking-widest uppercase text-sm mb-4 block">
            World-Class Expertise
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Comprehensive Solutions
          </h1>
          <p className="text-xl text-slate-200 font-light max-w-2xl mx-auto">
            From technical engineering to premium interior finishing, we manage the complete lifecycle of your asset.
          </p>
        </motion.div>
      </section>

      {/* 2. SERVICE PILLAR 1: Integrated FM */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image 
              src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80"
              alt="Integrated Facilities Management"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 border-[1px] border-amber-400/30 m-4 rounded-xl pointer-events-none" />
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-700">
              <Building2 className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Integrated Facilities Management</h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              We replace fragmentation with a unified approach. By combining soft services (cleaning, security) with hard services (maintenance, repairs), we create environments that foster productivity and comfort.
            </p>
            
            <ul className="space-y-4 mb-8">
              <ListItem text="Predictive & Preventive Maintenance" />
              <ListItem text="Janitorial & Hygiene Services" />
              <ListItem text="Waste Management & Sustainability" />
              <ListItem text="24/7 Helpdesk Support" />
            </ul>
            
            <Link href="/contact" className="text-red-700 font-bold flex items-center gap-2 hover:gap-4 transition-all">
              Request a Maintenance Audit <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 3. SERVICE PILLAR 2: Engineering */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="order-2 lg:order-1"
          >
            <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 text-amber-400">
              <Zap className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-bold mb-6">Engineering Services</h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Our technical team ensures your critical infrastructure never fails. We bring industrial-grade expertise to corporate and residential settings, ensuring safety and compliance at every level.
            </p>
            
            <ul className="space-y-4 mb-8">
              <ListItem text="HVAC Systems Installation & Repair" light />
              <ListItem text="Electrical Infrastructure Management" light />
              <ListItem text="Generator Servicing & Fuel Management" light />
              <ListItem text="Plumbing & Water Treatment" light />
            </ul>

            <Link href="/contact" className="text-white font-bold flex items-center gap-2 hover:gap-4 transition-all">
              Consult an Engineer <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="order-1 lg:order-2 relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image 
              src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80"
              alt="Engineering Services"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
             <div className="absolute inset-0 border-[1px] border-blue-400/30 m-4 rounded-xl pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* 4. SERVICE PILLAR 3: Construction Finishing */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image 
              src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=800&q=80"
              alt="Construction Finishing"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 border-[1px] border-red-400/30 m-4 rounded-xl pointer-events-none" />
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6 text-red-700">
              <Wrench className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Construction Finishing</h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Aesthetics matter. Our fit-out teams deliver high-precision finishing that elevates the value of your property. We handle the complex details so you get a turnkey result.
            </p>
            
            <ul className="space-y-4 mb-8">
              <ListItem text="Premium Tiling & Flooring" />
              <ListItem text="Interior Painting & Decorating" />
              <ListItem text="Pop Ceiling & Drywall Installation" />
              <ListItem text="Joinery & Carpentry" />
            </ul>
            
            <Link href="/contact" className="text-slate-900 font-bold flex items-center gap-2 hover:gap-4 transition-all">
              View Our Portfolio <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
            Ready to elevate your facility standards?
          </h2>
          <p className="text-xl text-slate-600 mb-10">
            Join the leading organizations in Ghana that trust Raymond Gray.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/contact" 
              className="bg-red-700 hover:bg-red-800 text-white px-10 py-4 rounded-md text-lg font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

// Helper Component for List Items
function ListItem({ text, light = false }: { text: string, light?: boolean }) {
  return (
    <li className="flex items-start gap-3">
      <CheckCircle2 className={`w-6 h-6 shrink-0 ${light ? "text-amber-400" : "text-blue-600"}`} />
      <span className={`text-lg ${light ? "text-slate-200" : "text-slate-700"}`}>
        {text}
      </span>
    </li>
  );
}
