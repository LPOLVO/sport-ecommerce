'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useUser } from '@/lib/store/userStore';
import { useRouter } from 'next/navigation';

export default function Wishlist() {
  const { isAuthenticated } = useUser();
  const router = useRouter();

  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  const wishlistItems = [
    {
      id: '1',
      name: 'Pro Running Shoes - Velocity X',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container-custom">
          <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

          {wishlistItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlistItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="font-bold line-clamp-2 mb-2">{item.name}</h3>
                    <p className="text-secondary font-bold text-lg mb-4">${item.price.toFixed(2)}</p>
                    <button className="w-full btn-primary">Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Your wishlist is empty</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
