'use client';

import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-space-gray text-cloud-white pt-20 pb-8 border-t border-deep-graphite">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-accent-teal tracking-tighter uppercase mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-car-front"><path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.64 5H8.4a2 2 0 0 0-1.9 1.3L5 10 3 8"/><path d="M7 14h.01"/><path d="M17 14h.01"/><rect width="18" height="8" x="3" y="10" rx="2"/><path d="M5 18v2"/><path d="M19 18v2"/></svg>
              DriveNest
            </Link>
            <p className="text-cool-gray text-[14px] leading-relaxed">
              We provide the best cars for your journey. Enjoy our wide selection of vehicles ranging from comfortable sedans to luxurious SUVs at competitive prices.
            </p>
          </div>

          {/* Quick Info */}
          <div>
            <h4 className="text-[16px] font-bold mb-6 text-cloud-white">Quick Info</h4>
            <ul className="space-y-4 text-[14px]">
              <li className="flex items-start gap-3 text-cool-gray">
                <MapPin className="w-5 h-5 text-highlight-blue shrink-0" />
                <span>123 Car Street, Auto City,<br />AC 12345</span>
              </li>
              <li className="flex items-center gap-3 text-cool-gray">
                <Phone className="w-5 h-5 text-highlight-blue shrink-0" />
                <span>+1 234 567 8900</span>
              </li>
              <li className="flex items-center gap-3 text-cool-gray">
                <Mail className="w-5 h-5 text-highlight-blue shrink-0" />
                <span>support@drivenest.com</span>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-[16px] font-bold mb-6 text-cloud-white">Customer Care</h4>
            <ul className="space-y-3 text-[14px]">
              <li><Link href="/about" className="text-cool-gray hover:text-highlight-blue transition">About Us</Link></li>
              <li><Link href="/cars" className="text-cool-gray hover:text-highlight-blue transition">Our Cars</Link></li>
              <li><Link href="/faq" className="text-cool-gray hover:text-highlight-blue transition">FAQ</Link></li>
              <li><Link href="/terms" className="text-cool-gray hover:text-highlight-blue transition">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="text-cool-gray hover:text-highlight-blue transition">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-[16px] font-bold mb-6 text-cloud-white">Subscribe To Newsletter</h4>
            <form className="flex mt-4" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter Email" 
                className="bg-white border border-deep-graphite px-4 py-2 rounded-l-buttons outline-none w-full text-cloud-white placeholder:text-cool-gray text-sm"
              />
              <button 
                type="submit" 
                className="bg-interactive-blue hover:bg-vivid-blue text-white px-6 py-2 rounded-r-buttons font-semibold transition text-sm whitespace-nowrap"
              >
                Send
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-deep-graphite mt-16 pt-8 text-center text-cool-gray text-[12px]">
          <p>Copyright &copy; {new Date().getFullYear()} DriveNest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}