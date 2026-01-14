import Link from "next/link";
import Image from "next/image";
import { Menu, Phone, Mail, MapPin, Wrench } from "lucide-react";
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-50 font-sans selection:bg-blue-500/30">
      
      [...](asc_slot://start-slot-3){/* HEADER */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <Link href="/" className="relative h-12 w-48">
             <Image 
               src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,fit=crop,q=95/ALp22aBn0rsGXkwa/raymond-gray-logo-color3-dOqZZLyxpouWGqJZ.png"
               alt="Raymond Gray Logo"
               fill
               className="object-contain object-left"
               priority
             />
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link href="/" className="hover:text-white hover:scale-105 transition-all">Home</Link>
            <Link href="/about" className="hover:text-white hover:scale-105 transition-all">Who We Are</Link>
            <Link href="/services" className="hover:text-white hover:scale-105 transition-all">Services</Link>
            <Link href="/contact" className="px-5 py-2.5 rounded-full bg-white text-slate-950 font-bold hover:bg-blue-50 transition-colors">
              Contact Us
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-white hover:bg-white/10 rounded-md transition">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1">
        {children}
      </main>

      [...](asc_slot://start-slot-5){/* FOOTER */}
      <footer className="bg-slate-950 border-t border-white/5 py-16 text-sm">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 px-4">
          <div className="space-y-6">
            <div className="relative h-10 w-40 opacity-90 grayscale hover:grayscale-0 transition-all">
                <Image 
                  src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,fit=crop,q=95/ALp22aBn0rsGXkwa/raymond-gray-logo-color3-dOqZZLyxpouWGqJZ.png"
                  alt="Raymond Gray"
                  fill
                  className="object-contain object-left"
                />
            </div>
            <p className="text-slate-400 leading-relaxed">
              Integrated Facilities Management Solutions. <br />
              One Partner. One Contract. [...](asc_slot://start-slot-7)One SLA.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6 text-lg">Contact</h4>
            <div className="space-y-4 text-slate-400">
              <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-blue-500" /> <span>+233 (0) 55 555 5555</span></div>
              <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-blue-500" /> <span>info@raymond-gray.org</span></div>
              <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-blue-500" /> <span>Accra, Ghana</span></div>
            </div>
          </div>
          
          [...](asc_slot://start-slot-9)<div>
            <h4 className="text-white font-semibold mb-6 text-lg">Services</h4>
            <ul className="space-y-3 text-slate-400">
              <li className="hover:text-blue-400 transition cursor-pointer">Building Maintenance</li>
              <li className="hover:text-blue-400 transition cursor-pointer">Construction Finishing</li>
              <li className="hover:text-blue-400 transition cursor-pointer">Integrated FM</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6 text-lg">Staff</h4>
            <Link href="/portal" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition group border border-slate-800 rounded-lg px-4 py-3 bg-slate-900 hover:bg-slate-800">
              <Wrench className="w-4 h-4 group-hover:rotate-12 transition-transform" /> 
              <span>Technician Portal</span>
            </Link>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-16 pt-8 border-t border-white/5 text-center text-slate-600">
            © 2026 Raymond Gray. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
