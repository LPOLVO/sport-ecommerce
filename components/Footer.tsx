'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company */}
          <div>
            <h3 className="text-lg font-bold mb-4">SportHub</h3>
            <p className="text-gray-300 text-sm">
              Your premier destination for sports equipment and apparel.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/shop" className="hover:text-secondary transition-colors">Shop All</Link></li>
              <li><Link href="/about" className="hover:text-secondary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-secondary transition-colors">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-secondary transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/shipping" className="hover:text-secondary transition-colors">Shipping Info</Link></li>
              <li><Link href="/returns" className="hover:text-secondary transition-colors">Returns</Link></li>
              <li><Link href="/warranty" className="hover:text-secondary transition-colors">Warranty</Link></li>
              <li><Link href="/support" className="hover:text-secondary transition-colors">Support</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/privacy" className="hover:text-secondary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-secondary transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-secondary transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">
            <p>&copy; 2026 SportHub. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-secondary transition-colors">Facebook</a>
              <a href="#" className="hover:text-secondary transition-colors">Twitter</a>
              <a href="#" className="hover:text-secondary transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
