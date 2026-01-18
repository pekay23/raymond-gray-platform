"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Wrench, Building2, Zap, ShieldCheck, Heart, Award, Users, Clock, Handshake } from "lucide-react";
import * as THREE from "three";
// @ts-ignore
import NET from "vanta/dist/vanta.net.min";

export default function Home() {
  const heroRef = useRef(null);
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  // Vanta.js Effect Hook
  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x3b82f6, // Raymond Gray Blue
          backgroundColor: 0xffffff, // White Background
          points: 12.00,
          maxDistance: 22.00,
          spacing: 18.00
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="bg-slate-50">
      
      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-900">
        
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <Image
            src="/hero-home.jpg"
            alt="Building Maintenance"
            fill
            className="object-cover"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900" />
        </motion.div>

        <div className="relative z-10 text-center text-white max-w-5xl px-6 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="inline-block py-1 px-4 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
              Everything You Need, Under One Provider
            </span>
            <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
              Building Maintenance & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">
                Facility Support Services
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 font-light max-w-3xl mx-auto leading-relaxed">
              From technical maintenance and compliance to everyday comfort, catering, and residential support, Raymond Gray delivers seamless, integrated solutions that keep your spaces running perfectly — so you can focus on what matters most.
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-12 left-0 right-0 z-20 flex flex-col items-center gap-4"
        >
          <div className="animate-bounce mt-4 text-slate-400"><ChevronDown className="w-6 h-6" /></div>
        </motion.div>
      </section>

      {/* 2. SERVICES (3D Tilt Grid with Images) */}
      <section className="py-32 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Core Solutions</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <TiltServiceCard 
              title="Integrated Facility Management" 
              desc="Seamless Soft and Hard Facility Services."
              linkText="Explore IFM"
              linkHref="/services/ifm"
              icon={<Building2 />}
              color="blue"
              img="/exploreifm.jpg"
            />
            <TiltServiceCard 
              title="Engineering Services" 
              desc="Efficient Reliable Building Operations."
              linkText="Explore Engineering"
              linkHref="/services/engineering"
              icon={<Zap />}
              color="blue"
              img="/engineeringservices.jpg"
            />
            <TiltServiceCard 
              title="Construction Finishing" 
              desc="Classy Quality Finishes."
              linkText="Explore Finishing"
              linkHref="/services/construction"
              icon={<Wrench />}
              color="red"
              img="/construfin.jpg"
            />
          </div>
        </div>
      </section>

      {/* 3. THE DIFFERENCE (Now with Vanta.js Background) */}
      <section ref={vantaRef} className="py-24 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 pointer-events-none">
          <div className="text-center mb-20 pointer-events-auto">
            <span className="text-red-600 font-bold tracking-widest uppercase mb-2 block">The Raymond Gray Difference</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Our Culture Sets Us Apart</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 pointer-events-auto">
            <FeatureCard 
              title="Commitment" 
              desc="Our goal is to become a premier solution provider to clients in all sectors by constantly being ahead in the areas of innovation, client satisfaction and quality delivery. We are committed to building working partnerships that add value and consistently exceed expectations."
              icon={<Handshake />}
              img="/commit.jpg"
            />
            <FeatureCard 
              title="Work Ethic" 
              desc="We pride ourselves on our personal and comprehensive approach that identifies and solves issues before they become problems. No matter how big or small a job our sensitivity to your needs is of the highest importance. Because we understand the culture of maintenance and planning, reliability and a timely response are essential to our success."
              icon={<Heart />}
              img="/workethic.jpg"
            />
            <FeatureCard 
              title="Quality" 
              desc="To reinforce quality standards Management has put in place a Quality Management System, that reviews quality objectives for all areas of the company. To assess effectiveness the Quality Management System is monitored by planned audits and management reviews with effective, corrective and preventive action implemented swiftly."
              icon={<Award />}
              img="/quality.jpg"
            />
          </div>
        </div>
      </section>

      {/* 4. STATS & TRUST */}
      <section className="py-20 bg-slate-100 border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Your Trusted Facilities Support Partner</h2>
          <p className="text-lg text-slate-600 mb-12 max-w-3xl mx-auto">
            At Raymond Gray, we specialize in integrated facilities management, ensuring optimal performance for corporate, residential, and institutional clients through our comprehensive services.
          </p>
          
          <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <div className="text-5xl font-bold text-blue-600 mb-2">15+</div>
              <div className="text-slate-500 font-bold uppercase tracking-wider">Trusted Partners</div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <div className="text-5xl font-bold text-red-600 mb-2">15</div>
              <div className="text-slate-500 font-bold uppercase tracking-wider">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA */}
      <section className="py-24 bg-gradient-to-br from-[#1E3059] to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight drop-shadow-lg">
            One partner. One contract. One SLA. <br/> 
            <span className="text-blue-300">It's just who we are!</span>
          </h2>
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-slate-900 hover:bg-slate-100 font-bold rounded-lg text-lg transition-all shadow-xl hover:-translate-y-1"
          >
            Get Started Today <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
}

// --- COMPONENTS ---

function FeatureCard({ title, desc, icon, img }: { title: string, desc: string, icon: any, img: string }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="relative overflow-hidden p-8 rounded-2xl shadow-lg border border-slate-100 group h-full"
    >
      <Image src={img} alt={title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-slate-900/80 group-hover:bg-slate-900/70 transition-colors" />

      <div className="relative z-10">
        <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6 text-white group-hover:text-red-400 transition-colors border border-white/10">
          <div className="[&>svg]:w-7 [&>svg]:h-7">{icon}</div>
        </div>
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-red-400 transition-colors">{title}</h3>
        <p className="text-slate-300 leading-relaxed text-sm font-light">{desc}</p>
      </div>
    </motion.div>
  );
}

function TiltServiceCard({ title, desc, linkText, linkHref, icon, color, img }: { title: string, desc: string, linkText: string, linkHref: string, icon: any, color: "blue" | "red", img: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const xPos = (e.clientX - left) / width - 0.5;
    const yPos = (e.clientY - top) / height - 0.5;
    x.set(xPos * 15);
    y.set(yPos * -15);
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
      className={`relative h-full p-10 rounded-3xl border cursor-pointer transition-colors group flex flex-col justify-between overflow-hidden border-slate-700`}
    >
      <Image src={img} alt={title} fill className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-50 group-hover:opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent z-0" />

      <div style={{ transform: "translateZ(30px)" }} className="relative z-10 pt-8">
        <h3 className="text-3xl font-bold mb-4 text-white leading-tight">{title}</h3>
        <p className="text-slate-300 leading-relaxed mb-6">{desc}</p>
      </div>
      
      <div style={{ transform: "translateZ(20px)" }} className="relative z-10">
        <Link href={linkHref} className={`font-bold text-sm flex items-center gap-2 ${
          color === 'blue' ? 'text-blue-400 group-hover:text-blue-300' : 'text-red-400 group-hover:text-red-300'
        }`}>
          {linkText} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}
