"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation"; // ← Add this
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // ← Tracks current route

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl md:text-3xl font-bold text-navy-900 hover:text-red-700 transition">
          Raymond Gray
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex space-x-8 text-lg font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition ${pathname === link.href ? "text-red-700 font-bold" : "hover:text-red-700"}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-navy-900 focus:outline-none">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-6 py-4 space-y-4 text-lg font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block transition ${pathname === link.href ? "text-red-700 font-bold" : "hover:text-red-700"}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}