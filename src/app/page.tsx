"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* CHANGED: Using local image */}
        <Image
          src="/hero-home.jpg"
          alt="Modern Accra skyline"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white max-w-4xl px-6"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Where others see a building,<br />we see seamless possibility.
          </h1>
          <p className="text-xl md:text-2xl mb-10">
            Integrated Facilities Management Solutions in Ghana
          </p>
          <Link
            href="/contact"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-md text-lg font-semibold transition shadow-lg"
          >
            Speak with Our Experts
          </Link>
        </motion.div>
      </section>

      {/* The Raymond Gray Difference */}
      {/* FIX: Changed bg-navy-900 to bg-slate-900 so the white text is visible */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              The Raymond Gray Difference
            </h2>
            <p className="text-xl max-w-3xl mx-auto opacity-90 text-slate-300">
              Proactive quality. Operational excellence. Seamless integration across soft and hard services.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-red-600 w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-bold shadow-lg shadow-red-900/50">
                1
              </div>
              <h3 className="text-2xl font-bold mb-4">One Partner</h3>
              <p className="opacity-80 leading-relaxed text-slate-300">
                Single point of accountability for all your facility needs – no fragmented vendors.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-red-600 w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-bold shadow-lg shadow-red-900/50">
                2
              </div>
              <h3 className="text-2xl font-bold mb-4">One Contract</h3>
              <p className="opacity-80 leading-relaxed text-slate-300">
                Simplified agreements that cover integrated soft and hard services end-to-end.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-red-600 w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-bold shadow-lg shadow-red-900/50">
                3
              </div>
              <h3 className="text-2xl font-bold mb-4">One SLA</h3>
              <p className="opacity-80 leading-relaxed text-slate-300">
                Unified service level agreements with measurable outcomes and proactive monitoring.
              </p>
            </motion.div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-block bg-red-600 hover:bg-red-700 px-8 py-4 rounded-md text-lg font-semibold transition shadow-lg"
            >
              Discover the Difference
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
