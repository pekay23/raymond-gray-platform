"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { 
  ArrowRight, 
  PaintBucket, 
  Ruler, 
  Armchair, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";

export default function ConstructionPage() {
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
            src="/hero-construction-finishing.jpg"
            alt="Construction Finishing"
            fill
            className="object-cover opacity-50"
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
             <span className="inline-block py-1 px-4 rounded-full bg-red-500/20 border border-red-400/30 text-red-300 text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
              Premium Interiors
            </span>
            
            <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight tracking-tight text-white">
              Construction <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-white">
                Finishing
              </span>
            </h1>
            
            <p className="text-lg md:text-2xl text-slate-200 font-light max-w-3xl mx-auto leading-relaxed">
              From Structural Shell to Exceptional Space
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. INTRODUCTION SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
              From Structural Shell to <br/> <span className="text-red-600">Exceptional Space</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              Bringing our engineering-grade discipline to interiors, we transform building shells into polished, functional, and beautiful work and living environments, meeting the highest standards of craftsmanship.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed font-medium">
              Every step matters: paint lines, flooring, lighting, joinery; all executed to exacting standards.
            </p>
          </div>
          {/* FIX: Responsive Aspect Ratio */}
          <div className="relative w-full aspect-video lg:h-[500px] lg:aspect-auto rounded-2xl overflow-hidden shadow-2xl border border-slate-100">
            <Image 
              src="/collabconstruction.jpg"
              alt="Construction Collaboration"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3. OUR FINISHING & INTERIOR SERVICES */}
      <section className="py-24 bg-blue-50/60 relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30 mix-blend-multiply pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Finishing & Interior Services</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              We manage the entire journey from concept to completion.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Card 1: Design */}
            <ServiceCard 
              img="/i2.jpg"
              icon={<Ruler />}
              title="Interior Design & Space Planning"
              desc="We work with you to create a cohesive design plan that optimizes flow, functionality, and style or brand alignment."
              items={[
                "Private & Corporate Interior Design",
                "Space Planning & Optimization",
                "Material & Finishes Selection",
                "3D Visualization & Renderings"
              ]}
            />

            {/* Card 2: Specialist Finishing */}
            <ServiceCard 
              img="/i10.jpg"
              icon={<PaintBucket />}
              title="Specialist Finishing Works"
              desc="This is where precision meets the eye. Our teams execute flawless installations that stand the test of time and scrutiny."
              items={[
                "Flooring: Carpeting, LVT, tiling, hardwood",
                "Wall Finishes: Painting, wallpaper, feature walls",
                "Ceilings: Suspended & acoustic solutions",
                "Joinery & Millwork: Custom fixtures & cabinetry"
              ]}
            />

            {/* Card 3: Fixtures */}
            <ServiceCard 
              img="/i15.jpg"
              icon={<Armchair />}
              title="Fine Fixtures & Furnishing"
              desc="Source, produce and install the elements that complete the space. We procure, custom build and fit high-quality fixtures."
              items={[
                "Furniture Sourcing & Manufacture",
                "Lighting Fixture Installation",
                "Bathroom & Sanitary Ware Installation",
                "Artwork & Accessory Styling"
              ]}
            />
          </div>
        </div>
      </section>

      {/* 4. THE RAYMOND GRAY FINISHING STANDARD */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
             {/* FIX: Responsive Aspect Ratio */}
             <div className="order-2 lg:order-1 relative w-full aspect-[4/5] lg:h-[600px] lg:aspect-auto rounded-2xl overflow-hidden shadow-2xl">
                <Image 
                  src="/construfurn1.jpg"
                  alt="Finishing Standard"
                  fill
                  className="object-cover"
                />
             </div>
             
             <div className="order-1 lg:order-2">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10">The Raymond Gray Finishing Standard</h2>
                <div className="space-y-10">
                  <StandardItem 
                    title="Principle 1: Meticulous Craftsmanship"
                    desc="Our finishers are trained specialists, not general laborers. We take pride in razor-sharp paint lines, perfectly aligned wallpaper seams, and impeccably laid flooring."
                  />
                  <StandardItem 
                    title="Principle 2: Project Management Discipline"
                    desc="Even the most aesthetic-driven projects run on our core methodology: clear timelines, rigorous quality checks at each stage, and clean, safe worksites."
                  />
                  <StandardItem 
                    title="Principle 3: Cohesive Integration"
                    desc="As part of the Raymond Gray family, our finishing team works hand-in-glove with our engineers. This ensures that lighting, HVAC vents, and data points are seamlessly integrated into the final design."
                  />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 5. CASE STUDY 1 */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-red-400 font-bold uppercase tracking-widest text-sm mb-2 block">Finishing Case Study 1</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">Delivering a Premium European Approved Training Facility</h2>
            
            <div className="space-y-6 text-slate-300">
              {/* Content... */}
              <div className="bg-white/10 p-6 rounded-xl border border-white/10">
                <h4 className="font-bold text-white mb-4">The Quantifiable Result:</h4>
                <ul className="space-y-2">
                  <ResultItem text="Completed the project 10 days ahead of schedule." />
                  <ResultItem text="Achieved a 99% snag-free handover, a rarity in high-spec finishing." />
                  <ResultItem text="Received direct praise from the end-client for the exceptional quality of the craftsmanship." />
                </ul>
              </div>
            </div>
          </div>
          {/* FIX: Responsive Aspect Ratio */}
          <div className="relative w-full aspect-video lg:h-[500px] lg:aspect-auto rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
             <Image src="/case1.jpg" alt="Case Study 1" fill className="object-cover" />
          </div>
        </div>
      </section>

       {/* 6. CASE STUDY 2 */}
       <section className="py-24 bg-slate-50 text-slate-900">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
           {/* FIX: Responsive Aspect Ratio */}
           <div className="order-2 lg:order-1 relative w-full aspect-video lg:h-[500px] lg:aspect-auto rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
             <Image src="/case2.jpg" alt="Case Study 2" fill className="object-cover" />
          </div>
          
          <div className="order-1 lg:order-2">
            <span className="text-red-600 font-bold uppercase tracking-widest text-sm mb-2 block">Finishing Case Study 2</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">Delivering Custom Furniture Solutions</h2>
            
            <div className="space-y-6 text-slate-600">
              {/* Content... */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-900 mb-4">The Quantifiable Result:</h4>
                <ul className="space-y-2">
                  <ResultItemDark text="Completed the project on schedule, with immediate repeat work." />
                  <ResultItemDark text="The client was particularly pleased with the architect table." />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. IMAGE CAROUSEL */}
      <ImageCarousel />

      {/* 8. CTA SECTION */}
      <section className="py-24 bg-slate-900 text-center relative overflow-hidden">
         <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Let's discuss how our disciplined approach to construction finishing can bring your vision to life.</h2>
          <p className="text-xl text-slate-300 mb-10">
            On time and to the highest possible standard.
          </p>
          <a 
            href="mailto:finishing@raymond-gray.org" 
            className="inline-flex items-center gap-2 px-10 py-5 bg-red-600 text-white hover:bg-red-700 font-bold rounded-lg text-lg transition-all shadow-xl hover:-translate-y-1"
          >
            Get a Quote for Your Fit-Out <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

    </div>
  );
}

// --- HELPER COMPONENTS ---

function ServiceCard({ title, desc, items, icon, img }: any) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all group h-full flex flex-col hover:-translate-y-2 duration-300 overflow-hidden">
      {/* FIX: Fixed height for card images is fine, but added object-top for better framing */}
      <div className="relative h-48 w-full">
        <Image 
          src={img} 
          alt={title} 
          fill 
          className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-red-600 shadow-sm">
           <div className="[&>svg]:w-6 [&>svg]:h-6">{icon}</div>
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">{title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">{desc}</p>
        <div className="bg-blue-50/50 p-4 rounded-lg">
          <ul className="space-y-2">
            {items.map((item: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2 text-slate-700 text-sm font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function StandardItem({ title, desc }: { title: string, desc: string }) {
  return (
    <div>
      <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-3">
        <CheckCircle2 className="text-red-600 w-6 h-6" />
        {title}
      </h3>
      <p className="text-slate-600 pl-9 leading-relaxed">{desc}</p>
    </div>
  );
}

function ResultItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3 text-slate-300 text-sm">
      <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
      <span>{text}</span>
    </li>
  );
}

function ResultItemDark({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3 text-slate-600 text-sm">
      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
      <span>{text}</span>
    </li>
  );
}

// --- CAROUSEL COMPONENT ---
function ImageCarousel() {
  const images = Array.from({ length: 38 }, (_, i) => `/i${i + 1}.jpg`);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000); 
    return () => clearInterval(timer);
  }, [images.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <section className="py-24 bg-black overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-2">Our Portfolio Gallery</h2>
        <p className="text-slate-400">A showcase of our finishing excellence.</p>
      </div>

      <div className="relative max-w-5xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
        <Image 
          src={images[currentIndex]} 
          alt={`Gallery Image ${currentIndex + 1}`} 
          fill 
          className="object-contain bg-black"
        />
        
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-sm transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-sm transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-mono backdrop-blur-md">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto mt-6 flex gap-2 overflow-x-auto pb-4 justify-center">
        {[-2, -1, 0, 1, 2].map((offset) => {
            const index = (currentIndex + offset + images.length) % images.length;
            return (
                <div 
                    key={index} 
                    onClick={() => setCurrentIndex(index)}
                    className={`relative w-24 h-16 shrink-0 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                        offset === 0 ? 'border-red-500 scale-110 z-10' : 'border-transparent opacity-50 hover:opacity-100'
                    }`}
                >
                    <Image src={images[index]} alt="thumb" fill className="object-cover" />
                </div>
            )
        })}
      </div>
    </section>
  );
}
