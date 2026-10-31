'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS, CATEGORIES } from '@/lib/mockData';
import Link from 'next/link';

export default function Home() {
  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured).slice(0, 4);
  const newProducts = PRODUCTS.filter((p) => p.isNew).slice(0, 4);
  const topRated = PRODUCTS.sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Banner Slider */}
        <div className="relative h-96 bg-gradient-to-r from-primary to-secondary overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white z-10">
              <h1 className="text-5xl font-bold mb-4">Welcome to SportHub</h1>
              <p className="text-xl mb-8 max-w-2xl">Discover premium sports equipment and apparel for every athlete</p>
              <Link href="/shop" className="btn-primary bg-white text-secondary hover:bg-gray-100">
                Shop Now
              </Link>
            </div>
          </div>
        </div>

        {/* Category Highlights */}
        <section className="container-custom py-16">
          <h2 className="text-3xl font-bold mb-12 text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.slice(0, 6).map((category) => (
              <Link key={category.id} href={`/shop?category=${category.slug}`} className="group">
                <div className="relative overflow-hidden rounded-lg h-64 bg-gray-200">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                    <div className="text-center text-white">
                      <span className="text-4xl mb-3 block">{category.icon}</span>
                      <h3 className="text-2xl font-bold">{category.name}</h3>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="container-custom py-16 bg-white my-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Seasonal Offers Banner */}
        <section className="container-custom py-16">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-12 text-white text-center">
            <h2 className="text-4xl font-bold mb-4">Seasonal Sale</h2>
            <p className="text-xl mb-8">Get up to 50% off on selected items. Limited time offer!</p>
            <Link href="/shop" className="inline-block px-8 py-4 bg-white text-secondary font-bold rounded-lg hover:bg-gray-100 transition-colors">
              View Deals
            </Link>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="container-custom py-16">
          <h2 className="text-3xl font-bold mb-12 text-center">New Arrivals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Top Rated */}
        <section className="container-custom py-16 bg-white my-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-12 text-center">Top Rated</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topRated.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="container-custom py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-bold mb-2">Free Shipping</h3>
              <p className="text-gray-600">On orders over $100</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-2">Secure Checkout</h3>
              <p className="text-gray-600">Your data is always safe with us</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">↩️</div>
              <h3 className="text-xl font-bold mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day money-back guarantee</p>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="container-custom py-16 bg-primary text-white rounded-lg">
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="mb-6">Get exclusive deals and updates delivered to your inbox</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none"
              />
              <button className="bg-secondary px-6 py-3 rounded-lg font-bold hover:bg-orange-500 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
