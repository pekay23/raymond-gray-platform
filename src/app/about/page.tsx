"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import React from "react";
import { Leaf, ShieldCheck, Handshake, Lightbulb, HardHat } from "lucide-react";

export default function About() {
  return (
    <div className="bg-white overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[80vh] md:h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/ifm.jpg"
          alt="Raymond Gray Operations"
          fill
          className="object-cover scale-110" 
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-black/50" /> 
        
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 text-center text-white max-w-5xl px-6"
        >
          <h1 className="text-6xl md:text-9xl font-bold mb-6 tracking-tighter">
            RAYMOND GRAY
          </h1>
          <p className="text-xl md:text-3xl font-light text-slate-200 tracking-wide">
            Integrated Facilities Management
          </p>
        </motion.div>
      </section>

      {/* 2. WHO WE ARE */}
      <section className="py-24 bg-white text-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            
            {/* Left Column: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              {/* Solid Foundation Block */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-slate-900">
                    Solid Foundation
                  </span>
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Raymond Gray was founded on a powerful principle; property owners and developers in Ghana deserve the same uncompromising standards found in the world’s most demanding markets. With UK-trained engineers and finishing specialists, we bring a disciplined, proactive approach to every project—enhancing asset value, ensuring operational resilience, and creating outstanding work and living environments.
                </p>
              </div>

              {/* Built to Last Block */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-slate-900">
                    Built to Last
                  </span>
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Our roots are in the UK building industry’s rigorous standards. That discipline—precision, accountability, and long-term thinking—shapes how we deliver in Ghana: proven, high-quality execution using international best practice with deep local expertise. We built Raymond Gray to be the partner you can rely on.
                </p>
              </div>

              {/* Two Animated Cards */}
              <div className="space-y-6 pt-4">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-slate-50 p-6 rounded-xl border-l-4 border-blue-600 shadow-sm"
                >
                  <p className="text-slate-800 font-medium">
                    A premier provider of integrated facility management, building services engineering, and construction finishing solutions.
                  </p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-slate-900 p-6 rounded-xl border-l-4 border-red-600 shadow-lg text-white"
                >
                  <p className="text-slate-200 font-medium italic">
                    "From technical maintenance to canteen operations and workplace support — Raymond Gray delivers seamless, integrated solutions that let you focus on your core business."
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column: Image (FIXED) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative lg:sticky lg:top-24"
            >
              {/* FIX: Use aspect ratio instead of fixed height for better mobile display */}
              <div className="relative w-full aspect-[3/4] md:aspect-[4/5] lg:h-[700px] lg:aspect-auto rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
                <Image
                  src="/grayteam.jpg"
                  alt="Raymond Gray Team"
                  fill
                  className="object-cover object-top" // Focus on faces (top)
                  quality={100}
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. OUR VALUES */}
      <section className="py-24 bg-slate-50 text-slate-900 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-slate-900">Our Values</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              The principles that drive our operations every single day.
            </p>
          </motion.div>
          
          {/* Grid Layout Fixed for Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 md:h-[600px] auto-rows-[300px] md:auto-rows-auto">
            <ValueCard className="md:col-span-2 md:row-span-1" title="Sustainability" desc="Recycling & Renewables." icon={<Leaf />} img="/renewables.jpg" />
            <ValueCard className="md:col-span-2" title="Integrity" desc="Transparent & Reliable." icon={<ShieldCheck />} img="/ifm.jpg" />
            <ValueCard className="md:col-span-2" title="Partnership" desc="Long-term collaboration." icon={<Handshake />} img="/colab.jpg" />
            <ValueCard className="md:col-span-3" title="Innovation" desc="Smart technologies and energy-efficient solutions." icon={<Lightbulb />} img="/tech.jpg" />
            <ValueCard className="md:col-span-3" title="Safety First" desc="Zero accident culture, compliance-led operations." icon={<HardHat />} img="/workethic.jpg" />
          </div>
        </div>
      </section>

      {/* 4. MISSION & VISION */}
      <section className="relative py-32 bg-slate-950 text-white overflow-hidden perspective-1000">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-slate-950 z-0" />
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <TiltCard 
            title="Our Mission" 
            text="To deliver end-to-end building services — from finishing to full lifecycle management — with uncompromising quality, innovation, and sustainability." 
            color="red" 
          />
          <TiltCard 
            title="Our Vision" 
            text="To redefine facility management in Africa by providing integrated solutions that enhance safety, efficiency, and workplace experience." 
            color="blue" 
          />
        </div>
      </section>

    </div>
  );
}

// --- SUB-COMPONENTS ---

function ValueCard({ title, desc, icon, className, img }: { title: string, desc: string, icon: React.ReactNode, className?: string, img: string }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className={`relative overflow-hidden p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all flex flex-col items-center text-center justify-center group ${className}`}
    >
      <Image src={img} alt={title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors" />
      
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 bg-white/20 text-white backdrop-blur-md mx-auto group-hover:bg-red-600 transition-colors">
          <div className="[&>svg]:w-7 [&>svg]:h-7">{icon}</div>
        </div>
        <h4 className="text-2xl font-bold mb-2 text-white">{title}</h4>
        <p className="text-sm text-slate-200 font-medium">{desc}</p>
      </div>
    </motion.div>
  );
}

function TiltCard({ title, text, color }: { title: string, text: string, color: "red" | "blue" }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const xPos = (e.clientX - left) / width - 0.5;
    const yPos = (e.clientY - top) / height - 0.5;
    x.set(xPos * 10);
    y.set(yPos * -10);
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
      className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-3xl cursor-pointer hover:bg-white/10 transition-colors h-full flex flex-col justify-center text-center"
    >
      <div style={{ transform: "translateZ(30px)" }}>
        <span className={`font-bold tracking-widest uppercase mb-6 block text-lg ${color === 'red' ? 'text-red-500' : 'text-blue-500'}`}>
          {title}
        </span>
        <h3 className="text-2xl md:text-3xl font-bold leading-tight text-white drop-shadow-lg">
          {text}
        </h3>
      </div>
    </motion.div>
  );
}
