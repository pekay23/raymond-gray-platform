import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Linkedin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8 md:gap-12">
        
        {/* Brand & Logo */}
        <div className="col-span-1 space-y-4">
          {/* LOGO FIX: Mobile = h-24 w-60 (Good), Desktop = h-40 w-80 (Bigger) */}
          <Link href="/" className="block relative h-24 w-60 md:h-40 md:w-80 -ml-2 hover:opacity-90 transition cursor-pointer">
            <Image 
              src="/raymond-gray-logo1.svg" 
              alt="Raymond Gray" 
              fill 
              className="object-contain object-left"
            />
          </Link>
          
          <p className="text-gray-400 text-xs leading-relaxed max-w-xs">
            Leading provider of integrated facilities management solutions in Ghana.
            <span className="block mt-1 font-medium text-gray-300">
              Proactive quality. Seamless possibility.
            </span>
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4 pt-2">
            <SocialLink href="https://facebook.com" icon={<Facebook className="w-4 h-4" />} />
            <SocialLink href="https://instagram.com" icon={<Instagram className="w-4 h-4" />} />
            <SocialLink href="https://twitter.com" icon={<Twitter className="w-4 h-4" />} />
            <SocialLink href="https://linkedin.com" icon={<Linkedin className="w-4 h-4" />} />
          </div>
        </div>
        
        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-bold mb-4 text-white uppercase tracking-wider">Company</h4>
          <ul className="space-y-2 text-gray-400 text-xs">
            <li><Link href="/" className="hover:text-red-500 transition">Home</Link></li>
            <li><Link href="/about" className="hover:text-red-500 transition">About Us</Link></li>
            <li><Link href="/services" className="hover:text-red-500 transition">Services</Link></li>
            <li><Link href="/faqs" className="hover:text-red-500 transition">FAQs</Link></li>
            <li><Link href="/contact" className="hover:text-red-500 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Portals */}
        <div>
          <h4 className="text-sm font-bold mb-4 text-white uppercase tracking-wider">Portals</h4>
          <ul className="space-y-2 text-gray-400 text-xs">
            <li><Link href="/client/dashboard" className="hover:text-blue-400 transition">Client Portal</Link></li>
            <li><Link href="/technician/dashboard" className="hover:text-green-400 transition">Technician Access</Link></li>
            <li><Link href="/admin/dashboard" className="hover:text-amber-400 transition">Admin Dashboard</Link></li>
          </ul>
        </div>
        
        {/* Contact Info */}
        <div>
          <h4 className="text-sm font-bold mb-4 text-white uppercase tracking-wider">Contact</h4>
          <ul className="space-y-3 text-gray-400 text-xs">
            <li className="leading-relaxed">
              Accra, Greater Accra Region<br />Ghana
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-3 h-3 text-red-500" />
              <a href="tel:+233551010108" className="hover:text-white transition">+233 551 010 108</a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="w-3 h-3 text-red-500 mt-0.5" />
              <div className="flex flex-col">
                <a href="mailto:contactus@raymond-gray.org" className="hover:text-white transition">contactus@raymond-gray.org</a>
                <a href="mailto:repairs@raymond-gray.org" className="hover:text-white transition">repairs@raymond-gray.org</a>
              </div>
            </li>
          </ul>
        </div>
        
      </div>
      
      <div className="mt-10 pt-6 border-t border-slate-800 text-center text-gray-600 text-[10px]">
        <p>&copy; {new Date().getFullYear()} Raymond Gray. All rights reserved.</p>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon }: { href: string, icon: React.ReactNode }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all"
    >
      {icon}
    </a>
  );
}
