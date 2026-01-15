import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
        {/* Brand & Description */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Raymond Gray</h3>
          <p className="text-gray-300">
            Leading provider of integrated facilities management solutions in Ghana.<br />
            Proactive quality. Seamless possibility.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-3">
            <li>
              <Link href="/" className="hover:text-red-700 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-red-700 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-red-700 transition">
                Services
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-red-700 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-3 text-gray-300">
            <li>Accra, Greater Accra Region<br />Ghana</li>
            <li>Phone: +233 XX XXX XXXX<br />(Update with your number)</li>
            <li>Email: info@raymond-gray.org</li>
          </ul>
        </div>

        {/* Optional: Social or Newsletter (expand later) */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Stay Connected</h4>
          <p className="text-gray-300 mb-4">
            Follow us for updates on facilities management excellence.
          </p>
          {/* Add social icons later if needed */}
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} Raymond Gray. All rights reserved.</p>
      </div>
    </footer>
  );
}