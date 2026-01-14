"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, ShieldCheck, Wrench, Building2, Zap } from "lucide-react";
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};
export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-hidden bg-slate-950">
      
      {/* 1. [...](asc_slot://start-slot-15)IMMERSIVE HERO SECTION */}
      <section className="relative h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1612191974684-4fcce5b4fecc?auto=format&fit=crop&w=1920&q=80"
            alt="Raymond Gray Interiors"
            fill
            className="object-cover"
            priority
          />
          {/* Dual Gradients for Text Readability */}
          <div className="absolute inset-0 bg-slate-950/60" /> 
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center mt-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto space-y-8"
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium tracking-wide uppercase">
              Integrated Facilities Management
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.05] drop-shadow-2xl">
              One Partner. <br />
              One Contract. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">One SLA.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
              We streamline property care with integrated solutions. From emergency repairs to construction finishing, we handle it all.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-8">
              <Link href="/contact" className="w-full sm:w-auto px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/25">
                Get a Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/services" className="w-full sm:w-auto px-10 py-5 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition-all">
                Our Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. STATS STRIP */}
      <section className="border-y border-white/5 bg-slate-900/50 backdrop-blur-sm relative z-20 -mt-20 md:-mt-32 mx-4 md:mx-auto container rounded-2xl md:rounded-full shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 md:py-10 px-8">
          {[
            { label: "SLA Compliance", value: "99.9%" },
            { label: "Client Retention", value: "98%" },
            { label: "Response Time", value: "< 60m" },
            { label: "Assets Managed", value: "500+" },
          ].map((stat, i) => (
            <div key={i} className="text-center md:text-left border-r last:border-0 border-white/10">
              <div className="text-2xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs md:text-sm text-slate-400 uppercase tracking-wider font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. VISUAL SERVICES GRID */}
      <section className="py-32 bg-slate-950 relative">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn} className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Complete Lifecycle Support</h2>
              <p className="text-lg text-slate-400 leading-relaxed">
                We combine technical expertise with premium finishing. Our team ensures your property looks as good as it operates.
              [...](asc_slot://start-slot-17)</p>
            </div>
            <Link href="/services" className="px-6 py-3 rounded-full border border-slate-700 text-slate-300 hover:text-white hover:border-white transition flex items-center gap-2 group">
              View All Services <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Card 1: Maintenance */}
            <ServiceCard 
              title="Building Maintenance" 
              desc="Proactive upkeep for HVAC, plumbing, and critical systems."
              img="https://images.unsplash.com/photo-1581578731117-10d52143b0e8?auto=format&fit=crop&w=800&q=80"
              icon={<Wrench className="w-6 h-6 text-white" />}
            />

            {/* Card 2: Construction */}
            <ServiceCard 
              title="Construction Finishing" 
              desc="High-end tiling, painting, and interior fit-outs."
              img="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80"
              icon={<Building2 className="w-6 h-6 text-white" />}
            />

            {/* Card 3: Engineering */}
            <ServiceCard 
              title="Engineering Services" 
              desc="Electrical safety, generator servicing, and water treatment."
              [...](asc_slot://start-slot-19)img="https://images.unsplash.com/photo-1581092921461-eab62e97a783?auto=format&fit=crop&w=800&q=80"
              icon={<Zap className="w-6 h-6 text-white" />}
            />
          </motion.div>
        </div>
      </section>

      {/* 4. "WHY US" (Technology Section) */}
      <section className="py-24 bg-slate-900 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-6">
                <ShieldCheck className="w-4 h-4" />
                <span>The Raymond Gray Difference</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Intelligence meets <br />
                <span className="text-blue-500">Infrastructure.</span>
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed mb-8">
                We don't just guess; we track. Using our proprietary <strong>Offline-First Technology</strong>, 
                our technicians log every repair, ensuring you have a complete digital history of your assets.
              </p>
              
              <ul className="space-y-4">
                {["Real-time Job Tracking", "Certified & Vetted Technicians", "Transparent Pricing", "24/7 Emergency Response"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-500" />
                    <span className="text-slate-200 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            [...](asc_slot://start-slot-21)<motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-video md:aspect-square rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            >
               <Image 
                 src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=604,fit=crop/ALp22aBn0rsGXkwa/mockup_1-billboard-1-m6L29oVpw7HLNN20.jpg"
                 alt="Raymond Gray Billboard"
                 fill
                 className="object-cover"
               />
               {/* Overlay to ensure text readability if needed */}
               <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
               <div className="absolute bottom-8 left-8 right-8">
                 <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl">
                   <p className="text-white font-medium">"Our goal is to become a premier solution provider by constantly being ahead in innovation."</p>
                 </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ title, desc, img, icon }: any) {
  return (
    <motion.div variants={fadeIn} className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer">
      <Image 
        src={img} 
        alt={title} 
        fill 
        className="object-cover transition-transform duration-700 group-hover:scale-110" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />
      
      <div className="absolute bottom-0 left-0 p-8 w-full">
        <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/20 group-hover:bg-blue-600 group-hover:border-blue-500 transition-colors">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-300 line-clamp-2 group-hover:text-white transition-colors">{desc}</p>
      </div>
    </motion.div>
  );
}
