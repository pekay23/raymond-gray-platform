import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
        
        {/* Brand & Logo */}
        <div>
          {/* LOGO UPDATE: Massive container (h-32 w-[600px]) */}
          <div className="relative h-32 w-[600px] max-w-full mb-6">
            <Image 
              src="/raymond-gray-logo1.svg" 
              alt="Raymond Gray" 
              fill 
              className="object-contain object-left"
            />
          </div>
          <p className="text-gray-400 leading-relaxed text-sm">
            Leading provider of integrated facilities management solutions in Ghana.<br />
            Proactive quality. Seamless possibility.
          </p>
        </div>
        
        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li><Link href="/" className="hover:text-red-500 transition">Home</Link></li>
            <li><Link href="/about" className="hover:text-red-500 transition">About Us</Link></li>
            <li><Link href="/services" className="hover:text-red-500 transition">Services</Link></li>
            <li><Link href="/faqs" className="hover:text-red-500 transition">FAQs</Link></li>
            <li><Link href="/contact" className="hover:text-red-500 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Portals */}
        <div>
          <h4 className="text-lg font-bold mb-6 text-white">Portals</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li>
              <Link href="/client/dashboard" className="hover:text-blue-400 transition flex items-center gap-2">
                Client Portal
              </Link>
            </li>
            <li>
              <Link href="/technician/dashboard" className="hover:text-green-400 transition flex items-center gap-2">
                Technician Access
              </Link>
            </li>
            <li>
              <Link href="/admin/dashboard" className="hover:text-amber-400 transition flex items-center gap-2">
                Admin Dashboard
              </Link>
            </li>
          </ul>
        </div>
        
        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-bold mb-6 text-white">Contact Us</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="leading-relaxed">
              Accra, Greater Accra Region<br />Ghana
            </li>
            <li>
              <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Phone</span>
              <a href="tel:+233551010108" className="hover:text-white transition">+233 551 010 108</a>
            </li>
            <li>
              <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Email</span>
              <div className="flex flex-col gap-1">
                <a href="mailto:contactus@raymond-gray.org" className="hover:text-white transition">contactus@raymond-gray.org</a>
                <a href="mailto:repairs@raymond-gray.org" className="hover:text-white transition">repairs@raymond-gray.org</a>
              </div>
            </li>
          </ul>
        </div>
        
      </div>
      
      <div className="mt-16 pt-8 border-t border-slate-800 text-center text-gray-500 text-xs">
        <p>&copy; {new Date().getFullYear()} Raymond Gray. All rights reserved.</p>
      </div>
    </footer>
  );
}
