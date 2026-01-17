"use client";

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight, ShieldCheck, Phone, Wrench, Zap, Building2 } from "lucide-react";

// Soft Services Data with Images
const softServices = [
  { 
    title: "Front desk and Help desk", 
    desc: "Reception/front desk, visitor management, switchboard, helpdesk ticketing and concierge.",
    img: "/helpdesk.jpg"
  },
  { 
    title: "Manned security solutions", 
    desc: "Uniformed guarding, reception security, patrols, keyholding, event security and 24/7 cover.",
    img: "/security.jpg"
  },
  { 
    title: "Canteen & corporate catering", 
    desc: "Staff canteens, boardroom/events catering, menu planning, HACCP-aligned operations.",
    img: "/catering.jpg"
  },
  { 
    title: "Landscaping & grounds maintenance", 
    desc: "Lawn care, hedging, tree work, irrigation checks and paving upkeep.",
    img: "/landscaping.jpg"
  },
  { 
    title: "Waste Management", 
    desc: "Segregation, bins & collections, recycling and compliant disposal.",
    img: "/waste.jpg"
  },
  { 
    title: "Travel management solutions", 
    desc: "Flights, hotels & apartments, visas, ground transport, group bookings and travel policy compliance.",
    img: "/travel.jpg"
  },
  { 
    title: "Events management & coordination", 
    desc: "Venue sourcing, catering, AV/production, staffing, guest logistics and run-of-show coordination.",
    img: "/events.jpg"
  },
  { 
    title: "Pest control / fumigation", 
    desc: "Preventive treatments, targeted eradication, monitoring and proofing.",
    img: "/fumigation.jpg"
  },
  { 
    title: "Mail, dispatch & logistics", 
    desc: "On-site mailroom, courier dispatch, inter-office pouch runs, last-mile deliveries and tracked errands.",
    img: "/msil.jpg"
  },
  { 
    title: "Real estate services", 
    desc: "Valuations, listings, tenanting and lease support for owners & investors.",
    img: "/realest.jpg"
  },
  { 
    title: "Insurance & risk management", 
    desc: "Property & fleet insurance placement, renewals, claims handling and risk surveys.",
    img: "/insurance.jpg"
  },
  { 
    title: "Cleaning and janitorial", 
    desc: "Daily & periodic cleaning, deep cleans, washroom hygiene and consumables.",
    img: "/cleaning.jpg"
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-slate-50 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[60vh] md:h-screen flex items-center justify-center overflow-hidden bg-slate-900">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src="/hero-services.jpeg"
            alt="Raymond Gray Services"
            fill
            className="object-cover opacity-40"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/50 to-slate-900" />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center max-w-5xl px-6"
        >
          <span className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-4 block">
            What We Deliver
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Support You Can <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">Count On!</span>
          </h1>
          
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full mt-6">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
            <span className="text-white font-medium text-lg">A 60-Day Workmanship Guarantee on All Repair Work!</span>
          </div>
        </motion.div>
      </section>

      {/* 2. CORE SERVICES GRID (3D Tilt - No Icons) */}
      <section className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Core Technical Services</h2>
            <p className="text-slate-600">Expert engineering, maintenance, and finishing solutions.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <TiltServiceCard 
              title="24/7 Emergency Repairs"
              desc="Rapid response for critical faults. We are always ready."
              linkHref="/services/emergency"
              linkText="Request Emergency Repair"
              img="/247emerg.jpg"
              color="red"
            />

            <TiltServiceCard 
              title="On-Demand Repair Services"
              desc="Quick fixes for everyday breakdowns and wear-and-tear."
              linkHref="/services/scheduled"
              linkText="Request Repair"
              img="https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=800&q=80"
              color="blue"
            />

            <TiltServiceCard 
              title="Scheduled Maintenance"
              desc="Preventive servicing for HVAC, generators, and pumps."
              linkHref="/services/servicing"
              linkText="Schedule Service"
              img="/schedmaint.jpg"
              color="blue"
            />

            <TiltServiceCard 
              title="Building Integrity Audit"
              desc="Comprehensive pre-takeover inspection and performance audits."
              linkHref="/services/audit"
              linkText="Request Audit"
              img="/bia.jpg"
              color="blue"
            />

            <TiltServiceCard 
              title="Interior Design & Finishing"
              desc="Transforming spaces with high-end aesthetics."
              linkHref="mailto:interiors@raymond-gray.org"
              linkText="Email Interiors Team"
              img="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
              color="red"
            />

            <TiltServiceCard 
              title="Vehicle Fleet Maintenance"
              desc="Professional auto-mechanic services for corporate fleets."
              linkHref="mailto:automechanic@raymond-gray.org"
              linkText="Email Auto-Mechanic"
              img="/fleetmaint.jpg"
              color="blue"
            />

            <TiltServiceCard 
              title="Real Estate Services"
              desc="Sales, rentals, and property management."
              linkHref="mailto:realestate@raymond-gray.org"
              linkText="Email Real Estate"
              img="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"
              color="red"
            />

            <TiltServiceCard 
              title="Integrated Facility Management"
              desc="Total care for your building's soft and hard services."
              linkHref="/services/ifm"
              linkText="View IFM Page"
              img="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
              color="blue"
            />

             <TiltServiceCard 
              title="Construction Finishing"
              desc="Expert tiling, painting, and POP installation."
              linkHref="/services/construction"
              linkText="View Construction Page"
              img="https://images.unsplash.com/photo-1595846519845-68e298c2edd8?auto=format&fit=crop&w=800&q=80"
              color="red"
            />

          </div>
        </div>
      </section>

      {/* 3. SOFT SERVICES (Interactive Reveal with Images) */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-blue-400 font-bold uppercase tracking-widest mb-2 block">Comprehensive Solutions</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Suite of Soft Services</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Hover over a service to reveal details.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {softServices.map((service, index) => (
              <SoftServiceCard key={index} title={service.title} desc={service.desc} img={service.img} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="py-20 bg-white border-t border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Need a tailored solution?</h2>
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 px-10 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-all shadow-xl hover:-translate-y-1"
          >
            Get a Quote <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
}

// --- 3D TILT CARD COMPONENT ---
function TiltServiceCard({ title, desc, linkText, linkHref, color, img }: { title: string, desc: string, linkText: string, linkHref: string, color: "blue" | "red", img: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const xPos = (e.clientX - left) / width - 0.5;
    const yPos = (e.clientY - top) / height - 0.5;
    x.set(xPos * 12);
    y.set(yPos * -12);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useTransform(mouseY, (value) => value);
  const rotateY = useTransform(mouseX, (value) => value);

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative h-[400px] rounded-3xl overflow-hidden cursor-pointer group shadow-xl"
    >
      <Image src={img} alt={title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

      <div className="absolute inset-0 flex flex-col justify-end p-8" style={{ transform: "translateZ(30px)" }}>
        <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{title}</h3>
        <p className="text-slate-300 text-sm mb-6 line-clamp-2">{desc}</p>
        
        <Link href={linkHref} className={`font-bold text-sm flex items-center gap-2 transition-colors ${
          color === 'blue' ? 'text-blue-400 group-hover:text-blue-300' : 'text-red-400 group-hover:text-red-300'
        }`}>
          {linkText} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}

// --- INTERACTIVE SOFT SERVICE CARD WITH IMAGE ---
function SoftServiceCard({ title, desc, img }: { title: string, desc: string, img: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative h-64 rounded-2xl overflow-hidden cursor-pointer group shadow-lg border border-slate-700/50"
    >
      {/* Background Image */}
      <Image 
        src={img} 
        alt={title} 
        fill 
        className={`object-cover transition-transform duration-700 ${isHovered ? "scale-110 blur-sm" : "scale-100"}`} 
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-slate-900/70 group-hover:bg-slate-900/90 transition-colors duration-300" />

      {/* Default State (Title Centered) */}
      <div className={`absolute inset-0 flex items-center justify-center p-6 text-center transition-all duration-300 ${isHovered ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>
        <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">{title}</h3>
      </div>

      {/* Reveal State (Description) */}
      <div className={`absolute inset-0 flex flex-col items-center justify-center p-8 text-center transition-all duration-300 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <h3 className="text-xl font-bold text-blue-400 mb-3">{title}</h3>
        <p className="text-sm text-slate-200 font-medium leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}
