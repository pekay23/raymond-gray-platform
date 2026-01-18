"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Ruler, PaintBucket, Sofa, CheckCircle2, Trophy, Clock, CheckSquare } from "lucide-react";
import { useState, useEffect } from "react";

// Generate array of 38 images
const carouselImages = Array.from({ length: 38 }, (_, i) => `/i${i + 1}.jpg`);

export default function ConstructionPage() {
  return (
    <div className="bg-white overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src="/constru.jpg"
            alt="Construction Finishing"
            fill
            className="object-cover opacity-40"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent" />
        </motion.div>
        
        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="max-w-3xl"
          >
            <span className="text-amber-400 font-bold tracking-widest uppercase text-sm mb-4 block">
              From Structural Shell to Exceptional Space
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Construction <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">Finishing</span>
            </h1>
            <p className="text-xl text-slate-200 font-light mb-8 leading-relaxed border-l-4 border-red-600 pl-6">
              The Difference is in the Detail. We deliver environments that impress clients and inspire residents.
            </p>
            <p className="text-slate-400 mb-10 max-w-xl">
              Bringing our engineering-grade discipline to interiors, we transform building shells into polished, functional, and beautiful work and living environments.
            </p>
            
            <Link href="/contact" className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-all flex items-center gap-2 w-fit shadow-lg shadow-red-900/50">
              Get a Quote for Your Fit-Out <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. IMAGE CAROUSEL (Showcase) */}
      <div className="bg-slate-900 py-4 overflow-hidden whitespace-nowrap">
        <div className="inline-flex animate-scroll">
          {/* Double the array to create infinite loop effect */}
          {[...carouselImages, ...carouselImages].map((src, index) => (
            <div key={index} className="relative w-64 h-40 mx-2 rounded-lg overflow-hidden shrink-0 border border-slate-700">
              <Image src={src} alt="Project Gallery" fill className="object-cover hover:scale-110 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </div>

      {/* 3. OUR SERVICES */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Finishing & Interior Services</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">We manage the entire journey from concept to completion.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <ServiceCard 
              icon={<Ruler />}
              title="Interior Design & Space Planning"
              desc="We create cohesive design plans that optimize flow, functionality, and brand alignment."
              points={["Private & Corporate Design", "Space Optimization", "Material Selection", "3D Visualization"]}
            />
            <ServiceCard 
              icon={<PaintBucket />}
              title="Specialist Finishing Works"
              desc="Where precision meets the eye. Flawless installations that stand the test of time."
              points={["Flooring (LVT, Hardwood)", "Wall Finishes & Painting", "Suspended Ceilings", "Joinery & Millwork"]}
            />
            <ServiceCard 
              icon={<Sofa />}
              title="Fine Fixtures & Furnishing"
              desc="Source, produce and install the elements that complete the space."
              points={["Furniture Sourcing", "Lighting Installation", "Bathroom Sanitary Ware", "Artwork Styling"]}
            />
          </div>
        </div>
      </section>

      {/* 4. THE STANDARD (Dark Section) */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-8">The Raymond Gray Finishing Standard</h2>
            <div className="space-y-8">
              <StandardItem 
                title="Meticulous Craftsmanship" 
                desc="Our finishers are trained specialists. We take pride in razor-sharp paint lines, perfectly aligned seams, and impeccably laid flooring." 
              />
              <StandardItem 
                title="Project Management Discipline" 
                desc="Even aesthetic projects run on our core methodology: clear timelines, rigorous quality checks, and clean worksites." 
              />
              <StandardItem 
                title="Cohesive Integration" 
                desc="We work hand-in-glove with our engineers. Lighting, HVAC, and data points are seamlessly integrated, not added as an afterthought." 
              />
            </div>
          </div>
          <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
             {/* Using Case Study 1 Image here as a feature */}
             <Image src="/case1.jpg" alt="Finishing Standard" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* 5. CASE STUDIES */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-slate-900 mb-16 text-center">Recent Success Stories</h2>
          
          <div className="space-y-20">
            {/* Case Study 1 */}
            <div className="grid md:grid-cols-2 gap-12 items-center bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
              <div className="order-2 md:order-1">
                <span className="text-red-600 font-bold tracking-wider text-sm uppercase mb-2 block">Case Study 1</span>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Premium Training Facility</h3>
                <p className="text-slate-600 mb-6 italic">"Delivering a European Approved Training Facility on an Accelerated Timeline"</p>
                
                <div className="space-y-4 text-sm text-slate-700">
                  <p><strong>The Challenge:</strong> High-spec fit-out with a non-negotiable deadline for regulatory inspection.</p>
                  <p><strong>The Solution:</strong> Coordinated phases of flooring, painting, and fixture installation alongside electrical and IT setup.</p>
                  <div className="bg-green-50 p-4 rounded-xl border border-green-100 mt-4">
                    <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2"><Trophy className="w-4 h-4" /> The Result:</h4>
                    <ul className="space-y-1 text-green-700 list-disc pl-4">
                      <li>Completed 10 days ahead of schedule.</li>
                      <li>99% snag-free handover.</li>
                      <li>Direct client praise for craftsmanship.</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2 relative h-80 rounded-2xl overflow-hidden shadow-md">
                <Image src="/case1.jpg" alt="Training Facility" fill className="object-cover" />
              </div>
            </div>

            {/* Case Study 2 */}
            <div className="grid md:grid-cols-2 gap-12 items-center bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-md">
                <Image src="/case2.jpg" alt="Custom Furniture" fill className="object-cover" />
              </div>
              <div>
                <span className="text-blue-600 font-bold tracking-wider text-sm uppercase mb-2 block">Case Study 2</span>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Architect's Office Furniture</h3>
                <p className="text-slate-600 mb-6 italic">"Delivering Custom Furniture Solutions for an Architect's Office"</p>
                
                <div className="space-y-4 text-sm text-slate-700">
                  <p><strong>The Challenge:</strong> Specific needs for furniture to review large format drawings.</p>
                  <p><strong>The Solution:</strong> In-house joinery team designed, manufactured, and installed bespoke pieces including partitions and flooring.</p>
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mt-4">
                    <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2"><Trophy className="w-4 h-4" /> The Result:</h4>
                    <ul className="space-y-1 text-blue-700 list-disc pl-4">
                      <li>Completed on schedule with immediate repeat work.</li>
                      <li>Client delighted with creativity and execution.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. CTA */}
      <section className="py-24 bg-slate-900 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-6">Let's Discuss Your Project</h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            See how our disciplined approach can bring your vision to life, on time and to the highest standard.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 px-10 py-4 bg-white text-slate-900 hover:bg-slate-200 font-bold rounded-full transition-all shadow-xl hover:-translate-y-1"
          >
            Request a Quote <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Tailwind Animation for Carousel */}
      <style jsx global>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

    </div>
  );
}

// --- COMPONENTS ---

function ServiceCard({ icon, title, desc, points }: { icon: any, title: string, desc: string, points: string[] }) {
  return (
    <div className="p-8 border border-slate-200 rounded-2xl hover:shadow-xl transition-all hover:-translate-y-1 group">
      <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center mb-6 text-slate-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
        <div className="[&>svg]:w-7 [&>svg]:h-7">{icon}</div>
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 mb-6 leading-relaxed">{desc}</p>
      <ul className="space-y-3">
        {points.map((p, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
            <CheckCircle2 className="w-4 h-4 text-green-500" /> {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

function StandardItem({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0 mt-1 shadow-lg shadow-blue-900/50">
        <CheckSquare className="w-5 h-5 text-white" />
      </div>
      <div>
        <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
        <p className="text-slate-400 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
