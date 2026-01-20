"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { User, Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

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
      className="fixed top-0 left-0 right-0 z-50 bg-[#1E3059]/95 backdrop-blur-md border-b border-white/10 shadow-lg h-20 flex items-center"
    >
      <div className="max-w-7xl w-full mx-auto px-6 flex justify-between items-center h-full">
        
        {/* LOGO FIX: Huge container with negative margins to crop empty space */}
        <Link href="/" className="relative block h-40 w-64 -ml-4 flex-shrink-0 hover:opacity-90 transition">
          <Image 
            src="/raymond-gray-logo1.svg" 
            alt="Raymond Gray" 
            fill 
            className="object-contain object-left" 
            priority
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8 text-base font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition ${
                pathname === link.href 
                  ? "text-white font-bold" 
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {/* SIGN IN BUTTON */}
          <Link 
            href="/signin" 
            className="flex items-center gap-2 px-5 py-2.5 bg-white text-[#1E3059] rounded-lg text-sm font-bold hover:bg-gray-100 transition shadow-sm"
          >
            <User className="w-4 h-4" /> Sign In
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-white focus:outline-none p-2"
        >
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
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
            className="md:hidden bg-[#1E3059] border-t border-white/10 shadow-xl absolute top-20 left-0 right-0"
          >
            <div className="px-6 py-6 space-y-4 text-lg font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block transition ${
                    pathname === link.href 
                      ? "text-white font-bold" 
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              <Link 
                href="/signin" 
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-white text-[#1E3059] rounded-lg text-base font-bold hover:bg-gray-100 transition"
              >
                <User className="w-5 h-5" /> Sign In
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
