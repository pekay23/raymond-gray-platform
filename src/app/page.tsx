"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="https://media.gettyimages.com/id/1247581516/photo/commercial-high-rise-office-buildings-on-the-skyline-in-accra-ghana-on-tuesday-feb-28-2023.jpg?s=612x612&w=gi&k=20&c=dXTqU4JWJgaaiHOot-tu1r802ACGUz3gD-bYponCbH4="
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
            className="bg-red-700 hover:bg-red-800 text-white px-8 py-4 rounded-md text-lg font-semibold transition"
          >
            Speak with Our Experts
          </Link>
        </motion.div>
      </section>

      {/* The Raymond Gray Difference */}
      <section className="py-20 bg-navy-900 text-white">
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
            <p className="text-xl max-w-3xl mx-auto opacity-90">
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
              <div className="bg-red-700 w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-bold">
                1
              </div>
              <h3 className="text-2xl font-bold mb-4">One Partner</h3>
              <p className="opacity-90">
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
              <div className="bg-red-700 w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-bold">
                1
              </div>
              <h3 className="text-2xl font-bold mb-4">One Contract</h3>
              <p className="opacity-90">
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
              <div className="bg-red-700 w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-bold">
                1
              </div>
              <h3 className="text-2xl font-bold mb-4">One SLA</h3>
              <p className="opacity-90">
                Unified service level agreements with measurable outcomes and proactive monitoring.
              </p>
            </motion.div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/contact"
              className="inline-block bg-red-700 hover:bg-red-800 px-8 py-4 rounded-md text-lg font-semibold transition"
            >
              Discover the Difference
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}