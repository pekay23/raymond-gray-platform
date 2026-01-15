"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <>
      {/* About Hero */}
      <section className="relative h-96 md:h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="https://media.gettyimages.com/id/1247581516/photo/commercial-high-rise-office-buildings-on-the-skyline-in-accra-ghana-on-tuesday-feb-28-2023.jpg?s=612x612&w=gi&k=20&c=dXTqU4JWJgaaiHOot-tu1r802ACGUz3gD-bYponCbH4="
          alt="Modern Accra business district"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white max-w-4xl px-6"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            About Raymond Gray
          </h1>
          <p className="text-xl md:text-2xl">
            Leading Integrated Facilities Management in Ghana
          </p>
        </motion.div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6">
              Our Story
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Raymond Gray is a premier provider of integrated facilities management solutions in Ghana, delivering seamless soft and hard services to corporate, residential, and institutional clients. 
              With a focus on proactive quality and operational excellence, we transform facility management into a strategic advantage – one partner, one contract, one SLA.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision, Values Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-red-700 w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">M</span>
              </div>
              <h3 className="text-2xl font-bold text-navy-900 mb-4">Mission</h3>
              <p className="text-gray-700">
                To deliver integrated, proactive facility solutions that enhance operational efficiency and client satisfaction across Ghana.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-red-700 w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">V</span>
              </div>
              <h3 className="text-2xl font-bold text-navy-900 mb-4">Vision</h3>
              <p className="text-gray-700">
                To be Ghana's most trusted partner for seamless facility management, setting the standard for excellence in Africa.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-red-700 w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">V</span>
              </div>
              <h3 className="text-2xl font-bold text-navy-900 mb-4">Values</h3>
              <p className="text-gray-700">
                Integrity, Innovation, Proactive Service, and Client-Centric Excellence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}