import Link from "next/link";
import Image from "next/image"; // Don't forget this import

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
        
        {/* Brand & Logo */}
        <div>
          {/* LOGO UPDATE */}
          <div className="relative h-10 w-48 mb-6">
            <Image 
              src="/RaymondGray.svg" 
              alt="Raymond Gray" 
              fill 
              className="object-contain object-left brightness-0 invert" // Makes black logo white
            />
          </div>
          <p className="text-gray-300 leading-relaxed">
            Leading provider of integrated facilities management solutions in Ghana.<br />
            Proactive quality. Seamless possibility.
          </p>
        </div>
        
        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-3">
            <li><Link href="/" className="hover:text-red-500 transition">Home</Link></li>
            <li><Link href="/about" className="hover:text-red-500 transition">About Us</Link></li>
            <li><Link href="/services" className="hover:text-red-500 transition">Services</Link></li>
            <li><Link href="/contact" className="hover:text-red-500 transition">Contact</Link></li>
          </ul>
        </div>
        
        {/* Contact Info */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-3 text-gray-300">
            <li>Accra, Greater Accra Region<br />Ghana</li>
            <li>Phone: +233 55 555 5555</li>
            <li>Email: info@raymond-gray.org</li>
          </ul>
        </div>
        
        {/* Social / Connect */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Stay Connected</h4>
          <p className="text-gray-300">
            Follow us for updates on facilities management excellence.
          </p>
        </div>
      </div>
      
      <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} Raymond Gray. All rights reserved.</p>
      </div>
    </footer>
  );
}
