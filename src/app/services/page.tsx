"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Integrated Facilities Management",
    description: "One partner. One contract. One SLA. Seamless soft and hard services for total efficiency.",
    image: "https://images.unsplash.com/photo-1486406141652-86f763f6fd62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Modern facility placeholder
  },
  {
    title: "Engineering Services",
    description: "Expert maintenance and engineering for mechanical, electrical, and plumbing systems.",
    image: "https://images.unsplash.com/photo-1581093450021-4a607727a6af?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Engineering team
  },
  {
    title: "Construction Finishing",
    description: "Premium interior and exterior finishing for corporate, residential, and institutional projects.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Luxury interior
  },
];

export default function Services() {
  return (
    <section className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-navy-900 mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tailored integrated solutions delivering proactive quality and operational excellence across Ghana.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="aspect-w-16 aspect-h-9 relative h-96">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-3xl font-bold mb-4">{service.title}</h3>
                <p className="text-lg mb-6 opacity-90">{service.description}</p>
                <Link
                  href="/contact"
                  className="inline-block bg-red-700 hover:bg-red-800 px-6 py-3 rounded-md font-semibold transition"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}