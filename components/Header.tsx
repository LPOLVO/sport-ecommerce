'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/store/cartStore';
import { useUser } from '@/lib/store/userStore';
import { ShoppingBagIcon, UserIcon, HeartIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getItemCount } = useCart();
  const { isAuthenticated, user } = useUser();
  const itemCount = getItemCount();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="text-2xl font-bold text-secondary">SportHub</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <MagnifyingGlassIcon className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center gap-6">
            {/* Wishlist */}
            <Link href="/wishlist" className="relative hover:text-secondary transition-colors">
              <HeartIcon className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative hover:text-secondary transition-colors">
              <ShoppingBagIcon className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* User Account */}
            <Link
              href={isAuthenticated ? '/dashboard' : '/login'}
              className="hover:text-secondary transition-colors"
            >
              <UserIcon className="w-6 h-6" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden md:flex gap-8 mt-6 border-t pt-4">
          <Link href="/shop" className="text-gray-700 hover:text-secondary font-medium transition-colors">
            All Products
          </Link>
          <Link href="/shop?category=running" className="text-gray-700 hover:text-secondary font-medium transition-colors">
            Running
          </Link>
          <Link href="/shop?category=football" className="text-gray-700 hover:text-secondary font-medium transition-colors">
            Football
          </Link>
          <Link href="/shop?category=fitness" className="text-gray-700 hover:text-secondary font-medium transition-colors">
            Fitness
          </Link>
          <Link href="/shop?category=outdoor" className="text-gray-700 hover:text-secondary font-medium transition-colors">
            Outdoor
          </Link>
        </nav>
      </div>
    </header>
  );
}
