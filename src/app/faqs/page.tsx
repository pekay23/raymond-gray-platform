"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

// Categorized FAQ Data
const faqData = [
  {
    category: "General",
    questions: [
      {
        q: "What does Raymond Gray do?",
        a: "We provide integrated facility management and building maintenance and building services engineering across homes and workplaces—covering on‑demand repairs, planned/scheduled servicing, construction project support, property make‑ready and deep cleaning, construction finishing and real‑estate services (rentals, sales, and tenant management)."
      },
      {
        q: "Where do you operate?",
        a: "We currently serve Accra and nearby areas. For jobs outside our operational area, we’ll confirm availability and any additional travel charges before you book."
      },
      {
        q: "What are your working hours?",
        a: "Standard hours are Monday–Friday (8am to 5pm) and Saturdays (9am to 3pm). We do not work on Sundays. Emergency call‑outs are available subject to technician availability."
      }
    ]
  },
  {
    category: "Accounts & Membership",
    questions: [
      {
        q: "Do I need an account to use your services?",
        a: "No, you can book without an account. A free account can be created after your first booking if you opt for it. The account lets you book faster, upload photos, track job status, download receipts, and manage service history."
      },
      {
        q: "Do you offer loyalty points or memberships?",
        a: "Coming Soon: We’re rolling out a non‑commercial membership with digital e‑cards to your phone and loyalty points that you can redeem on selected services. Watch out for updates."
      }
    ]
  },
  {
    category: "Booking & Scheduling",
    questions: [
      {
        q: "How do I request on‑demand repairs versus standard servicing?",
        a: "Start from our Building Maintenance page. Choose Repair for faults and breakdowns or Standard Servicing for routine maintenance. Each route has its own booking form and workflow."
      },
      {
        q: "How far in advance must I book standard servicing?",
        a: "Please book at least 3 clear days in advance. Sundays are unavailable for bookings."
      },
      {
        q: "What information do you require when booking?",
        a: "For servicing, please provide a clear photo of the equipment, the make and model (if available), and when it was last serviced. For repairs, add a brief description of the fault and any error codes or symptoms."
      },
      {
        q: "Can I book vehicle servicing and repairs?",
        a: "Yes. Vehicle servicing and repairs have a dedicated booking page. Standard servicing for vehicles also requires 3 clear days’ notice."
      },
      {
        q: "How are technicians assigned to my job?",
        a: "Our dispatch dashboard matches your request to the most suitable technicians based on skillset, experience, location, availability, and service level targets."
      }
    ]
  },
  {
    category: "Pricing & Payments", // Shortened title for mobile tabs
    questions: [
      {
        q: "How is pricing shown?",
        a: "We display transparent pricing before you confirm. Where a site inspection is needed, the price will be stated in the form or we’ll share a quote for approval first. Parts are itemized separately."
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept major cards, mobile money, and bank transfer. Invoices and receipts are available in your account dashboard."
      },
      {
        q: "Do you charge a call‑out fee?",
        a: "A standard call‑out may apply and will be shown before you confirm the booking. Additional time and parts are agreed and approved by you before we proceed."
      }
    ]
  },
  {
    category: "Safety & Insurance", // Shortened title
    questions: [
      {
        q: "Do you offer a workmanship guarantee?",
        a: "Yes. We stand behind our work with a clear workmanship guarantee. If a covered issue recurs within the stated guarantee period, we’ll return to make it right."
      },
      {
        q: "Are your technicians insured and vetted?",
        a: "All technicians are trained for safety and speciality area validation annually. They are covered under our operating policies and relevant liability cover ONLY when working on Raymond Gray jobs."
      },
      {
        q: "How do you manage safety and compliance on site?",
        a: "We operate strict SOPs and repair processes. Our team follows mandatory lock‑out/tag‑out and incident reporting procedures."
      }
    ]
  },
  {
    category: "Real Estate",
    questions: [
      {
        q: "What real estate services do you provide?",
        a: "We handle rentals, sales, and tenant management. Add‑ons include pre‑move‑in/out inventory, deep cleaning, and maintenance support for landlords."
      },
      {
        q: "Can you represent landlords who prefer anonymity?",
        a: "Yes. We manage listings, viewings, tenant screening, agreement preparation, and rent collection, becoming the single point of contact."
      }
    ]
  },
  {
    category: "Data & Support",
    questions: [
      {
        q: "How do you handle my data?",
        a: "We use your data to deliver services you request, verify bookings, and improve quality. We never sell personal data. See our Privacy Policy for full details."
      },
      {
        q: "How can I get help?",
        a: "Use the contact form or your account message centre. For urgent issues with an active booking, reply to your job confirmation message and we’ll prioritise your request."
      }
    ]
  }
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("General");
  const contentRef = useRef<HTMLDivElement>(null);

  // Scroll to top of content when category changes (mobile friendliness)
  useEffect(() => {
    if (contentRef.current && window.innerWidth < 1024) {
      // Small offset to account for sticky navs
      const yOffset = -150; 
      const y = contentRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [activeCategory]);

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      
      {/* 1. Header Section */}
      <section className="bg-slate-900 pt-32 pb-12 text-white text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Everything you need to know about Raymond Gray’s services.
        </p>
      </section>

      {/* 2. MOBILE NAVIGATION (Horizontal Scroll Tabs) */}
      <div className="lg:hidden sticky top-[73px] z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="flex overflow-x-auto py-4 px-4 gap-3 no-scrollbar">
          {faqData.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(cat.category)}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-bold transition-all ${
                activeCategory === cat.category 
                  ? "bg-red-600 text-white shadow-md" 
                  : "bg-slate-100 text-slate-600 border border-slate-200"
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-12 gap-12">
        
        {/* 3. DESKTOP SIDEBAR (Hidden on mobile) */}
        <div className="hidden lg:block lg:col-span-4 space-y-2 sticky top-28 h-fit">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 px-4">Categories</h3>
          {faqData.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(cat.category)}
              className={`w-full text-left px-4 py-3 rounded-lg text-lg font-medium transition-all ${
                activeCategory === cat.category 
                  ? "bg-white text-red-600 shadow-md border-l-4 border-red-600" 
                  : "text-slate-600 hover:bg-white hover:text-slate-900"
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* 4. FAQ Accordion List */}
        <div className="lg:col-span-8" ref={contentRef}>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-slate-900">
              {activeCategory}
            </h2>
            <span className="text-sm text-slate-500 font-medium">
              {faqData.find(c => c.category === activeCategory)?.questions.length} Questions
            </span>
          </div>

          <div className="space-y-4">
            {faqData
              .find((c) => c.category === activeCategory)
              ?.questions.map((item, index) => (
                <FAQItem key={index} question={item.q} answer={item.a} />
              ))}
          </div>

          <div className="mt-12 p-8 bg-blue-50 rounded-xl border border-blue-100 text-center">
            <p className="text-slate-700 font-medium mb-4">Can't find your answer?</p>
            <a href="/contact" className="inline-block px-6 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition">
              Contact Support
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

// --- SEPARATE COMPONENT TO FIX OVERLAPPING ---
function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm transition-all duration-300 ${isOpen ? 'border-red-200 shadow-md' : 'hover:shadow-md'}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start justify-between p-6 text-left"
        aria-expanded={isOpen}
      >
        <span className={`text-lg font-bold leading-snug pr-4 ${isOpen ? "text-red-600" : "text-slate-900"}`}>
          {question}
        </span>
        <span className={`shrink-0 text-slate-400 mt-1 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          {isOpen ? <Minus className="w-5 h-5 text-red-500" /> : <Plus className="w-5 h-5" />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-50 mt-2">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
